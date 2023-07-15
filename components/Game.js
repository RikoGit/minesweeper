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
      {width: 0, height: 0, mine: 1, type: 'submit', disabled: true},
    ],
    minsize = {width: 4, height: 4},
    maxsize = {width: 200, height: 200},
  }) {
    this.parentNode = parentNode;
    this.tiles = [];
    this.sizes = sizes;
    this.minsize = minsize;
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

  getSizesButtonsElement({width, height, mine, type = 'button', disabled = false}) {
    return `<button class='sizes-container__button' type=${type} role='radio'\
     data-width=${width} data-height=${height} data-mine=${mine} aria-checked='${
      width === this.width && height === this.height
    }' ${disabled ? 'disabled' : ''}>\
    <span class='sizes-container__size'>${width ? width : '?'} × ${height ? height : '?'}</span>\
    <span class="sizes-container__mine mine">\
      <span class="mine__icon"></span>\
      <span class="mine__count">${mine}</span>\
    </span></button>`;
  }

  createDomElement() {
    this.domElement = document.createElement('main');
    this.domElement.className = 'app';
    this.domElement.innerHTML = `<h1 class='title'>Сапёр</h1>\
    <article class="scoreboard" aria-label='scoreboard'>\
      <div class='scoreboard__score'>\
        <div class="scoreboard__flag flag">\
          <span class="flag__icon"></span><span class="flag__count">0</span>\
        </div>\
        <div class="scoreboard__mine mine">\
          <span class="mine__icon"></span><span class="mine__count">0</span>
        </div>\
      </div>\
      <button class='scoreboard__start-button' title='new game' data-type='start' type='button' disabled>&#9786;</button>\
      <span class="scoreboard__time"></span>\
    </article>\
    <article class='field' aria-label='field'>\
      <div class='field__tiles'>${this.getTilesElements()}</div>\
    </article>\
    <div class="sizes-container">${this.sizes
      .filter((size) => size.type !== 'submit')
      .reduce((str, size) => {
        str += this.getSizesButtonsElement(size);
        return str;
      }, '')}</div>\
    <form class='settings-container' action='#'>\
      <fieldset class='settings'>\
        <legend>Размеры поля</legend>\
        <label class='settings__label' for='width'>ширина:<div class="settings__input-container">\
          <input class='settings__input' type='number' id='width' min='${
            this.minsize.width
          }' max='${this.maxsize.width}' value=''/>
          <span class='settings__error'>от ${this.minsize.width} до ${this.maxsize.width}</span>\
          </div></label>\
        <label class='settings__label' for='height'>высота:<div class="settings__input-container">\
          <input class='settings__input' type='number' id='height' min='${
            this.minsize.width
          }' max='${this.maxsize.height}' value=''/><span class='settings__error'>от ${
      this.minsize.width
    } до ${this.maxsize.width}</span></div></label>\
        <label class='settings__label' for='mine'>мины:<div class="settings__input-container">\
          <input class='settings__input' type='number' id='mine' min='1' max='${
            this.maxsize.width * this.maxsize.height - 1
          }' value=''/>\
          <span class='settings__error'>от 1 до 15</span>\
          </div></label>\
    ${this.getSizesButtonsElement(this.sizes.find((size) => size.type === 'submit'))}\
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

  playAudio(audio) {
    if (this.currentSound && this.currentSound.playing) {
      this.currentSound.pause();
      this.currentSound.currentTime = 0;
    }
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          this.currentSound.playing = true;
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    this.currentSound = audio;
    this.currentSound.playing = false;
  }

  end({result = false, tile}) {
    let message = '☹';

    if (result) {
      message = '😎';
      this.playAudio(this.sounds.win);
    }
    this.timer.stop();
    document.querySelector('.scoreboard__start-button').textContent = message;

    if (!result) {
      this.playAudio(this.sounds.lose);
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

    this.playAudio(this.sounds.openTile);

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
          this.playAudio(this.sounds.flag);
        }
      }
    });
  }

  onClickHandler() {
    document.querySelector('.app').addEventListener('click', (event) => {
      let {target} = event;

      while (target.parentNode != null) {
        if (target.dataset.type === 'start') {
          this.clear();
          this.start();
          this.playAudio(this.sounds.startGame);

          return;
        }

        if (target.classList.contains('sizes-container__button')) {
          event.preventDefault();
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
          this.playAudio(this.sounds.startGame);
          target.setAttribute('aria-checked', true);
          this.tiles[this.width * this.height - 1].domElement.setAttribute('data-location', 'last');

          return;
        }

        if (
          !this.isGameOver &&
          target.classList.contains('tile') &&
          !this.tiles[Number(target.dataset.pos)].isFlagged
        ) {
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

        target = target.parentNode;
      }
    });
  }

  onInputHandler() {
    const submitButton = document.querySelector('.sizes-container__button[type="submit"]');

    document.querySelectorAll('.settings__input').forEach((x) =>
      x.addEventListener('input', (event) => {
        const {target} = event;
        const labelElement = document.querySelector(`.settings__label[for=${target.id}]`);
        const mineInputElement = document.getElementById('mine');
        const size = this.sizes.find((size) => size.type === 'submit');
        let value = Number(target.value);
        let mineInputElementValue = Number(mineInputElement.value);

        if (value < Number(target.min)) {
          labelElement.setAttribute('data-state', 'error');
          value = Number(target.min);
        } else if (value > Number(target.max)) {
          labelElement.setAttribute('data-state', 'error');
          value = Number(target.max);
        } else labelElement.setAttribute('data-state', 'correct');
        size[`${target.id}`] = value;

        submitButton.setAttribute(`data-${target.id}`, value);

        if (
          target.id !== 'mine' &&
          Number(submitButton.dataset.width) &&
          Number(submitButton.dataset.height)
        ) {
          const max = size.width * size.height - 1;
          let mine = size.mine;

          if (mineInputElementValue < 1) {
            mine = 1;
          } else if (mineInputElementValue > max) {
            mine = max;
          } else mine = mineInputElementValue;
          size.mine = mine;
          mineInputElement.setAttribute('max', max);
          submitButton.setAttribute('data-mine', mine);
          document.querySelector(
            'label[for="mine"] .settings__error',
          ).textContent = `от 1 до ${max}`;
          submitButton.querySelector('.mine__count').textContent = `${size.mine}`;
        }

        if (target.id === 'mine') {
          submitButton.querySelector('.mine__count').textContent = `${size.mine}`;
        } else {
          submitButton.querySelector('.sizes-container__size').textContent = `${
            size.width ? size.width : '?'
          } × ${size.height ? size.height : '?'}`;
        }

        if (
          Number(submitButton.dataset.width) &&
          Number(submitButton.dataset.height) &&
          submitButton.hasAttribute('disabled')
        )
          submitButton.removeAttribute('disabled');
        submitButton.setAttribute('aria-checked', false);
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
