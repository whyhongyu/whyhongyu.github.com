"use strict";
document.addEventListener("DOMContentLoaded", function() {
	(function() {
		var oBox = document.getElementById("scroll1");
		var oUl = oBox.children[0];
		var aLi = oUl.children;
		var oOl = oBox.children[1];
		var aBtn = oOl.children;
		var oPrev = oBox.children[2];
		var oNext = oBox.children[3];
		oUl.innerHTML += oUl.innerHTML;
		oUl.style.width = aLi.length * aLi[0].offsetWidth + "px";
		var w = oUl.offsetWidth / 2;
		var iNow = 0;
		var timer = null;
		oBox.onmouseover = function() {
			oPrev.style.display = "block";
			oNext.style.display = "block"
		};
		oBox.onmouseout = function() {
			oPrev.style.display = "none";
			oNext.style.display = "none"
		};
		for (var i = 0; i < aBtn.length; i++) {
			(function(index) {
				aBtn[i].onmouseover = function() {
					if ((iNow % aBtn.length == 4 || iNow % aBtn.length == -1) && index % aBtn.length == 0) {
						iNow++
					}
					if (iNow % aBtn.length == 0 && index % aBtn.length == 4) {
						iNow--
					}
					iNow = Math.floor(iNow / aBtn.length) * aBtn.length + index;
					tab()
				}
			})(i)
		}
		function tab() {
			for (var i = 0; i < aBtn.length; i++) {
				aBtn[i].className = ""
			}
			if (iNow > 0) {
				aBtn[iNow % aBtn.length].className = "on"
			} else {
				aBtn[(iNow % aBtn.length + aBtn.length) % aBtn.length].className = "on"
			}
			startMove(oUl, -iNow * aLi[0].offsetWidth)
		}
		oPrev.onclick = function() {
			iNow--;
			tab()
		};
		oNext.onclick = function() {
			iNow++;
			tab()
		};
		var left = 0;

		function startMove(obj, iTarget) {
			var start = left;
			var dis = iTarget - start;
			var count = Math.floor(700 / 30);
			var n = 0;
			clearInterval(timer);
			timer = setInterval(function() {
				n++;
				var a = 1 - n / count;
				left = start + dis * (1 - Math.pow(a, 3));
				if (left < 0) {
					oUl.style.left = left % w + "px"
				} else {
					oUl.style.left = (left % w - w) % w + "px"
				}
				if (n == count) {
					clearInterval(timer)
				}
			}, 30)
		}
	})();
	(function() {
		var oWall = document.querySelector("#picwall");
		var oBtn = oWall.children[0];
		var oUl = oWall.children[1];
		var aLi = oUl.children;
		var zIndex = 10;
		var aPos = [];
		for (var i = 0; i < aLi.length; i++) {
			aPos.push({
				left: aLi[i].offsetLeft,
				top: aLi[i].offsetTop
			})
		}
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].style.left = aPos[i].left + "px";
			aLi[i].style.top = aPos[i].top + "px";
			aLi[i].style.position = "absolute";
			aLi[i].style.margin = 0
		}
		for (var i = 0; i < aLi.length; i++) {
			drag(aLi[i]);
			aLi[i].index = i
		}
		oBtn.addEventListener("click", fnClick, false);
		oBtn.addEventListener("click", fnClick1, false);

		function fnClick(ev) {
			var oDiv = oBtn.children[0];
			var oSon = oDiv.children[0];
			var x = ev.pageX - oBtn.offsetLeft;
			var y = ev.pageY - oBtn.offsetTop;
			oSon.style.left = x + "px";
			oSon.style.top = y + "px";
			addClass(oDiv, "is-active");
			oDiv.addEventListener("animationend", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("webkitAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("MSAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false)
		}
		function fnClick1() {
			aPos.sort(function() {
				return Math.random() - 0.5
			});
			for (var i = 0; i < aLi.length; i++) {
				startMove(aLi[i], aPos[i]);
				aLi[i].index = i
			}
		}
		function drag(obj) {
			obj.onmousedown = function(ev) {
				zIndex++;
				obj.style.zIndex = zIndex;
				var oEvent = ev || event;
				var disX = oEvent.clientX - obj.offsetLeft;
				var disY = oEvent.clientY - obj.offsetTop;
				document.onmousemove = function(ev) {
					var oEvent = ev || event;
					obj.style.left = oEvent.clientX - disX + "px";
					obj.style.top = oEvent.clientY - disY + "px";
					for (var i = 0; i < aLi.length; i++) {
						aLi[i].className = ""
					}
					var oNear = findNearest(obj);
					if (oNear) {
						oNear.className = "on"
					}
				};
				document.onmouseup = function() {
					document.onmousemove = null;
					document.onmouseup = null;
					obj.releaseCapture && obj.releaseCapture();
					var oNear = findNearest(obj);
					if (oNear) {
						oNear.className = "";
						startMove(obj, aPos[oNear.index]);
						startMove(oNear, aPos[obj.index]);
						var car;
						car = obj.index;
						obj.index = oNear.index;
						oNear.index = car
					} else {
						obj.style.left = aPos[obj.index].left + "px";
						obj.style.top = aPos[obj.index].top + "px"
					}
				};
				obj.setCapture && obj.setCapture();
				return false
			}
		}
		function findNearest(obj) {
			var iMin = new Date().getTime();
			var iMinIndex = -1;
			for (var i = 0; i < aLi.length; i++) {
				if (obj == aLi[i]) {
					continue
				}
				if (callTest(obj, aLi[i])) {
					if (iMin > getDis(obj, aLi[i])) {
						iMin = getDis(obj, aLi[i]);
						iMinIndex = i
					}
				}
			}
			if (iMinIndex == -1) {
				return null
			} else {
				return aLi[iMinIndex]
			}
		}
		function callTest(obj, obj2) {
			var l1 = obj.offsetLeft;
			var t1 = obj.offsetTop;
			var r1 = obj.offsetLeft + obj.offsetWidth;
			var b1 = obj.offsetTop + obj.offsetHeight;
			var l2 = obj2.offsetLeft;
			var t2 = obj2.offsetTop;
			var r2 = obj2.offsetLeft + obj2.offsetWidth;
			var b2 = obj2.offsetTop + obj2.offsetHeight;
			if (r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2) {
				return false
			} else {
				return true
			}
		}
		function getDis(obj, obj2) {
			var l1 = obj.offsetLeft + obj.offsetWidth / 2;
			var l2 = obj2.offsetLeft + obj2.offsetWidth / 2;
			var t1 = obj.offsetTop + obj.offsetHeight / 2;
			var t2 = obj2.offsetTop + obj2.offsetHeight / 2;
			var a = l2 - l1;
			var b = t2 - t1;
			return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2))
		}
	})();
	(function() {
		var oPoke = document.querySelector("#poke");
		var oRight = document.getElementById("btn1");
		var oLeft = document.getElementById("btn2");
		var oRotPic = document.getElementById("RotatePic");
		var aLi = oRotPic.getElementsByTagName("li");
		var aImg = oRotPic.getElementsByTagName("img");
		var aA = oRotPic.getElementsByTagName("a");
		var aPos = [];
		aA[2].onclick = function() {
			fnLeft();
			return false
		};
		aA[0].onclick = function() {
			fnRight();
			return false
		};
		for (var i = 0; i < aLi.length; i++) {
			aPos.push({
				left: aLi[i].offsetLeft,
				top: aLi[i].offsetTop,
				imgW: aImg[i].offsetWidth,
				imgT: aImg[i].offsetTop,
				imgO: getStyle(aImg[i], "opacity"),
				aFn: aA[i].onclick
			})
		}
		oRight.onclick = fnRight;

		function fnRight(ev) {
			aPos.push(aPos.shift());
			exchange();
			var oDiv = this.children[0];
			var oSon = oDiv.children[0];
			var x = ev.pageX - this.offsetLeft;
			var y = ev.pageY - this.offsetTop;
			oSon.style.left = x + "px";
			oSon.style.top = y + "px";
			addClass(oDiv, "is-active");
			oDiv.addEventListener("animationend", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("webkitAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("MSAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false)
		}
		oLeft.onclick = fnLeft;

		function fnLeft(ev) {
			aPos.unshift(aPos.pop());
			exchange();
			var oDiv = this.children[0];
			var oSon = oDiv.children[0];
			var x = ev.pageX - this.offsetLeft;
			var y = ev.pageY - this.offsetTop;
			oSon.style.left = x + "px";
			oSon.style.top = y + "px";
			addClass(oDiv, "is-active");
			oDiv.addEventListener("animationend", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("webkitAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("MSAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false)
		}
		function exchange() {
			for (var i = 0; i < aLi.length; i++) {
				startMove(aLi[i], {
					left: aPos[i].left,
					top: aPos[i].top
				});
				startMove(aImg[i], {
					width: aPos[i].imgW,
					top: aPos[i].imgT,
					opacity: aPos[i].imgO
				});
				aA[i].onclick = aPos[i].aFn
			}
		}
	})();
	(function() {
		var oSplit = document.querySelector(".splitblock");
		var oBtn = oSplit.getElementsByTagName("button")[0];
		var oBox = oSplit.querySelector(".box");
		var R = 4;
		var C = 7;
		for (var r = 0; r < R; r++) {
			for (var c = 0; c < C; c++) {
				var oS = document.createElement("span");
				oS.style.width = oBox.offsetWidth / C + "px";
				oS.style.height = oBox.offsetHeight / R + "px";
				oBox.appendChild(oS);
				oS.style.left = c * oBox.offsetWidth / C + "px";
				oS.style.top = r * oBox.offsetHeight / R + "px";
				oS.style.position = "absolute";
				oS.style.backgroundPosition = -c * oBox.offsetWidth / C + "px -" + r * oBox.offsetHeight / R + "px";
				oS.c = c;
				oS.r = r
			}
		}
		var timer = null;
		var iNow = 0;
		var bOk = false;
		oBtn.onclick = function(ev) {
			if (bOk) {
				return
			}
			bOk = true;
			var aS = oBox.children;
			iNow++;
			for (var i = 0; i < aS.length; i++) {
				(function(index) {
					setTimeout(function() {
						aS[index].style.backgroundImage = "url(img/splitblock/" + iNow % 3 + ".jpg)";
						aS[index].style.opacity = 0;
						(function(j) {
							startMove(aS[j], {
								opacity: 1
							}, {
								end: function() {
									if (j == aS.length - 1) {
										oBox.style.background = "url(img/splitblock/" + iNow % 3 + ".jpg) no-repeat";
										bOk = false
									}
								}
							})
						})(index)
					}, Math.random() * 300)
				})(i)
			}
			var oDiv = this.children[0];
			var oSon = oDiv.children[0];
			var x = ev.pageX - this.offsetLeft;
			var y = ev.pageY - this.offsetTop;
			oSon.style.left = x + "px";
			oSon.style.top = y + "px";
			addClass(oDiv, "is-active");
			oDiv.addEventListener("animationend", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("webkitAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false);
			oDiv.addEventListener("MSAnimationEnd", function(ev) {
				removeClass(oDiv, "is-active")
			}, false)
		}
	})();
	(function() {
		var oWrap = document.getElementById("wrap");
		var oUl = oWrap.children[0];
		var aLi = oUl.children;
		var iNow = 0;
		oUl.onmousedown = function(ev) {
			var oEvent = ev || event;
			var oldX = oEvent.clientX;
			var disX = oEvent.clientX - oUl.offsetLeft;
			clearInterval(oUl.timer);
			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				oUl.style.left = oEvent.clientX - disX + "px"
			};
			document.onmouseup = function(ev) {
				var oEvent = ev || event;
				var dis = oEvent.clientX - oldX;
				if (Math.abs(dis) > 20) {
					if (dis < 0) {
						iNow++;
						if (iNow > aLi.length - 1) {
							iNow = aLi.length - 1
						}
					} else {
						iNow--;
						if (iNow < 0) {
							iNow = 0
						}
					}
					startMove(oUl, {
						left: -iNow * aLi[0].offsetWidth
					})
				} else {
					startMove(oUl, {
						left: -iNow * aLi[0].offsetWidth
					})
				}
				document.onmousemove = null;
				document.onmouseup = null;
				oUl.releaseCapture && oUl.releaseCapture()
			};
			oUl.setCapture && oUl.setCapture();
			return false
		}
	})();
	(function() {
		var oBox = document.getElementById("showbar");
		var oUl = oBox.children[0];
		var aLi = oUl.children;
		var aImg = oUl.getElementsByTagName("img");
		oUl.style.width = aLi.length * aLi[0].offsetWidth + "px";
		var divC = oBox.offsetWidth / 2;
		oUl.onmousedown = function(ev) {
			var oEvent = ev || event;
			var disX = oEvent.clientX - oUl.offsetLeft;
			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				var l = oEvent.clientX - disX;
				if (l > divC - (0 + 0.5) * aLi[0].offsetWidth) {
					l = divC - (0 + 0.5) * aLi[0].offsetWidth
				} else {
					if (l < divC - (aLi.length - 1 + 0.5) * aLi[0].offsetWidth) {
						l = divC - (aLi.length - 1 + 0.5) * aLi[0].offsetWidth
					}
				}
				oUl.style.left = l + "px";
				changeSize()
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
				oUl.releaseCapture && oUl.releaseCapture()
			};
			oUl.setCapture && oUl.setCapture();
			return false
		};
		oUl.style.left = divC - (1 + 0.5) * aLi[0].offsetWidth + "px";

		function changeSize() {
			for (var i = 0; i < aLi.length; i++) {
				var l = Math.abs(divC - (oUl.offsetLeft + aLi[i].offsetLeft + aLi[i].offsetWidth / 2));
				var scale = 1 - l / 500;
				if (scale < 0.5) {
					scale = 0.5
				}
				aImg[i].style.width = scale * 520 + "px";
				aImg[i].style.height = scale * 358 + "px";
				aImg[i].style.marginLeft = -(aImg[i].offsetWidth - 260) / 2 + "px";
				aImg[i].style.marginTop = -(aImg[i].offsetHeight - 179) / 2 + "px";
				aLi[i].style.zIndex = scale * 100000
			}
		}
		changeSize()
	})();
	(function() {
		var oUC = document.getElementById("ul_container");
		var aLi = oUC.children;
		var x = 0;
		var y = 0;
		oUC.onmousedown = function(ev) {
			var oEvent = ev || event;
			var disX = oEvent.clientX - x;
			var disY = oEvent.clientY - y;
			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				x = oEvent.clientX - disX;
				y = oEvent.clientY - disY;
				for (var i = 0; i < aLi.length; i++) {
					aLi[i].style.marginLeft = x * aLi[i].style.zIndex / 20 + "px";
					aLi[i].style.marginTop = y * aLi[i].style.zIndex / 20 + "px"
				}
			};
			document.onmouseup = function() {
				document.onmousemove = null;
				document.onmouseup = null;
				document.releaseCapture && document.releaseCapture()
			};
			document.setCapture && document.setCapture();
			return false
		}
	})();
	(function() {
		var oClock = document.querySelector("#clock");
		var aImg = oClock.getElementsByTagName("img");

		function tick() {
			var oDate = new Date();
			var h = oDate.getHours();
			var m = oDate.getMinutes();
			var s = oDate.getSeconds();
			var str = toDou(h) + toDou(m) + toDou(s);
			for (var i = 0; i < aImg.length; i++) {
				startMove(aImg[i], {
					top: -35 * str.charAt(i)
				}, {
					time: 300
				})
			}
		}
		tick();
		setInterval(tick, 1000)
	})();
	(function() {
		var oAcc = document.querySelector("#accordion");
		var aLi = oAcc.getElementsByTagName("li");
		var oneW = aLi[0].offsetWidth;
		var defaultW = 40;
		for (var i = 1; i < aLi.length; i++) {
			aLi[i].style.left = oneW - (aLi.length - i) * defaultW + "px"
		}
		for (var i = 0; i < aLi.length; i++) {
			(function(index) {
				aLi[i].onmouseover = function() {
					for (var i = 0; i < aLi.length; i++) {
						if (i <= index) {
							startMove(aLi[i], {
								left: i * defaultW
							})
						} else {
							startMove(aLi[i], {
								left: oneW - (aLi.length - i) * defaultW
							})
						}
					}
				}
			})(i)
		}
	})();
	(function() {
		var oDock = document.getElementById("dock-box");
		var aImg = oDock.children;
		document.onmousemove = function(ev) {
			var oEvent = ev || event;
			for (var i = 0; i < aImg.length; i++) {
				var a = getOffset(oDock).x + aImg[i].offsetLeft + aImg[i].offsetWidth / 2 - oEvent.pageX;
				var b = getOffset(oDock).y + aImg[i].offsetTop + aImg[i].offsetHeight / 2 - oEvent.pageY;
				var c = Math.sqrt(a * a + b * b);
				var scale = 1 - c / 500;
				if (scale < 0.5) {
					scale = 0.5
				}
				aImg[i].width = scale * 128
			}
		}
	})(function(){
		console.log('我是韦宏宇，欢迎来到我的个人站！');
	}());
	(function() {
		var oScroll = document.getElementById("scrollTop");
		var oL2 = oScroll.children[0];
		var oL3 = oScroll.children[1];
		var oL4 = oScroll.children[2];
		var bOk = false;
		var timer = null;

		function fnScrollTop(ev) {
			if (bOk) {
				return
			}
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollTop >= 100) {
				oScroll.style.opacity = 1
			} else {
				oScroll.style.opacity = 0
			}
		}
		window.addEventListener("scroll", fnScrollTop, false);
		window.addEventListener("load", fnScrollTop, false);
		window.addEventListener("resize", fnScrollTop, false);
		oScroll.onclick = function() {
			addClass(this, "on");
			bOk = true;
			oScroll.style.WebkitTransition = "0.5s all ease-in";
			oScroll.style.MozTransition = "0.5s all ease-in";
			oScroll.style.msTransition = "0.5s all ease-in";
			oScroll.style.transition = "0.5s all ease-in";
			setTimeout(function() {
				oScroll.style.WebkitTransform = "translateY(-3000px)";
				oScroll.style.MozTransform = "translateY(-3000px)";
				oScroll.style.msTransform = "translateY(-3000px)";
				oScroll.style.transform = "translateY(-3000px)"
			}, 300);
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			var start = scrollTop;
			var iTarget = 0;
			var dis = iTarget - start;
			var time = 1000;
			var count = Math.floor(1000 / 30);
			var n = 0;
			timer = setInterval(function() {
				n++;
				var a = 1 - n / count;
				var cur = start + dis * (1 - Math.pow(a, 3));
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if (n == count) {
					clearInterval(timer);
					removeClass(oScroll, "on");
					oScroll.style.WebkitTransition = "";
					oScroll.style.MozTransition = "";
					oScroll.style.msTransition = "";
					oScroll.style.transition = "";
					oScroll.style.WebkitTransform = "translateY(0)";
					oScroll.style.MozTransform = "translateY(0)";
					oScroll.style.msTransform = "translateY(0)";
					oScroll.style.transform = "translateY(0)";
					oScroll.style.opacity = 0;
					bOk = false
				}
			}, 30)
		};
		var oTT = document.querySelector(".toptop");
		oTT.onclick = function() {
			document.documentElement.scrollTop = document.body.scrollTop = 0
		}
	})()
}, false);
