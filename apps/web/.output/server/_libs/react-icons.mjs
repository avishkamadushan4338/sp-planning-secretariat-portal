import { __toESM } from "../_runtime.mjs";
import { require_react } from "./react+tanstack__react-query.mjs";
//#region ../../node_modules/react-icons/lib/iconContext.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var DefaultContext = {
	color: void 0,
	size: void 0,
	className: void 0,
	style: void 0,
	attr: void 0
};
var IconContext = import_react.createContext && /*#__PURE__*/ import_react.createContext(DefaultContext);
//#endregion
//#region ../../node_modules/react-icons/lib/iconBase.mjs
var _excluded = [
	"attr",
	"size",
	"title"
];
function _objectWithoutProperties(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
function _objectWithoutPropertiesLoose(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
function _defineProperty(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function Tree2Element(tree) {
	return tree && tree.map((node, i) => /*#__PURE__*/ import_react.createElement(node.tag, _objectSpread({ key: i }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
	return (props) => /*#__PURE__*/ import_react.createElement(IconBase, _extends({ attr: _objectSpread({}, data.attr) }, props), Tree2Element(data.child));
}
function IconBase(props) {
	var elem = (conf) => {
		var attr = props.attr, size = props.size, title = props.title, svgProps = _objectWithoutProperties(props, _excluded);
		var computedSize = size || conf.size || "1em";
		var className;
		if (conf.className) className = conf.className;
		if (props.className) className = (className ? className + " " : "") + props.className;
		return /*#__PURE__*/ import_react.createElement("svg", _extends({
			stroke: "currentColor",
			fill: "currentColor",
			strokeWidth: "0"
		}, conf.attr, attr, svgProps, {
			className,
			style: _objectSpread(_objectSpread({ color: props.color || conf.color }, conf.style), props.style),
			height: computedSize,
			width: computedSize,
			xmlns: "http://www.w3.org/2000/svg"
		}), title && /*#__PURE__*/ import_react.createElement("title", null, title), props.children);
	};
	return IconContext !== void 0 ? /*#__PURE__*/ import_react.createElement(IconContext.Consumer, null, (conf) => elem(conf)) : elem(DefaultContext);
}
//#endregion
//#region ../../node_modules/react-icons/fi/index.mjs
function FiZoomOut(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "11",
					"cy": "11",
					"r": "8"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "21",
					"x2": "16.65",
					"y2": "16.65"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "11",
					"x2": "14",
					"y2": "11"
				},
				"child": []
			}
		]
	})(props);
}
function FiZoomIn(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "11",
					"cy": "11",
					"r": "8"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "21",
					"x2": "16.65",
					"y2": "16.65"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "11",
					"y1": "8",
					"x2": "11",
					"y2": "14"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "11",
					"x2": "14",
					"y2": "11"
				},
				"child": []
			}
		]
	})(props);
}
function FiZap(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polygon",
			"attr": { "points": "13 2 3 14 12 14 11 22 21 10 12 10 13 2" },
			"child": []
		}]
	})(props);
}
function FiX(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "18",
				"y1": "6",
				"x2": "6",
				"y2": "18"
			},
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "6",
				"y1": "6",
				"x2": "18",
				"y2": "18"
			},
			"child": []
		}]
	})(props);
}
function FiUsers(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" },
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "9",
					"cy": "7",
					"r": "4"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M23 21v-2a4 4 0 0 0-3-3.87" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M16 3.13a4 4 0 0 1 0 7.75" },
				"child": []
			}
		]
	})(props);
}
function FiUser(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "7",
				"r": "4"
			},
			"child": []
		}]
	})(props);
}
function FiUnlock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "3",
				"y": "11",
				"width": "18",
				"height": "11",
				"rx": "2",
				"ry": "2"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M7 11V7a5 5 0 0 1 9.9-1" },
			"child": []
		}]
	})(props);
}
function FiTrendingUp(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "23 6 13.5 15.5 8.5 10.5 1 18" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "17 6 23 6 23 12" },
			"child": []
		}]
	})(props);
}
function FiTrendingDown(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "23 18 13.5 8.5 8.5 13.5 1 6" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "17 18 23 18 23 12" },
			"child": []
		}]
	})(props);
}
function FiTrash2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "3 6 5 6 21 6" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "10",
					"y1": "11",
					"x2": "10",
					"y2": "17"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "14",
					"y1": "11",
					"x2": "14",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiToggleRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "1",
				"y": "5",
				"width": "22",
				"height": "14",
				"rx": "7",
				"ry": "7"
			},
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "16",
				"cy": "12",
				"r": "3"
			},
			"child": []
		}]
	})(props);
}
function FiToggleLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "1",
				"y": "5",
				"width": "22",
				"height": "14",
				"rx": "7",
				"ry": "7"
			},
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "8",
				"cy": "12",
				"r": "3"
			},
			"child": []
		}]
	})(props);
}
function FiThumbsUp(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" },
			"child": []
		}]
	})(props);
}
function FiTarget(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "6"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "2"
				},
				"child": []
			}
		]
	})(props);
}
function FiTag(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" },
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "7",
				"y1": "7",
				"x2": "7.01",
				"y2": "7"
			},
			"child": []
		}]
	})(props);
}
function FiStar(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polygon",
			"attr": { "points": "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" },
			"child": []
		}]
	})(props);
}
function FiShield(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
			"child": []
		}]
	})(props);
}
function FiSettings(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "3"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" },
			"child": []
		}]
	})(props);
}
function FiSend(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "22",
				"y1": "2",
				"x2": "11",
				"y2": "13"
			},
			"child": []
		}, {
			"tag": "polygon",
			"attr": { "points": "22 2 15 22 11 13 2 9 22 2" },
			"child": []
		}]
	})(props);
}
function FiSearch(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "11",
				"cy": "11",
				"r": "8"
			},
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "21",
				"y1": "21",
				"x2": "16.65",
				"y2": "16.65"
			},
			"child": []
		}]
	})(props);
}
function FiRefreshCw(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "23 4 23 10 17 10" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "1 20 1 14 7 14" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" },
				"child": []
			}
		]
	})(props);
}
function FiRadio(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "2"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" },
			"child": []
		}]
	})(props);
}
function FiPrinter(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "6 9 6 2 18 2 18 9" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" },
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "6",
					"y": "14",
					"width": "12",
					"height": "8"
				},
				"child": []
			}
		]
	})(props);
}
function FiPlus(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "12",
				"y1": "5",
				"x2": "12",
				"y2": "19"
			},
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "5",
				"y1": "12",
				"x2": "19",
				"y2": "12"
			},
			"child": []
		}]
	})(props);
}
function FiPhone(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" },
			"child": []
		}]
	})(props);
}
function FiPackage(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "16.5",
					"y1": "9.4",
					"x2": "7.5",
					"y2": "4.21"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "3.27 6.96 12 12.01 20.73 6.96" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "22.08",
					"x2": "12",
					"y2": "12"
				},
				"child": []
			}
		]
	})(props);
}
function FiMonitor(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "2",
					"y": "3",
					"width": "20",
					"height": "14",
					"rx": "2",
					"ry": "2"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "21",
					"x2": "16",
					"y2": "21"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "17",
					"x2": "12",
					"y2": "21"
				},
				"child": []
			}
		]
	})(props);
}
function FiMinimize2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "4 14 10 14 10 20" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "20 10 14 10 14 4" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "14",
					"y1": "10",
					"x2": "21",
					"y2": "3"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "21",
					"x2": "10",
					"y2": "14"
				},
				"child": []
			}
		]
	})(props);
}
function FiMessageSquare(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
			"child": []
		}]
	})(props);
}
function FiMessageCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" },
			"child": []
		}]
	})(props);
}
function FiMenu(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "12",
					"x2": "21",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "6",
					"x2": "21",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "18",
					"x2": "21",
					"y2": "18"
				},
				"child": []
			}
		]
	})(props);
}
function FiMaximize2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polyline",
				"attr": { "points": "15 3 21 3 21 9" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "9 21 3 21 3 15" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "3",
					"x2": "14",
					"y2": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "21",
					"x2": "10",
					"y2": "14"
				},
				"child": []
			}
		]
	})(props);
}
function FiMap(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polygon",
				"attr": { "points": "1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "2",
					"x2": "8",
					"y2": "18"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "6",
					"x2": "16",
					"y2": "22"
				},
				"child": []
			}
		]
	})(props);
}
function FiMapPin(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "10",
				"r": "3"
			},
			"child": []
		}]
	})(props);
}
function FiMail(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "22,6 12,13 2,6" },
			"child": []
		}]
	})(props);
}
function FiLogOut(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "16 17 21 12 16 7" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "12",
					"x2": "9",
					"y2": "12"
				},
				"child": []
			}
		]
	})(props);
}
function FiLock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "3",
				"y": "11",
				"width": "18",
				"height": "11",
				"rx": "2",
				"ry": "2"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M7 11V7a5 5 0 0 1 10 0v4" },
			"child": []
		}]
	})(props);
}
function FiList(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "6",
					"x2": "21",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "12",
					"x2": "21",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "18",
					"x2": "21",
					"y2": "18"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "6",
					"x2": "3.01",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "12",
					"x2": "3.01",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "18",
					"x2": "3.01",
					"y2": "18"
				},
				"child": []
			}
		]
	})(props);
}
function FiLink(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" },
			"child": []
		}]
	})(props);
}
function FiLayout(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "3",
					"width": "18",
					"height": "18",
					"rx": "2",
					"ry": "2"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "9",
					"x2": "21",
					"y2": "9"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "9",
					"y1": "21",
					"x2": "9",
					"y2": "9"
				},
				"child": []
			}
		]
	})(props);
}
function FiLayers(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "polygon",
				"attr": { "points": "12 2 2 7 12 12 22 7 12 2" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "2 17 12 22 22 17" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "2 12 12 17 22 12" },
				"child": []
			}
		]
	})(props);
}
function FiKey(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" },
			"child": []
		}]
	})(props);
}
function FiInbox(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "22 12 16 12 14 15 10 15 8 12 2 12" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" },
			"child": []
		}]
	})(props);
}
function FiImage(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "3",
					"width": "18",
					"height": "18",
					"rx": "2",
					"ry": "2"
				},
				"child": []
			},
			{
				"tag": "circle",
				"attr": {
					"cx": "8.5",
					"cy": "8.5",
					"r": "1.5"
				},
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "21 15 16 10 5 21" },
				"child": []
			}
		]
	})(props);
}
function FiHome(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "9 22 9 12 15 12 15 22" },
			"child": []
		}]
	})(props);
}
function FiHelpCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "17",
					"x2": "12.01",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiHeart(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
			"child": []
		}]
	})(props);
}
function FiHash(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "4",
					"y1": "9",
					"x2": "20",
					"y2": "9"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "4",
					"y1": "15",
					"x2": "20",
					"y2": "15"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "10",
					"y1": "3",
					"x2": "8",
					"y2": "21"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "3",
					"x2": "14",
					"y2": "21"
				},
				"child": []
			}
		]
	})(props);
}
function FiGrid(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "3",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "14",
					"y": "3",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "14",
					"y": "14",
					"width": "7",
					"height": "7"
				},
				"child": []
			},
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "14",
					"width": "7",
					"height": "7"
				},
				"child": []
			}
		]
	})(props);
}
function FiGlobe(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "2",
					"y1": "12",
					"x2": "22",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" },
				"child": []
			}
		]
	})(props);
}
function FiFlag(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" },
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "4",
				"y1": "22",
				"x2": "4",
				"y2": "15"
			},
			"child": []
		}]
	})(props);
}
function FiFilter(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polygon",
			"attr": { "points": "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" },
			"child": []
		}]
	})(props);
}
function FiFile(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "13 2 13 9 20 9" },
			"child": []
		}]
	})(props);
}
function FiFileText(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "14 2 14 8 20 8" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "13",
					"x2": "8",
					"y2": "13"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "17",
					"x2": "8",
					"y2": "17"
				},
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "10 9 9 9 8 9" },
				"child": []
			}
		]
	})(props);
}
function FiEye(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" },
			"child": []
		}, {
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "3"
			},
			"child": []
		}]
	})(props);
}
function FiEyeOff(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" },
			"child": []
		}, {
			"tag": "line",
			"attr": {
				"x1": "1",
				"y1": "1",
				"x2": "23",
				"y2": "23"
			},
			"child": []
		}]
	})(props);
}
function FiExternalLink(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "15 3 21 3 21 9" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "10",
					"y1": "14",
					"x2": "21",
					"y2": "3"
				},
				"child": []
			}
		]
	})(props);
}
function FiEdit2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" },
			"child": []
		}]
	})(props);
}
function FiDownload(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" },
				"child": []
			},
			{
				"tag": "polyline",
				"attr": { "points": "7 10 12 15 17 10" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "15",
					"x2": "12",
					"y2": "3"
				},
				"child": []
			}
		]
	})(props);
}
function FiDollarSign(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "12",
				"y1": "1",
				"x2": "12",
				"y2": "23"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
			"child": []
		}]
	})(props);
}
function FiDatabase(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "ellipse",
				"attr": {
					"cx": "12",
					"cy": "5",
					"rx": "9",
					"ry": "3"
				},
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" },
				"child": []
			},
			{
				"tag": "path",
				"attr": { "d": "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" },
				"child": []
			}
		]
	})(props);
}
function FiCompass(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "10"
			},
			"child": []
		}, {
			"tag": "polygon",
			"attr": { "points": "16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" },
			"child": []
		}]
	})(props);
}
function FiClock(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "12",
				"r": "10"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "12 6 12 12 16 14" },
			"child": []
		}]
	})(props);
}
function FiClipboard(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" },
			"child": []
		}, {
			"tag": "rect",
			"attr": {
				"x": "8",
				"y": "2",
				"width": "8",
				"height": "4",
				"rx": "1",
				"ry": "1"
			},
			"child": []
		}]
	})(props);
}
function FiChevronsLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "11 17 6 12 11 7" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "18 17 13 12 18 7" },
			"child": []
		}]
	})(props);
}
function FiChevronUp(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "18 15 12 9 6 15" },
			"child": []
		}]
	})(props);
}
function FiChevronRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "9 18 15 12 9 6" },
			"child": []
		}]
	})(props);
}
function FiChevronLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "15 18 9 12 15 6" },
			"child": []
		}]
	})(props);
}
function FiChevronDown(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "6 9 12 15 18 9" },
			"child": []
		}]
	})(props);
}
function FiCheck(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "20 6 9 17 4 12" },
			"child": []
		}]
	})(props);
}
function FiCheckCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M22 11.08V12a10 10 0 1 1-5.93-9.14" },
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "22 4 12 14.01 9 11.01" },
			"child": []
		}]
	})(props);
}
function FiCalendar(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "rect",
				"attr": {
					"x": "3",
					"y": "4",
					"width": "18",
					"height": "18",
					"rx": "2",
					"ry": "2"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "16",
					"y1": "2",
					"x2": "16",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "8",
					"y1": "2",
					"x2": "8",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "3",
					"y1": "10",
					"x2": "21",
					"y2": "10"
				},
				"child": []
			}
		]
	})(props);
}
function FiBriefcase(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "rect",
			"attr": {
				"x": "2",
				"y": "7",
				"width": "20",
				"height": "14",
				"rx": "2",
				"ry": "2"
			},
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" },
			"child": []
		}]
	})(props);
}
function FiBook(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" },
			"child": []
		}]
	})(props);
}
function FiBookOpen(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" },
			"child": []
		}]
	})(props);
}
function FiBell(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "path",
			"attr": { "d": "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" },
			"child": []
		}, {
			"tag": "path",
			"attr": { "d": "M13.73 21a2 2 0 0 1-3.46 0" },
			"child": []
		}]
	})(props);
}
function FiBarChart2(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "18",
					"y1": "20",
					"x2": "18",
					"y2": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "20",
					"x2": "12",
					"y2": "4"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "6",
					"y1": "20",
					"x2": "6",
					"y2": "14"
				},
				"child": []
			}
		]
	})(props);
}
function FiAward(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "circle",
			"attr": {
				"cx": "12",
				"cy": "8",
				"r": "7"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "8.21 13.89 7 23 12 20 17 23 15.79 13.88" },
			"child": []
		}]
	})(props);
}
function FiArrowRight(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "5",
				"y1": "12",
				"x2": "19",
				"y2": "12"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "12 5 19 12 12 19" },
			"child": []
		}]
	})(props);
}
function FiArrowLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "line",
			"attr": {
				"x1": "19",
				"y1": "12",
				"x2": "5",
				"y2": "12"
			},
			"child": []
		}, {
			"tag": "polyline",
			"attr": { "points": "12 19 5 12 12 5" },
			"child": []
		}]
	})(props);
}
function FiAlignLeft(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "line",
				"attr": {
					"x1": "17",
					"y1": "10",
					"x2": "3",
					"y2": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "6",
					"x2": "3",
					"y2": "6"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "21",
					"y1": "14",
					"x2": "3",
					"y2": "14"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "17",
					"y1": "18",
					"x2": "3",
					"y2": "18"
				},
				"child": []
			}
		]
	})(props);
}
function FiAlertTriangle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "path",
				"attr": { "d": "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" },
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "9",
					"x2": "12",
					"y2": "13"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "17",
					"x2": "12.01",
					"y2": "17"
				},
				"child": []
			}
		]
	})(props);
}
function FiAlertCircle(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [
			{
				"tag": "circle",
				"attr": {
					"cx": "12",
					"cy": "12",
					"r": "10"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "8",
					"x2": "12",
					"y2": "12"
				},
				"child": []
			},
			{
				"tag": "line",
				"attr": {
					"x1": "12",
					"y1": "16",
					"x2": "12.01",
					"y2": "16"
				},
				"child": []
			}
		]
	})(props);
}
function FiActivity(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"viewBox": "0 0 24 24",
			"fill": "none",
			"stroke": "currentColor",
			"strokeWidth": "2",
			"strokeLinecap": "round",
			"strokeLinejoin": "round"
		},
		"child": [{
			"tag": "polyline",
			"attr": { "points": "22 12 18 12 15 21 9 3 6 12 2 12" },
			"child": []
		}]
	})(props);
}
//#endregion
//#region ../../node_modules/react-icons/hi/index.mjs
function HiOutlineOfficeBuilding(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
			},
			"child": []
		}]
	})(props);
}
function HiOutlineNewspaper(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
			},
			"child": []
		}]
	})(props);
}
function HiOutlineDocument(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
			},
			"child": []
		}]
	})(props);
}
function HiOutlineDocumentText(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
			},
			"child": []
		}]
	})(props);
}
function HiOutlineDocumentReport(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
			},
			"child": []
		}]
	})(props);
}
function HiOutlineDocumentDuplicate(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
			},
			"child": []
		}]
	})(props);
}
function HiOutlineCollection(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
			},
			"child": []
		}]
	})(props);
}
function HiOutlineChartBar(props) {
	return GenIcon({
		"tag": "svg",
		"attr": {
			"fill": "none",
			"viewBox": "0 0 24 24",
			"strokeWidth": "2",
			"stroke": "currentColor",
			"aria-hidden": "true"
		},
		"child": [{
			"tag": "path",
			"attr": {
				"strokeLinecap": "round",
				"strokeLinejoin": "round",
				"d": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
			},
			"child": []
		}]
	})(props);
}
//#endregion
//#region ../../node_modules/react-icons/fa/index.mjs
function FaYoutube(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 576 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" },
			"child": []
		}]
	})(props);
}
function FaLinkedinIn(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" },
			"child": []
		}]
	})(props);
}
function FaFacebookF(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 320 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" },
			"child": []
		}]
	})(props);
}
function FaTimes(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 352 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" },
			"child": []
		}]
	})(props);
}
function FaChevronDown(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" },
			"child": []
		}]
	})(props);
}
function FaBars(props) {
	return GenIcon({
		"tag": "svg",
		"attr": { "viewBox": "0 0 448 512" },
		"child": [{
			"tag": "path",
			"attr": { "d": "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" },
			"child": []
		}]
	})(props);
}
//#endregion
export { FaBars, FaChevronDown, FaFacebookF, FaLinkedinIn, FaTimes, FaYoutube, FiActivity, FiAlertCircle, FiAlertTriangle, FiAlignLeft, FiArrowLeft, FiArrowRight, FiAward, FiBarChart2, FiBell, FiBook, FiBookOpen, FiBriefcase, FiCalendar, FiCheck, FiCheckCircle, FiChevronDown, FiChevronLeft, FiChevronRight, FiChevronUp, FiChevronsLeft, FiClipboard, FiClock, FiCompass, FiDatabase, FiDollarSign, FiDownload, FiEdit2, FiExternalLink, FiEye, FiEyeOff, FiFile, FiFileText, FiFilter, FiFlag, FiGlobe, FiGrid, FiHash, FiHeart, FiHelpCircle, FiHome, FiImage, FiInbox, FiKey, FiLayers, FiLayout, FiLink, FiList, FiLock, FiLogOut, FiMail, FiMap, FiMapPin, FiMaximize2, FiMenu, FiMessageCircle, FiMessageSquare, FiMinimize2, FiMonitor, FiPackage, FiPhone, FiPlus, FiPrinter, FiRadio, FiRefreshCw, FiSearch, FiSend, FiSettings, FiShield, FiStar, FiTag, FiTarget, FiThumbsUp, FiToggleLeft, FiToggleRight, FiTrash2, FiTrendingDown, FiTrendingUp, FiUnlock, FiUser, FiUsers, FiX, FiZap, FiZoomIn, FiZoomOut, HiOutlineChartBar, HiOutlineCollection, HiOutlineDocument, HiOutlineDocumentDuplicate, HiOutlineDocumentReport, HiOutlineDocumentText, HiOutlineNewspaper, HiOutlineOfficeBuilding };
