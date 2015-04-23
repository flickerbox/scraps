//------------------------------------------------------------------------------
// Quick Toggle (combines click-toggle and touch-hover)
//
// Description
//   On click or hover, Quick Toggle 'toggles' the 'js-quick-toggle--is-active'
//   class on the clicked element and optionally any associated element(s).
//
// Use
//   ".js-quick-toggle": add this class to the element to be clicked or hovered
//
// Optional
//   "data-js-quick-toggle--type=[click|hover]" : the default is a click toggle. 'hover'
//   sets it active on 'hover' when modernizr add
//   "data-js-quick-toggle=CLICK_ID": add data attribute to the trigger and any
//   element you'd like to be active. CLICK_ID must be unique for this click item.
//
//   ".js-quick-toggle--always": add this class to any target to always toggle,
//    when clicking in the target area.
//------------------------------------------------------------------------------

function quickToggle(event,eventType) {
	var target = event.target ? event.target : event.srcElement; // old IE uses event.srcElement
	if ($(target).closest('.js-quick-toggle').length) {
		$quickToggleItem = $(target).closest('.js-quick-toggle');
		var quickToggleID = $quickToggleItem.attr('data-js-quick-toggle');
		if ($quickToggleItem.hasClass('js-quick-toggle--is-active')) {
			$quickToggleItem.removeClass('js-quick-toggle--is-active');
			$('[data-js-quick-toggle=' + quickToggleID + ']').removeClass('js-quick-toggle--is-active');
		} else {
			$('.js-quick-toggle').removeClass('js-quick-toggle--is-active');
			$('[data-js-quick-toggle]').removeClass('js-quick-toggle--is-active');
			$quickToggleItem.addClass('js-quick-toggle--is-active');
			$('[data-js-quick-toggle=' + quickToggleID + ']').addClass('js-quick-toggle--is-active');
		}
		if (!$(target).hasClass('allow-default')) {
			event.preventDefault();
		}
	} else if ( !($(target).closest('[data-js-quick-toggle]').hasClass('js-quick-toggle--is-active') && !($(target).closest('[data-js-quick-toggle]').hasClass('js-quick-toggle--always')) )) {
		// only close the quickToggle if the click is NOT in clicktoggle js-quick-toggle--is-active area:
		$('.js-quick-toggle').removeClass('js-quick-toggle--is-active');
		$('[data-js-quick-toggle]').removeClass('js-quick-toggle--is-active');
	}
}

$('html').on('click', function(event){ quickToggle(event,'click'); });
$('html').on('mouseover', function(event){ quickToggle(event,'hover'); });