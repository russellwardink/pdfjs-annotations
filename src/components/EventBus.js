class EventBus {
    constructor() {
        this.bus = document.createElement('ProxyElement');
    }

    addEventListener(event, callback) {
        this.bus.addEventListener(event, callback);
    }

    removeEventListener(event, callback) {
        this.bus.removeEventListener(event, callback);
    }

    dispatchEvent(event, detail = {}) {
        this.bus.dispatchEvent(new CustomEvent(event, { detail }));
    }

    redispatchEvent(eventName, event) {
        const clonedEvent = new event.constructor(event.type, event);
        this.bus.dispatchEvent(clonedEvent);
    }
}

export default EventBus;
