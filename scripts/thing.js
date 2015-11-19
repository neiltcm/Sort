var Bar = function(num) {
	this.num = num;	
	this.graphHeight = 375;
};

Bar.prototype = {
	setHeight: function(height) {
		this.height = height;
	},

	setWidth: function(width) {
		this.width = width;
	},

	calculateHeightFromMax: function(max) {
		this.height = (this.num / max) * this.graphHeight;
	}
};

var SortModel = function() {
	this.maxNum = undefined;
	this.originalBars = [];
	this.bars = [];	
	this.width = 800;
	this.height = 375;
	this.padding = 4;
};

SortModel.prototype = {
	addBar: function(bar) {
		// setting max
		if (this.maxNum == undefined || bar.num > this.maxNum) 
		{
			this.maxNum = bar.num;
			bar.setHeight(this.height);
			this.setBarHeight();
		}
		else 
		{
			bar.calculateHeightFromMax(this.maxNum);
		}

		this.bars.push(bar);
		this.originalBars = this.bars.slice();
		this.setBarWidth();
	},

	deleteBar: function(bar) {					
		_.without(this.bars, bar);
		if (this.maxNum == bar.num) this.maxNum = this.getMaxNum();
		this.setBarWidth();
	},

	deleteAllBars: function() {
		this.bars = [];
	},

	setBarWidth: function() {		
		var w = this.width / (this.bars.length);
		for (var i = 0; i < this.bars.length; i++) {
			this.bars[i].setWidth(w - 4);
		}
	},

	setBarHeight: function() {		
		for (var i = 0; i < this.bars.length; i++) {
			var h = (this.bars[i].num / this.maxNum) * this.height;
			this.bars[i].setHeight(h);
		}
	},

	getMaxNum: function() {
		if (this.bars.length == 0) return undefined;
		else {
			var currentMax = undefined;
			for (var i = 0; i < this.bars.length; i++) {
				if (currentMax == undefined || this.bars[i].num > currentMax) currentMax = this.bars[i].num;				
			}
			return currentMax;
		}		
	}
};

var SortView = function(model, algorithm) {		
	var self = this;
	this.model = model;
	this.algorithm = algorithm;		
	this.numBar = 75;
	this.maxNum = 10;	

	document.getElementById('sort').addEventListener('click', function() {
		var set = self.model.bars.slice();
		var ticker = setInterval(function() {				
			self.clearBars();
			self.algorithm.selectionSort(self.model.bars);
			self.renderBars();
			if (self.algorithm.sorted) {
				self.algorithm.restart();
				clearInterval(ticker);
			}
		}, 100);
	});

	document.getElementById('generate').addEventListener('click', function() {
		self.model.maxNum = undefined;
		var numBar = document.getElementById('num-bar').value;
		(numBar == "") ? self.numBar = 50 : self.numBar = Number(numBar);
		var maxNum = document.getElementById('max-value').value;
		(maxNum == "") ? self.maxNum = 100 : self.maxNum = Number(maxNum);

		self.clearBars();
		self.model.deleteAllBars();		
		for (var i = 0; i < self.numBar; i++) {
			var num = Math.floor(Math.random() * (self.maxNum + 1));
			self.model.addBar(new Bar(num));				
		}
		self.renderBars();
	});
};

SortView.prototype = {
	renderBars: function() {
		var bars = this.model.bars;
		var wrapper = document.getElementById('wrapper');
		for (var i = 0; i < bars.length; i++) {
			var b = document.createElement('div');
			var width = bars[i].width;
			var height = bars[i].height;
			b.className = "bar";
			b.setAttribute("style","width:" + width + "px; height:"  + height + "px");			
			wrapper.appendChild(b);
		}
	},

	clearBars: function() {
		var wrapper = document.getElementById('wrapper');
		wrapper.innerHTML = "";
	}
};