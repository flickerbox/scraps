// pac nav

// Create the instance of the class on dom ready.
jQuery(document).ready(function($) {
	new PacNav();

	/**
	 * The PacNav class
	 */
	function PacNav(){
		// Variables
		var debug                = false;
		var $window              = $(window);
		var $pacNav              = $('.js-pac-nav');
		var desktopItemsRightPos = [];
		var init                 = _init();

		var $desktopNav          = $pacNav.find('.js-pac-nav__desktop__nav');
		var $mobileNav           = $pacNav.find('.js-pac-nav__mobile__nav');

		// copy the primary nav items to the mobile-nav placeholder
		$desktopNav.children().clone().appendTo($mobileNav);

		var desktopNavItems      = $pacNav.find('.js-pac-nav__desktop__nav > ul > li');
		var mobileNavItems       = $pacNav.find('.js-pac-nav__mobile__nav > ul > li');

		desktopNavItems.each(function() { $(this).addClass('js-pac-nav__desktop__item') });
		mobileNavItems.each(function() { $(this).addClass('js-pac-nav__mobile__item') });

		function _init(){
			main();
			$window.load( main );
			$window.resize( main );
		}

		function main() {
			var swallowFlag = false;

			$pacNav.removeClass('js-pac-nav--is-loaded').addClass('js-pac-nav--is-loading');

			if (debug === true) {
				$pacNav.addClass('js-pac-nav--debug');
			}

			// get the right Anchor position in order to compare vs the menu items
			var rightAnchor = Math.ceil($pacNav.find('.js-pac-nav__right').offset().left);
			if (debug === true) {
				$pacNav.find('.js-pac-nav__right').attr('data-js-pac-nav-position', rightAnchor);
			}

			if ($window.width() > 0) {
				// get the positions of everything:
				desktopItemsRightPos = [];
				$(desktopNavItems).each(function() {
					desktopItemsRightPos.push(Math.floor($(this).offset().left + $(this).width()));
				});
			}

			// run through all of the nav items to get their positions:
			for (var i = 0; i < desktopItemsRightPos.length; i++) {
				if (debug === true) {
					$(desktopNavItems[i]).attr('data-js-pac-nav-position', desktopItemsRightPos[i]);
				}
				// run the functions if it hasn't been "swallowed"
				if (swallowFlag === false) {
					if ( (i + 1 != desktopItemsRightPos.length && (desktopItemsRightPos[i] >= rightAnchor) ) ||
						 (i + 1 == desktopItemsRightPos.length && (desktopItemsRightPos[i] >= rightAnchor + $pacNav.find('.js-pac-nav__right__hotspot').width()) ) ) { // if it's the last one, disregard the size of the nav toggle
						$(desktopNavItems[i]).addClass('js-pac-nav__desktop__item--is-hidden');
						$(mobileNavItems[i]).addClass('js-pac-nav__mobile__item--is-visible');
						$pacNav.addClass('js-pac-nav--is-running').find('.js-pac-nav__mobile').attr('style','');
						swallowFlag = true;
						if (i <= 0) {
							// if it's the first or second item
							// retroactively force the first one in the list to be hide since it looks weird if it's all alone
							$(desktopNavItems[0]).addClass('js-pac-nav__desktop__item--is-hidden');
							$(mobileNavItems[0]).addClass('js-pac-nav__mobile__item--is-visible');

							$pacNav.removeClass('js-pac-nav--is-desktop').addClass('js-pac-nav--is-mobile');
							$('body').removeClass('js-pac-nav__body--is-desktop').addClass('js-pac-nav__body--is-mobile');
						} else {
							$pacNav.removeClass('js-pac-nav--is-mobile').addClass('js-pac-nav--is-desktop');
							$('body').removeClass('js-pac-nav__body--is-mobile').addClass('js-pac-nav__body--is-desktop');
						}
					} else {
						$(desktopNavItems[i]).removeClass('js-pac-nav__desktop__item--is-hidden');
						$(mobileNavItems[i]).removeClass('js-pac-nav__mobile__item--is-visible');
						swallowFlag = false;
					}
				} else {
					// earlier guys have already been swallowed so just swallow the next ones without doing the math:
					$(desktopNavItems[i]).addClass('js-pac-nav__desktop__item--is-hidden');
					$(mobileNavItems[i]).addClass('js-pac-nav__mobile__item--is-visible');
				}
			}
			if (swallowFlag === false) {
				// after all is done, if nothing is swallowed, clear out any pac-nav stuff
				$pacNav.removeClass('js-pac-nav--is-desktop').removeClass('js-pac-nav--is-mobile').removeClass('js-pac-nav--is-running');
			}

			// we're done, so let's declare us loaded:
			$pacNav.removeClass('js-pac-nav--is-loading').addClass('js-pac-nav--is-loaded');
		}
	}
});