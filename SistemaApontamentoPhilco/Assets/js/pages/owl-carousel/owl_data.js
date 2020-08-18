$(document).ready(function () {
    $("#owl-demo").owlCarousel({
        autoPlay: 3000,
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });

    $("#owl-demo2").owlCarousel({
        loop: true,
        autoPlay: 3000,
        items: 6,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    $("#owl-demo3").owlCarousel({
        loop: true,
        singleItem: true,
        lazyLoad: true
    });
});