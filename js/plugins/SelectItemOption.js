


	
Window_ItemList.prototype.maxCols = function() {
	
	//NLT edit
	if ($gameSwitches.value(2) == false) {
		return 1; 
	} else {		
		return 2; 
	}
};

Window_ItemList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth + 40);
        if ($gameParty.numItems(item) != 1 || $gameSwitches.value(61)) {
			this.drawItemNumber(item, rect.x, rect.y, rect.width);
		}
        this.changePaintOpacity(1);
    }
};


Window_EventItem.prototype.initialize = function(messageWindow) {
    this._messageWindow = messageWindow;
    var width = Graphics.boxWidth;
    var height = this.windowHeight();

	//NLT edit
	if ($gameSwitches.value(2) == false) {
		Window_ItemList.prototype.initialize.call(this, 0, 0, width / 3, height);
	} else {
		Window_ItemList.prototype.initialize.call(this, 0, 0, width, height);
	}
	
	
    this.openness = 0;
    this.deactivate();
    this.setHandler('ok',     this.onOk.bind(this));
    this.setHandler('cancel', this.onCancel.bind(this));
};

Window_EventItem.prototype.numVisibleRows = function() {
    
	
	//NLT edit
	if ($gameSwitches.value(2) == false) {
		return 15; 
	} else {
		return 8;
	}
	
};