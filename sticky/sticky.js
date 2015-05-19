//------------------------------------------------------------------------------
//
// Sticky
//
//
//------------------------------------------------------------------------------
var $sticky = $('.js-sticky');

if ($sticky.size()) { // make sure it exists
	var $window = $(window);
	// var stickyHeight;
	var stickyOffset = $sticky.attr('data-js-sticky-offset') ?  $sticky.attr('data-js-sticky-offset') : $sticky.offset().top;
	var stickySpacer = document.createElement('div');
	stickySpacer.className = 'js-sticky__spacer';
	$sticky.after(stickySpacer);
	var scrollPosition;

	// make the default:
	$sticky.addClass('js-sticky--is-top');

	goSticky();
	$window.scroll(function () {
		goSticky();
	});
	function goSticky() {
		scrollPosition = $window.scrollTop();
		$(stickySpacer).css('height',$sticky.height());

		if ($sticky.hasClass('js-sticky--is-top') && scrollPosition > stickyOffset) {
			$sticky.addClass("js-sticky--is-scrolling").removeClass('js-sticky--is-top');
		}
		else if ($sticky.hasClass('js-sticky--is-scrolling') && scrollPosition <= stickyOffset) {
			$sticky.removeClass("js-sticky--is-scrolling").addClass('js-sticky--is-top');
		}
	}
}