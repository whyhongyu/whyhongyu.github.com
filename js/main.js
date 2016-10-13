"use strict";
document.addEventListener("DOMContentLoaded", function() {
	var oHd = document.querySelector("header");
	var oSimShow = document.querySelector(".sim-show");
	var oMe = document.querySelector(".me");
	var oSha = oMe.querySelector(".shadow");
	var oOther = document.querySelector(".others");
	var oFace = document.querySelector(".face");
	oHd.style.width = document.documentElement.clientWidth + "px";
	oHd.style.height = document.documentElement.clientHeight + "px";
	oHd.style.backgroundSize = document.documentElement.clientWidth + "px auto";
	oOther.style.width = document.documentElement.clientWidth + "px";
	oOther.style.height = document.documentElement.clientHeight + "px";
	oOther.style.backgroundSize = document.documentElement.clientWidth + "px auto";
	window.onresize = window.onscroll = function() {
		var oHd = document.querySelector("header");
		var oSimShow = document.querySelector(".sim-show");
		oHd.style.width = document.documentElement.clientWidth + "px";
		oHd.style.height = document.documentElement.clientHeight + "px";
		oHd.style.backgroundSize = document.documentElement.clientWidth + "px auto";
		oOther.style.width = document.documentElement.clientWidth + "px";
		oOther.style.height = document.documentElement.clientHeight + "px";
		oOther.style.backgroundSize = document.documentElement.clientWidth + "px auto";
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scale = oMe.offsetTop - scrollTop;
		oMe.style.backgroundPosition = "center " + (scale / 3 - 200) + "px";
		oSha.style.opacity = 0.8 * (1 - scale / 200)
	};
	(function() {
		var oUl = oMe.getElementsByTagName("ul")[0];
		var oOl = oMe.getElementsByTagName("ol")[0];
		var aLi = oUl.children;
		var aBtn = oOl.children;
		for (var i = 0; i < aBtn.length; i++) {
			(function(index) {
				aBtn[i].onmouseover = function() {
					for (var i = 0; i < aBtn.length; i++) {
						aBtn[i].className = "";
						aLi[i].style.opacity = 0
					}
					aBtn[index].className = "on";
					aLi[index].style.opacity = 1
				}
			})(i)
		}
	})(function(){
		console.log('我是韦宏宇，欢迎来到我的个人站！');
	}());
	(function() {
		var oBtn = oHd.querySelector(".me-btn");
		oBtn.onmouseover = function() {}
	})(function(){
		console.log('我是韦宏宇，欢迎来到我的个人站！');
	}())
}, false);
