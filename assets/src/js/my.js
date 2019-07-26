$( document ).ready(function(){

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
});