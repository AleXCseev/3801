$(document).ready(function(){

  /*=============
  *  MAIN
  ===============*/
  
  var wrapper = $('#wrapper');
  var imgUrl = wrapper.attr('data-url');


  function detectthreeDays() {
    var nowData = new Date();
    var startYear = new Date(2019, 0, 0);
    var startYearNowDays = (nowData - startYear) / 1000 / 60 / 60 / 24;

    return (Math.ceil(startYearNowDays) % 3) + 1;
  }

  // timer
  var now = new Date();
  var secPassed = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds();
  var t = ((60 * 60 * 24) * detectthreeDays()) - secPassed;
  var tmp = '<ul class="time">' +
              '<li class="time-item">' +
                '<div class="time-num">' + 
                  '<span>{d10}</span>' +
                  '<span>{d1}</span>' +
                '</div>' +
                '<span class="time-text">Днів</span>' +
              '</li>' +
              '<li class="time-item">' +
                '<div class="time-num">' + 
                  '<span>{h10}</span>' +
                  '<span>{h1}</span>' +
                '</div>' +
                '<span class="time-text">Годин</span>' +
              '</li>' +
              '<li class="time-item">' +
                '<div class="time-num">' + 
                  '<span>{m10}</span>' +
                  '<span>{m1}</span>' +
                '</div>' +
                '<span class="time-text">Хвилин</span>' +
              '</li>' +
            '</ul>'

  $('.timer').countdown({
    until: (t),
    labels: ['Годы', 'Месяцы', 'Недели', 'Днів', 'Годин', 'Хвилин', 'Секунд'],
    labels1: ['Годы', 'Месяцы', 'Недели', 'Днів', 'Годин', 'Хвилин', 'Секунд'],
    format: 'HMS',
    layout: tmp
  });

  //fancybox
  $("[data-fancybox]").fancybox({
    loop: true,
    infobar: false,
    buttons: [
      "zoom",
      "close"
    ],
  });

  // remodal
  var privacyPolicy = $('[data-remodal-id=privacy-modal]').remodal({});
  // var privacyPolicy2 = $('[data-remodal-id=privacy-policy2]').remodal({});

  // don't dragging img
  $("img, a").on("dragstart", function(event) { event.preventDefault(); });

  // smoothScrolling
  smoothScrolling();

  // added item-n classes to .form-group elems
  ;(function addNumericFormGroup(form) {
    if (!form) return;

    $('.order-form').each(function() {
      $('.order-form .form-group #name_first').closest('.form-group').addClass('item-1');
      $('.order-form .form-group #phone').closest('.form-group').addClass('item-2');
      $('.order-form .form-group [type="submit"]').closest('.form-group').addClass('item-3');
    });
  })($('*').is('.order-form'));

  $(function () {
    $('.rating .star').on('click', function() {
      var selectedCssClass = 'selected';
      var $this = $(this);
      $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
      $this
        .addClass(selectedCssClass)
        .parent().addClass('vote-cast');
    });
  });


  // product-section
  ;(function productSection(display) {
    if (!display) return;

    var dataTarget = '.product-section';
    var selectColor = $(dataTarget).find('.select-color');
    var slider = $('.product-section .product-pics').slick({
      fade: true,
      speed: 0,
      arrows: false,
      swipe: false
    });
    var slide = $(dataTarget).find('.product-pics--slide');  

    mediaQuery('992px', {
      'Up' : function () {
        $(dataTarget).find('.logo img').attr('src', imgUrl + '/img/logo-white.png');
      }, 
      'Down' : function () {
        $(dataTarget).find('.logo img').attr('src', imgUrl + '/img/logo-black.png');
      }
    }); 

    $(dataTarget).attr('data-color', $(dataTarget).find('.select-color__list-item_active').attr('data-color'))
  
    $(selectColor).find('.select-color__list-item').on('click', function() {
      var delaySpeed = 400;

      if (!$(this).hasClass('select-color__list-item_active')) {
        $(selectColor).find('.select-color__list-item').removeClass('select-color__list-item_active');
        $(this).addClass('select-color__list-item_active');

        if ($(this).attr('data-color') === 'white') {
          changeSlide('0', delaySpeed)
        } else if ($(this).attr('data-color') === 'black') {
          changeSlide('1', delaySpeed)
        }
      }

      function changeSlide(slide, speed) {
        $(dataTarget).find('.product-pics').addClass('slide-up')

        setTimeout(function () {
          $(slider).slick('slickGoTo', slide);
          $(dataTarget).find('.product-pics').removeClass('slide-up')
        }, speed)
      }
    }); 

    $(slide).each(function () {
      var slideItem = this;

      $(slideItem).find('.product-pics--small').on('click', function () {
        var currentSmall = this;
        var smalls = $(slideItem).find('.product-pics--small');
        var bigs = $(slideItem).find('.product-pics--big');
        var smallIndex = smalls.index($(currentSmall));

        if (!$(currentSmall).hasClass('product-pics--small_active')) {
          smalls.removeClass('product-pics--small_active');
          $(currentSmall).addClass('product-pics--small_active');
          
          bigs.removeClass('product-pics--big_active');
          $(bigs.get(smallIndex)).addClass('product-pics--big_active');
        }
      });
    })
    
  })(true);

  // own-select
  ;(function ownSelectTag(selector) {
    var selected = selector + '__selected';
    var list = selector + '__list';
    var item = selector + '__item';
    var speed = 70;

    $(selector).each(function () {
      var root = $(this);
  
      root.find(selected).on('click', function () {
        root.find(list).fadeToggle(speed);
        root.toggleClass('own-select_active');
      });
  
      root.find(item).on('click', function () {
        root.find(selected).html($(this).html());
        root.find(list).fadeOut(speed);
        root.toggleClass('own-select_active');
      });
    });
  
    document.addEventListener('click', function(e) {
      var target = e.target;
  
      if ( !$(target).closest(selector).hasClass('own-select') ) {
        $(selector).each(function() {
          $(this).removeClass('own-select_active').find(selector + '__list').fadeOut(speed);
        });
      } else {
        $(selector).not($(target).closest(selector)).each(function() {
          $(this).removeClass('own-select_active').find(selector + '__list').fadeOut(speed);
        });
      }
    });
  
  })('.own-select');

  // reviews
  ;(function () {
    var slider = $('.reviews .slider--items').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: $('.reviews .slider--arrows .slider--arrow-back'),
      nextArrow: $('.reviews .slider--arrows .slider--arrow-next'),
      fade: true,
      autoplay: true,
      autoplaySpeed: 3000,
    });

    $('.reviews .feedback--form').off()

    $('.reviews .tabs').height( $('.reviews .tabs .tabs__tab-1').height() );
    window.addEventListener('resize', function() {
      $('.reviews .tabs').height( $('.reviews .tabs .tabs__tab-1').height() );
      // $(slider)[0].slick.refresh();
    });

    // feedback-btn
    $('.reviews .feedback-btn').on('click', function (e) {
      var btn = $(this);
      e.preventDefault();

      if ( $('.reviews .tabs').attr('data-tabs') === 'tabs__tab-1' ) {
        showTab('.tabs__tab-2');
        $('.reviews .tabs').attr('data-tabs', 'tabs__tab-2')
      } else if (($('.reviews .tabs').attr('data-tabs') === 'tabs__tab-2')) {
        $('.reviews .feedback--form').submit();
      } 
    });

    $('.reviews .feedback--form').submit(function (e) {
      e.preventDefault();
      
      var formStatus = [false, false];

      $('.reviews .feedback--form .form-control').each(function (i) {
        var input = $(this);

        if (input.val() !== "") {
          formStatus[i] = true; 
          input.removeClass('novalid');
        } else {
          input.addClass('novalid');
        }
      });

      if (formStatus[0] == true && formStatus[1] == true) {
        showTab('.tabs__tab-3');
        $('.reviews .tabs').attr('data-tabs', 'tabs__tab-3');
        $('.reviews .feedback-btn').removeClass('feedback-btn_active');

        setTimeout(function () {
          showTab('.tabs__tab-1');
          $('.reviews .tabs').attr('data-tabs', 'tabs__tab-1');

          setTimeout(function () {
            $('.reviews .feedback-btn').addClass('feedback-btn_active');
          }, 300);
          $('.reviews .feedback--form .form-control').val('');
        }, 3000);
      }
    })

    $('.reviews .slider--img').on('click', function () {

      if ( $('.reviews .tabs').attr('data-tabs') !== 'tabs__tab-1' ) {
        showTab('.tabs__tab-1');
        $('.reviews .feedback-btn').addClass('feedback-btn_active');
        $('.reviews .tabs').attr('data-tabs', 'tabs__tab-1')
      }

    });

      
    function showTab(tab) {
      $('.reviews .tabs .tabs__tab').removeClass('tabs__tab_active');

      setTimeout(function () {
        $('.reviews .tabs ' + tab).addClass('tabs__tab_active');
      }, 300);
    }

    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#feedback--photo').attr('src', e.target.result);
          $('.feedback--photo').addClass('feedback--photo_active')
        };

        reader.readAsDataURL(input.files[0]);
      }
    }
    
    $("#imgInput").change(function(){
      readURL(this);
    }); 

    $('.reviews .feedback--close-btn.close-btn').on('click', function (e) {
      e.preventDefault();
      showTab('.tabs__tab-1');
      $('.reviews .feedback-btn').addClass('feedback-btn_active');
      $('.reviews .tabs').attr('data-tabs', 'tabs__tab-1')
    });

  })();

  /*=============
  *  FUNCTIONS
  ===============*/
  
  /********** mediaQuery **********/
  
  /**
   * javascript media query
   * @function
   * @param {string} breakpoint - breakpoint border
   * @param {function} [Up = empty function] - code that runs above breakpoint
   * @param {function} [Down = empty function] - code that runs below breakpoint
   */
  
  // How to use:
  // mediaQuery('768px', {
  //   'Up' : function () {
  //     console.log('some code');
  //   }, 
  //   'Down' : function () {
  //     console.log('some code');
  //   }
  // }); 
  
  function mediaQuery (breakpoint, userSettings) {
    var defaultSettings = {
      'Up' : $.noop, 
      'Down' : $.noop
    }
    var settings = $.extend(defaultSettings, (userSettings || {}));
    var mediaQueryList = window.matchMedia("(min-width: " + breakpoint + " )");
  
  
    function handleOrientationChange(mql) {
      if (mql.matches) settings.Up() 
      else settings.Down();
    }
  
    mediaQueryList.addListener(handleOrientationChange);
    handleOrientationChange(mediaQueryList);
  }
  
  
  /********** smoothScrolling **********/
  
  /**
   * Smooth Page Scrolling
   * @function
   * @param {string} selector - string selector to be used for scrolling 
   * @param {number} [speed = 1250] - scroll speed
   * @param {number} [offset = 0] - offset from block
   * @param {string} [easing] - easing function
   * @param {function} [callbackBegin] - function at the beginning of scrolling
   * @param {function} [callbackEnd] - function at the end of scrolling
   */
  function smoothScrolling (userSettings) {
    var defaultSettings = {
      clickOn : false,
      delay: 0,
      speed : 800,
      offset : 0,
      easing : '',
      dataName : 'data-smooth-scroll',
      callbackBegin : $.noop, 
      callbackEnd : $.noop,
    }
    
    var settings = $.extend(defaultSettings, (userSettings || {}));
  
    $('[' + settings.dataName + ']').each(function () {
  
      if (!settings.clickOn) {
        $(this).on('click', function(event) {
          var $anchor = $(this);
          var $anchorData = $anchor.attr(settings.dataName);
          
          event.preventDefault();
  
          setTimeout(function () {
            $('html, body').stop().animate({
              scrollTop: ( $($anchorData).offset().top - settings.offset)
            }, settings.speed, settings.easing, function () {
              if ($.isFunction(settings.callbackEnd)) {
                settings.callbackEnd();
              }
            });
          }, settings.delay)
  
          if ($.isFunction(settings.callbackBegin)) {
            settings.callbackBegin();
          }
  
        });
      } else {
        setTimeout(function () {
          $('html, body').stop().animate({
            scrollTop: ( $(settings.clickOn).offset().top - settings.offset)
          }, settings.speed, settings.easing, function () {
            if ($.isFunction(settings.callbackEnd)) {
              settings.callbackEnd();
            }
          });
        }, settings.delay)
      }
  
    });
  }
  
  // How to use:
  
  // js:
  
  // LP.smoothScrolling({
  //   speed : 1000,
  // });
  
  // html:
  
  // <a href="#" data-smooth-scroll="#catalog">Подробнее</a>
  // You can use any container! (a, div, li, span etc.)
  
  // libs/functions/Accordion.js
  // libs/functions/Tabs.js
});