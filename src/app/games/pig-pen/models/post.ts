import { Injectable } from "@angular/core";

export class Post {
    selectable: boolean = false;
    selected: boolean = false;
    hover: boolean = false;
    aboveIndex?: number;
    belowIndex?: number;
    rightIndex?: number;
    leftIndex?: number;
    myRow: number;
    myCol: number;
    constructor(row, col) {
        this.myCol = col;
        this.myRow = row;
    }
}