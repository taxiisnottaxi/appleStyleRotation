$li = $('.viewport > .navigator > ul > li')
$wrapper = $('.wrapper')
$images = $wrapper.children('img')
var n = 0
var current

let timer = setInterval(function(){
    current = n%(4)
    $wrapper.css({transform: `translateX(${-(current+1)%4*920}px)`})
    $li.removeClass('active-nav').eq((current+1)%4).addClass('active-nav')
    n = n + 1
},2000)

$wrapper.on('mouseenter', function(){
    window.clearInterval(timer)
}).on('mouseleave', function(){
    timer = setInterval(function(){
        current = n%(4)
        $wrapper.css({transform: `translateX(${-(current+1)%4*920}px)`})
        $li.removeClass('active-nav').eq((current+1)%4).addClass('active-nav')
        n = n + 1
    },2000)
})

$li.on('click', function(e){
    window.clearInterval(timer)
    let $click_li = $(e.currentTarget)
    current = $click_li.index()
    n = $click_li.index()
    $li.removeClass('active-nav').eq(current%4).addClass('active-nav')
    $wrapper.css({transform: `translateX(${-current%4*920}px)`}).one('transitionend',function(){
        timer = setInterval(function(){
            current = n%(4)
            $wrapper.css({transform: `translateX(${-(current+1)%4*920}px)`})
            $li.removeClass('active-nav').eq((current+1)%4).addClass('active-nav')
            n = n + 1
        },2000)
    })
})