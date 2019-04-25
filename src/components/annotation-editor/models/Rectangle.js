import Positions from './Positions' ;
import ResizeHandle from "./ResizeHandle";

class Rectangle {
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.selected = false;
        this.selectionHandles= [];
    }

    select() {
        this.selected = true;
    }

    deselect(){
        this.selected = false;
        this.selectionHandles = [];
    }

    // Let's let the rectangle draw itself
    draw(context){
        context.fillStyle = this.color;
        context.globalAlpha = 0.3;
        context.fillRect(this.x,this.y,this.width,this.height);

        if(this.selected){
            context.strokeStyle = '#CC0000';
            context.lineWidth = 2;
            context.strokeRect(this.x,this.y,this.width,this.height);

            this.selectionHandles = [];
            this.selectionHandles.push(new ResizeHandle(this,Positions.TOP_LEFT));
            this.selectionHandles.push(new ResizeHandle(this,Positions.TOP_MIDDLE));
            this.selectionHandles.push(new ResizeHandle(this,Positions.TOP_RIGHT));
            this.selectionHandles.push(new ResizeHandle(this,Positions.MIDDLE_LEFT));
            this.selectionHandles.push(new ResizeHandle(this,Positions.MIDDLE_RIGHT));
            this.selectionHandles.push(new ResizeHandle(this,Positions.BOTTOM_LEFT));
            this.selectionHandles.push(new ResizeHandle(this,Positions.BOTTOM_MIDDLE));
            this.selectionHandles.push(new ResizeHandle(this,Positions.BOTTOM_RIGHT));

            this.selectionHandles.forEach(function(handle) {
                handle.draw(context);
            });
        } else {
            this.selectionHandles = [];
        }
    };
}

export default Rectangle;

