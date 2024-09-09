/*!

 =========================================================
 * Paper Kit 2 PRO - v2.1.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/paper-kit-2-pro
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * License Creative Tim (https://www.creative-tim.com/license)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var toggle_initialized = false;

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;

$(document).ready(function(){
    window_width = $(window).width();


    //  Activate the tooltips
    $('[data-toggle="tooltip"]').tooltip();

    //      Activate the switches with icons
    if($('.switch').length != 0){
        $('.switch')['bootstrapSwitch']();
    }
    //      Activate regular switches
    if($("[data-toggle='switch']").length != 0){
         $("[data-toggle='switch']").bootstrapSwitch();
    }

    //    Activate bootstrap-select
    if($(".selectpicker").length != 0){
        $(".selectpicker").selectpicker();
    }

    $('.modal').appendTo('body');

    if($(".tagsinput").length != 0){
        $(".tagsinput").tagsInput();
    }

    // Limit number of characters in limited textarea
    $('.textarea-limited').keyup(function () {
      var max = $(this).attr('maxlength');
      var len = $(this).val().length;
      if (len >= max) {
        $('#textarea-limited-message').text(' you have reached the limit');
      } else {
        var char = max - len;
        $('#textarea-limited-message').text(char + ' characters left');
      }
    });

    if (window_width >= 768) {
        big_image = $('.page-header[data-parallax="true"]');

        if(big_image.length != 0){
           $(window).on('scroll', pk.checkScrollForPresentationPage);
        }
    }


    if($("#datetimepicker").length != 0){
        $('#datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

    };

    // Change the collor of navbar collapse
    $('#navbarToggler').on('show.bs.collapse', function () {
        if( $('nav').hasClass('navbar-transparent') && $(document).scrollTop() < 50 ){
            $('.navbar').addClass('no-transition');
            $('nav').removeClass('navbar-transparent');
        }
    }).on('hidden.bs.collapse', function (){
        if($(document).scrollTop() < 50 ){
            $('.navbar').removeClass('no-transition');
            $('nav:first-of-type').addClass('navbar-transparent');
    }
    });

    // Navbar color change on scroll
    if($('.navbar[color-on-scroll]').length != 0){
        $(window).on('scroll', pk.checkScrollForTransparentNavbar)
    }

    $('.btn-tooltip').tooltip();
    $('.label-tooltip').tooltip();

	// Carousel
	$('.carousel').carousel({
      interval: 20000
    });

    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    // Init popovers
    pk.initPopovers();

    // Init Sliders
    pk.initSliders();

    // Init video header
    pk.initVideoBackground();

    // Activate Navbar
    if($('.nav-down').length != 0){
        pk.checkScrollForMovingNavbar();
    };

});

$(document).on('click', '.navbar-toggler', function(){
    $toggle = $(this);
    if(pk.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        pk.misc.navbar_menu_visible = 0;
        setTimeout(function(){
            $toggle.removeClass('toggled');
            $('#bodyClick').remove();
        }, 550);
    } else {
        setTimeout(function(){
            $toggle.addClass('toggled');
        }, 580);

        div = '<div id="bodyClick"></div>';
        $(div).appendTo("body").click(function() {
            $('html').removeClass('nav-open');
            pk.misc.navbar_menu_visible = 0;
            $('#bodyClick').remove();
            setTimeout(function(){
                $toggle.removeClass('toggled');
            }, 550);
        });



        $('html').addClass('nav-open');
        pk.misc.navbar_menu_visible = 1;
    }
});


pk = {
    misc:{
        navbar_menu_visible: 0
    },
    checkScrollForTransparentNavbar: debounce(function() {
        	if($(document).scrollTop() > $(".navbar").attr("color-on-scroll") ) {
                if(transparent) {
                    transparent = false;
                    $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
                }
            } else {
                if( !transparent ) {
                    transparent = true;
                    $('.navbar[color-on-scroll]').addClass('navbar-transparent');
                }
            }
    }, 17),

    checkScrollForMovingNavbar: function(){

        // Hide Header on on scroll down
        navbarHeight = $('.navbar').outerHeight();

        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);


    },

    checkScrollForPresentationPage: debounce(function(){
        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform':'translate3d(0,' + oVal +'px,0)',
            '-webkit-transform':'translate3d(0,' + oVal +'px,0)',
            '-ms-transform':'translate3d(0,' + oVal +'px,0)',
            '-o-transform':'translate3d(0,' + oVal +'px,0)'
        });
    }, 4),

    initVideoBackground: function(){
        $('[data-toggle="video"]').click(function(){
            id_video = $(this).data('video');
            video = $('#' + id_video).get(0);

            parent = $(this).parent('div').parent('div');

            if(video.paused){
                video.play();
                $(this).html('<i class="fa fa-pause"></i> Pause Video');
                parent.addClass('state-play');
            } else {
                video.pause();
                $(this).html('<i class="fa fa-play"></i> Play Video');
                parent.removeClass('state-play');
            }
        });
    },

    initPopovers: function(){
        if($('[data-toggle="popover"]').length != 0){
            $('body').append('<div class="popover-filter"></div>');

            //    Activate Popovers
           $('[data-toggle="popover"]').popover().on('show.bs.popover', function () {
                $('.popover-filter').click(function(){
                    $(this).removeClass('in');
                    $('[data-toggle="popover"]').popover('hide');
                });
                $('.popover-filter').addClass('in');
            }).on('hide.bs.popover', function(){
                $('.popover-filter').removeClass('in');
            });

        }
    },

    initSliders: function(){
        // Sliders for demo purpose in refine cards section
        if($('#sliderRegular').length != 0 ){
            var rangeSlider = document.getElementById('sliderRegular');
            noUiSlider.create(rangeSlider, {
            	start: [ 5000 ],
            	range: {
            		'min': [  2000 ],
            		'max': [ 10000 ]
            	}
            });
        }
        if($('#sliderDouble').length != 0){
            var slider = document.getElementById('sliderDouble');
            noUiSlider.create(slider, {
            	start: [20, 80],
            	connect: true,
            	range: {
            		'min': 0,
            		'max': 100
            	}
            });
        }

    },


}

demo = {
    initPickColor: function(){
        $('.pick-class-label').click(function(){
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if(display_div.length) {
            var display_buttons = display_div.find('.btn');
            display_buttons.removeClass(old_class);
            display_buttons.addClass(new_class);
            display_div.attr('data-class', new_class);
            }
        });
    }
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};

function hasScrolled() {
    var st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.navbar.nav-down').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.navbar.nav-up').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
};
