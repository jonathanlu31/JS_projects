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

/***/ "./src/display.ts":
/*!************************!*\
  !*** ./src/display.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DisplayController\": () => (/* binding */ DisplayController)\n/* harmony export */ });\n/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.ts\");\n\nconst turnHeader = document.getElementById('turn');\nconst table = document.querySelector('table');\nclass DisplayController {\n    game;\n    playable;\n    constructor() {\n        this.game = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.GameBoard();\n        this.playable = true;\n    }\n    markTile(e) {\n        if (e.target.tagName !== 'TD') {\n            return;\n        }\n        if (!this.playable) {\n            return;\n        }\n        let marked = this.game.getCurrentPlayer().mark(e.target);\n        if (marked) {\n            if (this.game.checkWin()) {\n                this.endGame(true);\n                this.playable = false;\n            }\n            else if (this.game.checkTie()) {\n                this.endGame(false);\n            }\n            else {\n                this.game.switchPlayer();\n            }\n        }\n    }\n    static changeTurn(currPlayer) {\n        turnHeader.textContent = `Player ${currPlayer.symbol}'s turn`;\n    }\n    reset() {\n        this.game.clearBoard();\n        this.playable = true;\n        turnHeader.textContent = \"Player X's turn\";\n        if (this.game.getCurrentPlayer().symbol === 'O') {\n            this.game.switchPlayer();\n        }\n        this.game.resetTurns();\n    }\n    endGame(win) {\n        if (win) {\n            turnHeader.textContent = `Player ${this.game.getCurrentPlayer().symbol} wins!`;\n        }\n        else {\n            turnHeader.textContent = \"It's a tie!\";\n        }\n        table.removeEventListener('click', this.markTile);\n    }\n}\n\n\n//# sourceURL=webpack://tictactoe/./src/display.ts?");

/***/ }),

/***/ "./src/gameboard.ts":
/*!**************************!*\
  !*** ./src/gameboard.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"GameBoard\": () => (/* binding */ GameBoard)\n/* harmony export */ });\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ \"./src/display.ts\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.ts\");\n\n\nconst table = document.querySelector('table');\nconst rows = table.rows;\nclass GameBoard {\n    currentPlayer;\n    players;\n    turns;\n    constructor() {\n        this.currentPlayer = 0;\n        this.players = [new _player__WEBPACK_IMPORTED_MODULE_1__.Player('X'), new _player__WEBPACK_IMPORTED_MODULE_1__.Player('O')];\n        this.turns = 0;\n    }\n    getCurrentPlayer() {\n        return this.players[this.currentPlayer];\n    }\n    switchPlayer() {\n        this.currentPlayer = ((this.currentPlayer + 1) % 2);\n        _display__WEBPACK_IMPORTED_MODULE_0__.DisplayController.changeTurn(this.getCurrentPlayer());\n    }\n    checkTie() {\n        return this.turns === 9;\n    }\n    checkWin() {\n        this.turns++;\n        return this.checkRows() ||\n            this.checkColumns() ||\n            this.checkDiagonals();\n    }\n    checkRows() {\n        return Array.from(rows).some((row) => {\n            return this.checkThreeTiles(Array.from(row.cells));\n        });\n    }\n    checkColumns() {\n        for (let i = 0; i < 3; i++) {\n            let col = [];\n            for (let r of rows) {\n                col.push(r.cells[i]);\n            }\n            if (this.checkThreeTiles(col)) {\n                return true;\n            }\n        }\n        return false;\n    }\n    checkDiagonals() {\n        let diags = [\n            [rows[0].cells[0], rows[1].cells[1], rows[2].cells[2]],\n            [rows[0].cells[2], rows[1].cells[1], rows[2].cells[0]]\n        ];\n        return diags.some((diag) => {\n            return this.checkThreeTiles(diag);\n        });\n    }\n    checkThreeTiles(threeTiles) {\n        const threeTilesContent = threeTiles.map(tile => tile.textContent);\n        const emptyCheck = !!threeTilesContent[0];\n        const sameCheck = threeTilesContent[0] === threeTilesContent[1] && threeTilesContent[1] === threeTilesContent[2];\n        return emptyCheck && sameCheck;\n    }\n    clearBoard() {\n        for (let row of rows) {\n            for (let cell of row.cells) {\n                cell.textContent = '';\n            }\n        }\n    }\n    resetTurns() {\n        this.turns = 0;\n    }\n}\n\n\n//# sourceURL=webpack://tictactoe/./src/gameboard.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _display__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./display */ \"./src/display.ts\");\n\nconst gameDisplay = new _display__WEBPACK_IMPORTED_MODULE_0__.DisplayController();\nconst table = document.querySelector('table');\nconst resetButton = document.getElementById('reset');\ntable.addEventListener('click', e => gameDisplay.markTile(e));\nresetButton.addEventListener('click', () => gameDisplay.reset());\n\n\n//# sourceURL=webpack://tictactoe/./src/index.ts?");

/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Player\": () => (/* binding */ Player)\n/* harmony export */ });\nclass Player {\n    symbol;\n    constructor(symbol) {\n        this.symbol = symbol;\n    }\n    mark(tile) {\n        if (tile.textContent) {\n            return false;\n        }\n        tile.textContent = this.symbol;\n        return true;\n    }\n}\n\n\n//# sourceURL=webpack://tictactoe/./src/player.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;