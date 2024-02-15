/*:
* @plugindesc Play a second BGS
*
* Plugin Commands:
*
* Play2ndBGS name valume pitch pan
* E.g. Play2ndBGS Wind 90 100 0
*
* Fadeout2ndBGS duration
* E.g. Fadeout2ndBGS 3
*
*/

_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
  
   if (command == 'Play2ndBGS') {
       var bgsName = args[0];
       var bgsVolume = Number(args[1]) || 90;
       var bgsPitch = Number(args[2]) || 100;
       var bgsPan = Number(args[3]) || 0;
       var bgs = {name:bgsName,volume:bgsVolume,pitch:bgsPitch,pan:bgsPan};
       AudioManager.playBgs2(bgs);
   }
  
   if (command == 'Fadeout2ndBGS') {
       var duration = Number(args[0]) || 1;
       AudioManager.fadeOutBgs2(duration);
   }
};



AudioManager.playBgs2 = function(bgs, pos) {
    if (this.isCurrentBgs2(bgs)) {
        this.updateBgs2Parameters(bgs);
    } else {
        this.stopBgs2();
        if (bgs.name) {
            this._bgs2Buffer = this.createBuffer('bgs', bgs.name);
            this.updateBgs2Parameters(bgs);
            this._bgs2Buffer.play(true, pos || 0);
        }
    }
    this.updateCurrentBgs2(bgs, pos);
};

AudioManager.replayBgs2 = function(bgs) {
    if (this.isCurrentBgs2(bgs)) {
        this.updateBgs2Parameters(bgs);
    } else {
        this.playBgs2(bgs, bgs.pos);
        if (this._bgs2Buffer) {
            this._bgs2Buffer.fadeIn(this._replayFadeTime);
        }
    }
};

AudioManager.isCurrentBgs2 = function(bgs) {
    return (this._currentBgs2 && this._bgs2Buffer &&
            this._currentBgs2.name === bgs.name);
};

AudioManager.updateBgs2Parameters = function(bgs) {
    this.updateBufferParameters(this._bgs2Buffer, this._bgsVolume, bgs);
};

AudioManager.updateCurrentBgs2 = function(bgs, pos) {
    this._currentBgs2 = {
        name: bgs.name,
        volume: bgs.volume,
        pitch: bgs.pitch,
        pan: bgs.pan,
        pos: pos
    };
};

AudioManager.stopBgs2 = function() {
    if (this._bgs2Buffer) {
        this._bgs2Buffer.stop();
        this._bgs2Buffer = null;
        this._currentBgs2 = null;
    }
};

AudioManager.fadeOutBgs2 = function(duration) {
    if (this._bgs2Buffer && this._currentBgs2) {
        this._bgs2Buffer.fadeOut(duration);
        this._currentBgs2 = null;
    }
};

AudioManager.fadeInBgs2 = function(duration) {
    if (this._bgs2Buffer && this._currentBgs2) {
        this._bgs2Buffer.fadeIn(duration);
    }
};

AudioManager.saveBgs2 = function() {
    if (this._currentBgs2) {
        var bgs = this._currentBgs2;
        return {
            name: bgs.name,
            volume: bgs.volume,
            pitch: bgs.pitch,
            pan: bgs.pan,
            pos: this._bgs2Buffer ? this._bgs2Buffer.seek() : 0
        };
    } else {
        return this.makeEmptyAudioObject();
    }
};

_AudioManager_stopAll = AudioManager.stopAll;
AudioManager.stopAll = function() {
    _AudioManager_stopAll.call(this);
    this.stopBgs2();
};


_BattleManager_saveBgmAndBgs = BattleManager.saveBgmAndBgs;
BattleManager.saveBgmAndBgs = function() {
   _BattleManager_saveBgmAndBgs.call(this);
    this._mapBgs2 = AudioManager.saveBgs2();
};

_BattleManager_playBattleBgm = BattleManager.playBattleBgm;
BattleManager.playBattleBgm = function() {
    _BattleManager_playBattleBgm.call(this);
   AudioManager.stopBgs2();
};


_BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
BattleManager.replayBgmAndBgs = function() {
    _BattleManager_replayBgmAndBgs.call(this);
    if (this._mapBgs2) {
        AudioManager.replayBgs2(this._mapBgs2);
    }
};

_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this._bgs2OnSave = null;
};

_Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
Game_System.prototype.onBeforeSave = function() {
    _Game_System_onBeforeSave.call(this);
    this._bgs2OnSave = AudioManager.saveBgs2();
};

_Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
Game_System.prototype.onAfterLoad = function() {
    _Game_System_onAfterLoad.call(this);
    AudioManager.playBgs2(this._bgs2OnSave);
};

Scene_Base.prototype.fadeOutAll = function() {
    var time = this.slowFadeSpeed() / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
   AudioManager.fadeOutBgs2(time);
    AudioManager.fadeOutMe(time);
    this.startFadeOut(this.slowFadeSpeed());
};

_Scene_Title_playTitleMusic = Scene_Title.prototype.playTitleMusic;
Scene_Title.prototype.playTitleMusic = function() {
    _Scene_Title_playTitleMusic.call(this);
    AudioManager.stopBgs2();
};

_Scene_Map_stopAudioOnBattleStart = Scene_Map.prototype.stopAudioOnBattleStart;
Scene_Map.prototype.stopAudioOnBattleStart = function() {
    _Scene_Map_stopAudioOnBattleStart.call(this);
    AudioManager.stopBgs2();
};

_Scene_Gameover_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic;
Scene_Gameover.prototype.playGameoverMusic = function() {
    _Scene_Gameover_playGameoverMusic.call(this);
    AudioManager.stopBgs2();
};