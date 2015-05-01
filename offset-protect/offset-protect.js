//------------------------------------------------------------------------------
// Offset Protect
// Prevents items from extending right past their parent container by pushing them left
// .js-offset-protect        // the container
// .js-offset-protect__item  // each item to protect
//------------------------------------------------------------------------------
function offsetProtect() {
	var $offsetProtect = $('.js-offset-protect');
	$offsetProtect.each(function() {
		var $offsetProtectContainer = $(this);
		var $offsetProtectItems = $offsetProtectContainer.find('.js-offset-protect__item');
		var offsetProtectRight = $offsetProtectContainer.offset().left + $offsetProtectContainer.outerWidth();
		$offsetProtectItems.each(function() {
			var $offsetProtectItem = $(this);
			$offsetProtectItem.css('margin-left', '0');
			var offsetProtectItemRight = $offsetProtectItem.offset().left + $offsetProtectItem.width();
			var offsetProtectAdjustment = Math.floor(offsetProtectRight - offsetProtectItemRight);
			if (offsetProtectItemRight > offsetProtectRight) {
				$offsetProtectItem.css('margin-left', offsetProtectAdjustment + 'px');
			}
		});
	});
	// HACK to get it to "reload" its own content to display correctly:
	$offsetProtect.html($offsetProtect.children());
}