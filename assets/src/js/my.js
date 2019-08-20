$( document ).ready(function(){




    /* open-close questions in .querstion block 
    _________________________________________________________
    _________________________________________________________
    _________________________________________________________
    */

    $(".opentList__text").slideUp();

    $(".arrow").addClass("arrow-open");

    $(".openList__header").click(function(){
        $(this).next().slideToggle();
        if($(this).prev().hasClass("arrow-open")){
            $(this).prev().removeClass("arrow-open");
            $(this).prev().addClass("arrow-close");
        } else{
            $(this).prev().removeClass("arrow-close");
            $(this).prev().addClass("arrow-open");
        }
    });




    /* achivment section. Tick numbers from 0 to needed number
    _________________________________________________________
    _________________________________________________________
    _________________________________________________________
    */

    var achivmentArr = [];

    $(".our-achievement .number").each(function(index){
        achivmentArr.push(Number.parseInt($(this).text()));
        $(this).text("0");
    });


    /* Считаем цифры от 0 до указанного числа в элементе */
    function ticktick(htmlElem, numberFromArr){
        var tick = 0;
        if(htmlElem.text() == 0){
            // начать повторы с интервалом
            var timerId = setInterval(function() {
                if(numberFromArr > tick){
                    tick += 1;
                    htmlElem.text(tick);
                } else if(numberFromArr == tick){
                    clearInterval(timerId);
                    ticktick_ready += 1;
                }
            }, 10);
        }
    }


    /* Определяем область видимости. */
    var windowHeight = $(window).height();

    $('.number').each(function(index) {
      var self = $(this);
      height = self.offset().top + self.height();
      if ($(document, window).scrollTop() + windowHeight >= height ) {
          ticktick(self, achivmentArr[index]);
      }
    });

    $(window).on('scroll', function() {
        $('.number').each(function(index) {
            var self = $(this);
            height = self.offset().top + self.height();
            if ($(document, window).scrollTop() + windowHeight >= height ) {
                ticktick(self, achivmentArr[index]);
            }
        });
    });




    /* Добавляем анимацию, когда элемент в области видимости экрана
    большие блоки и меню nav
    _________________________________________________________
    _________________________________________________________
    _________________________________________________________
    */

    jQuery.fn.extend({
        onAppearanceAddClass: function(class_to_add) {
          var $window = $( window ),
              window_height = $window.height(),
              array_of_$elements = [];
          this.each(function(i,el) {
            array_of_$elements.push($( el ));
          })
          scrollHandler();
              if (array_of_$elements.length) {
            $window.on('resize', resizeHandler).on('resize', scrollHandler).on('scroll', scrollHandler);
          }
          function resizeHandler() {
            window_height = $window.height();
          }
          function watchProcessedElements(array_of_indexes) {
              var l, i;
            for (l = array_of_indexes.length, i = l - 1; i > -1; --i) {
              array_of_$elements.splice(array_of_indexes[i], 1);
            }
            if (!array_of_$elements.length) {
              $window.off('resize', resizeHandler).off('scroll', scrollHandler).off('resize', scrollHandler);
            }
          }
          function scrollHandler() {
            var i, l, processed = [];
            for ( l = array_of_$elements.length, i = 0; i < l; ++i ) {
              if ($window.scrollTop() + window_height > array_of_$elements[i].offset().top) {
                array_of_$elements[i].addClass(class_to_add);
                processed.push(i); 
              }
            }
            if (processed.length) {
              watchProcessedElements(processed);
            }
          }
          return this;
        }
      })
      
      $('.slideAnimated').onAppearanceAddClass('animated slideInLeft showSlide');




      /* Открытие формы при нажатии на кнопки "ваш запрос"
      _________________________________________________________
      _________________________________________________________
      _________________________________________________________
      */

      // При нажатии на кнопку запроса показать форму
      $(".button-request").click(function(){
        $(".contact-form").css("display", "flex");
        $(".contact-form__wrapper").addClass("animated jackInTheBox");
        // Плавно включем белый фон
        $(".contact-form").animate({
          opacity: 1,
        }, 300, function() {});
      });

      // Закрыть форму при нажатии на крестик
      $(".contact-form__close-button").click(function(){
        $(".contact-form").animate({
          opacity: 0,
        }, 300, function() {
          $(".contact-form").css("display", "none");
          $(".contact-form__wrapper").removeClass("animated jackInTheBox");
        });
        // Снова делаем форму прозрачной, что бы она заного потом плавно появлялась
        //$(".contact-form").css("opacity", "0");
      });




      /* Кнопка навигации по сайту
      _________________________________________________________
      _________________________________________________________
      _________________________________________________________
      */

      // Открываем и закрываем меню по нажатию на кнопку меню
      $(".nav-button").click(function(){
        if($(".toggle-menu").css('display') == 'none'){
          $(".toggle-menu").css("display", "flex");

          // постепенно появляем каждый элемент навигации
          var num_links = $('.toggle-menu__item').length;
          var num__ = 1;
    
          function sec() {
            var elem = ".toggle-menu > :nth-child(" + num__ + ") > a";
            $(elem).onAppearanceAddClass('animated slideInLeft');
            $(elem).css("opacity", "1");
            if(num__ <= num_links){
              num__ += 1;
            } else{
              clearInterval(sec);
            }
          }
          setInterval(sec, 30);

          $(".toggle-menu").animate({
            opacity: 1,
          }, 300, function() {});

        } else{
          $(".toggle-menu").animate({
            opacity: 0,
          }, 300, function() {
            $(".toggle-menu").css("display", "none");
            $('.toggle-menu__item').each(function(index){
              $(this).removeClass('animated slideInLeft');
              $(this).css("opacity", "0")
            });
          });
        }
      });

      $(".toggle-menu__item").click(function(){
        $(".toggle-menu").animate({
          opacity: 0,
        }, 300, function() {
          $(".toggle-menu").css("display", "none");
          // удаляем всю инамацию с элементов, что бы она заново проигралась
          // при повторе
          $('.toggle-menu__item').each(function(index){
            $(this).removeClass('animated slideInLeft');
            $(this).css("opacity", "0")
          });
        });
      });

      var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 400
      });




      /* Проверяем появился ли элемент в области видимости
      и показываем/убираем кнопку "наверх"
      _________________________________________________________
      _________________________________________________________
      _________________________________________________________
      */

      // When the user scrolls down 20px from the top of the document, show the button
      window.onscroll = function() {scrollFunction()};

      function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
          document.getElementById("scroller").style.display = "block";
        } else {
          document.getElementById("scroller").style.display = "none";
        }
      }

      // When the user clicks on the button, scroll to the top of the document
      function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }

});