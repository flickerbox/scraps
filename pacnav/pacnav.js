// pac nav

// Create the instance of the class on dom ready.
jQuery(document).ready(function($) {
	new PacNav();

	/**
	 * The PacNav class
	 */
	function PacNav(){
		// Variables
		var desktopNavSide       = 'right';
		var debug                = true;
		var $window              = $(window);
		var $pacNav              = $('.js-pac-nav');
		var desktopItemsCutoff   = [];
		var desktopItemsWidth    = [];
		var desktopItemsHidden   = 0;
		var fixedSideCutoff;
		var init                 = _init();
		var swallowFlag          = false;
		var totalOffset          = 0;

		var $desktopNav          = $pacNav.find('.js-pac-nav__desktop-nav');
		var $mobileNav           = $pacNav.find('.js-pac-nav__mobile-nav');

		// copy the primary nav items to the mobile-nav placeholder
		$desktopNav.children().clone().appendTo($mobileNav);

		var desktopItems      = $pacNav.find('.js-pac-nav__desktop-nav > ul > li');
		var mobileItems       = $pacNav.find('.js-pac-nav__mobile-nav > ul > li');

		desktopItems.each(function() { $(this).addClass('js-pac-nav__desktop-nav__item') });
		mobileItems.each(function() { $(this).addClass('js-pac-nav__mobile-nav__item') });

		function _init(){
			main();
			$window.load( main );
			$window.resize( main );
		}

		function main() {
			desktopItemsHidden   = 0;
			totalOffset          = 0;
			swallowFlag          = false;

			$pacNav.removeClass('js-pac-nav--is-loaded').addClass('js-pac-nav--is-loading');

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

			if ($window.width() > 0) {
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
			}

			function calcHiddenOffset() {
				for (var i = desktopItemsHidden; i > 0; i--) {
					totalOffset += desktopItemsWidth[desktopItems.length - 1 - i];
				}
				return totalOffset;
			}

			// run through all of the nav items to get their positions:
			for (var i = 0; i < desktopItemsCutoff.length; i++) {
				if (debug === true) {
					$(desktopItems[i]).attr('data-js-pac-nav-position', desktopItemsCutoff[i]);
				}
				if ( desktopNavSide === 'left' && (
						(i + 1 != desktopItemsCutoff.length && (desktopItemsCutoff[i] >= fixedSideCutoff) ) ||
					 	(i + 1 == desktopItemsCutoff.length && (desktopItemsCutoff[i] >= fixedSideCutoff + $pacNav.find('.js-pac-nav__right').width()) )
					) || desktopNavSide === 'right' && (
						(i + 1 != desktopItemsCutoff.length && (fixedSideCutoff >= desktopItemsCutoff[i] ) ) ||
					 	(i + 1 == desktopItemsCutoff.length && (fixedSideCutoff >= desktopItemsCutoff[i] + $pacNav.find('.js-pac-nav__left').offset().left + $pacNav.find('.js-pac-nav__left').width()) )
					) ) { // if it's the last nav item, disregard the size of the nav toggle
					desktopItemsHidden++;
				}

				if (desktopItemsHidden > 0 && desktopItemsHidden < )

						if (desktopNavSide === 'left') {
							swallowFlag = true;
							$(desktopItems[i]).addClass('js-pac-nav__desktop-nav__item--is-hidden');
							$(mobileItems[i]).addClass('js-pac-nav__mobile-nav__item--is-visible');
						} else {
							$desktopNav.css('left', calcHiddenOffset() + 'px');
							console.log(desktopItems.length - 1 - i);
							$(desktopItems[desktopItems.length - 1 - i]).addClass('js-pac-nav__desktop-nav__item--is-hidden');
							$(desktopItems[desktopItems.length - 1 - i]).addClass('js-pac-nav__desktop-nav__item--is-hiddendddddddd');
							$(mobileItems[desktopItems.length - 1 - i]).addClass('js-pac-nav__mobile-nav__item--is-visible');
						}
						// $pacNav.addClass('js-pac-nav--is-running').find('.js-pac-nav__mobile-nav').attr('style','');
						// if (i <= 0) {
						// 	// if it's the first or second item
						// 	// retroactively force the first one in the list to be hidden since it looks weird if it's all alone
						// 	$(desktopItems[0]).addClass('js-pac-nav__desktop-nav__item--is-hidden');
						// 	$(mobileItems[0]).addClass('js-pac-nav__mobile-nav__item--is-visible');

						// 	$pacNav.removeClass('js-pac-nav--is-desktop').addClass('js-pac-nav--is-mobile');
						// 	$('body').removeClass('js-pac-nav__body--is-desktop').addClass('js-pac-nav__body--is-mobile');
						// } else {
						// 	$pacNav.removeClass('js-pac-nav--is-mobile').addClass('js-pac-nav--is-desktop');
						// 	$('body').removeClass('js-pac-nav__body--is-mobile').addClass('js-pac-nav__body--is-desktop');
						// }
					} else {
					// 	if (desktopNavSide === 'left') {
					// 		$(desktopItems[i]).removeClass('js-pac-nav__desktop-nav__item--is-hidden');
					// 		$(mobileItems[i]).removeClass('js-pac-nav__mobile-nav__item--is-visible');
					// 		swallowFlag = false;
					// 	} else {
					// 		// desktopItemsHidden = 0;
					// 		// $(desktopItems[desktopItems.length - 1 - i]).removeClass('js-pac-nav__desktop-nav__item--is-hidden');
					// 		// $(mobileItems[desktopItems.length - 1 - i]).removeClass('js-pac-nav__mobile-nav__item--is-visible');
					// 	}
					}
				// } else {
					// earlier guys have already been swallowed so just swallow the next ones without doing the math:
					// $(desktopItems[i]).addClass('js-pac-nav__desktop-nav__item--is-hidden');
					// $(mobileItems[i]).addClass('js-pac-nav__mobile-nav__item--is-visible');
				// }
			}
			if (swallowFlag === false) {
				// after all is done, if nothing is swallowed, clear out any pac-nav stuff
				$pacNav.removeClass('js-pac-nav--is-desktop').removeClass('js-pac-nav--is-mobile').removeClass('js-pac-nav--is-running');
			}
			console.log(desktopItemsHidden);
			// we're done, so let's declare us loaded:
			$pacNav.removeClass('js-pac-nav--is-loading').addClass('js-pac-nav--is-loaded');
		}
	}
});