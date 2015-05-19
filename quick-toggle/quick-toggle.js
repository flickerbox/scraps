//------------------------------------------------------------------------------
//
// Quick Toggle (combines click-toggle and touch-hover)
//
// Summary
//   	Quick Toggle 'toggles' the 'js-quick-toggle--is-active' class on click or
//  	hover and optionally any associated data element(s). Quick toggle automatically
//		deactivates items when user clicks elsewhere
//
// Usage
//   	.js-quick-toggle  // add this class to the element to be clicked or hovered
//
// Optional
//   	[data-js-quick-toggle-type=[click|hover|click-all]] // ('click' is default)
//			How the event is bound. This data attribute is added to the .js-quick-toggle class.
//			"click-all" makes the parent AND child elements toggle on click (not just the parent).
//
//   	[data-js-quick-toggle=CLICK_ID]
//			add data attribute to the trigger and any element you'd like to be active.
//			CLICK_ID must be unique for each click item group.
//
//------------------------------------------------------------------------------

function quickToggle() {
	var isTouch = ( ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0) ) ? true : false;
	var $target;
	var toggleType;
	var rank;
	var $this;
	var reprieve = [];
	var keepIt = false;
	var $body = $('body');
	var $html = $('html');
	var $document = $(document);

	var init = _init();

	// in the init function, we'll add data information to both parent and child elements to make the actual clicking events much easier
	function _init() {
		$body.find('[data-js-quick-toggle], .js-quick-toggle').each(function(index, el) {
			$this = $(el);

			// see if it has both so we can check if it's a parent:
			if ( $this.attr('data-js-quick-toggle') && $this.hasClass('js-quick-toggle') ) {

				// it has both. Let's check the data attribute to see if it has a child
				if ( $body.find('[data-js-quick-toggle=' + $this.attr('data-js-quick-toggle') + ']').not('.js-quick-toggle').length > 0) {
					$this.attr('data-js-quick-toggle-rank','parent');

				// Otherwise we'll make it single
				} else {
					$this.attr('data-js-quick-toggle-rank','single');
				}

				// add the toggle type:
				toggleType = $this.attr('data-js-quick-toggle-type');
				toggleType = toggleType === 'hover' || toggleType === 'click' || toggleType === 'click-all' ? toggleType : 'click';
				$this.attr('data-js-quick-toggle-type', toggleType);
				if (isTouch) $this.css('cursor','pointer');

			// just the data attribute
			} else if ( $this.attr('data-js-quick-toggle') ) {

				// let's make sure it's a child:
				if ( $body.find('.js-quick-toggle[data-js-quick-toggle=' + $this.attr('data-js-quick-toggle') + ']').length ) {
					$this.attr('data-js-quick-toggle-rank','child');

					// add the toggle type:
					toggleType = $body.find('.js-quick-toggle[data-js-quick-toggle=' + $this.attr('data-js-quick-toggle') + ']').attr('data-js-quick-toggle-type');
					toggleType = toggleType === 'hover' || toggleType === 'click' || toggleType === 'click-all' ? toggleType : 'click';
					$this.attr('data-js-quick-toggle-type', toggleType);

					if (isTouch && toggleType === 'click-all') $this.css('cursor','pointer');

				// it only has the data attribute but nothing else. we'll strip it so it's not involved anymore:
				} else {
					$this.removeAttr('data-js-quick-toggle');
				}

			// doesn't have data id at all so it's rank is single:
			} else {
				$this.attr('data-js-quick-toggle-rank','single')

				// add the toggle type:
				toggleType = $this.attr('data-js-quick-toggle-type');
				toggleType = toggleType === 'hover' || toggleType === 'click' || toggleType === 'click-all' ? toggleType : 'click';
				$this.attr('data-js-quick-toggle-type', toggleType);
				if (isTouch) $this.css('cursor','pointer');
			}
		});
	}

	// quickToggleClear only clears finds all active parent-child and ALSO go up them
	// Once  done going up, it clears them all out, but not the ones that get a reprieve!
	function quickToggleClear($target) {
		reprieve.length = 0; // reset the reprieve
		function reprieval($reprievalTarget) {
			$reprievalTarget.parents('.js-quick-toggle--is-active').each(function(index, el) {
				reprieve.push(el);
				if ( $(el).attr('data-js-quick-toggle-rank') && $target.find($(el)).length ) {
					reprieval( $body.find('.js-quick-toggle[data-js-quick-toggle-rank=' + $(el).attr('data-js-quick-toggle-rank') + ']') );
				}
			});
		}
		reprieval( $target );
		$body.find('.js-quick-toggle--is-active').each(function(index, el) {
			keepIt = false;
			if (reprieve.length) {
				$(reprieve).each(function(n, reprieveEl) {
					if ($(reprieveEl).target == $(el).target) {
						keepIt = true;
					}
				});
			}
			if ( keepIt === false ) {
				$(el).removeClass('js-quick-toggle--is-active')
			};
		});
	}

	function quickToggleGo(target,eventType) {
		$target = $(target);

		// Check if we're in the parent or the children areas
		if ( $target.closest('[data-js-quick-toggle-type]').length ) {
			$target = $target.closest('[data-js-quick-toggle-type]');

			toggleType = $target.attr('data-js-quick-toggle-type');
			rank = $target.attr('data-js-quick-toggle-rank');

			// Make it happen on a click
			if ( eventType === 'click' && ( toggleType === 'click' || toggleType === 'click-all' || isTouch === true ) ) {

				// for click events we only care about parents and single clicks
				if ( rank === 'parent' || rank === 'single' || toggleType === 'click-all' ) {

					// Current ACTIVE so make it INACTIVE
					if ( $target.hasClass('js-quick-toggle--is-active') ) {
						quickToggleClear($target);
						$target.removeClass('js-quick-toggle--is-active');
						if (rank === 'parent') {
							$body.find('[data-js-quick-toggle=' + $target.attr('data-js-quick-toggle') + ']').removeClass('js-quick-toggle--is-active');
						}

					// Currently INACTIVE so make it ACTIVE
					} else {
						// clear out the rest to make the current one active
						quickToggleClear($target);
						$target.addClass('js-quick-toggle--is-active');

						if (rank === 'parent') {
							$body.find('[data-js-quick-toggle=' + $target.attr('data-js-quick-toggle') + ']').addClass('js-quick-toggle--is-active');
						}
					}
				}

			// else for the hover:
			} else {

				// clear everything if we're not in the target area, unless it's inside of another toggle event:
				if ( rank !== 'child' && $target.parents('.js-quick-toggle--is-active').length === 0) {
					$body.find('[data-js-quick-toggle-type="hover"]').removeClass('js-quick-toggle--is-active');
				}

				if ( toggleType === 'hover' ) {
					if ( rank === 'parent' || rank === 'single' ) {
						$target.addClass('js-quick-toggle--is-active');
					}
					if ( rank === 'parent' ) {
						$body.find('[data-js-quick-toggle=' + $target.attr('data-js-quick-toggle') + ']').addClass('js-quick-toggle--is-active');
					}

					// if it's hover, clear just the hovers out
					if ( eventType === 'mouseleave' && $target.parents('.js-quick-toggle--is-active').length === 0 ) {
						$body.find('[data-js-quick-toggle-type="hover"]').removeClass('js-quick-toggle--is-active');
					}
				}
			}

		// Now check if the event is in the recipient; if NOT, clear it all out
		// if it's a click, clear everything out
		} else {
			$body.find('[data-js-quick-toggle-type]').removeClass('js-quick-toggle--is-active');
		}
	}
	function bind() {
		$document.on('click', function(event) {
			quickToggleGo( event.target ? event.target : event.srcElement, event.type );
		});

		$body.find('[data-js-quick-toggle-type="hover"]').on('mouseenter mouseleave', function(event) {
			quickToggleGo( event.target ? event.target : event.srcElement, event.type );
		});
	}

	bind();

}
quickToggle();

