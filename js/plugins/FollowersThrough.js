//=============================================================================
// FollowersThrough.js
//=============================================================================

/*:
 * @plugindesc Party followers will never block events. Party _LEADER_ will still block events.
 * @author Wes Townsend
 * 
 * @help This plugin does not provide plugin commands.
 * 
 * V.0.0.1a
 *
 */
 

 
(function() {

	Game_Followers.prototype.isSomeoneCollided = function(x, y) {
        console.log("called");
        return false;
    }

})();
