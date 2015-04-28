//------------------------------------------------------------------------------
// Container Overflow
// Takes the container that this is attached to and artifically extends it
// out to the viewport boundaries
//------------------------------------------------------------------------------

new ContainerOverflow();

/**
 * The ContainerOverflow class
 */
function ContainerOverflow() {
	// Variables
	var $containerOverflow = $('.js-container-overflow');
	var $containerOverflowItem;
	var containerOverflowDirection;
	var containerOverflowLeftPosition;
	var containerOverflowRightPosition;
	var containerOverflowWidth = $('.js-container-overflow').width();
	var thisPos;
	var $this;
	var $containerOverflowSide;
	var $window            = $(window);
	var windowWidth        = $window.width();
	var init               = _init();

	var windowRightPostion = $window.width();

	function _init() {
		// main();
		$window.load( main );
		$window.resize( function() {
			main(false);
		});
	}

	function main() {
		// reset and hide:
		$containerOverflow.addClass('js-container-overflow__loading').attr('style', '');

		$containerOverflow.each(function(index,el) {
			$containerOverflowItem = $(this);
			containerOverflowLeftPosition = $containerOverflowItem.offset().left;
			containerOverflowRightPosition = $containerOverflowItem.offset().left + $containerOverflowItem.width();

			if ($containerOverflowItem.hasClass('js-container-overflow__go-left')) {
				$containerOverflowItem.css({
					left: (containerOverflowLeftPosition * -1) +'px',
					width: containerOverflowRightPosition
				});
			} else {
				console.log('containerOverflowRightPosition: ' + containerOverflowRightPosition);
				console.log('windowRightPostion:             ' + windowRightPostion);
				$containerOverflowItem.css({
					right: (containerOverflowRightPosition - windowRightPostion) + 'px',
					width: (windowRightPostion - containerOverflowRightPosition + $containerOverflowItem.width()) + 'px'
				});
				containerOverflowDirection = 'right';
			}
		});

		// restore:
		$containerOverflow.removeClass('js-container-overflow__loading');
	}
}
