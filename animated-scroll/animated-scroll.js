//------------------------------------------------------------------------------
// Animated Scroll
//
// Setup:
//   Add the 'js-animated-scroll' class to the element you'd like to animate the anchor tag's scroll
//
// Variables:
//   element: This is either the element on the page to get the position of
//   -OR-
//   element can be the numeric position to go to;
//   topPadding: any extra padding to add to the top of the animated scroll position.
//
//------------------------------------------------------------------------------

// NEED TO UPDATE THIS FOR STICKER HEADERS!!!

function animatedScroll(element, topPadding, dontRepeat) {
	var $viewport = $('html, body');

	// Stop the animation if the user scrolls. Defaults on .stop() should be fine
	$viewport.on('scroll mousedown DOMMouseScroll mousewheel keyup', function(event){
		if ( event.which > 0 || event.type === 'mousedown' || event.type === 'mousewheel' ) {
			$viewport.stop().off('scroll mousedown DOMMouseScroll mousewheel keyup');
		}
	});

	topPadding = typeof topPadding === 'undefined' ? 0 : topPadding;
	var scrollOffset = 0;
	var href = $(element).attr('href');

	if (isNaN(element)) { // check if it's "not a number":
		var elementPosition = $(href).offset().top;
	} else {
		var elementPosition = element;
	}

	// Test for both "in-page-nav" AND "header-nav":
	var fixedHeaderHeight = 0;
	var wpadminbar = 0;
	if ( $('header.site-header').css('position') === 'fixed' ) {
		fixedHeaderHeight = $('header.site-header').height();
	}
	if ( $('#wpadminbar').css('position') === 'fixed' ) {
		wpadminbar = $('#wpadminbar').height();
	}

	scrollOffset = scrollOffset + fixedHeaderHeight + wpadminbar;
	scrollOffset = scrollOffset - 2; // subtract a single pixel to make sure it's in the activation zone
	$viewport.animate({scrollTop:(elementPosition - scrollOffset - topPadding)}, 400, function() {
		// change the href on callback
		if (typeof href != 'undefined') {
			window.location.hash = href;
		}
		// check to see if the fixed nav has changed and if so, run the animated scroll again:
		if (($('header.site-header').height() != fixedHeaderHeight || $('#wpadminbar').height() != wpadminbar) && typeof dontRepeat === 'undefined') {
			animatedScroll(element, topPadding, 'dontrepeat');
		};
	});
}
$('.js-animated-scroll').on('click',function() {
	animatedScroll(this);
});