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
        if(htmlElem.text() == 0){
            var tick = 0;
            // начать повторы с интервалом
            var timerId = setInterval(function() {
                if(numberFromArr > tick){
                    tick += 1;
                    htmlElem.text(tick);
                } else{
                    ticktick_ready += 1;
                    console.log("tick!");
                    clearInterval(timerId);
                }
            }, 10);
        }
    }


    /* Определяем область видимости. */
    var windowHeight = $(window).height();
    var ticktick_ready = 0;

    $(document).on('scroll', function() {
        $('.number').each(function(index) {
            var self = $(this);
            height = self.offset().top + self.height();
            if ($(document).scrollTop() + windowHeight >= height) {
                ticktick(self, achivmentArr[index]);
            }
        });
        if(ticktick_ready >= 4){
            $(document).unbind('scroll');
        }
    });
    

});