export default class Section {
  constructor({
    items,
    renderer }, boxSelector) {
      this._renderedItems = items;
      this._renderer = renderer;
      this._container = document.querySelector(boxSelector);
  }
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem() {
    this._container.append(element);
  }
}
