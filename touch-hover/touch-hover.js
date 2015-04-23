//------------------------------------------------------------------------------
// Touch Hover
//
// Description:
//   Touch Hover adds a ".active" class on click and on mouseover.
//   It removes ".active" when hovering off the .active or touching anywhere else.
//
// Requires:
//   modernizr.js (adds the 'touch' and 'no-touch' class the the html element)
//
// Setup:
//   Add 'js-touch-hover' class to any element you'd like to make "active" on touch.
//   Optional:
//     Witin 'js-touch-hover' element set 'data-js-touch-hover--target-recipient="any-name"'
//     to point to data-js-touch-hover--target-name="any-name"
//
// Returns:
//   Adds the 'js-touch-hover--is-active' class on hover or touch to the 'js-touch-hover' class
//   Optionally adds 'js-touch-hover--is-active' to the 'data-js-touch-hover--target-name' element
//
// to do: must disable the close-touch event when inside the exposed area
//------------------------------------------------------------------------------
function touchHoverClear() {
	// only run the touchHoverClear after all the if statements have been run.
	// otherwise, you'll be clearing before you get answers. :)
	$('.js-touch-hover').removeClass('js-touch-hover--is-active');
	$('[data-js-touch-hover--target-name]').removeClass('js-touch-hover--is-active');
}
function touchHover(event,eventType) {
	// this is because older IE uses event.srcElement instead of event.target:
	var target = event.target ? event.target : event.srcElement;
	if ($(target).closest('.js-touch-hover').length) {
		var $touchHoverItem = $(target).closest('.js-touch-hover');

		if (eventType === 'click' && $touchHoverItem.hasClass('js-touch-hover--is-active')) {
			// clear the hover by performing a 'click'
			if ( $(target).closest('.js-touch-hover--is-active[data-js-touch-hover--target-name]').length === 0) {
				touchHoverClear();
			}
		} else {
			if ( $(target).closest('.js-touch-hover--is-active[data-js-touch-hover--target-name]').length === 0) {
				touchHoverClear();
			}
			// check to see if there's data to make active:
			$touchHoverItem.addClass('js-touch-hover--is-active');
			// make the data-js-touch-hover--target-recipient "hover" if available
			$('[data-js-touch-hover--target-name=' + $touchHoverItem.attr('data-js-touch-hover--target-recipient') + ']').addClass('js-touch-hover--is-active');
		}
	} else if ( $(target).closest('.js-touch-hover--is-active[data-js-touch-hover--target-name]').length === 0) {
		touchHoverClear();
	}
}
$('html.touch').on('click', function(event){ touchHover(event,'click'); });
$('html.no-touch').on('mouseover', function(event){ touchHover(event,'hover'); });