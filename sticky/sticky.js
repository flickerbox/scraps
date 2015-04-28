//------------------------------------------------------------------------------
// Sticky (adapted from happycog.com)
//------------------------------------------------------------------------------
var $sticky = $('.js-sticky');
var stickyOffset = $sticky.attr('data-js-sticky-offset');

if ($sticky.size()) { // make sure it exists
	$(window).scroll(function () {
		if ($sticky.hasClass('js-sticky--is-top') && $(window).scrollTop() > stickyOffset) {
			$sticky.addClass("js-sticky--is-scrolling").removeClass('js-sticky--is-top');
		}
		else if ($sticky.hasClass('js-sticky--is-scrolling') && $(window).scrollTop() <= stickyOffset) {
			$sticky.removeClass("js-sticky--is-scrolling").addClass('js-sticky--is-top');
		}
	});
}