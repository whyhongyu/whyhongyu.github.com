"use strict";
document.addEventListener("DOMContentLoaded", function() {
	(function() {
		var oCon = document.querySelector(".my-info");
		var aDd = oCon.getElementsByTagName("dd");
		var aI = oCon.getElementsByTagName("i");
		for (var i = 0; i < aDd.length; i++) {
			(function(index) {
				aDd[i].onmouseover = function() {
					aI[index].style.opacity = 1
				};
				aDd[i].onmouseout = function() {
					aI[index].style.opacity = 0
				}
			})(i)
		}
	})(function(){
		console.log('我是韦宏宇，欢迎来到我的个人站！');
	}());
	(function() {
		var aEle = document.getElementsByClassName("objs");
		window.addEventListener("load", fnAnimate, false);
		window.addEventListener("resize", fnAnimate, false);
		window.addEventListener("scroll", fnAnimate, false);

		function fnAnimate() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var scrollBottom = scrollTop + clientHeight;
			for (var i = 0; i < aEle.length; i++) {
				var iTop = getOffset(aEle[i]).y;
				if (iTop <= scrollBottom) {
					addClass(aEle[i], "animated")
				}
			}
		}
	})(function(){
		console.log('我是韦宏宇，欢迎来到我的个人站！');
	}())
}, false);
