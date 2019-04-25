import Positions from './Positions';

class ResizeHandle {
    constructor(parentRectangle, position){
        this.parentRectangle = parentRectangle;
        this.position = position;
        this.x = 0;
        this.y = 0;
        this.size = 5;
        this.color = '#bf3f3f';
    }
    draw(context){
        const half = this.size / 2;
        switch(this.position){
            case Positions.TOP_LEFT:
                this.x = this.parentRectangle.x - half;
                this.y = this.parentRectangle.y - half;
                break;
            case Positions.TOP_MIDDLE:
                this.x = this.parentRectangle.x + this.parentRectangle.width / 2 - half;
                this.y = this.parentRectangle.y - half;
                break;
            case Positions.TOP_RIGHT:
                this.x = this.parentRectangle.x + this.parentRectangle.width - half;
                this.y = this.parentRectangle.y - half;
                break;
            case Positions.MIDDLE_LEFT:
                this.x = this.parentRectangle.x - half;
                this.y = this.parentRectangle.y + this.parentRectangle.height / 2 - half;
                break;
            case Positions.MIDDLE_RIGHT:
                this.x = this.parentRectangle.x + this.parentRectangle.width - half;
                this.y = this.parentRectangle.y + this.parentRectangle.height / 2 - half;
                break;
            case Positions.BOTTOM_LEFT:
                this.x = this.parentRectangle.x - half;
                this.y = this.parentRectangle.y + this.parentRectangle.height - half;
                break;
            case Positions.BOTTOM_MIDDLE:
                this.x = this.parentRectangle.x + this.parentRectangle.width / 2 - half;
                this.y = this.parentRectangle.y + this.parentRectangle.height - half;
                break;
            case Positions.BOTTOM_RIGHT:
                this.x = this.parentRectangle.x + this.parentRectangle.width - half;
                this.y = this.parentRectangle.y + this.parentRectangle.height - half;
                break;
            default:
                this.x = 0;
                this.y = 0;
        }

        context.fillStyle = this.color;
        context.globalAlpha = 1;
        context.fillRect(this.x,this.y,this.size,this.size);
    }
}

export default ResizeHandle;
