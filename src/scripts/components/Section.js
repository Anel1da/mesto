export default class Section {
    constructor({ renderer, containerSelector }) {
        this._render = renderer
        this._container = document.querySelector(containerSelector)
    }


    renderItems(items) {
        items.reverse()
        items.forEach(item => this._render(item))

    }

    addItem(element) {
        this._container.prepend(element)

    }

    clear() {
        this._container.innerHTML = ''
    }

}