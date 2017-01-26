$(document).ready(function () {

    //popup
    var popupAnchor = $('.popup_anchor');

    if (popupAnchor.length > 0) {
        popupAnchor.on('click', function (e) {
            e.preventDefault();
            var popupAnchorData = $(this).data('popup-anchor');

            $(this).addClass('disabled');
            $('#'+popupAnchorData).fadeIn(function () {
                $(this).addClass('active');
            });
        });

        $(document).on('click', function (event){
            if ($('.popup_wrapper').hasClass('active')
                && !$(event.target).parents().hasClass('popup_wrapper')
                && !$(event.target).hasClass('popup_wrapper')) {
                event.preventDefault();
                $('.popup_wrapper').fadeOut(function () {
                    $(this).removeClass('active');
                    popupAnchor.removeClass('disabled');
                });
            }
        });
    }

    //header nav anchor

    if ($('.header_nav_anchor').length > 0) {
        $(document).on('scroll', onScroll);

        var menu_selector = '.header_nav_anchor';

        function onScroll(){
            var scroll_top = $(document).scrollTop() + $('.header').outerHeight();
            $(menu_selector + ' a').each(function(){
                var hash = $(this).attr('href');
                var target = $(hash);
                if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
                    $(menu_selector + ' .header_link_wrapper.active').removeClass('active');
                    $(this).parent().addClass("active");
                } else {
                    $(this).parent().removeClass('active');
                }
            });
        }

        $('.inside_page_anchor').click(function(e){
            e.preventDefault();

            $(document).off('scroll');
            $(menu_selector + ' .header_link_wrapper.active').removeClass('active');
            $(this).parent().addClass('active');
            var hash = $(this).attr('href');
            var target = $(hash);

            $('html, body').animate({
                scrollTop: target.offset().top - $('.header').outerHeight()
            }, 500, function(){
                $(document).on('scroll', onScroll);
            });

        });
    }
});