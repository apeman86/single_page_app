export class Pen {
    public topLeft: string;
    public bottomLeft: string;
    public topRight: string;
    public bottomRight: string;
    public topSelected: boolean;
    public leftSelected: boolean;
    public bottomSelected: boolean;
    public rightSelected: boolean;
    public closed: boolean = false;

    constructor(topLeft, bottomLeft, topRight, bottomRight){
        this.topLeft = topLeft;
        this.bottomLeft = bottomLeft;
        this.topRight = topRight;
        this.bottomRight = bottomRight;
    }
}