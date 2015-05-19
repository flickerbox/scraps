//------------------------------------------------------------------------------
//
//	Responsive Move
//
//	Summary
//		Moves content from .js-responsive-move to its associated data-js-responsive-move
//
//	Usage
//		.js-responsive-move
//			the container of the original content to move
//		[data-js-responsive-move=MOVE_ID]
//			The unique data attribute added to the .js-responsive-move element AND an empty target element
//
//	Optional
//		[data-js-responsive-move-breakpoint=NUMBER]
//			The max-breakpoint in pixels. Default is 767.
//
//	Creates
//		.js-responsive-move--is-active
//			Added to the element which is currently active
//		.js-responsive-move--is-inactive
//			Added to the element which is currently inactive
//
//------------------------------------------------------------------------------
function responsiveMove() {

	var $items = $('.js-responsive-move');
	$items.each(function(index, el) {
		function responsiveMoveGo() {
			if (window.matchMedia && window.matchMedia('(max-width: ' + breakpoint + 'px)').matches) {
				$item.removeClass('js-responsive-move--is-active').addClass('js-responsive-move--is-inactive').html('');
				$target.removeClass('js-responsive-move--is-inactive').addClass('js-responsive-move--is-active').html(content);
			} else {
				$target.removeClass('js-responsive-move--is-active').addClass('js-responsive-move--is-inactive').html('');
				$item.removeClass('js-responsive-move--is-inactive').addClass('js-responsive-move--is-active').html(content);
			}
		}
		var $item = $(this);
		if ( $item.attr('data-js-responsive-move-breakpoint')  && !isNaN($item.attr('data-js-responsive-move-breakpoint')) ) {
			var breakpoint = $item.attr('data-js-responsive-move-breakpoint');
		} else {
			var breakpoint = 767;
		}
		var $target = $('[data-js-responsive-move="' + $item.attr('data-js-responsive-move') + '"]:not(.js-responsive-move)');
		var content = $item.html();
		responsiveMoveGo();
		$(window).resize(function() {
			responsiveMoveGo();
		});
	});
}
responsiveMove();