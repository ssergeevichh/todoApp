function createELement(tag, props, ...children) {
    const element = document.createElement(tag);
    
    Object.keys(props).forEach(key => {
        if (key.startsWith('data-')) {
            element.setAttribute(key, props[key])
        } else {
            element[key] = props[key]
        }
    })

    children.forEach(child => {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.append(child)
    });

    return element
}

class EventEmitter {
    constructor() {
        this.events = {}
    }
    on(type, callback) {
        this.events[type] = this.events[type] || []
        this.events[type].push(callback)
    }
    emit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(arg))
        }
    }
}

export { createELement, EventEmitter }