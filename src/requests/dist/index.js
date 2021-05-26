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
exports.getProductById = exports.getUserCartByUserId = exports.getAllAvailableUsers = exports.getUserById = void 0;
exports.getUserById = function (id) {
    return fetch("https://fakestoreapi.com/users/" + id)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var id = data.id, username = data.username, password = data.password, name = data.name, phone = data.phone;
        return { id: id, username: username, password: password, name: name, phone: phone };
    });
};
var prepareUserAPI = function (id) {
    return fetch("https://fakestoreapi.com/users/" + id);
};
exports.getAllAvailableUsers = function (ids) { return __awaiter(void 0, void 0, Promise, function () {
    var allRequests;
    return __generator(this, function (_a) {
        allRequests = ids.map(function (id) { return prepareUserAPI(id); });
        return [2 /*return*/, Promise.all(allRequests)
                .then(function (res) {
                return Promise.all(res.map(function (res) { return res.json(); }));
            })
                .then(function (data) {
                console.log(data);
                return data;
            })];
    });
}); };
exports.getUserCartByUserId = function (id) {
    return fetch("https://fakestoreapi.com/carts/user/" + id)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var firstCart = data[0];
        var id = firstCart.id, userId = firstCart.userId, date = firstCart.date, products = firstCart.products;
        return { id: id, userId: userId, date: date, products: products };
    });
};
exports.getProductById = function (id) {
    return fetch("https://fakestoreapi.com/products/" + id)
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var id = data.id, title = data.title, price = data.price, description = data.description, category = data.category, image = data.image;
        return { id: id, title: title, price: price, description: description, category: category, image: image };
    });
};