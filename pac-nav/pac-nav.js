// pac nav

// To run pac-nav, set this inside of of your main javascript:
// new PacNav();

/**
 * The PacNav class
 */
function PacNav(callback){
	// Variables

	// editable variables:
	var fewestHybridItems    = 1;
	var debug                = false;

	// non-editable variables:
	var $window              = $(window);
	var $body                = $('body');
	var $pacNav              = $body.find('.js-pac-nav');
	var desktopNavSide;
	var desktopItemsCutoff   = [];
	var desktopItemsWidth    = [];
	var numOfHiddenItems     = 0;
	var leftBreakPoint       = 0;
	var fixedSideCutoff;

	var init                 = _init();

	var $desktopNav          = $pacNav.find('.js-pac-nav__desktop-nav');
	var $mobileNav           = $pacNav.find('.js-pac-nav__mobile-nav');

	// copy the primary nav items to the mobile-nav placeholder
	$desktopNav.children().clone().appendTo($mobileNav);

	var desktopItems         = $pacNav.find('.js-pac-nav__desktop-nav > ul > li');
	var mobileItems          = $pacNav.find('.js-pac-nav__mobile-nav > ul > li');
	var numOfItems           = desktopItems.length;
	var $navToggle           = $pacNav.find('.js-pac-nav__nav-toggle');
	var navToggleWidth       = $navToggle.width();

	var isTouch = ((('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))) ? true : false;

	desktopItems.each(function() {
		$(this).addClass('js-pac-nav__desktop-nav__item');
	});
	mobileItems.each(function() {
		$(this).addClass('js-pac-nav__mobile-nav__item');
	});

	// add the parent classes and bindings:
	$desktopNav.find('li > a + ul').each(function() {
		$(this).parent('li').addClass('js-pac-nav__desktop-nav__item--parent').on('click mouseenter mouseleave', function(event) {
			$target = $(event.target ? event.target : event.srcElement).closest('.js-pac-nav__desktop-nav__item--parent');
			if (event.type === 'mouseenter') {
				$target.addClass('js-pac-nav__item--is-active');
			} else if (event.type === 'mouseleave') {
				$target.removeClass('js-pac-nav__item--is-active');
			} else if ( isTouch === true ) {
				pacNavEventActivate($target);
			}
		});
	});
	$mobileNav.find('li > a + ul').each(function() {
		$(this).parent('li').addClass('js-pac-nav__mobile-nav__item--parent').on('click', function(event) {
			$target = $(event.target ? event.target : event.srcElement).closest('.js-pac-nav__mobile-nav__item--parent');
			pacNavEventActivate($target);
		});
	});

	$navToggle.on('click mouseenter mouseleave', function(event) {
		navToggleEvent($navToggle,event);
	});

	$mobileNav.on('mouseenter mouseleave', function(event) {
		navToggleEvent($mobileNav,event);
	});

	function navToggleEvent($target,event) {
		if (event.type === 'mouseenter' && $pacNav.hasClass('js-pac-nav--is-hybrid')) {
			$navToggle.addClass('js-pac-nav__item--is-active');
			$mobileNav.addClass('js-pac-nav__item--is-active');
		} else if (event.type === 'mouseleave' && $pacNav.hasClass('js-pac-nav--is-hybrid')) {
			$navToggle.removeClass('js-pac-nav__item--is-active');
			$mobileNav.removeClass('js-pac-nav__item--is-active');
		} else if ( event.type === 'click' ) {
			if ( $navToggle.hasClass('js-pac-nav__item--is-active') ) {
				$navToggle.removeClass('js-pac-nav__item--is-active');
				$mobileNav.removeClass('js-pac-nav__item--is-active');
			} else {
				$navToggle.addClass('js-pac-nav__item--is-active');
				$mobileNav.addClass('js-pac-nav__item--is-active');
			}
		}
	}

	function pacNavEventActivate($item) {
		if ( $item.hasClass('js-pac-nav__item--is-active') ) {
			$item.removeClass('js-pac-nav__item--is-active');
		} else {
			$item.addClass('js-pac-nav__item--is-active').siblings().removeClass('js-pac-nav__item--is-active');
		}
	}

	if ($desktopNav.closest('.js-pac-nav__right').length) {
		desktopNavSide = 'right';
	} else if ($desktopNav.closest('.js-pac-nav__left').length) {
		desktopNavSide = 'left';
	}

	function _init() {
		$(document).ready(function() {
			main();
		});
		$window.resize(function() {
			main();
		});
	}
	function pacNavEventClear() {
		$pacNav.find('.js-pac-nav__item--is-active').removeClass('js-pac-nav__item--is-active');
	}

	function main() {
		pacNavEventClear();
		$pacNav.removeClass('js-pac-nav--is-loaded').addClass('js-pac-nav--is-loading');
		$body.removeClass('js-pac-nav__body--is-loaded').addClass('js-pac-nav__body--is-loading');

		if (debug === true) {
			$pacNav.addClass('js-pac-nav--debug');
		}

		// get the Fixed Side Cutoff position in order to compare vs the menu items
		if (desktopNavSide === 'left') {
			fixedSideCutoff = Math.ceil($pacNav.find('.js-pac-nav__right').offset().left);
			if (debug === true) {
				$pacNav.find('.js-pac-nav__right').attr('data-js-pac-nav-position', fixedSideCutoff);
			}
		} else {
			fixedSideCutoff = Math.ceil($pacNav.find('.js-pac-nav__left').offset().left + $pacNav.find('.js-pac-nav__left').width());
			if (debug === true) {
				$pacNav.find('.js-pac-nav__left').attr('data-js-pac-nav-position', fixedSideCutoff);
			}
		}

		// get the positions of everything:
		desktopItemsCutoff = [];
		desktopItemsWidth  = [];
		$(desktopItems).each(function(i, el) {
			desktopItemsWidth.push($(this).width());
			if (desktopNavSide === 'left') {
				desktopItemsCutoff.push(Math.floor($(this).offset().left + desktopItemsWidth[i]));
			} else {
				desktopItemsCutoff.push(Math.floor($(this).offset().left));
			}
		});

		// reset:
		$(desktopItems).removeClass('js-pac-nav__desktop-nav__item--is-hidden');
		$(mobileItems).removeClass('js-pac-nav__mobile-nav__item--is-visible');
		numOfHiddenItems = 0;

		if (debug === true) {
			for (var i = 0; i < numOfItems; i++) {
				$(desktopItems[i]).attr('data-js-pac-nav-position', desktopItemsCutoff[i]);
			}
		}
		// run through all of the nav items to get their positions and add to them being hidden (if necessary):
		if (desktopNavSide === 'left') {
			for (var i = 0; i < numOfItems; i++) {
				if (debug === true) {
					$(desktopItems[i]).attr('data-js-pac-nav-position', desktopItemsCutoff[i]);
				}
				// this is the main logic:
				// the left side cares about the last item in relation to the navToggle
				if ( ( i < numOfItems - 1    && (desktopItemsCutoff[i] >= fixedSideCutoff - navToggleWidth) )
					||
					( i === numOfItems - 1  && (desktopItemsCutoff[i] >= fixedSideCutoff) ) ) {
					numOfHiddenItems++;
				}
			}
		}
		if (desktopNavSide === 'right') {
			// reset:
			leftBreakPoint = desktopItemsCutoff[0];
			for (var i = numOfItems - 1; i >= 0; i--) {

				if (fixedSideCutoff >= leftBreakPoint) {
					if (numOfHiddenItems === 0) {
						// add the toggle width if it's the first time:
						leftBreakPoint -= navToggleWidth;
					}
					numOfHiddenItems++;
					leftBreakPoint += desktopItemsWidth[i];

					// now update the debug so we can see what's going on:
					if (debug === true) {
						console.log('i:                                ' + i);
						console.log('desktopItemsWidth['+i+']:             ' + desktopItemsWidth[i]);
						console.log('numOfHiddenItems:                 ' + numOfHiddenItems);
						console.log('leftBreakPoint:                   ' + leftBreakPoint);
						console.log('=========================');
						for (var n = 0; n < numOfItems; n++) {
							$(desktopItems[n]).attr('data-js-pac-nav-position', (leftBreakPoint));
						}
					}
				}
			}
		}

		if (numOfHiddenItems > 0 && numOfHiddenItems < desktopItems.length - ( fewestHybridItems - 1 )) {
			// Hybrid: there is at least one hidden item, but at least 'fewestHybridItems' remaining
			// reset:
			$(desktopItems).removeClass('js-pac-nav__desktop-nav__item--is-hidden');
			$(mobileItems).removeClass('js-pac-nav__mobile-nav__item--is-visible');
			// hide the number of hidden from the tail of the desktopItems array
			for (var index = desktopItems.length - 1; index > desktopItems.length - 1 - numOfHiddenItems; index--) {
				$(desktopItems[index]).addClass('js-pac-nav__desktop-nav__item--is-hidden');
				$(mobileItems[index]).addClass('js-pac-nav__mobile-nav__item--is-visible');
			}

			$pacNav.removeClass('js-pac-nav--is-desktop').removeClass('js-pac-nav--is-mobile').addClass('js-pac-nav--is-hybrid').addClass('js-pac-nav--is-running');
			$body.removeClass('js-pac-nav__body--is-desktop').removeClass('js-pac-nav__body--is-mobile').addClass('js-pac-nav__body--is-hybrid').addClass('js-pac-nav__body--is-running');

		} else if (numOfHiddenItems > 0) {
			// Mobile: there 2 or fewer remaining items so we'll hide them all
			$(desktopItems).addClass('js-pac-nav__desktop-nav__item--is-hidden');
			$(mobileItems).addClass('js-pac-nav__mobile-nav__item--is-visible');

			$pacNav.removeClass('js-pac-nav--is-desktop').removeClass('js-pac-nav--is-hybrid').addClass('js-pac-nav--is-mobile').addClass('js-pac-nav--is-running');
			$body.removeClass('js-pac-nav__body--is-desktop').removeClass('js-pac-nav__body--is-hybrid').addClass('js-pac-nav__body--is-mobile').addClass('js-pac-nav__body--is-running');
		} else {
			// Desktop: there are no hidden items
			$pacNav.removeClass('js-pac-nav--is-mobile').removeClass('js-pac-nav--is-hybrid').removeClass('js-pac-nav--is-running').addClass('js-pac-nav--is-desktop');
			$body.removeClass('js-pac-nav__body--is-mobile').removeClass('js-pac-nav__body--is-hybrid').removeClass('js-pac-nav__body--is-running').addClass('js-pac-nav__body--is-desktop');
		}

		// make room for the nav-toggle
		if (desktopNavSide === 'right') {
			if (numOfHiddenItems > 0) {
				$desktopNav.css('right', navToggleWidth + 'px');
			} else {
				$desktopNav.css('right', '0');
			}
		}

		// we're done, so let's declare us loaded:
		$pacNav.removeClass('js-pac-nav--is-loading').addClass('js-pac-nav--is-loaded');
		$body.removeClass('js-pac-nav__body--is-loading').addClass('js-pac-nav__body--is-loaded');

		// if callback exists, execute it
		callback && callback();
	}
}