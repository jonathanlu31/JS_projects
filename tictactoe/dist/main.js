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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\nclass DisplayController {\n    game;\n    header;\n    constructor() {\n        this.game = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n        this.header = \"Player X's turn\";\n    }\n    markTile(e) {\n        if (e.target.tagName !== 'TD') {\n            return;\n        }\n        let marked = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())().mark(e.target);\n        if (marked) {\n            if (Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()) {\n                displayController.endGame(true);\n            }\n            else if (Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()) {\n                displayController.endGame(false);\n            }\n            else {\n                Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n            }\n        }\n    }\n    changeTurn(currPlayer) {\n        turnHeader.textContent = `Player ${currPlayer.symbol}'s turn`;\n    }\n    reset() {\n        this.game = new Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n        this.header = \"Player X's turn\";\n        table.removeEventListener('click', displayController.markTile);\n        table.addEventListener('click', displayController.markTile);\n        if (Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())().symbol === 'O') {\n            Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n        }\n        Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n    }\n    endGame(win) {\n        if (win) {\n            turnHeader.textContent = `Player ${Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './gameboard'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())().symbol} wins!`;\n        }\n        else {\n            turnHeader.textContent = \"It's a tie!\";\n        }\n        table.removeEventListener('click', displayController.markTile);\n    }\n}\nconst game = new DisplayController();\nconst table = document.querySelector('table');\nconst resetButton = document.getElementById('reset');\nconst rows = table.rows;\nconst turnHeader = document.getElementById('turn');\ntable.addEventListener('click', displayController.markTile);\nresetButton.addEventListener('click', displayController.reset);\n\n\n//# sourceURL=webpack://tictactoe/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;