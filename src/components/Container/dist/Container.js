"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ChildCart_1 = require("../ChildCart");
var requests_1 = require("../../requests");
var styles_module_css_1 = require("./styles.module.css");
var userIds = [1, 2, 3, 4, 8];
var Container = function () {
    var _a = react_1["default"].useState([]), users = _a[0], setUsers = _a[1];
    react_1["default"].useEffect(function () {
        requests_1.getAllAvailableUsers(userIds).then(function (u) { return setUsers(u); });
    }, []);
    return (react_1["default"].createElement("div", { className: styles_module_css_1["default"].root }, users.map(function (u, i) {
        var userName = u.name.firstname + ' ' + u.name.lastname;
        return react_1["default"].createElement(ChildCart_1["default"], { childId: u.id, childName: userName, key: i });
    })));
};
exports["default"] = Container;
