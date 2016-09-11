	function getStyle(obj,name){
		if (obj.currentStyle) {
			return obj.currentStyle[name];
		} else {
			return getComputedStyle(obj,false)[name];
		}
	};
/*
obj=>obj
json=> {name:value}
eg:'width':200
options=>{'timer':总时间,'type':运动类型(目前只有加速，减速，匀速),'fnComplete':函数(链式运动)}
timer=>number
type=>'linear'||'ys'(匀速)	'ease-in'||'jj'(加速)	'ease-out'||'qq'(减速);
fnComplete=>function(){
	alert(1);
};
*/
function move(obj,json,options){
	//timer,type,fnComplete
	options=options||{};
	options.timer=options.timer||2000;
	options.type=options.type||'linear';

	var n=0;//要运动多次
	var start={};
	var dis={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}
	var count=Math.floor(options.timer/30);
	clearInterval(obj.tt);
	obj.tt=setInterval(function(){
		n++;
		for(var name in json){

			if (options.type=='linear'||options.type=='ys') {
				var x=n/count;
				x=x;
			}else if (options.type=='ease-in'||options.type=='jj') {
				var x=n/count;
				x=x*x*x;
			}else if (options.type=='ease-out'||options.type=='qq') {
				var x=1-n/count;
				x=1-x*x*x;
			}
			var crr=start[name]+dis[name]*x;
			if (name=='opacity') {
				obj.style[name]=crr;
				obj.style.filter='alpha(opacity:'+crr*100+')';
			} else {
				obj.style[name]=crr+'px';
			};
		}
		if (n==count) {
			clearInterval(obj.tt);
			options.fnComplete && options.fnComplete();
		};
	},30);

};
