import Tile from './Tile.js';
import Timer from './Timer.js';
import {getRandomArrayElement} from '../utils.js';
import {determineNumberNextToTheTail} from '../utils.js';

class Game {
  constructor({
    parentNode = document.body,
    sizes = [
      {width: 8, height: 8, mine: 10},
      {width: 16, height: 16, mine: 40},
      {width: 30, height: 16, mine: 99},
      {width: 4, height: 4, mine: 4, custom: true},
    ],
    maxsize = {width: 200, height: 200},
  }) {
    this.parentNode = parentNode;
    this.tiles = [];
    this.sizes = sizes;
    this.maxsize = maxsize;
    this.width = sizes[0].width;
    this.height = sizes[0].height;
    this.mine = sizes[0].mine;
    this.flag = 0;
    this.openTilesCount = 0;
    this.isDataReady = false;
    this.isGameOver = false;
    this.sounds = {
      startGame: new Audio('./sounds/start.mp3'),
      openTile: new Audio('./sounds/open.mp3'),
      flag: new Audio('./sounds/flag.mp3'),
      lose: new Audio('./sounds/lose.mp3'),
      win: new Audio('./sounds/win.mp3'),
    };
    this.currentSound = null;

    this.init();
  }

  getTilesElements() {
    return Array(this.width * this.height)
      .fill()
      .reduce((str, value, index) => {
        str =
          str +
          `<button class="tile" type='button' data-pos='${index}' aria-label="open tile at position ${
            index + 1
          }"></button>`;
        return str;
      }, '');
  }

  appendTiles() {
    if (this.tiles.length >= this.width * this.height) return;

    const buttonElements = new Array(this.width * this.height - this.tiles.length)
      .fill()
      .map((value, index) => {
        const button = document.createElement('button');
        button.className = 'tile';
        button.type = 'button';
        button.setAttribute('data-pos', this.tiles.length + index);
        button.setAttribute('aria-label', `open tile at position ${this.tiles.length + index + 1}`);
        return button;
      });

    document.querySelector('.field__tiles').append(...buttonElements);
  }

  getSizesButtonsElements() {
    return this.sizes.reduce((str, size) => {
      const width = size.custom ? `?` : size.width;
      const height = size.custom ? `?` : size.height;
      const dataType = size.custom ? 'data-type="custom"' : '';
      const disabled = size.custom ? `disabled` : '';
      str =
        str +
        `<button class='sizes-container__button' ${dataType} type='button' role='radio' data-width=${
          size.width
        } data-height=${size.height} data-mine=${size.mine} aria-checked='${
          size.width === this.width && size.height === this.height
        }' ${disabled}>${width} × ${height}</button>`;
      return str;
    }, '');
  }

  createDomElement() {
    this.domElement = document.createElement('main');
    this.domElement.className = 'app';
    this.domElement.innerHTML = `<h1 class='title'>Сапёр</h1>\
    <article class="scoreboard" aria-label='scoreboard'>\
    <div class='scoreboard__score'>\
    <div class="scoreboard__flag flag"><span class="flag__icon"></span><span class="flag__count">0</span></div>\
    <div class="scoreboard__mine mine"><span class="mine__icon"></span><span class="mine__count">0</span></div>\
    </div>\
    <button class='scoreboard__start-button' title='new game' data-type='start' type='button' disabled>&#9786;</button>\
    <span class="scoreboard__time"></span>\
    </article>\
    <article class='field' aria-label='field'>\
    <div class='field__tiles'>${this.getTilesElements()}</div>\
    </article>\
    <div class="sizes-container">${this.getSizesButtonsElements()}</div>\
    <form action='#'>\
    <fieldset class='settings'>\
    <legend>Размеры поля</legend>\
    <label for='width'>ширина:<input class='settings__input' type='number' id='width' min='4' max='${
      this.maxsize.width
    }' value='4'/></label>\
    <label for='height'>высота:<input class='settings__input' type='number' id='height' min='4' max='${
      this.maxsize.height
    }' value='4'/></label>\
    <label for='mine'>мины:<input class='settings__input' type='number' id='mine' min='1' max='15' value='4'/></label>\
    </fieldset>\
    </form>`;

    return this;
  }

  renderTo(parentNode) {
    parentNode.append(this.domElement);

    return this;
  }

  setFlag(tile) {
    tile.isFlagged = true;
    document.querySelector(`.tile[data-pos="${tile.pos}"]`).setAttribute('aria-label', 'flag');
    this.flag += 1;
    this.setFlagCount();
  }

  deleteFlag(tile) {
    document
      .querySelector(`.tile[data-pos="${tile.pos}"]`)
      .setAttribute('aria-label', `open tile at position ${tile.pos + 1}`); // заменить
    tile.isFlagged = false;
    this.flag -= 1;
    this.setFlagCount();
  }

  setFlagCount() {
    document.querySelector('.flag__count').textContent = this.flag;
  }

  setMineCount() {
    document.querySelector('.mine__count').textContent = this.mine;
  }

  clear() {
    document.querySelectorAll(`.tile`).forEach((tile, index) => {
      //установить ограничение на кол-во элементов в зависимости от размера поля
      tile.removeAttribute('disabled');
      tile.removeAttribute('data-type');
      tile.setAttribute('aria-label', `open tile at position ${index + 1}`);
      tile.removeAttribute('data-state');
      tile.textContent = '';
    });
    this.isDataReady = false;
    this.isGameOver = false;
    this.openTilesCount = 0;
    this.flag = 0;
    this.timer.stop();
  }

  sound(type) {
    if (this.currentSound && this.currentSound.playing) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
    }
    const playPromise = this.sounds[type].play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          this.currentSound.playing = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    this.currentSound = this.sounds[type];
    this.currentSound.playing = false;
  }

  end({result = false, tile}) {
    let message = '☹';

    if (result) {
      message = '😎';
      this.sound('win');
    }
    this.timer.stop();
    document.querySelector('.scoreboard__start-button').textContent = message;

    if (!result) {
      this.sound('lose');

      this.tiles.forEach(({value, isFlagged, domElement}) => {
        if (value === 'mine') {
          if (!isFlagged) {
            domElement.setAttribute('aria-label', 'mine');
            domElement.setAttribute('disabled', 'disabled');
          }
        } else if (isFlagged) {
          domElement.setAttribute('aria-label', 'no mine here');
          domElement.removeAttribute('data-type');
          domElement.textContent = '';
          domElement.dataset.state = 'incorrect';
          domElement.setAttribute('disabled', 'disabled');
        }
      });
      tile.domElement.dataset.state = 'incorrect';
    }

    this.isGameOver = true;
  }

  printTile(tile) {
    tile.print();
    if (tile.isFlagged) this.deleteFlag(tile);
    this.openTilesCount += 1;
    if (this.openTilesCount + this.mine === this.width * this.height) {
      this.end({result: true, tile});
    }
  }

  openTile(tile) {
    const {value, isOpened} = tile;
    if (isOpened) return;

    if (value === 'mine') {
      this.end({tile});

      return;
    }

    this.sound('openTile');

    if (value === 0) {
      const processingTiles = new Set([tile]);

      for (let tile of processingTiles) {
        const {pos, isOpened} = tile;

        if (isOpened) {
          processingTiles.delete(tile);

          continue;
        }

        if (!tile.neighboringTiles.length) {
          determineNumberNextToTheTail(pos, {width: this.width, height: this.height}).forEach(
            (index) => {
              tile.neighboringTiles.push(this.tiles[index]);
            },
          );
        }

        this.printTile(tile);
        processingTiles.delete(tile);

        tile.neighboringTiles.forEach((tile) => {
          if (tile.value !== 0 && !tile.isOpened) {
            this.printTile(tile);
          } else if (tile.value === 0 && !tile.isOpened) {
            processingTiles.add(tile);
          }
        });
      }

      return;
    }
    this.printTile(tile);
  }

  addMines(count = this.mine, except) {
    let minesNumber = 0;

    while (minesNumber < count) {
      const randomPosition = getRandomArrayElement(
        new Array(this.width * this.height).fill().map((x, i) => i),
      );

      if (this.tiles[randomPosition].value !== 'mine' && randomPosition !== except) {
        this.tiles[randomPosition].value = 'mine';
        minesNumber += 1;

        if (!this.tiles[randomPosition].neighboringTiles.length) {
          determineNumberNextToTheTail(randomPosition, {
            width: this.width,
            height: this.height,
          }).forEach((index) => {
            this.tiles[randomPosition].neighboringTiles.push(this.tiles[index]);
          });
        }
        this.tiles[randomPosition].neighboringTiles.forEach((tile) => {
          if (tile.value !== 'mine') {
            tile.value += 1;
          }
        });
      }
    }
  }

  onContextmenuHandler() {
    document.querySelector('.app').addEventListener('contextmenu', (event) => {
      const {target} = event;

      if (this.isGameOver) return;

      if (target.classList.contains('tile') && !target.hasAttribute('disabled')) {
        const index = Number(target.dataset.pos);
        event.preventDefault();

        if (this.tiles[index].isFlagged === true) {
          this.deleteFlag(this.tiles[index]);
        } else {
          this.setFlag(this.tiles[index]);
          this.sound('flag');
        }
      }
    });
  }

  onClickHandler() {
    document.querySelector('.app').addEventListener('click', (event) => {
      const {target} = event;

      if (target.dataset.type === 'start') {
        this.clear();
        this.start();
        this.sound('startGame');

        return;
      }

      if (target.classList.contains('sizes-container__button')) {
        const width = Number(target.dataset.width);
        const height = Number(target.dataset.height);
        const mine = Number(target.dataset.mine);

        if (target.getAttribute('aria-checked') === 'true') return;

        this.clear();
        this.setSize({
          width,
          height,
          mine,
        });
        this.start();
        this.sound('startGame');
        target.setAttribute('aria-checked', true);
        this.tiles[this.width * this.height - 1].domElement.setAttribute('data-location', 'last');
      }

      if (this.isGameOver) return;

      if (target.classList.contains('tile') && !this.tiles[Number(target.dataset.pos)].isFlagged) {
        const index = Number(target.dataset.pos);
        if (!this.isDataReady && this.tiles[index].value === 'mine') {
          this.tiles[index].neighboringTiles.forEach((tile) => {
            if (tile.value !== 'mine') tile.value -= 1;
          });
          this.tiles[index].value = this.tiles[index].neighboringTiles.filter(
            (tile) => tile.value === 'mine',
          ).length;

          this.addMines(1, index);
        }

        this.isDataReady = true;
        document.querySelector('.scoreboard__start-button').removeAttribute('disabled');
        this.timer.start();
        this.openTile(this.tiles[index]);
      }
    });
  }

  onInputHandler() {
    document.querySelectorAll('.settings__input').forEach((x) =>
      x.addEventListener('input', (event) => {
        const {target} = event;

        const size = this.sizes.find((size) => size.custom);

        let value = Number(target.value);
        if (value < Number(target.min)) {
          value = Number(target.min);
        }
        if (value > Number(target.max)) {
          value = Number(target.max);
        }

        size[`${target.id}`] = value;

        if (target.id !== 'mine') {
          const max = size.width * size.height - 1;
          const mine =
            Number(document.getElementById('mine').value) < max
              ? Number(document.getElementById('mine').value)
              : max;
          size.mine = mine;
          document.getElementById('mine').setAttribute('max', max);
          document
            .querySelector('.sizes-container__button[data-type="custom"]')
            .setAttribute('data-mine', mine);
        }

        document
          .querySelector('.sizes-container__button[data-type="custom"]')
          .setAttribute(`data-${target.id}`, value);
        document.querySelector(
          '.sizes-container__button[data-type="custom"]',
        ).textContent = `${size.width} × ${size.height}`;
        if (
          document
            .querySelector('.sizes-container__button[data-type="custom"]')
            .hasAttribute('disabled')
        )
          document
            .querySelector('.sizes-container__button[data-type="custom"]')
            .removeAttribute('disabled');
        document
          .querySelector('.sizes-container__button[data-type="custom"]')
          .setAttribute('aria-checked', false);
      }),
    );
  }

  createTiles() {
    if (this.tiles.length >= this.width * this.height) return;

    const tiles = new Array(this.width * this.height - this.tiles.length).fill().map(
      (tile, index) =>
        new Tile({
          domElement: document.querySelector(`.tile[data-pos="${this.tiles.length + index}"]`),
          pos: this.tiles.length + index,
        }),
    );
    this.tiles.push(...tiles);
  }

  addSizesForContainer() {
    document.querySelector('.field__tiles').style.setProperty('--width', this.width);
    document.querySelector('.field__tiles').style.setProperty('--height', this.height);
  }

  setSize({width = this.width, height = this.height, mine = this.mine}) {
    this.width = width;
    this.height = height;
    this.mine = mine;
    this.tiles.slice(0, this.width * this.height).forEach((tile) => tile.resetNeighboringTiles());
    if (document.querySelector('.tile[data-location="last"]'))
      document.querySelector('.tile[data-location="last"]').removeAttribute('data-location');
    this.addSizesForContainer();
    this.appendTiles();
    if (document.querySelector('.sizes-container__button[aria-checked="true"]'))
      document
        .querySelector('.sizes-container__button[aria-checked="true"]')
        .setAttribute('aria-checked', false);
  }

  start() {
    document.querySelector('.scoreboard__start-button').setAttribute('disabled', 'disabled');
    this.createTiles();
    this.timer.show();
    this.setFlagCount();
    this.setMineCount();
    this.tiles.slice(0, this.width * this.height).forEach((tile) => tile.reset());
    this.addMines();
    document.querySelector('.scoreboard__start-button').textContent = '☺';
  }

  init() {
    this.createDomElement().renderTo(this.parentNode);
    this.timer = new Timer({
      parentNode: document.querySelector('.scoreboard__time'),
    });
    this.onClickHandler();
    this.onContextmenuHandler();
    this.addSizesForContainer();
    this.start();
    this.onInputHandler();
  }
}

export default Game;
