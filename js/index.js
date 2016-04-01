$(document).ready(function () {
    var length,
        currentIndex = 0,
        interval,
        hasStarted = false,
        t = 5000;
    length = $('.ps-bg-item').length;
    $('.ps-bg-item:not(:first)').hide();
    $('.trigger-item:first').addClass('current');

    //鼠标悬停，停止轮播，离开开始轮播
    $('.ps-item').hover(function(){
        stop();
    }, function () {
        start();
    });

    $('.trigger-item').hover(function (e) {
        stop();
        var preIndex = $('.trigger-item').filter('.current').index();
        currentIndex = $(this).index();
        play(preIndex,currentIndex);
    }, function () {
        start();
    });

    function next() {
        var preIndex = currentIndex;
        console.log(currentIndex +  ' ' + length);

        currentIndex = ++currentIndex % length;
        play(preIndex, currentIndex);
    }

    function pre() {
        var preIndex = currentIndex;
        currentIndex = (--currentIndex + length) % length;
        play(preIndex, currentIndex);
    }

    function play(preIndex,currentIndex){
        $('.ps-bg-item').eq(preIndex).fadeOut(1000).parent().children().eq(currentIndex).fadeIn(1000);
        $('.ps-bg-item').eq(currentIndex).siblings().css({"z-index": "0"}),$('.ps-bg-item').eq(currentIndex).css({zIndex: "1"}).stop(!0).animate({opacity: "1"});


        var i = $('.ps-item').eq(currentIndex);
        i.siblings().css({"z-index": "4"}), i.css({zIndex: "5"}).find(".puzzle-item.item-1 .puzzle-item-block").stop(!0).animate({"margin-left": "0px"},function(){
            var e = i;
            e.siblings().each(function () {
                $(this).css({"z-index": "4"}).removeClass("current").removeClass("init"), $(this).find(".puzzle-item").find(".puzzle-item-block").removeAttr("style")
            })
        });

        //鼠标划过后 圆圈是否被选中
        $('.trigger-item').eq(currentIndex).addClass("current").siblings().removeClass("current");
    }

    function start(){
        if(!hasStarted){
            hasStarted = true;
            interval = setInterval(next,t);
        }
    }

    function stop(){
        clearInterval(interval);
        hasStarted = false;
    }

    //start();
})

