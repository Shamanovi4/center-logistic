$(function() {
  /* Burger */
  let burger = $('#burger')
  let nav = $('#nav')

  burger.on('click', function(event) {
    event.preventDefault()

    if (burger.hasClass('open')) {
      burger.removeClass('open')
      burger.addClass('close')
    } else {
      burger.removeClass('close')
      burger.addClass('open')
    }

    $('body').toggleClass('show-nav')
    nav.toggleClass('show')
  })

  $(window).on('resize', function() {
    $('body').removeClass('show-nav')
    burger.removeClass('open')
    burger.addClass('close')
    nav.removeClass('show')
  })

  /* Fixed header */
  let intro = $('#intro')
  let header = $('#header')
  let introH = intro.innerHeight()
  let headerH = header.innerHeight()

  headerScroll()

  $(window).on('scroll resize', function () {
    headerScroll()
  })

  function headerScroll() {
    introH = intro.innerHeight()
    headerH = header.innerHeight()

    let scrollTop = $(this).scrollTop()

    scrollTop >= (introH - headerH) ? header.addClass('header--dark') : header.removeClass('header--dark')
  }

  /* Smooth scroll to sections */
  $('[data-scroll]').on('click', function(event) {
    event.preventDefault()
    
    let scrollEl = $(this).data('scroll')
    let scrollElPos = $(scrollEl).offset().top

    $('body').removeClass('show-nav')
    burger.removeClass('open')
    burger.addClass('close')
    nav.removeClass('show')

    $('html, body').animate({
      scrollTop: scrollElPos - headerH
    }, 250)

  })

  /* Scroll Spy */
  let windowH = $(window).height()
  let scrollTop = $(window).scrollTop()
  scrollSpy(scrollTop)

  $(window).on('scroll', function() {
      scrollTop = $(this).scrollTop()
      scrollSpy(scrollTop)
  })

  function scrollSpy(scrollTop) {
    $('[data-scrollspy]').each(function() {
      let $this = $(this)
      let sectionId = $this.data('scrollspy')
      let sectionOffset = $this.offset().top
      sectionOffset = sectionOffset - (windowH * 0.33333)

      if(scrollTop >= sectionOffset) {
        $('#nav [data-scroll]').removeClass('active')
        $('#nav [data-scroll="' + sectionId + '"]').addClass('active')
      }

      if(scrollTop == 0) {
        $('#nav [data-scroll]').removeClass('active')
      }
    })
  }

  /* Modal */
  $('[data-modal]').on('click', function(event) {
    event.preventDefault()

    let modal = $(this).data('modal')

    $('body').addClass('no-scroll')
    $(modal).addClass('show')

    setTimeout(function() {
      $(modal).find('.modal__content').css({
        transform: 'scale(1)',
        opacity: '1'
      })
    }, 250)
  })

  $('[data-modal-close]').on('click', function(event) {
    event.preventDefault()

    let modal = $(this).parents('.modal')

    modalClose(modal)
  })

  $('.modal').on('click', function() {
    let modal = $(this)

    modalClose(modal)
  })

  $('.modal__content').on('click', function(event) {
    event.stopPropagation()
  })

  function modalClose(modal) {
    modal.find('.modal__content').css({
      transform: 'scale(0.5)',
      opacity: '0'
    })

    setTimeout(function() {
      $('body').removeClass('no-scroll')
      modal.removeClass('show')
    }, 250)
  }

  /* Slick slider https://kenwheeler.github.io/slick/ */

  /* Intro slider */
  let introSlider = $('#introSlider')

  introSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500
  })

  $('#introSliderPrev').on('click', function() {
    introSlider.slick('slickPrev')
    console.log('prev')
  })

  $('#introSliderNext').on('click', function() {
    introSlider.slick('slickNext')
    console.log('next')
  })

  /* Reviews slider */
  let reviewsSlider = $('#reviewsSlider')

  reviewsSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500
  })

  /* Aos.js https://github.com/michalsnik/aos */
  AOS.init({
    // Global settings:
    disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 150, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 250, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  
  })
})
