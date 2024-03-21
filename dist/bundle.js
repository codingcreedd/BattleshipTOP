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

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ DOM)\n/* harmony export */ });\n/* harmony import */ var _src_Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/Gameboard */ \"./src/Gameboard.js\");\n/* harmony import */ var _src_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/Player */ \"./src/Player.js\");\n/* harmony import */ var _src_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/Ship */ \"./src/Ship.js\");\n\n\n\nclass DOM {\n  constructor(playerBoard, computerBoard) {\n    this.playerBoard = playerBoard;\n    this.computerBoard = computerBoard;\n    this.currentShip = 5;\n  }\n  renderBoards = board => {\n    const boardContainer = document.querySelector(`.${board}`);\n    for (let i = 1; i <= 100; i++) {\n      const cell = document.createElement('div');\n      cell.classList.add('cell');\n      boardContainer.appendChild(cell);\n    }\n  };\n  setShipBoard = () => {\n    const setterBoardContainer = document.querySelector('.board-select-wrapper');\n    setterBoardContainer.classList.remove('hidden');\n    const setterBoard = setterBoardContainer.querySelector('.board');\n    for (let i = 1; i <= 100; i++) {\n      const cell = document.createElement('div');\n      cell.classList.add('cell');\n      setterBoard.appendChild(cell);\n    }\n  };\n  calculateCoordinateOnClick = (e, playerBoard, targetBoard) => {\n    const cell = e.target;\n    const board = document.querySelector(`${targetBoard}`);\n\n    // Calculate row and column based on the cell's index within the board\n    const cells = Array.from(board.querySelectorAll('.cell'));\n    const index = cells.indexOf(cell);\n    const row = Math.floor(index / playerBoard.grid[0].length);\n    const col = index % playerBoard.grid[0].length;\n    return {\n      row,\n      col\n    };\n  };\n  copyShipsToPlayerBoard(setterBoard) {\n    //setter board is the temp board where you place your ships\n    const playerBoard = document.querySelector('.player-board');\n    let setterBoardChildren = document.querySelector(`${setterBoard}`).children;\n    let playerBoardChildren = playerBoard.children;\n    for (let i = 0; i < 100; i++) {\n      if (setterBoardChildren[i].style.backgroundColor === 'lightgray') playerBoardChildren[i].style.backgroundColor = 'lightgray';\n    }\n  }\n  startGame(computer, computerBoard, playerBoard)\n  //THIS IS THE MAIN FUNCTION THAT WILL LET THE PLAYER AND THE COMPUTER STRIKE EACH OTHER\n  {\n    //initial starting screen\n    const startGameWrapper = document.getElementById('start-game-wrapper');\n    startGameWrapper.style.display = 'flex';\n    startGameWrapper.innerText = 'Game Started';\n    setTimeout(() => {\n      startGameWrapper.style.display = 'none';\n    }, 1500);\n    const computerGrid = document.querySelector('.computer-board');\n    const gameFinishedDiv = document.querySelector('.game-finished');\n\n    //PLAYER'S TURN\n    document.querySelector('.computer-board').addEventListener('click', e => {\n      if (!computer.computer_turn && !(e.target.style.backgroundColor === 'red' || e.target.style.backgroundColor === 'lightgray')) {\n        computerGrid.classList.remove('no-event');\n        let coordinates = this.calculateCoordinateOnClick(e, computerBoard, '.computer-board');\n        computerBoard.recieveAttack(coordinates.row, coordinates.col);\n        console.log(computerBoard.sunkShips);\n        computer.renderHitOnComputer(computerBoard, coordinates.row, coordinates.col);\n        computer.computer_turn = true;\n        if (computerBoard.shipsSunk()) {\n          gameFinishedDiv.style.display = 'flex';\n          gameFinishedDiv.innerText = 'You win !';\n        }\n        if (computer.computer_turn) {\n          //computerGrid.classList.add('no-event');\n\n          computer.attack(playerBoard);\n          computer.computer_turn = false;\n          if (playerBoard.shipsSunk()) {\n            gameFinishedDiv.style.display = 'flex';\n            gameFinishedDiv.innerText = 'Computer wins !';\n          }\n        }\n        if (gameFinishedDiv.style.display === 'flex') {\n          setTimeout(() => {\n            gameFinishedDiv.style.display = 'none';\n            location.reload();\n          }, 2000);\n        }\n      }\n    });\n  }\n}\n\n//# sourceURL=webpack://battleshiptop/./src/DOM.js?");

/***/ }),

/***/ "./src/Gameboard.js":
/*!**************************!*\
  !*** ./src/Gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n\nclass Gameboard {\n  constructor() {\n    this.ships = [];\n    this.missedShots = []; //array of coordinates for missed shots\n    this.grid = Array.from({\n      length: 10\n    }, () => Array(10).fill(null)); //10x10 Array\n    this.name = \"\";\n  }\n  renderPlayerShips(ship, row, col, orientation) {\n    let player = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'player';\n    let e = arguments.length > 5 ? arguments[5] : undefined;\n    let cell = e.target;\n    if (!cell) return;\n    let board = cell.parentNode;\n    for (let i = 0; i < ship.length; i++) {\n      if (orientation === 'horizontal') {\n        cell.style.backgroundColor = 'lightgray';\n        cell = cell.nextElementSibling;\n      } else {\n        cell.style.backgroundColor = 'lightgray';\n        cell = board.querySelector(`.cell:nth-child(${col + 1 + row * 10})`);\n      }\n    }\n  }\n  placeShip(ship, row, col, orientation) {\n    let player = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'player';\n    if (player === 'player') {\n      if (10 - col < ship.length && orientation === 'horizontal' || 10 - row < ship.length && orientation === 'vertical' || row >= this.grid.length || col >= this.grid[0].length) {\n        console.log('SHIP cant be here');\n        return \"Cant place this ship in these coordinates\";\n      }\n      if (this.#coordinatesTaken(ship.length, row, col, orientation)) {\n        console.log('ship taken');\n        return 'Place already taken';\n      }\n    }\n    this.ships.push(ship);\n    for (let i = 0; i < ship.length; i++) {\n      if (orientation === 'horizontal') this.grid[row][col++] = ship;else this.grid[row++][col] = ship;\n    }\n    return 'added';\n  }\n  #coordinatesTaken(shipSize, row, col, orientation) {\n    for (let i = 0; i < shipSize; i++) {\n      if (this.grid[row][col] !== null) return true;\n      if (orientation === 'horizontal') col++;else row++;\n    }\n    return false;\n  }\n  recieveAttack(row, col) {\n    if (this.grid[row][col] === null) {\n      this.missedShots.push({\n        row: row,\n        col: col\n      });\n    } else {\n      this.grid[row][col].hit();\n    }\n  }\n  shipsSunk() {\n    console.log(this.ships);\n    for (let i = 0; i < this.ships.length; i++) {\n      if (!this.ships[i].sunk) return false;\n    }\n    return true;\n  }\n}\n\n//# sourceURL=webpack://battleshiptop/./src/Gameboard.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\n\n\nclass Player {\n  constructor() {\n    this.computer_turn = false;\n    this.current_hit = false;\n  }\n  #getRandomNumber(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n  #checkValidationVH(orientation, ship, row, col)\n  //checks if a row and col is valid for 10 rows and 10 columns vertically (V) and horizontally (H)\n  {\n    return 10 - col < ship.length && orientation === 'horizontal' || 10 - row < ship.length && orientation === 'vertical';\n  }\n  #checkValidationOutOfBounds(board, row, col) {\n    return row >= board.grid.length || col >= board.grid[0].length;\n  }\n  #checkEmptyPlaces(board, row, col, orientation, ship)\n  //the places from row - col to ship.length row or col must be empty for a ship to be placed\n  {\n    if (orientation === 'horizontal') {\n      for (let i = 1; i <= ship.length; i++) {\n        if (board.grid[row][col++] !== null) return false;\n      }\n      return true;\n    } else {\n      for (let i = 1; i <= ship.length; i++) {\n        if (board.grid[row++][col] !== null) return false;\n      }\n      return true;\n    }\n  }\n  #computerPickCoordinates(computerBoard, orientation, ship) {\n    let row = 0,\n      col = 0;\n    while (true) {\n      row = this.#getRandomNumber(0, 9);\n      col = this.#getRandomNumber(0, 9);\n      if (!this.#checkValidationVH(orientation, ship, row, col) && !this.#checkValidationOutOfBounds(computerBoard, row, col) && this.#checkEmptyPlaces(computerBoard, row, col, orientation, ship)) {\n        break;\n      }\n    }\n    return {\n      row: row,\n      col: col\n    };\n  }\n  placeShipComputer(computerBoard, shipSizeObj) {\n    const ship = new _Ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](shipSizeObj.shipSize);\n\n    //Pick orientation\n    let orientation;\n    this.#getRandomNumber(1, 2) === 1 ? orientation = 'horizontal' : orientation = 'vertical';\n\n    //PICK RIGHT COORDINATES\n    let coordinates = this.#computerPickCoordinates(computerBoard, orientation, ship); //will hold an object of coordinates\n\n    //PLACE SHIP ON COMPUTER BOARD AFTER RIGHT COORDINATES WERE PICKED\n    let shipPlaced = computerBoard.placeShip(ship, coordinates.row, coordinates.col, orientation, null, 'computer');\n\n    //Decrement shipsizeobj.shipSize\n    if (shipPlaced === 'added') {\n      if (shipSizeObj.shipSize > 3) shipSizeObj.shipSize--;else if (shipSizeObj.shipSize === 3 && shipSizeObj.shipSizeCounter < 2) shipSizeObj.shipSizeCounter++;else if (shipSizeObj.shipSize === 3 && shipSizeObj.shipSizeCounter >= 2) shipSizeObj.shipSize--;\n    }\n  }\n  renderHitOnComputer(computerBoard, row, col) {\n    const computerGridCells = document.querySelector('.computer-board').children;\n    if (computerBoard.grid[row][col] !== null) computerGridCells[10 * row + col].style.backgroundColor = 'red';else computerGridCells[10 * row + col].style.backgroundColor = 'lightgray';\n  }\n  attack(playerBoard) {\n    const row = this.#getRandomNumber(0, 9);\n    const col = this.#getRandomNumber(0, 9);\n    playerBoard.recieveAttack(row, col);\n    const playerGridCells = document.querySelector('.player-board').children;\n    if (playerBoard.grid[row][col] !== null) {\n      playerGridCells[10 * row + col].style.backgroundColor = 'red';\n      this.current_hit = true;\n    } else {\n      playerGridCells[10 * row + col].style.backgroundColor = 'blue';\n      this.current_hit = false;\n    }\n  }\n\n  // renderComputerShips(computerBoard) {\n  //     const computerGrid = document.querySelector('.computer-board');\n  //     let element = computerGrid.firstElementChild;\n\n  //     for(let i = 0; i < computerBoard.grid.length; i++){\n  //         for(let j = 0; j < computerBoard.grid[0].length; j++){\n  //             if(computerBoard.grid[i][j] !== null)\n  //             element.style.backgroundColor = 'lightgray';\n\n  //             element = element.nextElementSibling;\n  //         }\n  //     }\n  // }\n}\n\n//# sourceURL=webpack://battleshiptop/./src/Player.js?");

/***/ }),

/***/ "./src/Ship.js":
/*!*********************!*\
  !*** ./src/Ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hitCount = 0;\n    this.sunk = false;\n  }\n  hit() {\n    this.hitCount++;\n    console.log(`hit count: ${this.hitCount}`);\n    if (this.length === this.hitCount) this.sunk = true;\n  }\n}\n\n//# sourceURL=webpack://battleshiptop/./src/Ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOM */ \"./src/DOM.js\");\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Gameboard */ \"./src/Gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Ship */ \"./src/Ship.js\");\n/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Player */ \"./src/Player.js\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style.css */ \"./style.css\");\n\n\n\n\n\nconst playerBoard = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconst computerBoard = new _Gameboard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconst computer = new _Player__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\nconst shipSizeObj = {\n  shipSize: 5,\n  shipSizeCounter: 1\n};\nconst dom = new _DOM__WEBPACK_IMPORTED_MODULE_0__[\"default\"](playerBoard, computerBoard);\ndom.renderBoards('player-board');\ndom.renderBoards('computer-board');\ndom.setShipBoard();\nlet shipSizeCounter = 1;\nlet axis = 'horizontal';\nconst rotateButton = document.querySelector('.rotate-axis');\n\n//EVENT LISTENERS\n\nrotateButton.addEventListener('click', () => {\n  console.log(axis);\n  if (axis === 'horizontal') axis = 'vertical';else axis = 'horizontal';\n});\ndocument.querySelectorAll('.setter-board .cell').forEach(cell => {\n  cell.addEventListener('click', e => {\n    const warningMessage = document.getElementById('warning');\n    if (warningMessage.style.display === 'block') warningMessage.style.display = 'none';\n    const ship = new _Ship__WEBPACK_IMPORTED_MODULE_2__[\"default\"](dom.currentShip);\n    const coordinates = dom.calculateCoordinateOnClick(e, playerBoard, '.board-select-wrapper');\n    if (playerBoard.ships.length < 5) {\n      const shipPlaced = playerBoard.placeShip(ship, coordinates.row, coordinates.col, axis, 'player');\n      if (shipPlaced === 'added') {\n        if (dom.currentShip > 3) dom.currentShip--;else if (dom.currentShip === 3 && shipSizeCounter < 2) shipSizeCounter++;else if (dom.currentShip === 3 && shipSizeCounter >= 2) dom.currentShip--;\n        console.log('ship placed');\n        playerBoard.renderPlayerShips(ship, coordinates.row, coordinates.col, axis, 'player', e);\n      }\n    }\n  });\n});\ndocument.querySelector('.start-button').addEventListener('click', () => {\n  if (playerBoard.ships.length === 5) {\n    const setterBoardContainer = document.querySelector('.board-select-wrapper');\n    setterBoardContainer.classList.add('hidden');\n    dom.copyShipsToPlayerBoard('.setter-board');\n\n    //Computer\n    for (let i = 1; i <= 5; i++) computer.placeShipComputer(computerBoard, shipSizeObj);\n    for (let i = 0; i < 5; i++) {\n      console.log(`Ship ${i + 1}: ${computerBoard.ships[i]}. SHIP LENGTH: ${computerBoard.ships[i].length}`);\n    }\n    for (let i = 0; i < 10; i++) {\n      for (let j = 0; j < 10; j++) {\n        console.log(`${computerBoard.grid[i][j]}, row: ${i} col ${j}, ship length = ${computerBoard.grid[i][j] !== null ? computerBoard.grid[i][j].length : null}`);\n      }\n    }\n\n    //computer.renderComputerShips(computerBoard);\n    dom.startGame(computer, computerBoard, playerBoard);\n  } else {\n    console.log('LESS THAN 5');\n    const warningMessage = document.getElementById('warning');\n    warningMessage.style.cssText = 'display: block; color: red; font-size: 1.1rem;';\n  }\n});\n\n//# sourceURL=webpack://battleshiptop/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style.css":
/*!*********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style.css ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `*, *::before, *::after{box-sizing: border-box;}\n\n*{\n    margin: 0;\n    padding: 0;\n}\n\nbody{\n    width: 100%;\n    min-height: 100vh;\n    display: flex;\n    justify-content: center;\n}\n\nh1{\n    font-size: 3rem;\n    margin-bottom: 100px;\n}\n\n.boards{\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n}\n\n.board-wrapper{\n    display: flex;\n    gap: 100px;\n}\n\n.board-select-wrapper.hidden{\n    display: none;\n}\n\n.show{\n    display: block;\n}\n\n.board-select-wrapper{\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0,0,0,0.5);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    z-index: 1;\n}\n\n.board-select-wrapper > div{\n    background: white;\n    padding: 50px;\n    border-radius: 20px;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n\n.board-select-wrapper > div p{\n    margin-bottom: 40px;\n    font-size: 2rem;\n}\n\n.board-select-wrapper .start-button{\n    margin-top: 40px;\n    padding: 10px 20px;\n    border: 1px solid black;\n    border-radius: 5px;\n    background: transparent;\n    font-weight: bold;\n    cursor: pointer;\n    transition: 0.5s ease;\n}\n\n.board-select-wrapper .start-button:hover{\n    background: black;\n    color: white;\n}\n\n/*boards*/\n.board{\n    display: grid;\n    grid-template-columns: repeat(10, 50px);\n    grid-template-rows: repeat(10, 50px);\n}\n\n.board .cell{\n    border: 1px solid black;\n}\n\n.board-description{\n    display: flex;\n    gap: 500px;\n    margin-top: 50px;\n}\n\n/*--------START GAME WRAPPER----------*/\n\n#start-game-wrapper{\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n\n    justify-content: center;\n    align-items: center;\n    color: white;\n    font-size: 2rem;\n    font-weight: bolder;\n\n    background: rgba(0,0,0,0.5);\n\n}\n\n/* DISABLE EVENTS ON SELECTED ELEMENT */\n.no-event{\n    pointer-events: none;\n}\n\n/* Game finished div */\n.game-finished{\n    display: none;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n\n    justify-content: center;\n    align-items: center;\n    color: white;\n    font-size: 5rem;\n    font-weight: bolder;\n\n    background: rgba(0,0,0,0.5);\n}\n\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://battleshiptop/./style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://battleshiptop/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://battleshiptop/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./style.css":
/*!*******************!*\
  !*** ./style.css ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !./node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!./node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://battleshiptop/./style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://battleshiptop/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://battleshiptop/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://battleshiptop/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://battleshiptop/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://battleshiptop/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://battleshiptop/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__("./src/DOM.js");
/******/ 	__webpack_require__("./src/Gameboard.js");
/******/ 	__webpack_require__("./src/Player.js");
/******/ 	__webpack_require__("./src/Ship.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;