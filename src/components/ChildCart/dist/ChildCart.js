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
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var requests_1 = require("../../requests");
var Tooltip_1 = require("../common/Tooltip");
var ProductLine_1 = require("../common/ProductLine");
var childcart_module_css_1 = require("./childcart.module.css");
var ChildCart = function (props) {
    var childId = props.childId, childName = props.childName, cart = props.cart, onUpdateCart = props.onUpdateCart;
    var _a = react_1["default"].useState(false), panelOpen = _a[0], setOpen = _a[1];
    var _b = react_1["default"].useState({}), products = _b[0], setProduct = _b[1];
    var _c = react_1["default"].useState(0), price = _c[0], setPrice = _c[1];
    var _d = react_1["default"].useState(true), loading = _d[0], setLoading = _d[1];
    var emptyCart = {
        id: cart.id,
        userId: cart.userId,
        userName: childName,
        date: cart.date,
        products: []
    };
    var _e = react_1["default"].useState(emptyCart), approvedCart = _e[0], setApprovedCart = _e[1];
    var isDiabled = approvedCart.products.length === 0;
    var buttonStyle = isDiabled
        ? ['submitBtn', 'disabled'].join(' ')
        : 'submitBtn';
    react_1["default"].useEffect(function () {
        cart.products.map(function (PIC) { return __awaiter(void 0, void 0, void 0, function () {
            var product, newProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(Object.keys(products).length === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, requests_1.getProductById(PIC.productId)];
                    case 1:
                        product = _a.sent();
                        newProducts = products;
                        newProducts[PIC.productId] = product;
                        setProduct(newProducts);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
        setLoading(false);
        // Set init state of all cart
        onUpdateCart(emptyCart);
    }, []);
    function toggleCollapse() {
        setOpen(!panelOpen);
    }
    function onSelectProduct(id, quantity, pInfo) {
        // This function will select the product in current cart, and add the product to new cart.
        var currentProductsInCart = approvedCart.products;
        if (currentProductsInCart.some(function (p) { return p.productId === id; })) {
            RemoveProductFromCart(id, quantity, pInfo);
        }
        else {
            AddProductToCart(id, quantity, pInfo);
        }
    }
    function AddProductToCart(id, quantity, pInfo) {
        var newInfo = approvedCart.products;
        newInfo.push({
            productId: id,
            quantity: quantity,
            productInfo: pInfo
        });
        var totalPPrice = pInfo.price * quantity;
        updateCartWithProduct(newInfo);
        setPrice(price + totalPPrice);
    }
    function RemoveProductFromCart(id, quantity, pInfo) {
        var newInfo = approvedCart.products;
        var totalPPrice = pInfo.price * quantity;
        newInfo = newInfo.filter(function (p) { return p.productId !== id; });
        updateCartWithProduct(newInfo);
        setPrice(price - totalPPrice);
    }
    function updateCartWithProduct(p) {
        var userId = cart.userId, date = cart.date;
        var newCart = {
            id: cart.id,
            userId: userId,
            userName: childName,
            date: date,
            products: p
        };
        setApprovedCart(newCart);
    }
    function onUpdateChildCart() {
        if (approvedCart.products.length !== 0) {
            onUpdateCart(approvedCart, true);
            toggleCollapse();
        }
    }
    return (react_1["default"].createElement("div", { className: childcart_module_css_1["default"].root, key: childName.replaceAll(' ', '_') + "_" + childId, id: childName.replaceAll(' ', '_') + "_" + childId },
        react_1["default"].createElement(Tooltip_1["default"], { element: react_1["default"].createElement("div", { className: panelOpen || approvedCart.products.length !== 0
                    ? [childcart_module_css_1["default"].titleNav, childcart_module_css_1["default"].active].join(' ')
                    : childcart_module_css_1["default"].titleNav, onClick: function () { return toggleCollapse(); } },
                react_1["default"].createElement("span", null, childName),
                react_1["default"].createElement("span", null,
                    react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: panelOpen ? free_solid_svg_icons_1.faCaretUp : free_solid_svg_icons_1.faCaretDown }))), description: "Open to view cart", position: { top: 10, left: 200 }, toolTipAction: function () { return toggleCollapse(); } }),
        react_1["default"].createElement("div", { className: !panelOpen
                ? [childcart_module_css_1["default"].contentPanel, childcart_module_css_1["default"].collapse].join(' ')
                : [childcart_module_css_1["default"].contentPanel, childcart_module_css_1["default"].expand].join(' ') }, loading || Object.keys(products).length === 0 ? (react_1["default"].createElement("div", null, " Loading")) : (react_1["default"].createElement("div", null,
            cart.products.map(function (PIC, i) {
                if (products[PIC.productId]) {
                    var _a = products[PIC.productId], id_1 = _a.id, title_1 = _a.title, price_1 = _a.price, description = _a.description, image_1 = _a.image;
                    var quantity = PIC.quantity;
                    var isChecked = approvedCart.products.filter(function (p) { return p.productId === id_1; })
                        .length === 1;
                    return (react_1["default"].createElement(ProductLine_1["default"], { key: id_1 + "_" + i, divId: id_1 + "_" + i, id: id_1, title: title_1, description: description, quantity: quantity, price: price_1, image: image_1, isSelected: isChecked, onSelect: function (q) {
                            return onSelectProduct(id_1, q, { price: price_1, title: title_1, image: image_1 });
                        } }));
                }
                else {
                    return react_1["default"].createElement(react_1["default"].Fragment, null);
                }
            }),
            react_1["default"].createElement("div", { className: childcart_module_css_1["default"].bottomPanel },
                react_1["default"].createElement("div", null,
                    "Total Price : ",
                    Number(price).toFixed(2),
                    " EUR"),
                react_1["default"].createElement("div", { className: buttonStyle, onClick: onUpdateChildCart },
                    react_1["default"].createElement("span", null, "Update cart"))))))));
};
exports["default"] = ChildCart;
