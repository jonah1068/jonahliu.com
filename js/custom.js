
$(function () {
    
    "use strict";

    var $grid = $('.grid');

    $(window).on('load', function () {
        
        $('.startLoad').fadeOut('slow');

        if ( $grid.length ) {

            $grid.isotope({
                itemSelector: '.grid .item',

                percentPosition: true,

                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });

        }
        
    });
    $('.ul-filter li').on('click', function () {

        var filterValue = $(this).attr('data-filter');

        $(this).addClass('active_filter').siblings().removeClass('active_filter');

        $grid.isotope({ filter: filterValue });

    });

    var intro       = '.intro',
        page_right  = '.page-right',
        body        = 'body',
        splitlayout = '#splitlayout',
        menu__a     = '#menu a',
        home__type  ='.home_type';


    function go_to_right() {

        $(splitlayout).addClass('open-right').removeClass('close-right');

    }

    function go_to_left() {

        $(splitlayout).removeClass('open-right').addClass('close-right reset-layout');

    }

    function check_screen() {
        
        if (Modernizr.mq('(max-width: 991px)')) {

            return "mobile_screen";

        } else {
            
            return "not_mobile_screen";

        }
        
    }
    check_screen();

    function set_height(select_element) {

        if ($(select_element).length){
            $(select_element).height($(window).height());
        }

    }

    set_height(".full-height");

    function next_num(max) {

            next_anim++;
        if (next_anim > max) {next_anim = 0;}

    }

    function scroll__top(){

        $(page_right).animate({
            scrollTop: 0
        }, 5);

    }

    function sectionCenter(){

        if ( $(window).height() > $('.active_sec').height() ) {

            var newHeight = ( $(window).height() - $('.active_sec').height() ) * 0.5;
            $('.active_sec').css( 'margin-top',newHeight );

        }else{

            $('.active_sec').css( 'margin-top', 0 );

        }

    }

    function mob_menu_toggle(){

        $(".navbar-toggle").toggleClass("collapsed");
        $('.mob-menu-overlay').fadeToggle();
        $('.side-right').toggleClass('right-zero');

    }

    $('.mob-menu .navbar-toggle,.mob-menu-overlay').on('click', function (){

        mob_menu_toggle();

    });


    var out_anim = [
        'pt-page-moveToRightFade',
        'pt-page-scaleDown',
        'pt-page-flipOutRight',
        'pt-page-rotatePushLeft',
        'pt-page-rotateFoldLeft',
        'pt-page-rotateCubeLeftOut pt-page-ontop',
        'pt-page-rotateSidesOut'
    ],

    in_anim = [
        'pt-page-moveFromLeftFade',
        'pt-page-scaleUpDown pt-page-delay300',
        'pt-page-flipInLeft pt-page-delay500',
        'pt-page-rotatePullRight pt-page-delay180',
        'pt-page-moveFromRightFade',
        'pt-page-rotateCubeLeftIn',
        'pt-page-rotateSidesIn pt-page-delay200'
    ],

    next_anim = 0,

    classStartWith = 'pt-page-m* pt-page-s* pt-page-f* pt-page-r* pt-page-d* pt-page-o*';


    $('#menu a:not(.loading),.goToSec').on("click", function (event) {
        
        var sec = $(this).attr('href');
        var hash = this.hash;
        event.preventDefault();

        $('#menu a[href="'+sec+'"]').addClass('active_item').parent().siblings().find('a').removeClass('active_item');
        if (check_screen() === "mobile_screen") {
            
            if ( !$(this).hasClass("goToSec") ) { mob_menu_toggle(); }
            next_num(6);

            if ( sec === '#home' ) {

                $(home__type).fadeIn();
                $("section").removeClass('active_sec');
                go_to_left();
                fitMyText();

            }else {

                if ( $(sec).hasClass('active_sec') ){ return; }
                $(menu__a).addClass('loading');
                $(home__type).fadeOut();
                go_to_right();
                scroll__top();
                $('.pt-page-current').addClass(out_anim[next_anim]);
                $(sec).addClass(in_anim[next_anim]).addClass('pt-page-current active_sec').siblings().removeClass('active_sec');

                }

        }else {

            if ( sec === '#home' ) {

                go_to_left();

            }

            else if ( $('.open-right').length ) {
                        
                if ( $(sec).hasClass('active_sec') ){ return; }
                $(menu__a).addClass('loading');
                scroll__top();
                updateSlick();
                next_num(6);
                $('.pt-page-current').addClass(out_anim[next_anim]);
                $(sec).addClass(in_anim[next_anim]).addClass('pt-page-current active_sec').siblings().removeClass('active_sec');
                sectionCenter();                       

            }else {

                go_to_right();
                scroll__top();
                updateSlick();
                $(menu__a).addClass('loading');
                $(sec).addClass('pt-page-current active_sec').siblings().removeClass('pt-page-current active_sec');
                sectionCenter();

            }

        }

    });

    $("section").on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(e){

        $('.active_sec').siblings().removeClass('pt-page-current');
        $('.pt-page').alterClass( classStartWith, '' );
        $(menu__a).removeClass('loading');

     });

    var project_slider = '.project-slider';

    if ( $(project_slider).length ) {

        $(project_slider).responsiveSlides({
            nav: true,
            prevText: '<i class="pe-7s-angle-left"></i>',
            nextText: '<i class="pe-7s-angle-right"></i>'
        });

    }

    $('.contact form .submit').on('click', function () {

        $('.contact form .form-control').removeClass("errorForm");
        $('.msg_success,.msg_error').css("display","");

        var error = false,
            name = $('.contact form input[type="text"]');
        
        if (name.val() === "" || name.val() === " ") {
            error = true;
            $(name).addClass("errorForm");
        }
        
        var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            email = $('.contact form input[type="email"]');
        
        if (email.val() === "" || email.val() === " ") {
            $(email).addClass("errorForm");
            error = true;
        } else if (!email_compare.test(email.val())) {
            $(email).addClass("errorForm");
            error = true;
        }
        
        var msg = $('.contact form textarea');
        
        if (msg.val() === "" || msg.val() === " ") {
            error = true;
            $(msg).addClass("errorForm");
            
        }
    
        if (error === true) {
            return false;
        }
        
        var data_string = $('.contact form').serialize();
        
    
        $.ajax({
            type: "POST",
            url: $('.contact form').attr('action'),
            data: data_string,
            
            success: function (message) {
                if (message === 'SENDING') {
                    $('.msg_success').fadeIn('slow');
                } else {
                    $('.msg_error').fadeIn('slow');
                }
            }
            
        });
        
        return false;
        
    });

    $(window).on("resize", function () {

        sectionCenter();
        set_height(".full-height");
        if( check_screen() === "mobile_screen" ){

            if ( $("[href='#home']").hasClass("active_item") ) {

                $(home__type).fadeIn();

            }else {

                $(home__type).fadeOut();
            }

        }

    });

    var my_img = '.my_img',
        magnifPopup = function () {

        $(my_img).magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true, 
                duration: 300,
                easing: 'ease-in-out',
                opener: function (openerElement) {

                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });

    };

    if( $(my_img).length ){

        magnifPopup();

    }

    $('.info .image_overlay').on("click", function () {

        $(this).parents(".project_content").find(my_img).trigger("click");

    });

    $('.popup-with-zoom-anim').magnificPopup({

        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'

    });

    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    var type_d = "#typed";

    if ( $(type_d).length ){

        var typed = new Typed(type_d, {
            stringsElement: '#typed-strings',
            typeSpeed: 40,
            backSpeed: 0,
            backDelay: 1500,
            startDelay: 1000,
            fadeOut: false,
            loop: true
        });

    }

    function fitMyText(){

        var fit__text = $(".fit__text");
        
        if ( fit__text.length !== 0 ){

            fit__text.fitText(1, { maxFontSize: 45 });

        }

    }
    fitMyText();

    var owl_slick = '.owl';
    $(owl_slick).slick({
        infinite: false,
        slidesToShow: 2,
        arrows: false,
        responsive: 
            [{
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }]
    });

    function updateSlick(){
        $(owl_slick).slick('setPosition');
    }

    $('.prev-testi').on("click", function () {

        $(owl_slick).slick('slickPrev');

    });

    $('.next-testi').on("click", function () {

        $(owl_slick).slick('slickNext');

    });

    $(".matchH").matchHeight();

    var pogoSlider = ".pogoSlider";
    if ($(pogoSlider).length) {
        $(pogoSlider).pogoSlider({
            autoplay: true,
            autoplayTimeout: 3000,
            displayProgess: false,
            preserveTargetSize: true,
            generateButtons: false,
            generateNav: false,
            responsive: true
        }).data('plugin_pogoSlider');
    }

    if ($("#bgndVideo").length){

        jQuery("#bgndVideo").YTPlayer({
            autoPlay:true,
            startAt:0,
            showControls: false,
            opacity: 1
        });

    }


});


