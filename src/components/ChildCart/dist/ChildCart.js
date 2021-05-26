"use strict";
exports.__esModule = true;
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var react_1 = require("react");
var requests_1 = require("../../requests");
var collapse_module_css_1 = require("./collapse.module.css");
var CollapseBox = function (props) {
    var childId = props.childId, childName = props.childName;
    react_1["default"].useEffect(function () {
        requests_1.getUserCartByUserId(childId);
    }, []);
    var _a = react_1["default"].useState(false), panelOpen = _a[0], setOpen = _a[1];
    var _b = react_1["default"].useState(), panelStyle = _b[0], setStyle = _b[1];
    var toggleCollapse = function () {
        setOpen(!panelOpen);
    };
    console.log(childId, 'rerun', panelOpen);
    return (react_1["default"].createElement("div", { className: collapse_module_css_1["default"].root },
        react_1["default"].createElement("div", { className: collapse_module_css_1["default"].titleNav, onClick: function () { return toggleCollapse(); } },
            react_1["default"].createElement("span", null, childName),
            react_1["default"].createElement("span", null,
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: panelOpen ? free_solid_svg_icons_1.faCaretUp : free_solid_svg_icons_1.faCaretDown }))),
        react_1["default"].createElement("div", { className: !panelOpen
                ? collapse_module_css_1["default"].contentPanel
                : [collapse_module_css_1["default"].contentPanel, collapse_module_css_1["default"].display].join(' ') })));
};
exports["default"] = CollapseBox;
