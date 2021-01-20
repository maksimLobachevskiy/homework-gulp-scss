$(window).resize(function () {
    if ($(window).width() <= 767) {
        $('.photos__item').on('click', function () {
            if ($('.show').next('.photos__item').length) {
                $('.show').removeClass('show')
                    .next('.photos__item')
                    .addClass('show');
            } else {
                $('.show').removeClass('show');
                $('.photos__item').first().addClass('show');
            }
        });
    } else {
        $('.photos__item').off("click");
    }
});