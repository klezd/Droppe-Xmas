"use strict";
exports.__esModule = true;
exports.updateCart = exports.getProductById = exports.getAllCarts = exports.getAllAvailableUsers = void 0;
var array_1 = require("../utils/array");
var prepareUserAPI = function (id) {
    return fetch("https://fakestoreapi.com/users/" + id);
};
exports.getAllAvailableUsers = function (ids) {
    var allRequests = ids.map(function (id) { return prepareUserAPI(id); });
    return Promise.all(allRequests)
        .then(function (res) {
        return Promise.all(res.map(function (res) { return res.json(); }));
    })
        .then(function (data) {
        return data;
    });
};
exports.getAllCarts = function () {
    return fetch('https://fakestoreapi.com/carts')
        .then(function (res) { return res.json(); })
        .then(function (data) {
        var modifiedData = array_1.groupItemsOfArrayByIndex(data, 'userId');
        var userIds = Object.keys(modifiedData);
        return { userIds: userIds, userWithCarts: modifiedData };
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
exports.updateCart = function (allCarts) {
    var userIds = Object.keys(allCarts);
    var requests = [];
    userIds.map(function (userId) {
        var cart = allCarts[userId];
        var products = cart.products.map(function (p) { return ({
            productId: p.productId,
            quantity: p.quantity
        }); });
        var cartToUpdate = {
            userId: userId,
            date: cart.date,
            products: products
        };
        var req = fetch("https://fakestoreapi.com/carts/" + cart.id, {
            method: 'PUT',
            body: JSON.stringify(cartToUpdate)
        });
        requests.push(req);
    });
    return Promise.all(requests)
        .then(function (res) {
        return Promise.all(res.map(function (res) { return res.json(); }));
    })
        .then(function (data) {
        return data;
    });
};
