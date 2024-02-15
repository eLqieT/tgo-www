// Place file inside /js/plugins
// Remember to save after adding plugins or changing parameters.
// Made by request.
//=============================================================================
// Custom Text on Title Screen
//=============================================================================
/*:
 * Version: 2015-11-06-0008
 * 
 * CHANGE LOG:
 * 2015-11-06-0008 - Released.
 * 
 * 
 * @plugindesc Ver.2015-11-06-0008. Displays a custom text on title screen.
 * <Ellye Title Text>
 * @author https://ellyeblog.wordpress.com/ || http://steamcommunity.com/id/Ellye
 * 
 * @param Text
 * @desc The text to display
 * @default Version1.0
 *
 * @param Text2
 * @desc The text to display
 * @default Version1.0
 * 
 * @param h_align
 * @desc 0: Left. 1: Center. 2: Right.
 * @default 2
 * 
 * @param v_align
 * @desc 0: Top. 1: Center. 2: Bottom.
 * @default 2
 * 
 * @param X Offset
 * @desc The X offset for the text.
 * @default 0
 * 
 * @param Y Offset
 * @desc The Y offset for the text.
 * @default 0
 * 
 * @param Outline Color
 * @desc Color of the text outline
 * @default #000000
 * 
 * @param Outline Width
 * @desc Width of the outline
 * @default 3
 * 
 * @param Font Size
 * @desc Size of the font
 * @default 27
 * 
 * @param Text Color
 * @desc Color of the text
 * @default #FFFFFF
 * 
 * @help This plugin displays a single string on your title screen. For showing the game version, for example.
 * 
 */

(function() {
    var parameters = $plugins.filter(function(p) {
        return p.description.contains('<Ellye Title Text>');
    })[0].parameters; //Thanks to Iavra


    var custom_text = String(parameters['Text'] || "");
	var custom_text2 = String(parameters['Text2'] || "");
    var h_align = Number(parameters['h_align'] || 2);
    var v_align = Number(parameters['v_align'] || 2);
    var x_offset = Number(parameters['X Offset'] || 0);
    var y_offset = Number(parameters['Y Offset'] || 0);
    var outline_color = String(parameters['Outline Color'] || "#000000");
    var outline_width = Number(parameters['Outline Width'] || 2);
    var font_size = Number(parameters['Font Size'] || 18);
    var text_color = String(parameters['Text Color'] || "#FFFFFF");


    _alias_scene_title_create_ = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function()
    {
        _alias_scene_title_create_.call(this);
        this.DisplayCustomText();
    };

    Scene_Title.prototype.DisplayCustomText = function()
    {
        this._titleCustomText = new Sprite(new Bitmap(Graphics.width, Graphics.height));
        this.addChild(this._titleCustomText);
        var y = VerticalPosition() + y_offset;
        var maxWidth = Graphics.width - x_offset * 2;
        var text = custom_text;
		var text2 = custom_text2;
        this._titleCustomText.bitmap.outlineColor = outline_color;
        this._titleCustomText.bitmap.outlineWidth = outline_width;
        this._titleCustomText.bitmap.fontSize = font_size;
        this._titleCustomText.bitmap.textColor = text_color;
        this._titleCustomText.bitmap.drawText(text, x_offset, y, maxWidth, font_size, HorizontalAlignment());
		this._titleCustomText.bitmap.fontSize = 17;
		this._titleCustomText.bitmap.drawText(text2, x_offset - 10, y, maxWidth, font_size, 'right');
    };

    VerticalPosition = function()
    {
        switch (v_align)
        {
            case 0:
                return 0;
            case 1:
                return Graphics.height / 2 - font_size / 2;
            default:
                return Graphics.height - font_size;
        }
    };

    HorizontalAlignment = function()
    {
        switch (h_align)
        {
            case 0:
                return 'left';
            case 1:
                return 'center';
            default:
                return 'right';
        }
    };

})();