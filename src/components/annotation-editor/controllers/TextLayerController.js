import EventBus from "../../EventBus";

// a Controller Class
class TextLayerController {
    constructor(textLayerElement) {
        this.textLayerElement = textLayerElement;
        this.textLayerElement.tabIndex = 0;

        // Register a global Eventbus if it doesn't already exist & Register Events Upon it (this allows other layers to communicate)
        window.annotationEventBus = window.annotationEventBus || new EventBus();

        // Assign EventHandlers onto the text-layer Element
        this.textLayerElement.addEventListener('mousedown',(event) => {
            // Do any pop-ups needed etc

            // Redispatch the Event to any listeners
            annotationEventBus.redispatchEvent(event.name,event);
        });

        this.textLayerElement.addEventListener('mouseup',(event) => {
            // Do any pop-ups needed etc

            // Redispatch the Event to any listeners
            annotationEventBus.redispatchEvent(event.name,event);
        });

        this.textLayerElement.addEventListener('mousemove',(event) => {
            // Do any pop-ups needed etc

            // Redispatch the Event to any listeners
            annotationEventBus.redispatchEvent(event.name,event);
        });

        this.textLayerElement.addEventListener('keydown',(event) => {
            // Do any pop-ups needed etc

            // Redispatch the Event to any listeners
            annotationEventBus.redispatchEvent(event.name,event);
        });
    }

}

export default TextLayerController;
