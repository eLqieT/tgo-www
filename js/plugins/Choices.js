var I = I || {} ;
var Q = Q || {};
I.Q_Choices = 1;
Q.Choices = Q.Choices || {};
(function($) {
  var pr_setupChoices = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function(opt) {  
    opt = this.combineChoices(), pr_setupChoices.call(this, opt)      
  };

  Game_Interpreter.prototype.combineChoices = function(opt) {  
    this._list = JSON.parse(JSON.stringify(this._list))
    var thindex = this._index
    var choiceamt = 0;
    var fchoice = this._list[this._index];    
    this._index++;
	
	
    while (this._index < this._list.length) {
      var com = this._list[this._index];
      var nextt = this._list[this._index+1];
      if (com.indent === this._indent)

        if (com.code === 404 && (nextt === undefined || nextt.code !== 102)) {
          break;
        }
        else if (com.code === 102) {


          var cancell = com.parameters[1]
          if (cancell > -1) {
            fchoice.parameters[1] = cancell + choiceamt
          }
          else if (cancell === -2) {
            fchoice.parameters[1] = cancell;            
          }
          

          var typee = com.parameters[2]
          if (typee > -1) {
            fchoice.parameters[2] = typee + choiceamt;
          }
          

          var options = com.parameters[0];                    
          for (var i = 0; i < options.length; i++) {
            fchoice.parameters[0].push(options[i]);
          }    
          

          this._list.splice(this._index - 1, 2)
          this._index -= 2;
        }
        

        else if (com.code === 402) {          
          com.parameters[0] = choiceamt;
          choiceamt++;
        }
        this._index++;
      }

    this._index = thindex;       

    return fchoice.parameters;
  }  
}(Q.Choices));