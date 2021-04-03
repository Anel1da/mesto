export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data
        this._render = renderer
        this._container = document.querySelector(containerSelector)
    }


    renderItems() {
        this._renderedItems.forEach(item => this._render(item))

    }

    addItem(element) {
        this._container.append(element)
    }

    clear() {
        this._container.innerHTML = ''
    }

}