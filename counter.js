/**
* Counter.js  - written by Victor N - 22/Nov/2013 - www.vitim.us
* Repo: https://github.com/victornpb/analog-counter-wheel
*/
function Counter(counterElement){
  
	this.pos = 0;
	this.values = ['0','1','2','3','4','5','6','7','8','9'];
	
	this.options = {
		mousewheel: true,
		digitHeight: 0,
		inverted: false	
	};
	
	this.DOM = {
		counter : counterElement,
		wheel : document.createElement('div'),
		digitAbove : document.createElement('div'),
		digitCenter : document.createElement('div'),
		digitBelow : document.createElement('div')
	};
		
	//Initial Values
	if(this.DOM.counter.innerHTML.indexOf('|')>-1){
		this.values = this.DOM.counter.innerHTML.split('|');
	}
	this.DOM.counter.innerHTML = "";
		
	this.DOM.counter.classList.add('counter');
	this.DOM.wheel.classList.add('wheel');
	this.DOM.digitAbove.classList.add('digit');
	this.DOM.digitCenter.classList.add('digit');
	this.DOM.digitBelow.classList.add('digit');
	this.DOM.digitAbove.classList.add('above');
	this.DOM.digitCenter.classList.add('center');
	this.DOM.digitBelow.classList.add('below');
	
	this.DOM.counter.appendChild(this.DOM.wheel);
	this.DOM.wheel.appendChild(this.DOM.digitAbove);
	this.DOM.wheel.appendChild(this.DOM.digitCenter);
	this.DOM.wheel.appendChild(this.DOM.digitBelow);
	
	//compute digit height
	//this.options.digitHeight = this.DOM.digitCenter.offsetHeight;
	this.options.digitHeight = parseInt(window.getComputedStyle(this.DOM.digitCenter, null).getPropertyValue("height"));
	this.setPos(0);
	
	this.DOM.counter.onmousewheel = this.mouseWheel();
	
}

Counter.prototype.setValue = function(value){
	var pos = this.values.indexOf(value);
	if(pos>=0) return this.setPos(pos);
	else throw new Error('"'+value+'" is not a item on Counter.values[]');
};

Counter.prototype.getValue = function(){
	return this.values[this.pos];
};

Counter.prototype.getPos = function(){
	return this.pos;	
};

Counter.prototype.setPos = function(x){
	
	//function that cycle values between 0..max
	function n(x,max){
		if(x>=max) x=(x%(max));
		if(x<0) x=max-(Math.abs(x)%max);
		return x;
	}
	
	var offsetAbove, offsetBelow;
	var max = this.values.length;
	
	this.pos = n(x, max);
	
	if(!this.options.inverted){ //numbers increase rolling down
		offsetAbove = n(this.pos-1, max);
		offsetBelow = n(this.pos+1, max);
	}
	else{ //numbers increase rolling up
		offsetAbove = n(this.pos+1, max);
		offsetBelow = n(this.pos-1, max);
	}
	
	this.DOM.digitAbove.innerHTML = this.values[offsetAbove];
	this.DOM.digitCenter.innerHTML = this.values[this.pos];
	this.DOM.digitBelow.innerHTML = this.values[offsetBelow];
	
	//dispatch event if handler is set
	if(this.onChange){
		this.onChange.call(this, this.pos);
	}
	
	return this.pos;
};

Counter.prototype.moveBy = function(x){
	var self = this;
	if(x!=0){
		
		this.setPos(this.pos+x);
		
		//amount of movement
		var d = this.options.digitHeight;
		
		//set direction of movement
		if(x>0) d*=1; 
		if(x<0) d*=-1;
		
		//invert direction of movement animation
		if(this.options.inverted) d*=-1; 
		
		this.DOM.wheel.classList.remove('animate');
		this.DOM.wheel.style.top = d+"px";
		
		setTimeout(function(){
			self.DOM.wheel.classList.add('animate');
			self.DOM.wheel.style.top = "0px";
		},0);
	}
};

Counter.prototype.moveTo = function(pos){
	
	if(this.pos!=pos){
		
		var max = this.values.length-1;
		
		var direction = pos - this.pos;
		if(this.pos==max && pos==0) direction = 1;
		if(this.pos==0 && pos==max) direction = -1;
			
		this.moveBy(direction);
		
		var cur = this.setPos(pos);
		
	}
};


Counter.prototype.next = function(){
	this.moveBy(1);
};

Counter.prototype.previous = function(){	
	this.moveBy(-1);
};

Counter.prototype.mouseWheel = function(){
	
	var self = this;
	var lastScroll=0, eventCount=0;
	
	//function attached to onmousewheel
	return function(e){
		
		if(self.options.mousewheel==false) return;
		
		// cross-browser wheel delta
		e = window.event || e; // old IE support
		e.preventDefault();
		
		var now = Date.now();
		var dif = now-lastScroll;
		
		this.lastScroll = now;
		
		var delta = e.wheelDelta;
		//var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		
		if(self.options.inverted)
			delta*=-1;
		
		if(e.webkitDirectionInvertedFromDevice)
			delta*=-1;
		
		if((dif>20 && Math.abs(delta)>=12) || Math.abs(eventCount)>50){
			if(delta>0){
				self.next();
			}
			else{
				self.previous();
			}
			eventCount = 0;
		}
		else{
			eventCount+=e.wheelDelta;
		}
		
		//console.log("timestamp %s \t dif: %s \t deltaMode: %s \t inverted: %s \t wheelDelta: %s \t delta: %s \t x: %d",
		//			e.timeStamp, dif, e.deltaMode, e.webkitDirectionInvertedFromDevice, e.wheelDelta, delta, wheel);
	};
};
