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

/***/ "./src/assets/js/partials/digital-files.js"
/*!*************************************************!*\
  !*** ./src/assets/js/partials/digital-files.js ***!
  \*************************************************/
() {

eval("{class DigitalFilesSettings extends HTMLElement {\n  connectedCallback() {\n    this.settings = JSON.parse(this.getAttribute(\"settings\") || \"{}\");\n    if (window.app?.status === \"ready\") {\n      this.onReady();\n    } else {\n      document.addEventListener(\"theme::ready\", () => this.onReady());\n    }\n  }\n  onReady() {\n    salla.lang.onLoaded(() => {\n      this.render();\n    });\n  }\n  render() {\n    if (!this.settings || Object.keys(this.settings).length === 0) {\n      this.innerHTML = \"\";\n      return;\n    }\n    const trans = key => salla.lang.get(key);\n    const formats = Array.isArray(this.settings.formats) ? this.settings.formats.join(\", \") : this.settings.formats || \"-\";\n    this.innerHTML = `\n            <section class=\"bg-white p-5 rounded-md mb-5 last:mb-0\">\n                <ul class=\"space-y-4\">\n                    <li class=\"flex items-center justify-between\">\n                        <div class=\"flex items-center gap-3\">\n                            <i class=\"sicon-page\"></i>\n                            <div class=\"text-gray-600 text-sm\">${trans(\"pages.products.number_of_files\")}</div>\n                        </div>\n                        <div class=\"text-gray-900\">${this.settings.count || \"-\"}</div>\n                    </li>\n                    <li class=\"flex items-center justify-between\">\n                        <div class=\"flex items-center gap-3\">\n                            <i class=\"sicon-file-archive\"></i>\n                            <div class=\"text-gray-600 text-sm\">${trans(\"pages.products.file_formats\")}</div>\n                        </div>\n                        <div class=\"text-gray-900 text-sm\">${formats}</div>\n                    </li>\n                    <li class=\"flex items-center justify-between\">\n                        <div class=\"flex items-center gap-3\">\n                            <i class=\"sicon-calendar\"></i>\n                            <div class=\"text-gray-600 text-sm\">${trans(\"pages.products.file_expiration_period\")}</div>\n                        </div>\n                        <div class=\"text-gray-900 text-sm\">${this.settings.download_period || \"-\"}</div>\n                    </li>\n                    ${this.accessFileList()}\n                </ul>\n            </section>\n        `;\n  }\n  accessFileList() {\n    if (!this.settings.access_new_files) {\n      return \"\";\n    }\n    const trans = key => salla.lang.get(key);\n    return `\n        <li class=\"flex items-center justify-between\">\n            <div class=\"flex items-center gap-3\">\n                <i class=\"sicon-rotate\"></i>\n                <div class=\"text-gray-600 text-sm\">${trans(\"pages.products.free_access_to_new_files\")}</div>\n            </div>\n            <div class=\"text-gray-900 text-sm\">\n                <i class=\"sicon-check-circle text-lg\"></i>\n            </div>\n        </li>\n    `;\n  }\n}\ncustomElements.define(\"digital-files-settings\", DigitalFilesSettings);\n\n//# sourceURL=webpack://theme-raed/./src/assets/js/partials/digital-files.js?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/assets/js/partials/digital-files.js"]();
/******/ 	
/******/ })()
;