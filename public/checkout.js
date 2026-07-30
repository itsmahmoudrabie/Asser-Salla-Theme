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

/***/ "./src/assets/js/cart.js"
/*!*******************************!*\
  !*** ./src/assets/js/cart.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page */ \"./src/assets/js/base-page.js\");\n/* harmony import */ var _partials_validate_product_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./partials/validate-product-options */ \"./src/assets/js/partials/validate-product-options.js\");\n\n\nclass Cart extends _base_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  onReady() {\n    // keep update the dom base in the events\n    salla.event.cart.onUpdated(data => this.updateCartPageInfo(data));\n    app.watchElements({\n      freeShipping: '#free-shipping',\n      freeShippingBar: '#free-shipping-bar',\n      freeShippingMsg: '#free-shipping-msg',\n      freeShipApplied: '#free-shipping-applied',\n      cartGifting: '#cart-gifting',\n      sallaGifting: '#salla-gifting'\n    });\n    this.initSubmitCart();\n    (0,_partials_validate_product_options__WEBPACK_IMPORTED_MODULE_1__.validateProductOptions)();\n  }\n  initSubmitCart() {\n    let submitBtn = document.querySelector('#cart-submit');\n    if (!submitBtn) {\n      return;\n    }\n    app.onClick(submitBtn, event => {\n      let cartForms = document.querySelectorAll('form[id^=\"item-\"]');\n      let isValid = true;\n      cartForms.forEach(form => {\n        isValid = isValid && form.reportValidity();\n        if (!isValid) {\n          event.preventDefault();\n          salla.notify.error(salla.lang.get('common.messages.required_fields'));\n          return;\n        }\n      });\n      if (isValid) {\n        /** @type HTMLSallaButtonElement */\n        let btn = event.currentTarget;\n\n        // Keep loading state (also disables the button) until the page redirects.\n        const keepLoading = new MutationObserver(() => {\n          if (!btn.hasAttribute('loading')) {\n            btn.setAttribute('loading', '');\n          }\n        });\n        // Release it if we won't redirect (guest gets a login modal, or submit fails),\n        // so the spinner never gets stuck.\n        const stopLoading = () => {\n          keepLoading.disconnect();\n          btn.stop();\n        };\n        salla.event.once('login::open', stopLoading);\n        salla.event.once('cart::submit.failed', stopLoading);\n        btn.load();\n        keepLoading.observe(btn, {\n          attributes: true,\n          attributeFilter: ['loading']\n        });\n        salla.cart.submit();\n      }\n    });\n  }\n  updateCartOptions(options) {\n    if (!options || !options.length) return;\n    const arrayTwoId = options.map(item => item.id);\n    document.querySelectorAll('.cart-options form')?.forEach(form => {\n      if (!arrayTwoId.includes(form.id.value)) {\n        form.remove();\n      }\n    });\n  }\n\n  /**\r\n   * @param {import(\"@salla.sa/twilight/types/api/cart\").CartSummary} cartData\r\n   */\n  updateCartPageInfo(cartData) {\n    //if item deleted & there is no more items, just reload the page\n    if (!cartData.count) {\n      // clear cart options from the dom before page reload\n      document.querySelector('.cart-options')?.remove();\n      return window.location.reload();\n    }\n    // toggle physical gifting depned on giftable flag\n    app.toggleElementClassIf(app.cartGifting, 'active', 'hidden', () => cartData?.gift?.enabled);\n    // Use toggleAttribute to handle the `physical-products` attribute\n    app.sallaGifting?.toggleAttribute('physical-products', cartData?.gift?.type === 'physical');\n    app.sallaGifting?.toggleAttribute('digital-products', cartData?.gift?.type === 'digital');\n\n    // update the dom for cart options\n    this.updateCartOptions(cartData?.options);\n    // update each item data\n    cartData.items?.forEach(item => this.updateItemInfo(item));\n\n    // Summary totals (subtotal, discount, shipping, tax, options) are owned by\n    // <salla-cart-summary-card> now; the theme only manages the free-shipping bar.\n    app.toggleElementClassIf(app.freeShipping, 'has_free', 'hidden', () => !!cartData.free_shipping_bar);\n    if (!cartData.free_shipping_bar) {\n      return;\n    }\n    let isFree = cartData.free_shipping_bar.has_free_shipping;\n    app.toggleElementClassIf(app.freeShippingBar, 'active', 'hidden', () => !isFree).toggleElementClassIf(app.freeShipApplied, 'active', 'hidden', () => isFree);\n    app.freeShippingMsg.innerHTML = isFree ? salla.lang.get('pages.cart.has_free_shipping') : salla.lang.get('pages.cart.free_shipping_alert', {\n      amount: salla.money(cartData.free_shipping_bar.remaining)\n    });\n    app.freeShippingBar.children[0].style.width = cartData.free_shipping_bar.percent + '%';\n  }\n\n  /**\r\n   * @param {import(\"@salla.sa/twilight/types/api/cart\").CartItem} item\r\n   */\n  updateItemInfo(item) {\n    // lets get the elements for this item\n    let cartItem = document.querySelector('#item-' + item.id);\n    if (!cartItem) {\n      salla.log(`Can't get the cart item dom for ${item.id}!`);\n      return;\n    }\n    let totalElement = cartItem.querySelector('.item-total'),\n      priceElement = cartItem.querySelector('.item-price'),\n      regularPriceElement = cartItem.querySelector('.item-regular-price'),\n      itemOriginalPrice = cartItem.querySelector('.item-original-price'),\n      weightRow = cartItem.querySelector('.item-weight-row'),\n      weightElement = cartItem.querySelector('.item-weight'),\n      offerElement = cartItem.querySelector('.offer-name'),\n      oldOffers = cartItem.querySelector('.old-offers'),\n      freeRibbon = cartItem.querySelector('.free-ribbon'),\n      offerIconElement = cartItem.querySelector('.offer-icon'),\n      hasSpecialPrice = item.offer || item.special_price > 0,\n      hasSalePrice = item.is_on_sale,\n      newOffersActive = item.detailed_offers?.length > 0;\n    let item_total = item.detailed_offers?.length > 0 ? item.total_special_price : item.total;\n    let total = salla.money(item_total);\n    if (total !== totalElement.innerHTML) {\n      totalElement.innerHTML = total;\n      // app.anime(totalElement, { scale: [.88, 1] });\n    }\n    app.toggleElementClassIf([offerElement, oldOffers], 'offer-applied', 'hidden', () => hasSpecialPrice && !newOffersActive).toggleElementClassIf([regularPriceElement, offerIconElement], 'offer-applied', 'hidden', () => hasSpecialPrice).toggleElementClassIf([itemOriginalPrice], 'offer-applied', 'hidden', () => hasSalePrice).toggleElementClassIf(priceElement, 'text-red-400', 'text-sm text-gray-400', () => hasSpecialPrice).toggleElementClassIf(freeRibbon, 'active', 'hidden', () => item.price == 0);\n    priceElement.innerHTML = salla.money(item.price);\n    if (weightElement) {\n      weightElement.innerHTML = item.weight_label || '';\n    }\n    app.toggleElementClassIf(weightRow, 'has-weight', 'hidden', () => !!item.weight_label);\n\n    // Update original price when item is on sale\n    if (hasSalePrice) {\n      itemOriginalPrice.innerHTML = salla.money(item.original_price);\n    }\n    if (!hasSpecialPrice) {\n      return;\n    }\n    if (!newOffersActive) {\n      offerElement.innerHTML = item.offer.names;\n    }\n    regularPriceElement.innerHTML = salla.money(item.product_price);\n  }\n}\nCart.initiateWhenReady(['cart']);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/cart.js?\n}");

/***/ },

/***/ "./src/assets/js/partials/validate-product-options.js"
/*!************************************************************!*\
  !*** ./src/assets/js/partials/validate-product-options.js ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   validateProductOptions: () => (/* binding */ validateProductOptions)\n/* harmony export */ });\n/**\r\n * Validates product options for items in the cart.\r\n */\nfunction validateProductOptions() {\n  const cartItems = document.querySelectorAll('.main-content form:not(.cart-options form)');\n  if (!cartItems.length) return;\n  cartItems.forEach(item => {\n    const itemId = getItemId(item);\n    const productOptions = item.querySelector('salla-product-options');\n    const quantityComponent = item.querySelector('salla-quantity-input');\n    if (quantityComponent) {\n      observeQuantityChanges(quantityComponent, itemId, item);\n    }\n\n    // Listen for product options changes\n    if (productOptions) {\n      productOptions.addEventListener('changed', e => {\n        setTimeout(() => {\n          if (!item.reportValidity() || e.detail?.event?.type == 'added') return;\n          if (Number(itemId) === Number(e.detail?.productId)) {\n            appendLoadingOverlay(e.detail?.productId);\n          }\n        }, 100);\n      });\n    }\n  });\n\n  // Event handlers for cart updates\n  salla.cart.event.onItemUpdated((_data, id) => {\n    removeLoadingOverlay(id);\n  });\n  salla.cart.event.onItemUpdatedFailed((_data, itemId) => {\n    handleCartUpdateFailure(itemId, cartItems);\n  });\n}\n\n/**\r\n * Observes changes in quantity input for a specific cart item.\r\n */\nfunction observeQuantityChanges(quantityComponent, itemId, item) {\n  const observer = new MutationObserver(() => {\n    const quantityInput = quantityComponent.querySelector('input[name=\"quantity\"]');\n    if (quantityInput) {\n      observer.disconnect(); // Stop observing once input is found\n      quantityInput.addEventListener('change', e => {\n        if (!item.reportValidity()) return;\n        if (Number(itemId) === Number(e.detail?.productId)) {\n          appendLoadingOverlay(e.detail?.productId);\n        }\n      });\n    }\n  });\n  observer.observe(quantityComponent, {\n    childList: true,\n    subtree: true\n  });\n}\n\n/**\r\n * Handles cart update failures by restoring the item state.\r\n */\nfunction handleCartUpdateFailure(itemId, cartItems) {\n  return salla.api.cart.getCurrentCartId(false, \"salla-product-options\").then(cartId => salla.cart.details(cartId, ['options'])).then(({\n    data: {\n      cart: cartDetails\n    }\n  }) => {\n    const currentProduct = cartDetails.items.find(item => Number(item.id) === Number(itemId));\n    if (!currentProduct) throw new Error(`Product with ID ${itemId} not found in cart details.`);\n    updateCartItemState(cartItems, currentProduct);\n  }).then(() => removeLoadingOverlay()).catch(error => {\n    console.error(\"Error restoring cart item state:\", error);\n    removeLoadingOverlay();\n  });\n}\n\n/**\r\n * Updates the UI for a specific cart item based on its current state.\r\n */\nfunction updateCartItemState(cartItems, currentProduct) {\n  cartItems.forEach(item => {\n    const ID = getItemId(item);\n    if (Number(currentProduct.id) === Number(ID)) {\n      const productOptions = item.querySelector('salla-product-options');\n      const quantityInput = item.querySelector('salla-quantity-input');\n      if (productOptions) productOptions.setOptionsData(currentProduct.options, false);\n      if (quantityInput) quantityInput.setValue(currentProduct.quantity, false);\n    }\n  });\n}\n\n/**\r\n * Appends a loading overlay to the cart item with the given ID.\r\n */\nfunction appendLoadingOverlay(itemId) {\n  if (!itemId) return;\n  const parentElement = document.querySelector(`#item-${itemId} .cart-item`);\n  if (parentElement) {\n    // Remove any existing overlay first to prevent stacking\n    const existingOverlay = parentElement.querySelector('.loading-overlay');\n    if (existingOverlay) {\n      existingOverlay.remove();\n    }\n    const loadingOverlay = createLoadingOverlay();\n    parentElement.appendChild(loadingOverlay);\n  }\n}\n\n/**\r\n * Removes the loading overlay from a specific cart item or all items if no ID is provided.\r\n */\nfunction removeLoadingOverlay(itemId) {\n  const targetItems = itemId ? [document.querySelector(`.main-content form:not(.cart-options form)#item-${itemId} .cart-item`)] : document.querySelectorAll('.main-content form:not(.cart-options form) .cart-item');\n  targetItems.forEach(item => {\n    const loadingOverlay = item?.querySelector('.loading-overlay');\n    if (loadingOverlay) {\n      setTimeout(() => loadingOverlay.remove(), 0);\n    }\n  });\n}\n\n/**\r\n * Creates a loading overlay element.\r\n */\nfunction createLoadingOverlay() {\n  const overlay = document.createElement('div');\n  overlay.classList.add('loading-overlay', 'absolute', 'inset-0', 'z-50', 'flex', 'justify-center', 'items-center');\n  const background = document.createElement('div');\n  background.classList.add('absolute', 'inset-0', 'bg-white', 'opacity-40');\n  const loader = document.createElement('div');\n  loader.innerHTML = '<salla-loading size=\"32\"></salla-loading>';\n  loader.classList.add('relative', 'z-10');\n  overlay.appendChild(background);\n  overlay.appendChild(loader);\n  return overlay;\n}\n\n/**\r\n * Extracts the item ID from a cart item element.\r\n */\nfunction getItemId(item) {\n  return item.querySelector('input[type=\"hidden\"][name=\"id\"]')?.value;\n}\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/partials/validate-product-options.js?\n}");

/***/ },

/***/ "./src/assets/js/thankyou.js"
/*!***********************************!*\
  !*** ./src/assets/js/thankyou.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-page */ \"./src/assets/js/base-page.js\");\n\nclass ThankYou extends _base_page__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  onReady() {\n    document.querySelectorAll('.thanks-item').forEach((item, i) => {\n      item.style.animationDelay = `${i * 100}ms`;\n      item.classList.add('slide-in-start');\n    });\n    let form = document.querySelector('#invoice-form');\n    salla.order.event.onInvoiceSent(res => {\n      form.innerHTML = res.data.message;\n      form.classList.add('sent');\n    });\n  }\n}\nThankYou.initiateWhenReady(['thank-you']);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/thankyou.js?\n}");

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
/******/ 	__webpack_require__("./src/assets/js/cart.js");
/******/ 	let __webpack_exports__ = __webpack_require__("./src/assets/js/thankyou.js");
/******/ 	
/******/ })()
;