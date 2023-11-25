import { queryElement } from "../utils/helpers.js";

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = Promise.resolve(items);
    this._renderer = renderer;
    this._container = queryElement(containerSelector);
  }

  async renderItems() {
    const items = await this._items;
    items.forEach((item) => this._renderer(item));
  }

  prependItem(item) {
    this._container.prepend(item);
  }
}
