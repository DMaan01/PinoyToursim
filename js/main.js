(function ($) {

	"use strict";
	
	$(window).on('load', function () {
		$('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(350);
		$('.hero_in h1,.hero_in form').addClass('animated');
		$('.hero_single, .hero_in').addClass('start_bg_zoom');
		$(window).scroll();
	});
	
	// Sticky nav
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 1) {
			$('.header').addClass("sticky");
		} else {
			$('.header').removeClass("sticky");
		}
	});
	
	// Sticky sidebar
	$('#sidebar').theiaStickySidebar({
		additionalMarginTop: 150
	});

	// Sticky titles
	$('.fixed_title').theiaStickySidebar({
		additionalMarginTop: 180
	});
	
	// Mobile Mmenu
	var $menu = $("nav#menu").mmenu({
		"extensions": ["pagedim-black"],
		counters: true,
		keyboardNavigation: {
			enable: true,
			enhance: true
		},
		navbar: {
			title: 'MENU'
		},
		navbars: [{position:'bottom',content: ['<a href="#0">© 2022 Panagea</a>']}]}, 
		{
		// configuration
		clone: true,
		classNames: {
			fixedElements: {
				fixed: "menu_fixed",
				sticky: "sticky"
			}
		}
	});
	var $icon = $("#hamburger");
	var API = $menu.data("mmenu");
	$icon.on("click", function () {
		API.open();
	});
	API.bind("open:finish", function () {
		setTimeout(function () {
			$icon.addClass("is-active");
		}, 100);
	});
	API.bind("close:finish", function () {
		setTimeout(function () {
			$icon.removeClass("is-active");
		}, 100);
	});
	
	// WoW - animation on scroll
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       true,       // trigger animations on mobile devices (default is true)
		live:         true,       // act on asynchronously loaded content (default is true)
		callback:     function(box) {
		  // the callback is fired every time an animation is started
		  // the argument that is passed in is the DOM node being animated
		},
		scrollContainer: null // optional scroll container selector, otherwise use window
	  }
	);
	wow.init();
	
	//  Video popups
	$('.video').magnificPopup({type:'iframe'});	/* video modal*/
	
	// Image popups
	$('.magnific-gallery').each(function () {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
            preloader: true,
			gallery: {
				enabled: true
			},
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup 
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = this.st.el.attr('data-effect');
				}
			},
			closeOnContentClick: true,
			midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
		});
	});
	
	// Modal Sign In
	$('#sign-in').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		mainClass: 'my-mfp-zoom-in'
	});

	// Modal generic
	$('#modal').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',
		mainClass: 'my-mfp-zoom-in'
	});
	
	// Show Password
	$('#password').hidePassword('focus', {
		toggle: {
			className: 'my-toggle'
		}
	});

	// Forgot Password
	$("#forgot").click(function () {
		$("#forgot_pw").fadeToggle("fast");
	});
	
	// Accordion
	function toggleChevron(e) {
		$(e.target)
			.prev('.card-header')
			.find("i.indicator")
			.toggleClass('ti-minus ti-plus');
	}
	$('.accordion_2').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);
		function toggleIcon(e) {
        $(e.target)
            .prev('.panel-heading')
            .find(".indicator")
            .toggleClass('ti-minus ti-plus');
    }
	
	// Jquery select
	(function($) {

		$.fn.niceSelect = function(method) {
	
			// Methods
			if (typeof method == 'string') {
				if (method == 'update') {
					this.each(function() {
						var $select = $(this);
						var $dropdown = $(this).next('.nice-select');
						var open = $dropdown.hasClass('open');
	
						if ($dropdown.length) {
							$dropdown.remove();
							create_nice_select($select);
	
							if (open) {
								$select.next().trigger('click');
							}
						}
					});
				} else if (method == 'destroy') {
					this.each(function() {
						var $select = $(this);
						var $dropdown = $(this).next('.nice-select');
	
						if ($dropdown.length) {
							$dropdown.remove();
							$select.css('display', '');
						}
					});
					if ($('.nice-select').length == 0) {
						$(document).off('.nice_select');
					}
				} else {
					console.log('Method "' + method + '" does not exist.')
				}
				return this;
			}
	
			// Hide native select
			this.hide();
	
			// Create custom markup
			this.each(function() {
				var $select = $(this);
	
				if (!$select.next().hasClass('nice-select')) {
					create_nice_select($select);
				}
			});
	
			function create_nice_select($select) {
				$select.after($('<div></div>')
					.addClass('nice-select')
					.addClass($select.attr('class') || '')
					.addClass($select.attr('disabled') ? 'disabled' : '')
					.addClass($select.attr('multiple') ? 'has-multiple' : '')
					.attr('tabindex', $select.attr('disabled') ? null : '0')
					.html($select.attr('multiple') ? '<span class="multiple-options"></span><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Search Value"/></div><ul class="list"></ul>' : '<span class="current"></span><div class="nice-select-search-box"><input type="text" class="nice-select-search" placeholder="Search Value"/></div><ul class="list"></ul>')
				);
	
				var $dropdown = $select.next();
				var $options = $select.find('option');
				if ($select.attr('multiple')) {
					var $selected = $select.find('option:selected');
					var $selected_html = '';
					$selected.each(function() {
						$selected_option = $(this);
						$selected_text = $selected_option.data('display') ||  $selected_option.text();
	
						if (!$selected_option.val()) {
							return;
						}
	
						$selected_html += '<span class="current">' + $selected_text + '</span>';
					});
					$select_placeholder = $select.data('js-placeholder') || $select.attr('js-placeholder');
					$select_placeholder = !$select_placeholder ? 'Select' : $select_placeholder;
					$selected_html = $selected_html === '' ? $select_placeholder : $selected_html;
					$dropdown.find('.multiple-options').html($selected_html);
				} else {
					var $selected = $select.find('option:selected');
					$dropdown.find('.current').html($selected.data('display') ||  $selected.text());
				}
	
	
				$options.each(function(i) {
					var $option = $(this);
					var display = $option.data('display');
	
					$dropdown.find('ul').append($('<li></li>')
						.attr('data-value', $option.val())
						.attr('data-display', (display || null))
						.addClass('option' +
							($option.is(':selected') ? ' selected' : '') +
							($option.is(':disabled') ? ' disabled' : ''))
						.html($option.text())
					);
				});
			}
	
			/* Event listeners */
	
			// Unbind existing events in case that the plugin has been initialized before
			$(document).off('.nice_select');
	
			// Open/close
			$(document).on('click.nice_select', '.nice-select', function(event) {
				var $dropdown = $(this);
	
				$('.nice-select').not($dropdown).removeClass('open');
				$dropdown.toggleClass('open');
	
				if ($dropdown.hasClass('open')) {
					$dropdown.find('.option');
					$dropdown.find('.nice-select-search').val('');
					$dropdown.find('.nice-select-search').focus();
					$dropdown.find('.focus').removeClass('focus');
					$dropdown.find('.selected').addClass('focus');
					$dropdown.find('ul li').show();
				} else {
					$dropdown.focus();
				}
			});
	
			$(document).on('click', '.nice-select-search-box', function(event) {
				event.stopPropagation();
				return false;
			});
			$(document).on('keyup.nice-select-search', '.nice-select', function() {
				var $self = $(this);
				var $text = $self.find('.nice-select-search').val();
				var $options = $self.find('ul li');
				if ($text == '')
					$options.show();
				else if ($self.hasClass('open')) {
					$text = $text.toLowerCase();
					var $matchReg = new RegExp($text);
					if (0 < $options.length) {
						$options.each(function() {
							var $this = $(this);
							var $optionText = $this.text().toLowerCase();
							var $matchCheck = $matchReg.test($optionText);
							$matchCheck ? $this.show() : $this.hide();
						})
					} else {
						$options.show();
					}
				}
				$self.find('.option'),
					$self.find('.focus').removeClass('focus'),
					$self.find('.selected').addClass('focus');
			});
	
			// Close when clicking outside
			$(document).on('click.nice_select', function(event) {
				if ($(event.target).closest('.nice-select').length === 0) {
					$('.nice-select').removeClass('open').find('.option');
				}
			});
	
			// Option click
			$(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function(event) {
				
				var $option = $(this);
				var $dropdown = $option.closest('.nice-select');
				if ($dropdown.hasClass('has-multiple')) {
					if ($option.hasClass('selected')) {
						$option.removeClass('selected');
					} else {
						$option.addClass('selected');
					}
					$selected_html = '';
					$selected_values = [];
					$dropdown.find('.selected').each(function() {
						$selected_option = $(this);
						var attrValue = $selected_option.data('value');
						var text = $selected_option.data('display') ||  $selected_option.text();
						$selected_html += (`<span class="current" data-id=${attrValue}> ${text} <span class="remove">X</span></span>`);
						$selected_values.push($selected_option.data('value'));
					});
					$select_placeholder = $dropdown.prev('select').data('js-placeholder') ||                                   $dropdown.prev('select').attr('js-placeholder');
					$select_placeholder = !$select_placeholder ? 'Select' : $select_placeholder;
					$selected_html = $selected_html === '' ? $select_placeholder : $selected_html;
					$dropdown.find('.multiple-options').html($selected_html);
					$dropdown.prev('select').val($selected_values).trigger('change');
				} else {
					$dropdown.find('.selected').removeClass('selected');
					$option.addClass('selected');
					var text = $option.data('display') || $option.text();
					$dropdown.find('.current').text(text);
					$dropdown.prev('select').val($option.data('value')).trigger('change');
				}
			  console.log($('.mySelect').val())
			});
		  //---------remove item
		  $(document).on('click','.remove', function(){
			var $dropdown = $(this).parents('.nice-select');
			var clickedId = $(this).parent().data('id')
			$dropdown.find('.list li').each(function(index,item){
			  if(clickedId == $(item).attr('data-value')) {
				$(item).removeClass('selected')
			  }
			})
			$selected_values.forEach(function(item, index, object) {
			  if (item === clickedId) {
				object.splice(index, 1);
			  }
			});
			$(this).parent().remove();
			console.log($('.mySelect').val())
		   })
		  
			// Keyboard events
			$(document).on('keydown.nice_select', '.nice-select', function(event) {
				var $dropdown = $(this);
				var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));
	
				// Space or Enter
				if (event.keyCode == 32 || event.keyCode == 13) {
					if ($dropdown.hasClass('open')) {
						$focused_option.trigger('click');
					} else {
						$dropdown.trigger('click');
					}
					return false;
					// Down
				} else if (event.keyCode == 40) {
					if (!$dropdown.hasClass('open')) {
						$dropdown.trigger('click');
					} else {
						var $next = $focused_option.nextAll('.option:not(.disabled)').first();
						if ($next.length > 0) {
							$dropdown.find('.focus').removeClass('focus');
							$next.addClass('focus');
						}
					}
					return false;
					// Up
				} else if (event.keyCode == 38) {
					if (!$dropdown.hasClass('open')) {
						$dropdown.trigger('click');
					} else {
						var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
						if ($prev.length > 0) {
							$dropdown.find('.focus').removeClass('focus');
							$prev.addClass('focus');
						}
					}
					return false;
					// Esc
				} else if (event.keyCode == 27) {
					if ($dropdown.hasClass('open')) {
						$dropdown.trigger('click');
					}
					// Tab
				} else if (event.keyCode == 9) {
					if ($dropdown.hasClass('open')) {
						return false;
					}
				}
			});
	
			// Detect CSS pointer-events support, for IE <= 10. From Modernizr.
			var style = document.createElement('a').style;
			style.cssText = 'pointer-events:auto';
			if (style.pointerEvents !== 'auto') {
				$('html').addClass('no-csspointerevents');
			}
	
			return this;
	
		};
	
	}(jQuery));
	
	$(document).ready(function() {
	  $('.mySelect').niceSelect();
	});
	
	
	$('.custom-search-input-2 select, .custom-select-form select').niceSelect();
	$('.custom-search-input-1 select, .custom-select-form select').niceSelect();
	// Atltenative checkbox styles - Switchery
	var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
	elems.forEach(function (html) {
		var switchery = new Switchery(html, {
			size: 'small'
		});
	});
	
	// Like Icon
    $('.wish_bt').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('liked');
	});
	
	// Collapse filters
	$(window).bind('load resize', function () {
		var width = $(window).width();
		if ($(this).width() < 991) {
			$('.collapse#collapseFilters').removeClass('show');
		} else {
			$('.collapse#collapseFilters').addClass('show');
		};
	});
	
	//Scroll to top
	$(window).on('scroll', function () {
		'use strict';
		if ($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
	});
	
	// Carousels
	$('#carousel').owlCarousel({
		center: true,
		items: 2,
		loop: true,
		margin: 10,
		responsive: {
			0: {
				items: 1,
				dots:false
			},
			600: {
				items: 2
			},
			1000: {
				items: 4
			}
		}
	});
	$('#reccomended').owlCarousel({
		center: true,
		items: 2,
		loop: true,
		margin: 0,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1000: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	});
	$('#reccomended1').owlCarousel({
		center: true,
		items: 2,
		loop: true,
		margin: 0,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 2
			},
			1000: {
				items: 3
			},
			1400: {
				items: 4
			}
		}
	});
	$('#reccomended_adventure').owlCarousel({
		center: false,
		items: 2,
		loop: false,
		margin: 15,
		responsive: {
			0: {
				items: 1
			},
			767: {
				items: 3
			},
			1000: {
				items: 4
			},
			1400: {
				items: 5
			}
		}
	});

	// Sticky filters
	$(window).bind('load resize', function () {
		var width = $(window).width();
		if (width <= 991) {
			$('.sticky_horizontal').stick_in_parent({
				bottoming:false,
				offset_top: 50
			});
		} else {
			$('.sticky_horizontal').stick_in_parent({
				bottoming:false,
				offset_top: 67
			});
		}
	});

	// Opacity mask
	$('.opacity-mask').each(function(){
		$(this).css('background-color', $(this).attr('data-opacity-mask'));
	});

	// Aside panel
	$(".aside-panel-bt").on("click", function () {
		$("#panel_dates").toggleClass("show")
		$(".layer").toggleClass("layer-is-visible")
	});

	// Show more button
	$(".content_more").hide();
    $(".show_hide").on("click", function () {
        var txt = $(".content_more").is(':visible') ? 'Read More' : 'Read Less';
        $(this).text(txt);
        $(this).prev('.content_more').slideToggle(200);
    });
	            
	// Secondary nav scroll
	var $sticky_nav= $('.secondary_nav');
	$sticky_nav.find('a').on('click', function(e) {
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').animate({
			'scrollTop': $target.offset().top - 140
		}, 400, 'swing');
	});
	$sticky_nav.find('ul li a').on('click', function () {
		$sticky_nav.find('ul li a.active').removeClass('active');
		$(this).addClass('active');
	});
	
	// Faq section
	$('#faq_box a[href^="#"]').on('click', function () {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			   if (target.length) {
				 $('html,body').animate({
					 scrollTop: target.offset().top -185
				}, 400);
				return false;
			}
		}
	});
	$('ul#cat_nav li a').on('click', function () {
		$('ul#cat_nav li a.active').removeClass('active');
		$(this).addClass('active');
	});
	
	// Button show/hide map
	$(".btn_map, .btn_map_in").on("click", function () {
		var el = $(this);
		el.text() == el.data("text-swap") ? el.text(el.data("text-original")) : el.text(el.data("text-swap"));
		$('html, body').animate({
			scrollTop: $("body").offset().top +385
		}, 400);
	});
	
	// Panel Dropdown
    function close_panel_dropdown() {
		$('.panel-dropdown').removeClass("active");
    }
    $('.panel-dropdown a').on('click', function(e) {
		if ( $(this).parent().is(".active") ) {
            close_panel_dropdown();
        } else {
            close_panel_dropdown();
            $(this).parent().addClass('active');
        }
        e.preventDefault();
    });

    // Closes dropdown on click outside the conatainer
	var mouse_is_inside = false;

	$('.panel-dropdown').hover(function(){
	    mouse_is_inside=true;
	}, function(){
	    mouse_is_inside=false;
	});

	$("body").mouseup(function(){
	    if(! mouse_is_inside) close_panel_dropdown();
	});
	
	/* Dropdown user logged */
	$('.dropdown-user').hover(function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn(300);
	}, function () {
		$(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut(300);
	});

	// Search half screen map
	$('a.search_map').on('click',function () {
		$('.search_map_wp').slideToggle("fast");
	});

	// Range slider half screen map
	$('input[type="range"]').rangeslider({
		polyfill: false,
		onInit: function () {
			this.output = $(".distance span").html(this.$element.val());
		},
		onSlide: function (
			position, value) {
			this.output.html(value);
		}
	});

	// Range DatePicker scroll fix
	$(function () {
	    $(window).bind("resize", function () {
	        if ($(this).width() < 768) {
	            $('.input-dates').removeClass('scroll-fix')
	        } else {
	            $('.input-dates').addClass('scroll-fix')
	        }
	    }).trigger('resize');
	});

	// Header button explore
    $('a[href^="#"].btn_explore').on('click', function (e) {
			e.preventDefault();
			var target = this.hash;
			var $target = $(target);
			$('html, body').stop().animate({
				'scrollTop': $target.offset().top -50
			}, 300, 'swing', function () {
				window.location.hash = target;
			});
		});


    // Menu hover effect
    $(".main-menu > ul > li").hover(function() {
	  $(this).siblings().stop().fadeTo(300, 0.6);
	  $(this).parent().siblings().stop().fadeTo(300, 0.3); 
	}, function() { // Mouse out
	  $(this).siblings().stop().fadeTo(300, 1);
	  $(this).parent().siblings().stop().fadeTo(300, 1);
	});

	// Categorie hover images
	$(".cat_nav_hover ul li a").each(function() {
	    $(this).on("mouseover", function() {
	        $(".cat_nav_hover").addClass("hover");
	        $(".container-item").removeClass("active");
	        $(this).parent().addClass("active");
	    }).on("mouseleave", function() {
	        $(".cat_nav_hover").removeClass("hover");
	    });
	});

	// Scroll animation
	scrollCue.init({
	    percentage : 0.85
	});
	
})(window.jQuery); 

