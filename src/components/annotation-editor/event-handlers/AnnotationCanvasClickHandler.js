import Positions from '../models/Positions';

class AnnotationCanvasClickHandler{
    constructor(canvasController){
        this.canvasController = canvasController;
    }

    // Obtain the true Coordinates within the context of the Canvas and taking into account scrolling
    getTrueCoordinates(x, y) {
        let offsetX = 0;
        let offsetY = 0;

        let element = this.canvasController.canvas;
        const stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(element, null)['paddingLeft'], 10)     || 0;
        const stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(element, null)['paddingTop'], 10)      || 0;
        const styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(element, null)['borderLeftWidth'], 10) || 0;
        const styleBorderTop   = parseInt(document.defaultView.getComputedStyle(element, null)['borderTopWidth'], 10)  || 0;


        if (element.offsetParent) {
            do {
                offsetX += element.offsetLeft;
                offsetY += element.offsetTop;
            } while ((element = element.offsetParent));
        }

        // Add padding and border style widths to offset
        offsetX += stylePaddingLeft;
        offsetY += stylePaddingTop;

        offsetX += styleBorderLeft;
        offsetY += styleBorderTop;

        return {
            x: (x + scrollX) - offsetX,
            y: (y + scrollY) - offsetY,
        }
    }

    onMouseDown(e){
     const coordinates = this.getTrueCoordinates(e.x,e.y);
        const x = coordinates.x;
        const y = coordinates.y;

        console.log('i was just clicked');

        // If we have selected one of the resize handles, let's tell it we're resizing and not moving
        this.canvasController.annotations.forEach((element) => {
            if(element.selected) {
                element.selectionHandles.forEach((handle) => {
                    if (x >= handle.x && x <= handle.x + handle.size &&
                        y >= handle.y && y <= handle.y + handle.size) {
                        // we found one!
                        this.canvasController.isMovingAnnotation = false;
                        this.canvasController.isResizingAnnotation = true;
                        this.canvasController.selectedResizeHandle = handle.position;
                        console.log('Found a Resize handler at ' + x + ' ' + y + ' Position: ' + handle.position);
                    }
                });
            }
        });

        // If we object detect an Annotation, let's select it
        if(!this.canvasController.isResizingAnnotation)  {
            this.canvasController.annotations.forEach((element) => {
                if(y >= element.y && y <= element.y + element.height && x >= element.x && x <= element.x + element.width) {
                    element.select();
                    this.canvasController.isMovingAnnotation = true;
                    console.log('Found a Annotation at ' + x + ' ' + y);
                } else {
                    element.deselect();
                }
            });
            this.canvasController.invalidateCanvas();
        }

        // Create a new annotation
        if(e.shiftKey) {
            console.log('Creating a New Annotation at: ' + coordinates.x + ' ' + coordinates.y);

            this.canvasController.addAnnotation(coordinates.x,coordinates.y,100,40,'#ffff00');
        }

    }

    onMouseUp(e){
        this.canvasController.isMovingAnnotation = false;
        this.canvasController.isResizingAnnotation = false;
        this.canvasController.selectedResizeHandle = -1;

        // Handle Text Selection
        if(window.getSelection) {
            const selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                const range = selection.getRangeAt(0).cloneRange();

                if(range.getClientRects){
                    const rectangles = range.getClientRects();
                    for(let i = 0; i < rectangles.length; i++) {
                        let rect = rectangles[i];
                        const width = rect.right - rect.left;
                        const height = rect.bottom - rect.top;
                        let coordinates = this.getTrueCoordinates(rect.x,rect.y);
                        if(confirm('Are you sure you want to make an annotation')){
                            this.canvasController.addAnnotation(coordinates.x, coordinates.y, width, height, '#ffff00');
                        } else {
                            return;
                        }
                    }

                        console.log('removing selected text');
                        const selectedText = window.getSelection();
                        selectedText.removeAllRanges();
                }
            }
        }

        this.canvasController.invalidateCanvas();
    }

    onMouseMove(e){
        const coordinates = this.getTrueCoordinates(e.x,e.y);
        const x = coordinates.x;
        const y = coordinates.y;

        let selectedAnnotation;

        this.canvasController.annotations.forEach((element) => {
            if(element.selected) {
                selectedAnnotation = element;
            }
        });

        if(selectedAnnotation){
            console.log('removing selected text');
            const selectedText = window.getSelection();
            selectedText.removeAllRanges();

            if(this.canvasController.isMovingAnnotation) {
                selectedAnnotation.x = x;
                selectedAnnotation.y = y;
            } else if(this.canvasController.isResizingAnnotation) {
                switch (this.canvasController.selectedResizeHandle) {
                    case Positions.TOP_LEFT:
                        selectedAnnotation.width += selectedAnnotation.x - x;
                        selectedAnnotation.height += selectedAnnotation.y - y;
                        selectedAnnotation.x = x;
                        selectedAnnotation.y = y;
                        break;

                    case Positions.TOP_MIDDLE:
                        selectedAnnotation.height += selectedAnnotation.y - y;
                        selectedAnnotation.y = y;
                        break;

                    case Positions.TOP_RIGHT:
                        selectedAnnotation.width = x - selectedAnnotation.x;
                        selectedAnnotation.height += selectedAnnotation.y - y;
                        selectedAnnotation.y = y;
                        break;

                    case Positions.MIDDLE_LEFT:
                        selectedAnnotation.width += selectedAnnotation.x - x;
                        selectedAnnotation.x = x;
                        break;

                    case Positions.MIDDLE_RIGHT:
                        selectedAnnotation.width = x - selectedAnnotation.x;
                        break;

                    case Positions.BOTTOM_LEFT:
                        selectedAnnotation.width += selectedAnnotation.x - x;
                        selectedAnnotation.height = y - selectedAnnotation.y;
                        selectedAnnotation.x = x;
                        break;

                    case Positions.BOTTOM_MIDDLE:
                        selectedAnnotation.height = y - selectedAnnotation.y;
                        break;

                    case Positions.BOTTOM_RIGHT:
                        selectedAnnotation.width =  x - selectedAnnotation.x;
                        selectedAnnotation.height = y - selectedAnnotation.y;
                        break;
                }
            }
            this.canvasController.invalidateCanvas();
        }
    }

    onKeyDown(e) {
        if (e.keyCode === 8 || e.keyCode === 46 ) {
            console.log('BACKSPACE / DELETE was pressed');
            this.canvasController.annotations.forEach((element) => {
                if(element.selected){
                    this.canvasController.removeAnnotation(element);
                    this.canvasController.invalidateCanvas();
                }
            });
        }
    }

}

export default AnnotationCanvasClickHandler;



