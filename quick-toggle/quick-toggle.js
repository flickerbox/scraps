//------------------------------------------------------------------------------
// Quick Toggle (combines click-toggle and touch-hover)
//
// Summary
//   	On click or hover, Quick Toggle 'toggles' the 'js-quick-toggle--is-active'
//   	class on the clicked element and optionally any associated data element(s).
//
// Usage
//   	.js-quick-toggle  // add this class to the element to be clicked or hovered
//
// Optional
//   	[data-js-quick-toggle-type=[click|hover]]
//			the default is a click toggle. 'hover' toggles it active on 'mouseover'
//
//   	[data-js-quick-toggle=CLICK_ID]  // add data attribute to the trigger and any
//   		element you'd like to be active. CLICK_ID must be unique for this click item.
//
//   	[data-js-quick-toggle-always]  // add this data element to the parent to always toggle
//			when clicking in the target area.
//------------------------------------------------------------------------------

function quickToggle() {
	var isTouch = ( ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) ) ? true : false;
	var $target;
	var dataTarget;
	var $dataTarget;
	var targetType;
	var $toggleTarget;
	var $toggleParent;
	var $toggleChild;
	var $body = $('body');

	function quickToggleClear(area,eventType) {
		console.log(area);

		$('.js-quick-toggle').each(function() {
			$this = $(this);
			var toggleType = $this.attr('data-js-quick-toggle-type') === 'hover' ? 'hover' : 'click';
			if ( ( (toggleType === 'click' || isTouch === true) && eventType === 'click' ) || toggleType === 'hover' ) {
				$this.removeClass('js-quick-toggle--is-active');
				if ( $this.attr('data-js-quick-toggle') ) {
					$body.find('[data-js-quick-toggle=' + $this.attr('data-js-quick-toggle') + ']').removeClass('js-quick-toggle--is-active');
				}
			}
		});
	}

	function quickToggleGo(target,eventType) {
		$target = $(target);

		// Check if we're in the parent or the children areas
		if ( $target.closest('.js-quick-toggle, [data-js-quick-toggle]').length ) {
			$toggleTarget = $target.closest('[data-js-quick-toggle], .js-quick-toggle').first();
			console.log($toggleTarget[0]);

			// it may HAVE a child or may BE the child. let's see here:
			if ( $($toggleTarget).attr('[data-js-quick-toggle]') ) {
				console.log('parent or child');
				$dataTarget = $toggleTarget;
				dataTarget = $dataTarget.attr('data-js-quick-toggle');
				if ($dataTarget.hasClass('js-quick-toggle')) {
					targetType = 'parent';
					$toggleParent = $dataTarget;
					$toggleChild = $body.find('[data-js-quick-toggle=' + dataTarget + ']').not('.js-quick-toggle');
				} else {
					targetType = 'child';
					$toggleParent = $body.find('.js-quick-toggle[data-js-quick-toggle=' + dataTarget + ']');
					$toggleChild = $dataTarget;
				}
			} else {
				targetType = 'single';
				$toggleParent = $toggleTarget;
				$toggleChild = '';
			}

			var toggleType = $toggleParent.attr('data-js-quick-toggle-type') === 'hover' ? 'hover' : 'click';

			// Click events:
			if ( eventType === 'click' && (toggleType === 'click' || isTouch === true ) ) {

				if ( targetType === 'parent' || targetType === 'single' ) {
					if ( $toggleParent.hasClass('js-quick-toggle--is-active') ) {
						quickToggleClear('click clear',eventType);
					} else {
						quickToggleClear('click clear',eventType);
						$toggleParent.addClass('js-quick-toggle--is-active');
						if ($toggleChild.size) {
							$toggleChild.addClass('js-quick-toggle--is-active');
						}
					}
				}

			// not CLICKING the active one
			} else if ( toggleType === 'hover' ){
				// clear everything if we're not in the target area
				if ( targetType === 'child' ) {
					quickToggleClear('hover clear children out',eventType);
				}

				// Now make it all active:
				$toggleParent.addClass('js-quick-toggle--is-active');
				console.log($toggleChild);
				if ($toggleChild.size) {
					console.log('here');
					$toggleChild.addClass('js-quick-toggle--is-active');
				}
			}

		// Now check if the event is in the recipient; if NOT, clear it all out
		} else {
			quickToggleClear('third',eventType);
		}
	}

	$('html').on('click', function(event){ quickToggleGo(event.target ? event.target : event.srcElement,'click'); });
	$('html').on('mouseover', function(event){ quickToggleGo(event.target ? event.target : event.srcElement,'hover'); });
}
quickToggle();

