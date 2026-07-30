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

/***/ "./src/assets/js/partials/product-card.js"
/*!************************************************!*\
  !*** ./src/assets/js/partials/product-card.js ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base-page */ \"./src/assets/js/base-page.js\");\n\nclass ProductCard extends HTMLElement {\n  constructor() {\n    super();\n  }\n  connectedCallback() {\n    // Parse product data\n    this.product = this.product || JSON.parse(this.getAttribute('product'));\n    if (window.app?.status === 'ready') {\n      this.onReady();\n    } else {\n      document.addEventListener('theme::ready', () => this.onReady());\n    }\n  }\n  onReady() {\n    this.fitImageHeight = salla.config.get('store.settings.product.fit_type');\n    this.placeholder = salla.url.asset(salla.config.get('theme.settings.placeholder'));\n    this.getProps();\n    this.source = salla.config.get(\"page.slug\");\n    // If the card is in the landing page, hide the add button and show the quantity\n    if (this.source == \"landing-page\") {\n      this.hideAddBtn = true;\n      this.showQuantity = window.showQuantity;\n    }\n    salla.lang.onLoaded(() => {\n      // Language\n      this.remained = salla.lang.get('pages.products.remained');\n      this.donationAmount = salla.lang.get('pages.products.donation_amount');\n      this.startingPrice = salla.lang.get('pages.products.starting_price');\n      this.addToCart = salla.lang.get('pages.cart.add_to_cart');\n      this.outOfStock = salla.lang.get('pages.products.out_of_stock');\n\n      // re-render to update translations\n      this.render();\n    });\n    this.render();\n  }\n  initCircleBar() {\n    let qty = this.product.quantity,\n      total = this.product.quantity > 100 ? this.product.quantity * 2 : 100,\n      roundPercent = qty / total * 100,\n      bar = this.querySelector('.s-product-card-content-pie-svg-bar'),\n      strokeDashOffsetValue = 100 - roundPercent;\n    bar.style.strokeDashoffset = strokeDashOffsetValue;\n  }\n  formatDate(date) {\n    let d = new Date(date);\n    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;\n  }\n  getProductBadge() {\n    if (this.product?.preorder?.label) {\n      return `<div class=\"s-product-card-promotion-title\">${this.product.preorder.label}</div>`;\n    }\n    if (this.product.promotion_title) {\n      return `<div class=\"s-product-card-promotion-title\">${this.product.promotion_title}</div>`;\n    }\n    if (this.showQuantity && this.product?.quantity) {\n      return `<div\n        class=\"s-product-card-quantity\">${this.remained} ${salla.helpers.number(this.product?.quantity)}</div>`;\n    }\n    if (this.showQuantity && this.product?.is_out_of_stock) {\n      return `<div class=\"s-product-card-out-badge\">${this.outOfStock}</div>`;\n    }\n    return '';\n  }\n  getPriceFormat(price) {\n    if (!price || price == 0) {\n      return salla.config.get('store.settings.product.show_price_as_dash') ? '-' : '';\n    }\n    return salla.money(price);\n  }\n  getProductPrice() {\n    let price = '';\n    if (this.product.is_on_sale) {\n      price = `<div class=\"s-product-card-sale-price\">\n                <h4>${this.getPriceFormat(this.product.sale_price)}</h4>\n                <span>${this.getPriceFormat(this.product?.regular_price)}</span>\n              </div>`;\n    } else if (this.product.starting_price) {\n      price = `<div class=\"s-product-card-starting-price\">\n                  <p>${this.startingPrice}</p>\n                  <h4> ${this.getPriceFormat(this.product?.starting_price)} </h4>\n              </div>`;\n    } else {\n      price = `<h4 class=\"s-product-card-price\">${this.getPriceFormat(this.product?.price)}</h4>`;\n    }\n    return price;\n  }\n  getAddButtonLabel() {\n    if (this.product.has_preorder_campaign) {\n      return salla.lang.get('pages.products.pre_order_now');\n    }\n    if (this.product.status === 'sale' && this.product.type === 'booking') {\n      return salla.lang.get('pages.cart.book_now');\n    }\n    if (this.product.status === 'sale') {\n      return salla.lang.get('pages.cart.add_to_cart');\n    }\n    if (this.product.type !== 'donating') {\n      return salla.lang.get('pages.products.out_of_stock');\n    }\n\n    // donating\n    return salla.lang.get('pages.products.donation_exceed');\n  }\n  getProps() {\n    /**\r\n     *  Horizontal card.\r\n     */\n    this.horizontal = this.hasAttribute('horizontal');\n\n    /**\r\n     *  Support shadow on hover.\r\n     */\n    this.shadowOnHover = this.hasAttribute('shadowOnHover');\n\n    /**\r\n     *  Hide add to cart button.\r\n     */\n    this.hideAddBtn = this.hasAttribute('hideAddBtn');\n\n    /**\r\n     *  Full image card.\r\n     */\n    this.fullImage = this.hasAttribute('fullImage');\n\n    /**\r\n     *  Minimal card.\r\n     */\n    this.minimal = this.hasAttribute('minimal');\n\n    /**\r\n     *  Special card.\r\n     */\n    this.isSpecial = this.hasAttribute('isSpecial');\n\n    /**\r\n     *  Show quantity.\r\n     */\n    this.showQuantity = this.hasAttribute('showQuantity');\n  }\n  escapeHTML(str = '') {\n    return String(str).replace(/&/g, \"&amp;\").replace(/\"/g, \"&quot;\").replace(/'/g, \"&#39;\").replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\");\n  }\n  render() {\n    this.classList.add('s-product-card-entry');\n    this.setAttribute('id', this.product.id);\n    !this.horizontal && !this.fullImage && !this.minimal ? this.classList.add('s-product-card-vertical') : '';\n    this.horizontal && !this.fullImage && !this.minimal ? this.classList.add('s-product-card-horizontal') : '';\n    this.fitImageHeight && !this.isSpecial && !this.fullImage && !this.minimal ? this.classList.add('s-product-card-fit-height') : '';\n    this.isSpecial ? this.classList.add('s-product-card-special') : '';\n    this.fullImage ? this.classList.add('s-product-card-full-image') : '';\n    this.minimal ? this.classList.add('s-product-card-minimal') : '';\n    this.product?.donation ? this.classList.add('s-product-card-donation') : '';\n    this.shadowOnHover ? this.classList.add('s-product-card-shadow') : '';\n    this.product?.is_out_of_stock ? this.classList.add('s-product-card-out-of-stock') : '';\n    this.isInWishlist = !salla.config.isGuest() && salla.storage.get('salla::wishlist', []).includes(Number(this.product.id));\n    this.effectiveStatus = this.product.is_out_of_stock && window.notify_when_available_in_card && !['donating', 'financial_support'].includes(this.product?.type) ? 'out-and-notify' : this.product.status;\n    this.innerHTML = `\n        <div class=\"${!this.fullImage ? 's-product-card-image' : 's-product-card-image-full'}\">\n          <a href=\"${this.product?.url}\" aria-label=\"${this.escapeHTML(this.product?.image?.alt || this.product.name)}\">\n           <img \n              class=\"s-product-card-image-${salla.url.is_placeholder(this.product?.image?.url) ? 'contain' : this.fitImageHeight ? this.fitImageHeight : 'cover'}\"\n              src=\"${this.product?.image?.url || this.product?.thumbnail || this.placeholder || ''}\"\n              alt=\"${this.escapeHTML(this.product?.image?.alt || this.product.name)}\"\n              loading=\"lazy\"\n            />\n            ${!this.fullImage && !this.minimal ? this.getProductBadge() : ''}\n          </a>\n          ${this.fullImage ? `<a href=\"${this.product?.url}\" aria-label=${this.product.name} class=\"s-product-card-overlay\"></a>` : ''}\n          ${!this.horizontal && !this.fullImage ? `<salla-button\n              shape=\"icon\"\n              fill=\"outline\"\n              color=\"light\"\n              name=\"product-name-${this.product.id}\"\n              aria-label=\"Add or remove to wishlist\"\n              class=\"s-product-card-wishlist-btn animated ${this.isInWishlist ? 's-product-card-wishlist-added pulse-anime' : 'not-added un-favorited'}\"\n              onclick=\"salla.wishlist.toggle(${this.product.id})\"\n              data-id=\"${this.product.id}\">\n              <i class=\"sicon-heart\"></i>\n            </salla-button>` : ``}\n        </div>\n        <div class=\"s-product-card-content\">\n          ${this.isSpecial && this.product?.quantity ? `<div class=\"s-product-card-content-pie\">\n              <span>\n                <b>${salla.helpers.number(this.product?.quantity)}</b>\n                ${this.remained}\n              </span>\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"-2 -1 36 34\" class=\"s-product-card-content-pie-svg\">\n                <circle cx=\"16\" cy=\"16\" r=\"15.9155\" class=\"s-product-card-content-pie-svg-base\" />\n                <circle cx=\"16\" cy=\"16\" r=\"15.9155\" class=\"s-product-card-content-pie-svg-bar\" />\n              </svg>\n            </div>` : ``}\n\n          <div class=\"s-product-card-content-main ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}\">\n            <h3 class=\"s-product-card-content-title\">\n              <a href=\"${this.product?.url}\">${this.product?.name}</a>\n            </h3>\n\n            ${this.product?.subtitle && !this.minimal ? `<p class=\"s-product-card-content-subtitle opacity-80\">${this.product?.subtitle}</p>` : ``}\n          </div>\n          ${this.product?.donation && !this.minimal && !this.fullImage ? `<salla-progress-bar donation=${JSON.stringify(this.product?.donation)}></salla-progress-bar>\n          <div class=\"s-product-card-donation-input\">\n            ${this.product?.donation?.can_donate && this.product?.donation?.custom_amount_enabled ? `<label for=\"donation-amount-${this.product.id}\">${this.donationAmount} <span>*</span></label>\n              <input\n                type=\"text\"\n                onInput=\"${e => {\n      salla.helpers.inputDigitsOnly(e.target);\n      this.addBtn.donatingAmount = e.target.value;\n    }}\"\n                id=\"donation-amount-${this.product.id}\"\n                name=\"donating_amount\"\n                class=\"s-form-control\"\n                placeholder=\"${this.donationAmount}\" />` : ``}\n          </div>` : ''}\n          <div class=\"s-product-card-content-sub ${this.isSpecial ? 's-product-card-content-extra-padding' : ''}\">\n            ${this.product?.donation?.can_donate ? '' : this.getProductPrice()}\n            ${this.product?.rating?.stars ? `<div class=\"s-product-card-rating\">\n                <i class=\"sicon-star2 before:text-orange-300\"></i>\n                <span>${this.product.rating.stars}</span>\n              </div>` : ``}\n          </div>\n\n          ${this.isSpecial && this.product.discount_ends ? `<salla-count-down date=\"${this.formatDate(this.product.discount_ends)}\" end-of-day=${true} boxed=${true}\n              labeled=${true} />` : ``}\n\n\n          ${!this.hideAddBtn ? `<div class=\"s-product-card-content-footer gap-2\">\n              <salla-add-product-button fill=\"outline\" width=\"wide\"\n                product-id=\"${this.product.id}\"\n                product-status=\"${this.effectiveStatus}\"\n                product-type=\"${this.product.type}\">\n                ${this.product.status == 'sale' ? `<i class=\"text-base sicon-${this.product.type == 'booking' ? 'calendar-time' : 'shopping-bag'}\"></i>` : ``}\n                <span>${this.product.add_to_cart_label ? this.product.add_to_cart_label : this.getAddButtonLabel()}</span>\n              </salla-add-product-button>\n\n              ${this.horizontal || this.fullImage ? `<salla-button \n                  shape=\"icon\" \n                  fill=\"outline\" \n                  color=\"light\" \n                  id=\"card-wishlist-btn-${this.product.id}-horizontal\"\n                  aria-label=\"Add or remove to wishlist\"\n                  class=\"s-product-card-wishlist-btn animated ${this.isInWishlist ? 's-product-card-wishlist-added pulse-anime' : 'not-added un-favorited'}\"\n                  onclick=\"salla.wishlist.toggle(${this.product.id})\"\n                  data-id=\"${this.product.id}\">\n                  <i class=\"sicon-heart\"></i> \n                </salla-button>` : ``}\n            </div>` : ``}\n        </div>\n      `;\n    this.querySelectorAll('[name=\"donating_amount\"]').forEach(element => {\n      element.addEventListener('input', e => {\n        e.target.closest(\".s-product-card-content\").querySelector(\"salla-add-product-button\").setAttribute(\"donating-amount\", e.target.value);\n      });\n    });\n    if (this.product?.quantity && this.isSpecial) {\n      this.initCircleBar();\n    }\n\n    // Optimistic & Per-card wishlist toggle\n    this.querySelectorAll('.s-product-card-wishlist-btn').forEach(btn => {\n      btn.addEventListener('click', () => {\n        const willBeAdded = !btn.classList.contains('s-product-card-wishlist-added');\n        app.toggleElementClassIf(btn, 's-product-card-wishlist-added', 'not-added', () => willBeAdded);\n        app.toggleElementClassIf(btn, 'pulse-anime', 'un-favorited', () => willBeAdded);\n      });\n    });\n  }\n}\ncustomElements.define('custom-salla-product-card', ProductCard);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/partials/product-card.js?\n}");

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
/******/ 	let __webpack_exports__ = __webpack_require__("./src/assets/js/partials/product-card.js");
/******/ 	
/******/ })()
;