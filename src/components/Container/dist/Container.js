"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var ChildCart_1 = require("../ChildCart");
var requests_1 = require("../../requests");
var array_1 = require("../../utils/array");
var cart_1 = require("../../utils/cart");
var SummaryModal_1 = require("../SummaryModal");
var Modal_1 = require("../common/Modal");
var Loader_1 = require("../common/Loader");
var styles_module_css_1 = require("./styles.module.css");
var Container = function (props) {
    var _a = react_1["default"].useState([]), users = _a[0], setUsers = _a[1];
    // constant state, won't change when updating cart
    var _b = react_1["default"].useState({}), initcarts = _b[0], setUnchangableCarts = _b[1];
    var _c = react_1["default"].useState({}), carts = _c[0], setCarts = _c[1];
    var _d = react_1["default"].useState(true), loading = _d[0], setLoading = _d[1];
    var _e = react_1["default"].useState(0), price = _e[0], setPrice = _e[1];
    var _f = react_1["default"].useState(0), normPrice = _f[0], setNPrice = _f[1];
    var _g = react_1["default"].useState(true), disabledBtn = _g[0], setdisabledBtn = _g[1];
    var _h = react_1["default"].useState(null), display = _h[0], setDisplay = _h[1];
    react_1["default"].useEffect(function () {
        if (users.length === 0 || Object.keys(carts).length === 0) {
            requests_1.getAllCarts().then(function (r) { return __awaiter(void 0, void 0, void 0, function () {
                var userIds, userWithCarts, userWithOneCart, initCarts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userIds = r.userIds, userWithCarts = r.userWithCarts;
                            return [4 /*yield*/, requests_1.getAllAvailableUsers(userIds).then(function (u) { return setUsers(u); })];
                        case 1:
                            _a.sent();
                            userWithOneCart = array_1.getFirstValueOfItemInObject(userWithCarts);
                            setCarts(userWithOneCart);
                            initCarts = Object.assign({}, userWithOneCart);
                            setUnchangableCarts(initCarts);
                            setLoading(false);
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        props.setTotalPrice(price);
    }, [price]);
    function onUpdateAllCarts(userId, cart, isModified) {
        var newCart = carts;
        newCart[userId] = cart;
        setCarts(newCart);
        if (isModified)
            UpdatePrice();
        if (disabledBtn && isModified)
            setdisabledBtn(false);
    }
    function UpdatePrice() {
        var _a = cart_1.GetPriceWithDiscountForCarts(carts), discountPrice = _a.discountPrice, normalPrice = _a.normalPrice;
        setPrice(discountPrice);
        setNPrice(normalPrice);
    }
    function openModal(modal) {
        // Set to prevent scroll on open modal
        document.body.style.overflow = 'hidden';
        setDisplay(modal);
    }
    function closeModal() {
        document.body.style.overflow = 'unset';
        setDisplay(null);
    }
    function onGetSummary() {
        if (!disabledBtn)
            openModal('summary');
    }
    return (react_1["default"].createElement("div", { className: styles_module_css_1["default"].root },
        react_1["default"].createElement("p", { className: styles_module_css_1["default"].title }, "Santa Claus is coming..."),
        react_1["default"].createElement("p", { onClick: function () { return openModal('help'); } }, "Here you can find your children 's wish list for their Christmas gift. Click here if you have any struggles!"),
        loading ? (react_1["default"].createElement(Loader_1["default"], null)) : (react_1["default"].createElement("div", { className: styles_module_css_1["default"].cartsContainer }, users.map(function (u, i) {
            var userName = u.name.firstname + ' ' + u.name.lastname;
            return (react_1["default"].createElement(ChildCart_1["default"], { childId: u.id, childName: userName, key: i, cart: initcarts[u.id], onUpdateCart: function (ncart, isModified) {
                    return onUpdateAllCarts(u.id, ncart, isModified);
                } }));
        }))),
        react_1["default"].createElement("div", { className: styles_module_css_1["default"].btnHolder },
            react_1["default"].createElement("div", { className: disabledBtn ? ['submitBtn', 'disabled'].join(' ') : 'submitBtn', onClick: function () { return onGetSummary(); } }, "Get Summary")),
        display === 'summary' && (react_1["default"].createElement(SummaryModal_1["default"], { display: display === 'summary', closeModal: function () { return closeModal(); }, cartDetail: carts, tprice: price, nprice: normPrice, UpdatePrice: function () { return UpdatePrice(); } })),
        display === 'help' && (react_1["default"].createElement(Modal_1["default"], { display: display === 'help', closeModal: function () { return closeModal(); }, title: "Help", backgroundImage: "./christmas-gift.jpg", contentOpacity: 0.35, content: react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", null, "Below is the list of section of each child. Each section can be opened and you can modify their choice."),
                react_1["default"].createElement("p", null, "Click on each line to select or deselect product."),
                react_1["default"].createElement("p", null, "Hover on question mark (?) for product description."),
                react_1["default"].createElement("p", null, "After finish modifying, you can press \"Update cart\" to update your choice. Tap the panel again to close section if needed."),
                react_1["default"].createElement("p", null, "You will find \"Get Summary\" button at the end of page. Open to view what you have selected."),
                react_1["default"].createElement("p", null, "Once you ready for payment, choose \"Confirm\" on summary form."),
                react_1["default"].createElement("p", null, "We wish you a happy holiday!"),
                react_1["default"].createElement("p", null, "Merry Christmas")) }))));
};
exports["default"] = Container;
