// 貝茲曲線
// https://greensock.com/docs/v3/Eases
// draggable 套件
// https://jqueryui.com/draggable/

$(function(){
    // 移動太陽
    var counts=0;
    var  now_top=0;
    var revertDuration=$( ".draggon-ui" ).draggable({
          containment: ".middle-drag-box",
          scroll: false,
          revertDuration: 600,
          drag: function() {
             now_top=$(".draggon-ui").position().top;
             
             if(now_top < 250){
                 $(".dot-area").css({opacity:1});
                 revertDuration.draggable( "option", "revert", true);
             }else{
                 revertDuration.draggable( "option", "revert", false);
                 goNight();
             }
          },
          stop: function( event, ui ) {
             if(now_top < 250){
                 $(".dot-area").css({opacity:1});
             }
          }
     });

    // 回到白天模式
    $('.btn-retry').click(function(){
        $(".draggon-ui").css({top:0});
        goLigth();
    })

    // slider
    let sliderCount = -1
    setInterval(function(){
        sliderCount ++ 
        if(sliderCount > 2){
            sliderCount = 0
        }
        slider(sliderCount)
    },4500)

    function slider(i){
        $('.text-run .text').eq(i-1).addClass('hide')
        $('.text-run .text').eq(i).addClass('active')
        setTimeout(function(){
            $('.text-run .text').eq(i-1).removeClass('active hide')
        },1000)
    }

    // 天燈
    let count = 1
    $('.btn-sky-light').click(function(){
        $(".sky-area").append('<img class="sky-light-'+count+'" src="https://github.com/rockayumitw/19_MoonFestivalCard/blob/master/_img/sky-light.png?raw=true" alt=""></img>');

        let el = $('.sky-light-'+count)
        count++;
        var tl = new TimelineMax();
        var x1=Math.floor((Math.random() * 20) + 78);
        var x2=Math.floor((Math.random() * 20) + 50);

        var y1=Math.floor((Math.random() * 80) + 40);
        var y2=Math.floor((Math.random() * 100) + 100);
        var y3=Math.floor((Math.random() * 100) + 200);

        var rotationNum=Math.floor((Math.random() * 50) + 30);

        tl.to(el, 4, {
            x: x1,
            y:-y1,
            rotation:45,
            opacity:1
        });
        tl.to(el, 4, {
            scale:.8,
            x:-x2,
            y:-y2,
            rotation:-2,
            delay:-1.2
        });
        tl.to(el, 8, {
            x:120,
            opacity:0,
            scale:.5,
            rotation:rotationNum,
            y:-y3,
            delay:-1.2
        });
    
        tl.eventCallback("onComplete", function(){
            el.remove();
        });
    })
})


// 打開夜晚模式
function goNight(){
    // $('.night-sky-bg').removeClass('d-none');
    $(".dot-area").css({opacity:0});
    $('.sun-sky-bg').addClass('hide');
    $('.draggon-ui').addClass('hide');
    $('.btn-here.__light').addClass('hide');
    $('.moon-box').removeClass('hide');
    $('.house').addClass('dark');
    $('.sky-light-box').removeClass('hide');
    setTimeout(function(){
        $('.btn-here.__night').addClass('animate__animated animate__fadeIn animate__delay-1s')
        $('.text-run').addClass('animate__animated animate__fadeIn')
        $('.rabbit-group').addClass('active')
    },2000)
}

// 開啟白天模式
function goLigth(){
    $(".dot-area").css({opacity:1});
    $('.sun-sky-bg').removeClass('hide');
    $('.draggon-ui').removeClass('hide');
    // $('.draggon-ui').addClass('show');
    $('.btn-here.__light').removeClass('hide');
    $('.house').removeClass('dark');
    $('.moon-box').addClass('hide');
    $('.sky-light-box').addClass('hide');
    $('.rabbit-group').removeClass('active')
}

