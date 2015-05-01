//---------------------------------------------------------
// Replace Tag
//---------------------------------------------------------
$.extend({
	replaceTag: function (currentElem, newTagObj, keepProps) {
		var $currentElem = $(currentElem);
		var i, $newTag = $(newTagObj).clone();
		if (keepProps) {//{{{
			newTag = $newTag[0];
			newTag.className = currentElem.className;
			$.extend(newTag.classList, currentElem.classList);
			$.extend(newTag.attributes, currentElem.attributes);
		}//}}}
		$currentElem.wrapAll($newTag);
		$currentElem.contents().unwrap();
		// return node; (Error spotted by Frank van Luijn)
		return this; // Suggested by ColeLawrence
	}
});

$.fn.extend({
	replaceTag: function (newTagObj, keepProps) {
		// "return" suggested by ColeLawrence
		return this.each(function() {
			jQuery.replaceTag(this, newTagObj, keepProps);
		});
	}
});

//---------------------------------------------------------
// Is Touch
// Returns True if touch, false otherwise
//---------------------------------------------------------
function isTouch() {
	return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

//---------------------------------------------------------
// Touch Nav Fix
//---------------------------------------------------------
// automatically moves parent items that have links into the top position of their child items
// Used to automatically create touch links without having to rewrite code
// optionally have 'data-js-touch-nav-fix-label'= new label for moved item

function jsTouchNavFix() {
	if (isTouch()) {
		var $touchNavFixes = $('.js-touch-nav-fix');
		$touchNavFixes.each(function() {
			$touchNavFix = $(this);
			// find EACH li > a + ul
			$touchNavFix.find('li > a + ul').each(function() {
				var $touchNavFixParent = $(this).parent('li');
				var $touchNavFixParentLink = $touchNavFixParent.find('a').first();
				var touchNavFixLabel = $touchNavFixParentLink.attr('data-js-touch-nav-fix-label') ? $touchNavFixParentLink.attr('data-js-touch-nav-fix-label') : $touchNavFixParentLink.text();
				// var touchNavFixLabel = $touchNavFixParentLink.text();
				var $touchNavFixNewItem = $touchNavFixParent.find('li').first().clone();
				$touchNavFixNewItem.prependTo($touchNavFixParent.find('ul').first());
				var $touchNavFixNewLink = $touchNavFixNewItem.find('a').first();
				$touchNavFixNewLink.attr('href', $touchNavFixParentLink.attr('href')).text(touchNavFixLabel);

				// now clean up the old link:
				$touchNavFixParentLink.addClass('u-cursor-default');
				$touchNavFixParentLink.replaceTag('<span>', true);
				$touchNavFixParentLink.attr('href','');
			});
		});
	};
}

jsTouchNavFix();