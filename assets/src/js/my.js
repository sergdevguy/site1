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
    console.log(achivmentArr);


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
                    console.log("tick!");
                }
            }, 10);
        }
    }


    /* Определяем область видимости. */
    var windowHeight = $(window).height();
    var ticktick_ready = 0;

    $(window).on('scroll', function() {
        $('.number').each(function(index) {
            var self = $(this);
            height = self.offset().top + self.height();
            if ($(document, window).scrollTop() + windowHeight >= height ) {
                ticktick(self, achivmentArr[index]);
            }
        });
        if(ticktick_ready >= 4){
            //$(document).unbind('scroll');
        }
    });




    /* Добавляем анимацию, когда элемент в области видимости экрана
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
});