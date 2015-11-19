var Algorithm = function() {
	this.sorted = false;
	this.type = undefined;	
	this.startIndex = 0;	
};

Algorithm.prototype = {
	selectionSort: function(barSet) {			
		for (var i = this.startIndex; i < barSet.length; i++) {			
			var currentMinIndex = undefined;
			var currentMin = undefined;
			for (var j = i; j < barSet.length; j++) {				
				if (currentMin == undefined || barSet[j].num < currentMin.num) {									
					currentMinIndex = j;
					currentMin = barSet[j];
				}
			}		
			if (i != currentMinIndex){	
				var temp = barSet[i];
				barSet[i] = barSet[currentMinIndex];
				barSet[currentMinIndex] = temp;							
				this.startIndex = i;				
				return barSet;
			}
		}		
		this.sorted = true;
		return barSet;
	},

	restart: function() {
		this.sorted = false;
		this.startIndex = 0;
	}
};