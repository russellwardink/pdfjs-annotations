import AnnotationCanvasClickHandler from '../event-handlers/AnnotationCanvasClickHandler';
import Rectangle from "../models/Rectangle";
import EventBus from "../../EventBus";

class AnnotationCanvasController {
    constructor(canvas){
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        // Redraw on Initial Loading
        this.redraw = true;

        // Keep a collection of annotations on the canvas
        this.annotations = [];

        // Register a global Event bus & Events Upon it (this allows other layers to trigger events)
        window.annotationEventBus = window.annotationEventBus || new EventBus();

        this.eventHandler = new AnnotationCanvasClickHandler(this);

        const canvasController = this;
        annotationEventBus.addEventListener('mousedown', (event) => {
            canvasController.eventHandler.onMouseDown(event);
        });
        annotationEventBus.addEventListener('mouseup', (event) => {
            canvasController.eventHandler.onMouseUp(event);
        });
        annotationEventBus.addEventListener('mousemove', (event) => {
            canvasController.eventHandler.onMouseMove(event);
        });
        annotationEventBus.addEventListener('keydown', (event) => {
            canvasController.eventHandler.onKeyDown(event);
        });

        // Keep state of whether we are dragging or resizing the shape of an annotation
        this.isMovingAnnotation = false;
        this.isResizingAnnotation = false;
        // Keep the state of which selectionHandle was chosen
        this.selectedResizeHandle = -1;
    }

    watch() {
        setInterval(() => this.draw(),20);
    }

    draw() {
        if(this.redraw){
            // Clear the existing Canvas
            this.context.clearRect(0,0, this.canvas.width, this.canvas.height);

            let that = this;
            this.annotations.forEach(function(annotation){
                annotation.draw(that.context);
            });
        }

        this.redraw = false;
    }

    addAnnotation(x,y,width,height,color){
        const rectangle = new Rectangle(x,y, width,height,color);
        this.annotations.push(rectangle);
        this.invalidateCanvas();

        rectangle.select();
        return rectangle;
    }

    removeAnnotation(annotation) {
        this.annotations = this.annotations.filter((item) => {
            return item !== annotation;
        })
    }

    invalidateCanvas() {
        this.redraw = true;
    }
}
export default AnnotationCanvasController;
