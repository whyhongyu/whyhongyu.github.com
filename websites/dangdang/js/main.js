'use strict';
var fontS = document.documentElement.clientWidth*0.1;
document.documentElement.style.fontSize = fontS+'px';
window.onresize=function(){
	var fontS = document.documentElement.clientWidth*0.1;
	document.documentElement.style.fontSize = fontS+'px';
};
;(function(){
	var oBan = document.getElementById('banner');
	var oUl = oBan.children[0];
	var aLi = oUl.children;
	var oBtn = document.getElementById('b_btn');
	var aBtn = oBtn.getElementsByTagName('li');
	oUl.addEventListener('touchstart',function(ev){
		var startX = ev.targetTouches[0].pageX;
		var startY = ev.targetTouches[0].pageY;
		oUl.style.WebkitTransition='none';
		var disX = ev.targetTouches[0].pageX-oUl.offsetLeft;
		var dir = '';
		function fnMove(ev){
			if(dir==''){
				if(Math.abs(ev.targetTouches[0].pageX-startX)>5){
					dir = 'x';
				}
				if(Math.abs(ev.targetTouches[0].pageY-startY)>5){
					dir = 'y';
				}
			}else{
				if(dir=='x'){
					oUl.style.left=ev.targetTouches[0].pageX-disX+'px';
					ev.preventDefault();
				}
			}
			
		};
		function fnEnd(){
			var n = Math.round(oUl.offsetLeft/aLi[0].offsetWidth)
			if(n>0){
				n=0
			}else if(n<-(aLi.length-1)){
				n=-(aLi.length-1);
			}
			oUl.style.WebkitTransition='0.7s all ease';
			oUl.style.left=n*aLi[0].offsetWidth+'px';
			oUl.removeEventListener('touchmove',fnMove,false);
			oUl.removeEventListener('touchend',fnEnd,false);
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className='';
			}
			aBtn[Math.abs(n)].className='on';
		}
		oUl.addEventListener('touchmove',fnMove,false);
		oUl.addEventListener('touchend',fnEnd,false);
	},false);
})();