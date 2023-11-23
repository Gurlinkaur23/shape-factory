class Shape {
  _name;
  _color;

  constructor(name, color) {
    this._name = name;
    this._color = color;
  }

  get name() {
    return this._name;
  }

  get color() {
    return this._color;
  }

  getInfo() {
    return `${this._color} ${this._name}`;
  }
}

export default Shape;
