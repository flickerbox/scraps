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

	var goRight = false;
	var goLeft = false;

	var $items;
	var $item;
	var itemWidths = [];
	var itemLeftPosition;
	var itemRightPosition;

	var $container;
	var containerWidth;
	var containerLeft;
	var containerRight;
	var containerHeight;

	var $window            = $(window);
	var windowWidth;
	var init               = _init();

	function _init() {
		$(document).ready( function() { main() });
		$window.resize( function() { main() });
	}

	function main() {
		// reset and hide:

		$containerOverflow.each(function(index,el) {
			$container = $(this);

			$items = $container.find('[class*=js-container-overflow__item]');


			//reset:
			goRight = goLeft = false;
			$container.removeClass('js-container-overflow__is-loaded').addClass('js-container-overflow__is-loading').attr('style', '');
			for (var i = 0; i < $items.length; i++) {
				$($items[i]).addClass('js-container-overflow__is-loading').attr('style', '');
			};
			itemWidths = [];

			windowWidth        = Math.ceil($window.width());
			containerWidth = Math.ceil($container.width());
			containerLeft =  Math.floor($container.offset().left);
			containerRight = containerLeft + containerWidth;

			thisHeight = 0;
			containerHeight = 0;

			$items.each(function(index, el) {
				$item = $(this);

				itemLeftPosition = Math.floor($item.offset().left);
				itemRightPosition = itemLeftPosition + Math.floor($item.width());


				if ($item.hasClass('js-container-overflow__item--go-left')) {
					goLeft = true;
					itemWidths.push(Math.floor( itemRightPosition ));
				} else if ($item.hasClass('js-container-overflow__item--go-right')) {
					goRight = true;
					itemWidths.push(Math.floor( windowWidth - itemLeftPosition ));
				} else {
					itemWidths.push(Math.floor( $item.width() ));
				}
			});

			// set the widths
			for (var i = 0; i < $items.length; i++) {
				$($items[i]).css('width', itemWidths[i] + 'px');
			};

			// get the max height:
			if ($container.attr('data-js-container-overflow--fill')) {
				for (var i = 0; i < $items.length; i++) {
					thisHeight = Math.ceil($($items[i]).height());
					containerHeight = thisHeight > containerHeight ? thisHeight : containerHeight;
				};
			}
			// add an extra pixel to make sure it doesn't drop to a new line
			if (goLeft === true) {
				$container.css({
					marginLeft: '0',
					width: (containerRight + 1)
				});
			}
			if (goRight === true) {
				$container.css({
					marginRight: '0',
					width: (windowWidth - containerLeft + 1)
				});
			}
			if (goLeft === true && goRight === true) {
				$container.css('width', windowWidth);
			}

			if ($container.attr('data-js-container-overflow--fill')) {
				for (var i = 0; i < $items.length; i++) {
					$($items[i]).css('height', containerHeight);
				};
			}
			// restore:
			$items.removeClass('js-container-overflow__is-loading');
			$container.removeClass('js-container-overflow__is-loading').addClass('js-container-overflow__is-loaded');

		});

	}
}
