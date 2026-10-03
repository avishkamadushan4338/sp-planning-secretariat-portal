import { __toESM } from "../_runtime.mjs";
import { require_react } from "./react+tanstack__react-query.mjs";
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function toLucideIconData(iconName, iconNode, aliases = []) {
	if (iconNode == null) throw new Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: toKebabCase(iconName),
		size: 24,
		node: iconNode,
		...aliases.length > 0 ? { aliases } : {}
	};
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => {
	let out = "";
	let upperNext = false;
	for (const ch of string) {
		if (ch === "-" || ch === "_" || ch <= " ") {
			upperNext = out.length > 0;
			continue;
		}
		if (out.length === 0) out += ch.toLowerCase();
		else out += upperNext ? ch.toUpperCase() : ch;
		upperNext = false;
	}
	return out;
};
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function isDefined(value) {
	return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
	const attributeNames = params.attributeNames ?? {};
	const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
	const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
	const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
	const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
	const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
	const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
	const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
	const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
				attrs[getAttributeName(attrName)] = value;
				return attrs;
			}, {}),
			..."color" in params && params.color && { [getAttributeName("stroke")]: params.color },
			..."size" in params && isDefined(params.size) && {
				[getAttributeName("width")]: params.size,
				[getAttributeName("height")]: params.size
			},
			..."width" in params && isDefined(params.width) && { [getAttributeName("width")]: params.width },
			..."height" in params && isDefined(params.height) && { [getAttributeName("height")]: params.height },
			[getAttributeName("stroke-width")]: calculatedStrokeWidth,
			...className && { [getAttributeName("class")]: className },
			[getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
			...params.hasA11yProp === false ? { [getAttributeName("aria-hidden")]: "true" } : {},
			..."attributes" in params && params.attributes
		},
		icon.node.map((child) => {
			const [name, attrs, children] = child;
			const nextAttrs = params.nonScalingStroke ? {
				[getAttributeName("vector-effect")]: "non-scaling-stroke",
				...attrs
			} : attrs;
			return children ? [
				name,
				nextAttrs,
				children
			] : [name, nextAttrs];
		})
	];
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function buildLucideIconForReact(icon, params = {}) {
	return buildLucideIconNode(icon, {
		...params,
		attributeNames: {
			...params.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
	node: iconNode,
	aliases: [],
	size: 24
}, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);
	const [name, svgAttributes, builtIconNode = []] = buildLucideIconForReact(icon, {
		color: color ?? contextColor,
		width: width ?? size ?? contextSize,
		height: height ?? size ?? contextSize,
		strokeWidth: strokeWidth ?? contextStrokeWidth,
		absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
		nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
		className: mergeClasses(contextClass, className),
		hasA11yProp: hasAccessibleProp,
		attributes: rest
	});
	return (0, import_react.createElement)(name, {
		ref,
		...svgAttributes
	}, [...builtIconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
	const iconData = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		icon: iconData,
		className,
		...props
	}));
	if (iconData.name) Component.displayName = toPascalCase(iconData.name);
	return Component;
}
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/arrow-right.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$29 = {
	name: "arrow-right",
	size: 24,
	node: [["path", {
		d: "M5 12h14",
		key: "1ays0h"
	}], ["path", {
		d: "m12 5 7 7-7 7",
		key: "xquz4c"
	}]]
};
__iconData$29.node;
var ArrowRight = createLucideIcon(__iconData$29);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/badge-check.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$28 = {
	name: "badge-check",
	size: 24,
	node: [["path", {
		d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
		key: "3c2336"
	}], ["path", {
		d: "m16 9-5.5 5.5L8 12",
		key: "xofnsj"
	}]],
	aliases: ["verified"]
};
__iconData$28.node;
var BadgeCheck = createLucideIcon(__iconData$28);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/bell.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$27 = {
	name: "bell",
	size: 24,
	node: [["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}], ["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}]]
};
__iconData$27.node;
var Bell = createLucideIcon(__iconData$27);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/book-open.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$26 = {
	name: "book-open",
	size: 24,
	node: [["path", {
		d: "M12 5v16",
		key: "1f6ucr"
	}], ["path", {
		d: "M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",
		key: "1fyvmf"
	}]]
};
__iconData$26.node;
var BookOpen = createLucideIcon(__iconData$26);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/briefcase.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$25 = {
	name: "briefcase",
	size: 24,
	node: [["path", {
		d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
		key: "jecpp"
	}], ["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "6",
		rx: "2",
		key: "i6l2r4"
	}]]
};
__iconData$25.node;
var Briefcase = createLucideIcon(__iconData$25);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/building-complex.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$24 = {
	name: "building-complex",
	size: 24,
	node: [
		["path", {
			d: "M10 12h4",
			key: "a56b0p"
		}],
		["path", {
			d: "M10 8h4",
			key: "1sr2af"
		}],
		["path", {
			d: "M14 21v-3a2 2 0 0 0-4 0v3",
			key: "1rgiei"
		}],
		["path", {
			d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
			key: "secmi2"
		}],
		["path", {
			d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16",
			key: "16ra0t"
		}]
	],
	aliases: ["building-2"]
};
__iconData$24.node;
var BuildingComplex = createLucideIcon(__iconData$24);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/calendar.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$23 = {
	name: "calendar",
	size: 24,
	node: [
		["path", {
			d: "M8 2v3",
			key: "1ioesn"
		}],
		["path", {
			d: "M16 2v3",
			key: "otl347"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}]
	]
};
__iconData$23.node;
var Calendar = createLucideIcon(__iconData$23);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/camera.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$22 = {
	name: "camera",
	size: 24,
	node: [["path", {
		d: "M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z",
		key: "18u6gg"
	}], ["circle", {
		cx: "12",
		cy: "13",
		r: "3",
		key: "1vg3eu"
	}]]
};
__iconData$22.node;
var Camera = createLucideIcon(__iconData$22);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chart-pie.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$21 = {
	name: "chart-pie",
	size: 24,
	node: [["path", {
		d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
		key: "pzmjnu"
	}], ["path", {
		d: "M21.21 15.89A10 10 0 1 1 8 2.83",
		key: "k2fpak"
	}]],
	aliases: ["pie-chart"]
};
__iconData$21.node;
var ChartPie = createLucideIcon(__iconData$21);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevron-right.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$20 = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
__iconData$20.node;
var ChevronRight = createLucideIcon(__iconData$20);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/chevron-left.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$19 = {
	name: "chevron-left",
	size: 24,
	node: [["path", {
		d: "m15 18-6-6 6-6",
		key: "1wnfg3"
	}]]
};
__iconData$19.node;
var ChevronLeft = createLucideIcon(__iconData$19);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$18 = {
	name: "circle-check-big",
	size: 24,
	node: [["path", {
		d: "M21.801 10A10 10 0 1 1 17 3.335",
		key: "yps3ct"
	}], ["path", {
		d: "m9 11 3 3L22 4",
		key: "1pflzl"
	}]],
	aliases: ["check-circle"]
};
__iconData$18.node;
var CircleCheckBig = createLucideIcon(__iconData$18);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/circle-user-round.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$17 = {
	name: "circle-user-round",
	size: 24,
	node: [
		["path", {
			d: "M17.925 20.056a6 6 0 0 0-11.851.001",
			key: "z69sun"
		}],
		["circle", {
			cx: "12",
			cy: "11",
			r: "4",
			key: "1gt34v"
		}],
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}]
	],
	aliases: ["user-circle-2"]
};
__iconData$17.node;
var CircleUserRound = createLucideIcon(__iconData$17);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/clipboard-list.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$16 = {
	name: "clipboard-list",
	size: 24,
	node: [
		["rect", {
			width: "8",
			height: "4",
			x: "8",
			y: "2",
			rx: "1",
			ry: "1",
			key: "tgr4d6"
		}],
		["path", {
			d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
			key: "116196"
		}],
		["path", {
			d: "M12 11h4",
			key: "1jrz19"
		}],
		["path", {
			d: "M12 16h4",
			key: "n85exb"
		}],
		["path", {
			d: "M8 11h.01",
			key: "1dfujw"
		}],
		["path", {
			d: "M8 16h.01",
			key: "18s6g9"
		}]
	]
};
__iconData$16.node;
var ClipboardList = createLucideIcon(__iconData$16);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/clock.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$15 = {
	name: "clock",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 6v6l4 2",
		key: "mmk7yg"
	}]]
};
__iconData$15.node;
var Clock = createLucideIcon(__iconData$15);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/globe.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$14 = {
	name: "globe",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
			key: "13o1zl"
		}],
		["path", {
			d: "M2 12h20",
			key: "9i4pu4"
		}]
	]
};
__iconData$14.node;
var Globe = createLucideIcon(__iconData$14);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/landmark.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$13 = {
	name: "landmark",
	size: 24,
	node: [
		["path", {
			d: "M10 18v-7",
			key: "wt116b"
		}],
		["path", {
			d: "M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z",
			key: "yxxwt6"
		}],
		["path", {
			d: "M14 18v-7",
			key: "vav6t3"
		}],
		["path", {
			d: "M18 18v-7",
			key: "aexdmj"
		}],
		["path", {
			d: "M3 22h18",
			key: "8prr45"
		}],
		["path", {
			d: "M6 18v-7",
			key: "1ivflk"
		}]
	]
};
__iconData$13.node;
var Landmark = createLucideIcon(__iconData$13);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/mail.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$12 = {
	name: "mail",
	size: 24,
	node: [["path", {
		d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",
		key: "132q7q"
	}], ["rect", {
		x: "2",
		y: "4",
		width: "20",
		height: "16",
		rx: "2",
		key: "izxlao"
	}]]
};
__iconData$12.node;
var Mail = createLucideIcon(__iconData$12);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/map-pin.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$11 = {
	name: "map-pin",
	size: 24,
	node: [["path", {
		d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
		key: "1r0f0z"
	}], ["circle", {
		cx: "12",
		cy: "10",
		r: "3",
		key: "ilqhr7"
	}]]
};
__iconData$11.node;
var MapPin = createLucideIcon(__iconData$11);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/network.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$10 = {
	name: "network",
	size: 24,
	node: [
		["rect", {
			x: "16",
			y: "16",
			width: "6",
			height: "6",
			rx: "1",
			key: "4q2zg0"
		}],
		["rect", {
			x: "2",
			y: "16",
			width: "6",
			height: "6",
			rx: "1",
			key: "8cvhb9"
		}],
		["rect", {
			x: "9",
			y: "2",
			width: "6",
			height: "6",
			rx: "1",
			key: "1egb70"
		}],
		["path", {
			d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
			key: "1jsf9p"
		}],
		["path", {
			d: "M12 12V8",
			key: "2874zd"
		}]
	]
};
__iconData$10.node;
var Network = createLucideIcon(__iconData$10);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/newspaper.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$9 = {
	name: "newspaper",
	size: 24,
	node: [
		["path", {
			d: "M15 18h-5",
			key: "95g1m2"
		}],
		["path", {
			d: "M18 14h-8",
			key: "sponae"
		}],
		["path", {
			d: "M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",
			key: "39pd36"
		}],
		["rect", {
			width: "8",
			height: "4",
			x: "10",
			y: "6",
			rx: "1",
			key: "aywv1n"
		}]
	]
};
__iconData$9.node;
var Newspaper = createLucideIcon(__iconData$9);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/pen-line.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$8 = {
	name: "pen-line",
	size: 24,
	node: [["path", {
		d: "M13 21h8",
		key: "1jsn5i"
	}], ["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}]],
	aliases: ["edit-3"]
};
__iconData$8.node;
var PenLine = createLucideIcon(__iconData$8);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/phone.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$7 = {
	name: "phone",
	size: 24,
	node: [["path", {
		d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
		key: "9njp5v"
	}]]
};
__iconData$7.node;
var Phone = createLucideIcon(__iconData$7);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/quote.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$6 = {
	name: "quote",
	size: 24,
	node: [["path", {
		d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
		key: "rib7q0"
	}], ["path", {
		d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
		key: "1ymkrd"
	}]]
};
__iconData$6.node;
var Quote = createLucideIcon(__iconData$6);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/settings.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$5 = {
	name: "settings",
	size: 24,
	node: [["path", {
		d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
		key: "1i5ecw"
	}], ["circle", {
		cx: "12",
		cy: "12",
		r: "3",
		key: "1v7zrd"
	}]]
};
__iconData$5.node;
var Settings = createLucideIcon(__iconData$5);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/shield.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$4 = {
	name: "shield",
	size: 24,
	node: [["path", {
		d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
		key: "oel41y"
	}]]
};
__iconData$4.node;
var Shield = createLucideIcon(__iconData$4);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/star.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$3 = {
	name: "star",
	size: 24,
	node: [["path", {
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
		key: "r04s7s"
	}]]
};
__iconData$3.node;
var Star = createLucideIcon(__iconData$3);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/trending-up.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$2 = {
	name: "trending-up",
	size: 24,
	node: [["path", {
		d: "M16 7h6v6",
		key: "box55l"
	}], ["path", {
		d: "m22 7-8.5 8.5-5-5L2 17",
		key: "1t1m79"
	}]]
};
__iconData$2.node;
var TrendingUp = createLucideIcon(__iconData$2);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/users.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$1 = {
	name: "users",
	size: 24,
	node: [
		["path", {
			d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
			key: "1yyitq"
		}],
		["path", {
			d: "M16 3.128a4 4 0 0 1 0 7.744",
			key: "16gr8j"
		}],
		["path", {
			d: "M22 21v-2a4 4 0 0 0-3-3.87",
			key: "kshegd"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "4",
			key: "nufk8"
		}]
	]
};
__iconData$1.node;
var Users = createLucideIcon(__iconData$1);
//#endregion
//#region ../../node_modules/lucide-react/dist/esm/icons/x.mjs
/**
* @license lucide-react v1.50.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
__iconData.node;
var X = createLucideIcon(__iconData);
//#endregion
export { ArrowRight, BadgeCheck, Bell, BookOpen, Briefcase, BuildingComplex, Calendar, Camera, ChartPie, ChevronLeft, ChevronRight, CircleCheckBig, CircleUserRound, ClipboardList, Clock, Globe, Landmark, Mail, MapPin, Network, Newspaper, PenLine, Phone, Quote, Settings, Shield, Star, TrendingUp, Users, X };
