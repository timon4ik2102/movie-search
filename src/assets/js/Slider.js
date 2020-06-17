export const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 500,
    centerInsufficientSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        319: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        750: {
            slidesPerView: 2,
            spaceBetween: 40,
        },
        1000: {
            slidesPerView: 3,
            spaceBetween: 25,
        },
        1430: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
