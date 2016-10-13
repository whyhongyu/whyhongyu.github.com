"use strict";

function toDou(num) {
	return num < 10 ? "0" + num : "" + num
}
function getOffset(obj) {
	var json = {
		x: 0,
		y: 0
	};
	while (obj.offsetParent) {
		json.x += obj.offsetLeft;
		json.y += obj.offsetTop;
		obj = obj.offsetParent
	}
	return json
}
function addClass(obj, sClass) {
	if (obj.className) {
		var reg = new RegExp("\\b" + sClass + "\\b", "g");
		if (obj.className.search(reg) == -1) {
			obj.className += " " + sClass
		}
	} else {
		obj.className = sClass
	}
}
function removeClass(obj, sClass) {
	if (obj.className) {
		var reg = new RegExp("\\b" + sClass + "\\b", "g");
		if (obj.className.search(reg) != -1) {
			obj.className = obj.className.replace(reg, "").replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
			if (!obj.className) {
				obj.removeAttribute("class")
			}
		}
	} else {
		return
	}
}
function rnd(n, m) {
	return parseInt(n + Math.random() * (m - n))
}
function d2a(n) {
	return n * Math.PI / 180
}
function rndColor() {
	return "rgb(" + parseInt(Math.random() * 220 + 100) + "," + parseInt(Math.random() * 220 + 100) + "," + parseInt(Math.random() * 220 + 100) + ")"
}
function getPos(cx, cy, r, ang) {
	var a = Math.sin(d2a(ang)) * r;
	var b = Math.cos(d2a(ang)) * r;
	return {
		x: cx + a,
		y: cy - b
	}
}
function addEvent(obj, sEv, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(sEv, fn, false)
	} else {
		obj.attachEvent("on" + sEv, fn)
	}
}
function addWheel(obj, fn) {
	function fnWheel(ev) {
		var bOk = true;
		var oEvent = ev || event;
		if (oEvent.wheelDelta) {
			if (oEvent.wheelDelta < 0) {
				bOk = true
			} else {
				bOk = false
			}
		} else {
			if (oEvent.detail > 0) {
				bOk = true
			} else {
				bOk = false
			}
		}
		fn && fn(bOk);
		oEvent.preventDefault && oEvent.preventDefault();
		return false
	}
	if (window.navigator.userAgent.indexOf("Firefox") != -1) {
		addEvent(obj, "DOMMouseScroll", fnWheel)
	} else {
		addEvent(obj, "mousewheel", fnWheel)
	}
};