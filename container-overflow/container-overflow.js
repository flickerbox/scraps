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
	var $containerOverflowContainer;
	var $containerOverflowItems;
	var $containerOverflowItem;
	var containerOverflowWidths = [];
	var containerOverflowItemLeftPosition;
	var containerOverflowItemRightPosition;
	var containerOverflowRight = false;
	var containerOverflowLeft = false;
	var containerOverflowContainerWidth;
	var containerOverflowContainerLeft;
	var containerOverflowContainerRight;

	var $window            = $(window);
	var windowWidth;
	var init               = _init();

	function _init() {
		// main();
		$window.load( main );
		$window.resize( function() {
			main();
		});
	}

	function main() {
		// reset and hide:

		$containerOverflow.each(function(index,el) {
			$containerOverflowContainer = $(this);

			$containerOverflowItems = $containerOverflowContainer.find('[class*=js-container-overflow__item]');


			//reset:
			containerOverflowRight = containerOverflowLeft = false;
			$containerOverflowContainer.removeClass('js-container-overflow__is-loaded').addClass('js-container-overflow__is-loading').attr('style', '');
			for (var i = 0; i < $containerOverflowItems.length; i++) {
				$($containerOverflowItems[i]).addClass('js-container-overflow__is-loading').attr('style', '');
			};
			containerOverflowWidths = [];

			windowWidth        = Math.ceil($window.width());
			containerOverflowContainerWidth = Math.ceil($containerOverflowContainer.width());
			containerOverflowContainerLeft =  Math.floor($containerOverflowContainer.offset().left);
			containerOverflowContainerRight = containerOverflowContainerLeft + containerOverflowContainerWidth;

			$containerOverflowItems.each(function(index, el) {
				$containerOverflowItem = $(this);

				containerOverflowItemLeftPosition = Math.floor($containerOverflowItem.offset().left);
				containerOverflowItemRightPosition = containerOverflowItemLeftPosition + Math.floor($containerOverflowItem.width());


				if ($containerOverflowItem.hasClass('js-container-overflow__item--go-left')) {
					containerOverflowLeft = true;
					containerOverflowWidths.push(Math.floor( containerOverflowItemRightPosition ));
				} else if ($containerOverflowItem.hasClass('js-container-overflow__item--go-right')) {
					containerOverflowRight = true;
					containerOverflowWidths.push(Math.floor( windowWidth - containerOverflowItemLeftPosition ));
				} else {
					containerOverflowWidths.push(Math.floor( $containerOverflowItem.width() ));
				}
			});

			// set the widths
			for (var i = 0; i < $containerOverflowItems.length; i++) {
				$($containerOverflowItems[i]).css('width', containerOverflowWidths[i] + 'px');
			};

			if (containerOverflowLeft === true) {
				$containerOverflowContainer.css({
					marginLeft: '0',
					width: (containerOverflowContainerRight + 1)
				});
			}
			if (containerOverflowRight === true) {
				$containerOverflowContainer.css({
					marginRight: '0',
					width: (windowWidth - containerOverflowContainerLeft + 1)
				});
			}
			if (containerOverflowLeft === true && containerOverflowRight === true) {
				$containerOverflowContainer.css('width', windowWidth);
			}

			// restore:
			$containerOverflowItems.removeClass('js-container-overflow__is-loading');
			$containerOverflowContainer.removeClass('js-container-overflow__is-loading').addClass('js-container-overflow__is-loaded');

		});

	}
}
