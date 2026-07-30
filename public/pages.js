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

/***/ "./src/assets/js/base-page.js"
/*!************************************!*\
  !*** ./src/assets/js/base-page.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass BasePage {\n  constructor() {}\n  onReady() {\n    //\n  }\n  registerEvents() {\n    //\n  }\n\n  /**\r\n   * To avoid loading unwanted classes, unless it's wanted page\r\n   * @param {null|string[]} allowedPages\r\n   * @return {*}\r\n   */\n  initiate(allowedPages) {\n    if (allowedPages && !allowedPages.includes(salla.config.get('page.slug'))) {\n      return app.log(`The Class For (${allowedPages.join(',')}) Skipped.`);\n    }\n    this.onReady();\n    this.registerEvents();\n    app.log(`The Class For (${allowedPages?.join(',') || '*'}) Loaded🎉`);\n  }\n}\n\n/**\r\n * Because we merged multi classes into one file, there is no need to initiate all of them\r\n */\nBasePage.initiateWhenReady = function (allowedPages = null) {\n  if (window.app?.status === 'ready') {\n    new this().initiate(allowedPages);\n  } else {\n    document.addEventListener('theme::ready', () => new this().initiate(allowedPages));\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BasePage);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/base-page.js?\n}");

/***/ },

/***/ "./src/assets/js/brands.js"
/*!*********************************!*\
  !*** ./src/assets/js/brands.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page */ \"./src/assets/js/base-page.js\");\n\nclass Brands extends _base_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  onReady() {\n    // set initial height;\n    const nav = document.querySelector('#brands-nav'),\n      navWrap = document.querySelector('.brands-nav-wrap');\n    navWrap.style.height = nav.clientHeight + 'px';\n    app.onClick('.brands-nav__item', ({\n      target: btn\n    }) => {\n      app.all('.brands-nav__item', el => app.toggleElementClassIf(el, 'is-selected', 'unselected', () => el == btn));\n    });\n    window.addEventListener('scroll', () => {\n      let scrolAtTop = window.pageYOffset <= 200;\n      app.toggleClassIf('#brands-nav', 'is-not-sticky', 'is-sticky', () => scrolAtTop);\n    });\n  }\n}\nBrands.initiateWhenReady(['brands.index']);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/brands.js?\n}");

/***/ },

/***/ "./src/assets/js/loyalty.js"
/*!**********************************!*\
  !*** ./src/assets/js/loyalty.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page */ \"./src/assets/js/base-page.js\");\n\nclass Loyalty extends _base_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  onReady() {\n    let count = app.element(\".count-anime\")?.dataset?.count || 0;\n    new anime.timeline().add({\n      targets: '.loyality-item',\n      opacity: [0, 1],\n      translateX: [20, 0],\n      delay: function (el, i) {\n        return i * 100;\n      }\n    }).add({\n      targets: '.star-anime',\n      opacity: [0, 1],\n      rotate: [50, 0],\n      duration: 4000,\n      delay: function (el, i) {\n        return i * 100;\n      }\n    }, '-=1000').add({\n      targets: `.count-anime`,\n      innerText: [0, count],\n      duration: 2000,\n      easing: \"linear\",\n      round: true,\n      delay: function (el, i) {\n        return i * 150;\n      }\n    }, '-=3700').add({\n      targets: '.btn-anime',\n      opacity: [0, 1],\n      duration: 2000,\n      translateX: [20, 0],\n      delay: function (el, i) {\n        return i * 100;\n      }\n    }, '-=3200');\n  }\n}\nLoyalty.initiateWhenReady(['loyalty']);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/loyalty.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
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
/******/ 			if(Symbol.toStringTag) {
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
/******/ 	__webpack_require__("./src/assets/js/loyalty.js");
/******/ 	let __webpack_exports__ = __webpack_require__("./src/assets/js/brands.js");
/******/ 	
/******/ })()
;