class Tile {
  constructor({
    domElement,
    value = 0,
    pos,
    isFlagged = false,
    isOpened = false,
    neighboringTiles = [],
  }) {
    this.domElement = domElement;
    this.value = value;
    this.pos = pos;
    this.isFlagged = isFlagged;
    this.isOpened = isOpened;
    this.neighboringTiles = neighboringTiles;
  }

  reset() {
    this.value = 0;
    this.isFlagged = false;
    this.isOpened = false;
  }
  resetNeighboringTiles() {
    this.neighboringTiles.length = 0;
  }

  print() {
    if (this.value) {
      this.domElement.removeAttribute('aria-label');
      this.domElement.textContent = this.value;
      this.domElement.dataset.type = this.getType();
    } else this.domElement.setAttribute('aria-label', 'empty tile');

    this.domElement.setAttribute('disabled', true);
    this.isOpened = true;
  }

  getType() {
    const data = new Map([
      [1, 'one'],
      [2, 'two'],
      [3, 'three'],
      [4, 'four'],
      [5, 'five'],
      [6, 'six'],
      [7, 'seven'],
      [8, 'eight'],
    ]);

    return data.get(this.value);
  }
}

export default Tile;
