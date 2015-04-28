//------------------------------------------------------------------------------
// Scroll Activation
//
// This module makes a section "Active" when scrolling down
//
// Add .scroll-activation to the container
// Add (optional) .scroll-activation--keep-active to keep the section active once activated; otherwise,
//     the active will be removed after going back up.
// Add (optional) .scroll-activation--trigger to the element on the page which activates the section
//   Optional:
//     Add 'data-target="any-name"' on the target element and any element you'd like to set 'active'
//     Add 'data-scroll-position="top" to wait until scroll activator hits the top' (this makes room for sticky nav)
//
// Output
//   Adds 'active' class to when active
//------------------------------------------------------------------------------
var scrollActivate = function(scrollActivationItems) {
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
				$scrollItem.addClass('active');
				$('[data-target=' + $scrollItem.attr('data-target') + ']').addClass('active');
			} else if ( !($scrollItem.hasClass('js-scroll-activation--keep-active')) ) {
				$scrollItem.removeClass('active');
				$('[data-target=' + $scrollItem.attr('data-target') + ']').removeClass('active');
			}
		}
	});
}

function scrollActivation() {
	window.setTimeout(function() {
		var $window = $(window);
		$window.scroll(function () {
			scrollActivate(scrollActivationItems);
		});
	}, 500); // wait half a second for the page to load
}

var scrollActivationItems = $('.js-scroll-activation');
scrollActivation(scrollActivationItems);
scrollActivate(scrollActivationItems);