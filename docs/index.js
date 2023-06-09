/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/Game.js":
/*!****************************!*\
  !*** ./components/Game.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Tile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tile.js */ \"./components/Tile.js\");\n/* harmony import */ var _Timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timer.js */ \"./components/Timer.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ \"./utils.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\n\n\n\nvar Game = /*#__PURE__*/function () {\n  function Game(_ref) {\n    var _ref$parentNode = _ref.parentNode,\n      parentNode = _ref$parentNode === void 0 ? document.body : _ref$parentNode,\n      _ref$sizes = _ref.sizes,\n      sizes = _ref$sizes === void 0 ? [{\n        width: 8,\n        height: 8,\n        mine: 10\n      }, {\n        width: 16,\n        height: 16,\n        mine: 40\n      }, {\n        width: 30,\n        height: 16,\n        mine: 99\n      }, {\n        width: 4,\n        height: 4,\n        mine: 4,\n        custom: true\n      }] : _ref$sizes;\n    _classCallCheck(this, Game);\n    this.parentNode = parentNode;\n    this.tiles = [];\n    this.sizes = sizes;\n    this.width = sizes[0].width;\n    this.height = sizes[0].height;\n    this.mine = sizes[0].mine;\n    this.flag = 0;\n    this.openTilesCount = 0;\n    this.isDataReady = false;\n    this.isGameOver = false;\n    this.init();\n  }\n  _createClass(Game, [{\n    key: \"getTilesElements\",\n    value: function getTilesElements(size) {\n      return Array(size * size).fill().reduce(function (str, value, index) {\n        str = str + \"<button class=\\\"tile\\\" type='button' data-pos='\".concat(index, \"' aria-label=\\\"open tile at position \").concat(index + 1, \"\\\"></button>\");\n        return str;\n      }, '');\n    }\n  }, {\n    key: \"appendTiles\",\n    value: function appendTiles() {\n      var _this = this,\n        _document$querySelect;\n      if (this.tiles.length >= this.width * this.height) return;\n      var buttonElements = new Array(this.width * this.height - this.tiles.length).fill().map(function (value, index) {\n        var button = document.createElement('button');\n        button.className = 'tile';\n        button.type = 'button';\n        button.setAttribute('data-pos', _this.tiles.length + index);\n        button.setAttribute('aria-label', \"open tile at position \".concat(_this.tiles.length + index + 1));\n        return button;\n      });\n      (_document$querySelect = document.querySelector('.field__tiles')).append.apply(_document$querySelect, _toConsumableArray(buttonElements));\n    }\n  }, {\n    key: \"getSizesButtonsElements\",\n    value: function getSizesButtonsElements() {\n      var _this2 = this;\n      return this.sizes.reduce(function (str, size) {\n        var width = size.custom ? \"?\" : size.width;\n        var height = size.custom ? \"?\" : size.height;\n        var dataType = size.custom ? 'data-type=\"custom\"' : '';\n        var disabled = size.custom ? \"disabled\" : '';\n        str = str + \"<button class='sizes-container__button' \".concat(dataType, \" type='button' role='radio' data-width=\").concat(size.width, \" data-height=\").concat(size.height, \" data-mine=\").concat(size.mine, \" aria-checked='\").concat(size.width === _this2.width && size.height === _this2.height, \"' \").concat(disabled, \">\").concat(width, \" x \").concat(height, \"</button>\");\n        return str;\n      }, '');\n    }\n  }, {\n    key: \"createDomElement\",\n    value: function createDomElement() {\n      this.domElement = document.createElement('main');\n      this.domElement.className = 'app';\n      this.domElement.innerHTML = \"<h1 class='title'>\\u0421\\u0430\\u043F\\u0451\\u0440</h1>    <article class=\\\"scoreboard\\\" aria-label='scoreboard'>    <div class='scoreboard__score'>    <div class=\\\"scoreboard__flag flag\\\"><span class=\\\"flag__icon\\\"></span><span class=\\\"flag__count\\\">0</span></div>    <div class=\\\"scoreboard__mine mine\\\"><span class=\\\"mine__icon\\\"></span><span class=\\\"mine__count\\\">0</span></div>    </div>    <button class='scoreboard__start-button' title='new game' data-type='start' type='button' disabled>&#9786;</button>    <span class=\\\"scoreboard__time\\\"></span>    </article>    <article class='field' aria-label='field'>    <div class='field__tiles'>\".concat(this.getTilesElements(this.width), \"</div>    </article>    <div class=\\\"sizes-container\\\">\").concat(this.getSizesButtonsElements(), \"</div>    <fieldset class='settings'>    <legend>\\u0420\\u0430\\u0437\\u043C\\u0435\\u0440\\u044B \\u043F\\u043E\\u043B\\u044F</legend>    <label for='width'>\\u0448\\u0438\\u0440\\u0438\\u043D\\u0430:<input class='settings__input' type='number' id='width' min='4' max='50' value='4'/></label>    <label for='height'>\\u0432\\u044B\\u0441\\u043E\\u0442\\u0430:<input class='settings__input' type='number' id='height' min='4' max='50' value='4'/></label>    <label for='mine'>\\u043C\\u0438\\u043D\\u044B:<input class='settings__input' type='number' id='mine' min='1' max='15' value='4'/></label>    </fieldset>\");\n      return this;\n    }\n  }, {\n    key: \"renderTo\",\n    value: function renderTo(parentNode) {\n      parentNode.append(this.domElement);\n      return this;\n    }\n  }, {\n    key: \"setFlag\",\n    value: function setFlag(tile) {\n      tile.isFlagged = true;\n      document.querySelector(\".tile[data-pos=\\\"\".concat(tile.pos, \"\\\"]\")).setAttribute('aria-label', 'flag');\n      this.flag += 1;\n      this.setFlagCount();\n    }\n  }, {\n    key: \"deleteFlag\",\n    value: function deleteFlag(tile) {\n      document.querySelector(\".tile[data-pos=\\\"\".concat(tile.pos, \"\\\"]\")).setAttribute('aria-label', \"open tile at position \".concat(tile.pos + 1)); // заменить\n      tile.isFlagged = false;\n      this.flag -= 1;\n      this.setFlagCount();\n    }\n  }, {\n    key: \"setFlagCount\",\n    value: function setFlagCount() {\n      document.querySelector('.flag__count').textContent = this.flag;\n    }\n  }, {\n    key: \"setMineCount\",\n    value: function setMineCount() {\n      document.querySelector('.mine__count').textContent = this.mine;\n    }\n  }, {\n    key: \"clear\",\n    value: function clear() {\n      document.querySelectorAll(\".tile\").forEach(function (tile, index) {\n        //установить ограничение на кол-во элементов в зависимости от размера поля\n        tile.removeAttribute('disabled');\n        tile.removeAttribute('data-type');\n        tile.setAttribute('aria-label', \"open tile at position \".concat(index + 1));\n        tile.removeAttribute('data-state');\n        tile.textContent = '';\n      });\n      this.isDataReady = false;\n      this.isGameOver = false;\n      this.openTilesCount = 0;\n      this.flag = 0;\n      this.timer.stop();\n    }\n  }, {\n    key: \"end\",\n    value: function end(_ref2) {\n      var _ref2$result = _ref2.result,\n        result = _ref2$result === void 0 ? false : _ref2$result,\n        tile = _ref2.tile;\n      var message = '☹';\n      if (result) message = '😎';\n      this.timer.stop();\n      document.querySelector('.scoreboard__start-button').textContent = message;\n      if (!result) {\n        this.tiles.forEach(function (_ref3) {\n          var value = _ref3.value,\n            isFlagged = _ref3.isFlagged,\n            domElement = _ref3.domElement;\n          if (value === 'mine') {\n            if (!isFlagged) {\n              domElement.setAttribute('aria-label', 'mine');\n              domElement.setAttribute('disabled', 'disabled');\n            }\n          } else if (isFlagged) {\n            domElement.setAttribute('aria-label', 'no mine here');\n            domElement.removeAttribute('data-type');\n            domElement.textContent = '';\n            domElement.dataset.state = 'incorrect';\n            domElement.setAttribute('disabled', 'disabled');\n          }\n        });\n        tile.domElement.dataset.state = 'incorrect';\n      }\n      this.isGameOver = true;\n    }\n  }, {\n    key: \"printTile\",\n    value: function printTile(tile) {\n      tile.print();\n      if (tile.isFlagged) this.deleteFlag(tile);\n      this.openTilesCount += 1;\n      if (this.openTilesCount + this.mine === this.width * this.height) {\n        this.end({\n          result: true,\n          tile: tile\n        });\n      }\n    }\n  }, {\n    key: \"openTile\",\n    value: function openTile(tile) {\n      var value = tile.value,\n        isOpened = tile.isOpened;\n      if (isOpened) return;\n      if (value === 'mine') {\n        this.end({\n          tile: tile\n        });\n        return;\n      }\n      if (value === 0) {\n        this.openTilesArea(tile);\n        return;\n      }\n      this.printTile(tile);\n    }\n  }, {\n    key: \"openTilesArea\",\n    value: function openTilesArea(tile) {\n      var _this3 = this;\n      var pos = tile.pos,\n        isOpened = tile.isOpened;\n      if (isOpened) return;\n      if (!tile.neighboringTiles.length) {\n        (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.determineNumberNextToTheTail)(pos, {\n          width: this.width,\n          height: this.height\n        }).forEach(function (index) {\n          tile.neighboringTiles.push(_this3.tiles[index]);\n        });\n      }\n      var emptyPositionsAroundTail = tile.neighboringTiles.filter(function (tile) {\n        return tile.value === 0;\n      });\n      tile.neighboringTiles.forEach(function (tile) {\n        if (tile.value !== 0 && !tile.isOpened) {\n          _this3.printTile(tile);\n        }\n      });\n      this.printTile(tile);\n      if (emptyPositionsAroundTail.length !== 0) emptyPositionsAroundTail.forEach(function (tile) {\n        return _this3.openTilesArea(tile);\n      });\n    }\n  }, {\n    key: \"addMines\",\n    value: function addMines() {\n      var _this4 = this;\n      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.mine;\n      var except = arguments.length > 1 ? arguments[1] : undefined;\n      var minesNumber = 0;\n      var _loop = function _loop() {\n        var randomPosition = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getRandomArrayElement)(new Array(_this4.width * _this4.height).fill().map(function (x, i) {\n          return i;\n        }));\n        if (_this4.tiles[randomPosition].value !== 'mine' && randomPosition !== except) {\n          _this4.tiles[randomPosition].value = 'mine';\n          minesNumber += 1;\n          if (!_this4.tiles[randomPosition].neighboringTiles.length) {\n            (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.determineNumberNextToTheTail)(randomPosition, {\n              width: _this4.width,\n              height: _this4.height\n            }).forEach(function (index) {\n              _this4.tiles[randomPosition].neighboringTiles.push(_this4.tiles[index]);\n            });\n          }\n          _this4.tiles[randomPosition].neighboringTiles.forEach(function (tile) {\n            if (tile.value !== 'mine') {\n              tile.value += 1;\n            }\n          });\n        }\n      };\n      while (minesNumber < count) {\n        _loop();\n      }\n    }\n  }, {\n    key: \"onContextmenuHandler\",\n    value: function onContextmenuHandler() {\n      var _this5 = this;\n      document.querySelector('.app').addEventListener('contextmenu', function (event) {\n        var target = event.target;\n        if (_this5.isGameOver) return;\n        if (target.classList.contains('tile') && !target.hasAttribute('disabled')) {\n          var index = Number(target.dataset.pos);\n          event.preventDefault();\n          if (_this5.tiles[index].isFlagged === true) {\n            _this5.deleteFlag(_this5.tiles[index]);\n          } else _this5.setFlag(_this5.tiles[index]);\n        }\n      });\n    }\n  }, {\n    key: \"onClickHandler\",\n    value: function onClickHandler() {\n      var _this6 = this;\n      document.querySelector('.app').addEventListener('click', function (event) {\n        var target = event.target;\n        if (target.dataset.type === 'start') {\n          _this6.clear();\n          _this6.start();\n          return;\n        }\n        if (target.classList.contains('sizes-container__button')) {\n          var width = Number(target.dataset.width);\n          var height = Number(target.dataset.height);\n          var mine = Number(target.dataset.mine);\n          if (target.getAttribute('aria-checked') === 'true') return;\n          _this6.clear();\n          _this6.setSize({\n            width: width,\n            height: height,\n            mine: mine\n          });\n          _this6.start();\n          target.setAttribute('aria-checked', true);\n          _this6.tiles[_this6.width * _this6.height - 1].domElement.setAttribute('data-location', 'last');\n        }\n        if (_this6.isGameOver) return;\n        if (target.classList.contains('tile') && !_this6.tiles[Number(target.dataset.pos)].isFlagged) {\n          var index = Number(target.dataset.pos);\n          if (!_this6.isDataReady && _this6.tiles[index].value === 'mine') {\n            _this6.tiles[index].neighboringTiles.forEach(function (tile) {\n              if (tile.value !== 'mine') tile.value -= 1;\n            });\n            _this6.tiles[index].value = _this6.tiles[index].neighboringTiles.filter(function (tile) {\n              return tile.value === 'mine';\n            }).length;\n            _this6.addMines(1, index);\n          }\n          _this6.isDataReady = true;\n          document.querySelector('.scoreboard__start-button').removeAttribute('disabled');\n          _this6.timer.start();\n          _this6.openTile(_this6.tiles[index]);\n        }\n      });\n    }\n  }, {\n    key: \"onInputHandler\",\n    value: function onInputHandler() {\n      var _this7 = this;\n      document.querySelectorAll('.settings__input').forEach(function (x) {\n        return x.addEventListener('input', function (event) {\n          var target = event.target;\n          var size = _this7.sizes.find(function (size) {\n            return size.custom;\n          });\n          var value = Number(target.value);\n          if (value < Number(target.min)) {\n            value = Number(target.min);\n          }\n          if (value > Number(target.max)) {\n            value = Number(target.max);\n          }\n          size[\"\".concat(target.id)] = value;\n          if (target.id !== 'mine') {\n            var max = size.width * size.height - 1;\n            var mine = Number(document.getElementById('mine').value) < max ? Number(document.getElementById('mine').value) : max;\n            size.mine = mine;\n            document.getElementById('mine').setAttribute('max', max);\n            document.querySelector('.sizes-container__button[data-type=\"custom\"]').setAttribute('data-mine', mine);\n          }\n          document.querySelector('.sizes-container__button[data-type=\"custom\"]').setAttribute(\"data-\".concat(target.id), value);\n          document.querySelector('.sizes-container__button[data-type=\"custom\"]').textContent = \"\".concat(size.width, \" x \").concat(size.height);\n          if (document.querySelector('.sizes-container__button[data-type=\"custom\"]').hasAttribute('disabled')) document.querySelector('.sizes-container__button[data-type=\"custom\"]').removeAttribute('disabled');\n          document.querySelector('.sizes-container__button[data-type=\"custom\"]').setAttribute('aria-checked', false);\n        });\n      });\n    }\n  }, {\n    key: \"createTiles\",\n    value: function createTiles() {\n      var _this8 = this,\n        _this$tiles;\n      if (this.tiles.length >= this.width * this.height) return;\n      var tiles = new Array(this.width * this.height - this.tiles.length).fill().map(function (tile, index) {\n        return new _Tile_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n          domElement: document.querySelector(\".tile[data-pos=\\\"\".concat(_this8.tiles.length + index, \"\\\"]\")),\n          pos: _this8.tiles.length + index\n        });\n      });\n      (_this$tiles = this.tiles).push.apply(_this$tiles, _toConsumableArray(tiles));\n    }\n  }, {\n    key: \"addSizesForContainer\",\n    value: function addSizesForContainer() {\n      document.querySelector('.field__tiles').style.setProperty('--width', this.width);\n      document.querySelector('.field__tiles').style.setProperty('--height', this.height);\n    }\n  }, {\n    key: \"setSize\",\n    value: function setSize(_ref4) {\n      var _ref4$width = _ref4.width,\n        width = _ref4$width === void 0 ? this.width : _ref4$width,\n        _ref4$height = _ref4.height,\n        height = _ref4$height === void 0 ? this.height : _ref4$height,\n        _ref4$mine = _ref4.mine,\n        mine = _ref4$mine === void 0 ? this.mine : _ref4$mine;\n      this.width = width;\n      this.height = height;\n      this.mine = mine;\n      this.tiles.slice(0, this.width * this.height).forEach(function (tile) {\n        return tile.resetNeighboringTiles();\n      });\n      if (document.querySelector('.tile[data-location=\"last\"]')) document.querySelector('.tile[data-location=\"last\"]').removeAttribute('data-location');\n      this.addSizesForContainer();\n      this.appendTiles();\n      if (document.querySelector('.sizes-container__button[aria-checked=\"true\"]')) document.querySelector('.sizes-container__button[aria-checked=\"true\"]').setAttribute('aria-checked', false);\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      document.querySelector('.scoreboard__start-button').setAttribute('disabled', 'disabled');\n      this.createTiles();\n      this.timer.show();\n      this.setFlagCount();\n      this.setMineCount();\n      this.tiles.slice(0, this.width * this.height).forEach(function (tile) {\n        return tile.reset();\n      });\n      this.addMines();\n      document.querySelector('.scoreboard__start-button').textContent = '☺';\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      this.createDomElement().renderTo(this.parentNode);\n      this.timer = new _Timer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n        parentNode: document.querySelector('.scoreboard__time')\n      });\n      this.onClickHandler();\n      this.onContextmenuHandler();\n      this.addSizesForContainer();\n      this.start();\n      this.onInputHandler();\n    }\n  }]);\n  return Game;\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://minesweeper/./components/Game.js?");

/***/ }),

/***/ "./components/Tile.js":
/*!****************************!*\
  !*** ./components/Tile.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nvar Tile = /*#__PURE__*/function () {\n  function Tile(_ref) {\n    var domElement = _ref.domElement,\n      _ref$value = _ref.value,\n      value = _ref$value === void 0 ? 0 : _ref$value,\n      pos = _ref.pos,\n      _ref$isFlagged = _ref.isFlagged,\n      isFlagged = _ref$isFlagged === void 0 ? false : _ref$isFlagged,\n      _ref$isOpened = _ref.isOpened,\n      isOpened = _ref$isOpened === void 0 ? false : _ref$isOpened,\n      _ref$neighboringTiles = _ref.neighboringTiles,\n      neighboringTiles = _ref$neighboringTiles === void 0 ? [] : _ref$neighboringTiles;\n    _classCallCheck(this, Tile);\n    this.domElement = domElement;\n    this.value = value;\n    this.pos = pos;\n    this.isFlagged = isFlagged;\n    this.isOpened = isOpened;\n    this.neighboringTiles = neighboringTiles;\n  }\n  _createClass(Tile, [{\n    key: \"reset\",\n    value: function reset() {\n      this.value = 0;\n      this.isFlagged = false;\n      this.isOpened = false;\n    }\n  }, {\n    key: \"resetNeighboringTiles\",\n    value: function resetNeighboringTiles() {\n      this.neighboringTiles.length = 0;\n    }\n  }, {\n    key: \"print\",\n    value: function print() {\n      if (this.value) {\n        this.domElement.removeAttribute('aria-label');\n        this.domElement.textContent = this.value;\n        this.domElement.dataset.type = this.getType();\n      } else this.domElement.setAttribute('aria-label', 'empty tile');\n      this.domElement.setAttribute('disabled', true);\n      this.isOpened = true;\n    }\n  }, {\n    key: \"getType\",\n    value: function getType() {\n      var data = new Map([[1, 'one'], [2, 'two'], [3, 'three'], [4, 'four'], [5, 'five'], [6, 'six'], [7, 'seven'], [8, 'eight']]);\n      return data.get(this.value);\n    }\n  }]);\n  return Tile;\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tile);\n\n//# sourceURL=webpack://minesweeper/./components/Tile.js?");

/***/ }),

/***/ "./components/Timer.js":
/*!*****************************!*\
  !*** ./components/Timer.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\nvar Timer = /*#__PURE__*/function () {\n  function Timer(_ref) {\n    var parentNode = _ref.parentNode;\n    _classCallCheck(this, Timer);\n    this.domElement = document.createElement('span');\n    this.step = 1000;\n    this.timerId = 0;\n    this.result = 0;\n    if (parentNode) {\n      this.renderTo(parentNode);\n    }\n  }\n  _createClass(Timer, [{\n    key: \"renderTo\",\n    value: function renderTo(parentNode) {\n      parentNode.appendChild(this.domElement);\n    }\n  }, {\n    key: \"show\",\n    value: function show() {\n      var time = new Date(this.result);\n      this.domElement.textContent = \"\".concat(String(time.getMinutes()).padStart(2, 0), \":\").concat(String(time.getSeconds()).padStart(2, 0));\n      this.result += this.step;\n      /*if (this.result > ) { */\n\n      return this;\n    }\n  }, {\n    key: \"start\",\n    value: function start() {\n      var _this = this;\n      if (!this.timerId) {\n        this.timerId = setInterval(function () {\n          return _this.show();\n        }, 1000);\n      }\n      return this;\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (this.timerId) {\n        clearInterval(this.timerId);\n      }\n      this.timerId = 0;\n      this.result = 0;\n      return this;\n    }\n  }]);\n  return Timer;\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);\n\n//# sourceURL=webpack://minesweeper/./components/Timer.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Game.js */ \"./components/Game.js\");\n\nnew _components_Game_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({});\n\n//# sourceURL=webpack://minesweeper/./index.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   determineNumberNextToTheTail: () => (/* binding */ determineNumberNextToTheTail),\n/* harmony export */   getRandomArrayElement: () => (/* binding */ getRandomArrayElement)\n/* harmony export */ });\nvar determineNumberNextToTheTail = function determineNumberNextToTheTail(position) {\n  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : size,\n    width = _ref.width,\n    height = _ref.height;\n  var positionsAroundTail = [];\n  if (!(position % width)) {\n    positionsAroundTail.push(position - width, position - width + 1, position + 1, position + width, position + width + 1);\n  } else if (!((position + 1) % width)) {\n    positionsAroundTail.push(position - width - 1, position - width, position - 1, position + width - 1, position + width);\n  } else positionsAroundTail.push(position - width - 1, position - width, position - width + 1, position - 1, position + 1, position + width - 1, position + width, position + width + 1);\n  return positionsAroundTail.filter(function (position) {\n    return position >= 0 && position < width * height;\n  });\n};\nvar getRandomArrayElement = function getRandomArrayElement(array) {\n  return array[Math.floor(Math.random() * array.length)];\n};\n\n//# sourceURL=webpack://minesweeper/./utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;