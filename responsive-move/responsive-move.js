function responsiveMove() {
	//------------------------------------------------------------------------------
	// Responsive Move
	//    Moves content from .responsive-move to .responsive-move--target on medium
	//
	// Variables:
	//   .responsive-move: the container of the original content to move
	//   .responsive-move--content: the content to move
	//   .responsive-move--target: the target container
	//   data-responsive-move--target="UniqueName": Add the SAME data value to both
	//       .responsive-move and .responsive-move--target
	//
	// Creates:
	//   .responsive-move--active: adds this class to either the original or the target
	//------------------------------------------------------------------------------

	var $responsiveMoveItem = $('.responsive-move');
	var $responsiveMoveContent = $('.responsive-move--content');
	var responsiveMoveItemTarget = $responsiveMoveItem.attr('data-responsive-move--target');
	var $responsiveMoveTarget = $('.responsive-move--target[data-responsive-move--target=' + responsiveMoveItemTarget + ']');
	moveIt();
	function moveIt() {
		if (window.matchMedia && window.matchMedia("(max-width: 767px)").matches) {
			$responsiveMoveItem.removeClass('responsive-move--active');
			$responsiveMoveTarget.addClass('responsive-move--active').append($responsiveMoveContent);
		} else {
			$responsiveMoveTarget.removeClass('responsive-move--active');
			$responsiveMoveItem.addClass('responsive-move--active').append($responsiveMoveContent);
		}
	}
	$(window).resize(function() {
		moveIt();
	});
}

responsiveMove();