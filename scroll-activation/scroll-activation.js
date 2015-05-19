//------------------------------------------------------------------------------
//
//	Scroll Activation
//
//	Summary
//		Scroll Activation makes a section "active" when it's entire container is scrolled upon
//
//	Usage
//		.js-scroll-activation
//			Add this class to the container you'd like to make active on scrolling.
//
//	Optional
//		.js-scroll-activation--keep-active
//			Keeps the section always active once activated; otherwise, the active
//			will be removed after going back up.
//     [data-target="TARGET_ID]
//			Add to the target element and any element you'd like to set 'active'
//     [data-scroll-position="top"]
//			Activates js-scroll-position on the top of the container instead of the bottom
//
// 	Creates
//		.js-scroll-activation--is-active
//			This class gets added to both the .js-scroll-activation class and the
//			[data-target="TARGET_ID]
//
//------------------------------------------------------------------------------
var scrollActivationGo = function(scrollActivationItems) {
	var $window = $(window);
	scrollActivationItems.each(function() {
		if (!($(this).hasClass('js-scroll-activation--stop'))) {
			var $scrollItem = $(this);
			// scrollActivationTop: where the element starts on the entire page in px.
			var scrollActivationTop = $scrollItem.offset().top;
			var scrollOffset = 0;
			if ($scrollItem.attr('data-scroll-offset')) {
				scrollOffset += getScrollOffset($scrollItem.attr('data-scroll-offset'));
			}

			if ($scrollItem.data('scroll-position') === 'top') {
				var windowOffset = 0;

				// fixed header adjustments:
				var fixedHeaderHeight = $('.js-fixed-nav').height();
				scrollOffset = scrollOffset + fixedHeaderHeight;
			} else {
				var windowOffset = $window.height()
			}
			if (   $window.scrollTop() > (scrollActivationTop - windowOffset - scrollOffset) ) {
				$scrollItem.addClass('js-scroll-activation--is-active');
				$('[data-target=' + $scrollItem.attr('data-target') + ']').addClass('js-scroll-activation--is-active');
			} else if ( !($scrollItem.hasClass('js-scroll-activation--keep-active')) ) {
				$scrollItem.removeClass('js-scroll-activation--is-active');
				$('[data-target=' + $scrollItem.attr('data-target') + ']').removeClass('js-scroll-activation--is-active');
			}
		}
	});
}

function scrollActivation() {
	window.setTimeout(function() {
		var $window = $(window);
		$window.scroll(function () {
			scrollActivationGo(scrollActivationItems);
		});
	}, 500); // wait half a second for the page to load
}

var scrollActivationItems = $('.js-scroll-activation');
scrollActivation(scrollActivationItems);
scrollActivationGo(scrollActivationItems);