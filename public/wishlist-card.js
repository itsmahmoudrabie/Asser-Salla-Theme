/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/partials/wishlist-card.js"
/*!*************************************************!*\
  !*** ./src/assets/js/partials/wishlist-card.js ***!
  \*************************************************/
() {

eval("{class WishlistCard extends HTMLElement {\n  connectedCallback() {\n    if (!this.product) {\n      return salla.logger.warn('custom-wishlist-card:: product does not exist!');\n    }\n    salla.onReady(() => this.render());\n  }\n  render() {\n    this.setAttribute('id', `wishlist-product-${this.product.id}`);\n    this.classList.add('product-entry', 'product-entry--wishlist');\n    this.innerHTML = `\n        <div class=\"flex items-center mb-4 sm:mb-0\">\n          <a href=\"${this.product.url}\" class=\"product-entry__image\">\n            <img class=\"object-cover w-full h-full\" src=\"${this.product.image.url}\" loading=\"lazy\" alt=\"${this.product.image.alt}\" />\n          </a>\n          <div class=\"flex-1 rtl:pr-5 ltr:pl-5\">\n            <h3 class=\"text-sm text-gray-800 leading-6 mb-1.5 rtl:pl-5 ltr:pr-5 rtl:md:pl-8 ltr:md:pr-8 line-clamp-1\">\n              <a href=\"${this.product.url}\">${this.product.name}</a>\n            </h3>\n            <div class=\"w-full center-between\">\n              ${this.product.is_on_sale ? `\n                <div class=\"space-x-1 rtl:space-x-reverse\">\n                  <h4 class=\"inline-block text-sm font-bold text-red-400\">${salla.money(this.product.sale_price)}</h4>\n                  <span class=\"text-sm text-gray-500 line-through\">${salla.money(this.product.regular_price)}</span>\n                </div>\n              ` : `\n                <h4 class=\"text-sm font-bold\">${salla.money(this.product.price)}</h4>\n              `}\n            </div>\n          </div>\n        </div>\n        <div class=\"flex items-center space-x-4 rtl:space-x-reverse\">\n          <salla-add-product-button product-status=\"${this.product.status}\" product-id=\"${this.product.id}\" product-type=\"${this.product.type}\" loader-position=\"center\" fill=\"outline\" class=\"flex-grow w-full sm:grow-0 md:w-40\">\n          </salla-add-product-button>\n          <salla-button loader-position=\"center\" shape=\"icon\" size=\"small\" color=\"danger\" class=\"btn--delete\" onclick=\"salla.wishlist.remove(${this.product.id})\">\n            <i class=\"sicon-cancel\"></i>\n          </salla-button>\n        </div>\n  `;\n  }\n}\ncustomElements.define('custom-wishlist-card', WishlistCard);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/partials/wishlist-card.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/partials/wishlist-card.js"]();
/******/ 	
/******/ })()
;