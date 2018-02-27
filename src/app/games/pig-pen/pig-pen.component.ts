import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Post } from './models/post';
import { AngularFireDatabase } from 'angularfire2/database';
import { Pen } from './models/pen';

@Component({
  selector: 'app-pig-pen',
  templateUrl: './pig-pen.component.html',
  styleUrls: ['./pig-pen.component.css']
})
export class PigPenComponent implements OnInit {

  @ViewChild("board") board: ElementRef;
  private gamestate = {
    posts: new Array<Array<Post>>(),
    currentSelectedPost: undefined,
    availablePens: new Array<Pen>()
  }

  constructor(public myElement: ElementRef, public renderer: Renderer2, public afdb: AngularFireDatabase) {
    for(var i: number = 0; i < 10; i++) {
      this.gamestate.posts[i] = [];
      for(var j: number = 0; j< 18; j++) {
        this.gamestate.posts[i][j] = new Post(i, j);
        if(i == 0) {
          this.gamestate.posts[i][j].belowIndex = i + 1;
        } else if (i == 9) {
          this.gamestate.posts[i][j].aboveIndex = i - 1;
        } else {
          this.gamestate.posts[i][j].aboveIndex = i - 1;
          this.gamestate.posts[i][j].belowIndex = i + 1;
        }
        if(j == 0) {
          this.gamestate.posts[i][j].rightIndex = j + 1;
        } else if (j == 17) {
          this.gamestate.posts[i][j].leftIndex = j - 1;
        } else {
          this.gamestate.posts[i][j].leftIndex = j - 1;
          this.gamestate.posts[i][j].rightIndex = j + 1;
        }
      }
    }
    for(var i: number = 0; i < 9; i++) {
      for(var j: number = 0; j < 17; j++) {
        this.gamestate.availablePens.push(new Pen(j+'-'+i, j+'-'+(i+1), (j+1)+'-'+i, (j+1)+'-'+(i+1)));
      }
    }
   }

  ngOnInit() {
    console.log('GameState:', this.gamestate);
  }

  selectPost(post: Post){
    if (post.selectable) {
      let selectableId = post.myCol+'-'+post.myRow;
      let selectedId = this.gamestate.currentSelectedPost.myCol+'-'+this.gamestate.currentSelectedPost.myRow;
      let selectedElement = document.getElementById(selectedId).parentElement;
      let selectableElement = document.getElementById(selectableId).parentElement;
      let svg = document.createElement('div');
      svg.setAttribute('style', `position: absolute;`);
      if (post.myCol === this.gamestate.currentSelectedPost.myCol) {
        svg.innerHTML = `<svg height="54" width="6">
            <line x1="1" y1="0" x2="1" y2="54" style="stroke:rgb(255,0,0);stroke-width:4" />
          </svg>`;
        if (post.myRow < this.gamestate.currentSelectedPost.myRow) {
          svg.style.top = selectableElement.offsetTop + document.body.scrollTop + 51 + "px";
          svg.style.left = selectableElement.offsetLeft + document.body.scrollLeft + 37 + "px";
          this.gamestate.currentSelectedPost.aboveIndex = undefined;
          post.belowIndex = undefined;
        } else {
          svg.style.top = selectedElement.offsetTop + document.body.scrollTop + 51 + "px";
          svg.style.left = selectedElement.offsetLeft + document.body.scrollLeft + 37 + "px";
          this.gamestate.currentSelectedPost.belowIndex = undefined;
          post.aboveIndex = undefined;
        }
      } else {
        svg.innerHTML = `<svg height="6" width="54">
            <line x1="0" y1="1" x2="54" y2="1" style="stroke:rgb(255,0,0);stroke-width:4" />
          </svg>`;
        if (post.myCol < this.gamestate.currentSelectedPost.myCol) {
          svg.style.top = selectableElement.offsetTop + document.body.scrollTop + 28 + "px";
          svg.style.left = selectableElement.offsetLeft + document.body.scrollLeft + 51 + "px";
          this.gamestate.currentSelectedPost.leftIndex = undefined;
          post.rightIndex = undefined;
        } else {
          svg.style.top = selectedElement.offsetTop + document.body.scrollTop + 28 + "px";
          svg.style.left = selectedElement.offsetLeft + document.body.scrollLeft + 51 + "px";
          this.gamestate.currentSelectedPost.rightIndex = undefined;
          post.leftIndex = undefined;
        }
      }
      svg.style.zIndex ='-1';
      this.renderer.appendChild(this.board.nativeElement, svg);
      this.checkForClosedPen(this.gamestate.currentSelectedPost.myCol + '-' + this.gamestate.currentSelectedPost.myRow, post.myCol + '-' + post.myRow);
      post.selectable = false;
      this.selectPost(this.gamestate.currentSelectedPost);
    } else if (post.aboveIndex || post.belowIndex || post.leftIndex || post.rightIndex ) {
      if (!this.gamestate.currentSelectedPost || post === this.gamestate.currentSelectedPost){
        if (post.selected) {
          this.gamestate.currentSelectedPost = undefined;
          post.selected = false;
          if (post.aboveIndex >= 0) {
            this.gamestate.posts[post.aboveIndex][post.myCol].selectable = false;
          }
          if (post.belowIndex) {
            this.gamestate.posts[post.belowIndex][post.myCol].selectable = false;
          }
          if (post.leftIndex >= 0) {
            this.gamestate.posts[post.myRow][post.leftIndex].selectable = false;
          }
          if (post.rightIndex) {
            this.gamestate.posts[post.myRow][post.rightIndex].selectable = false;
          }
        } else {
          this.gamestate.currentSelectedPost = post;
          post.selected = true;
          if (post.aboveIndex >= 0) {
            this.gamestate.posts[post.aboveIndex][post.myCol].selectable = true;
          }
          if (post.belowIndex) {
            this.gamestate.posts[post.belowIndex][post.myCol].selectable = true;
          }
          if (post.leftIndex >= 0) {
            this.gamestate.posts[post.myRow][post.leftIndex].selectable = true;
          }
          if (post.rightIndex) {
            this.gamestate.posts[post.myRow][post.rightIndex].selectable = true;
          }
        }
      }
    } else {
      post.selected = false;
      this.gamestate.currentSelectedPost = undefined;
    }
  }

  mouseEnter(post : Post){
    if (!this.gamestate.currentSelectedPost){ 
      if (post.aboveIndex || post.belowIndex || post.leftIndex || post.rightIndex){
        post.hover = true;
      }
    } else if (this.gamestate.currentSelectedPost.myCol == post.myCol) {
      if(this.gamestate.currentSelectedPost.aboveIndex === post.myRow || this.gamestate.currentSelectedPost.belowIndex === post.myRow){
        post.hover = true;
      }
    } else if (this.gamestate.currentSelectedPost.myRow == post.myRow) {
      if(this.gamestate.currentSelectedPost.leftIndex === post.myCol || this.gamestate.currentSelectedPost.rightIndex === post.myCol){
        post.hover = true;
      }
    }
  }

  mouseLeave(post : Post){
    post.hover = false;
  }

  checkForClosedPen(startPost: string, endPost: string) {
    let associatedPens = this.gamestate.availablePens.filter(pen => {
      if ((startPost === pen.topLeft || startPost === pen.topRight || startPost === pen.bottomLeft || startPost === pen.bottomRight) && 
        (endPost === pen.topLeft || endPost === pen.topRight || endPost === pen.bottomLeft || endPost === pen.bottomRight)) {
        return pen;
      }
    });
    associatedPens.forEach(pen => {
      if (!pen.closed){
        if ((pen.topLeft === startPost && pen.topRight === endPost) || (pen.topLeft === endPost && pen.topRight === startPost)){
          pen.topSelected = true;
        } else if ((pen.topLeft === startPost && pen.bottomLeft === endPost) || (pen.topLeft === endPost && pen.bottomLeft === startPost)){
          pen.leftSelected = true;
        } else if ((pen.topRight === startPost && pen.bottomRight === endPost) || (pen.topRight === endPost && pen.bottomRight === startPost)){
          pen.rightSelected = true;
        } else if ((pen.bottomLeft === startPost && pen.bottomRight === endPost) || (pen.bottomLeft === endPost && pen.bottomRight === startPost)){
          pen.bottomSelected = true;
        }
        if ( pen.topSelected && pen.leftSelected && pen.rightSelected && pen.bottomSelected ) {
          pen.closed = true;
        }
        if (pen.closed) {
          let topLeft = document.getElementById(pen.topLeft).parentElement;
          let penSquare = document.createElement('div');
          penSquare.style.top = topLeft.offsetTop + document.body.scrollTop + 37 + "px";
          penSquare.style.left = topLeft.offsetLeft + document.body.scrollLeft + 37.5 + "px";
          penSquare.style.position = 'absolute';
          penSquare.style.height = '80px';
          penSquare.style.width = '80px';
          penSquare.style.background = 'orange';
          penSquare.style.zIndex = '-1'
          this.renderer.appendChild(this.board.nativeElement, penSquare);
        }
      }
    });
    console.log('Associated Pens', associatedPens);
  }
}
