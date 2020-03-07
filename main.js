$li = $('.viewport > .navigator > ul > li')
$wrapper = $('.wrapper')
$images = $wrapper.children('img')

// 用于存储计时器
var pageTimer = {
    "timer1": '',
    "timer2": '',
    "timer3": ''
}

var current = 1

// 实现初始化自动轮播
pageTimer["timer1"] = timer($wrapper, $li, current)

// 实现悬停轮播暂停，离开轮播创建
$wrapper.on('mouseenter', function(){
    // 清除计时器
    for(let timeInterval in pageTimer){
        clearInterval(pageTimer[timeInterval])
    }
}).on('mouseleave', function(){
    pageTimer["timer2"] = timer($wrapper, $li, current)
})


// 实现点击切换并自动轮播
$li.on('click', function(e){
    // 点击的时候，一定要先清除界面中所有的计时器，这个计时器并不是用于清除点击，而是清除前面自动添加的计时器
    for(let timeInterval in pageTimer){
        clearInterval(pageTimer[timeInterval])
    }
    current = $(e.currentTarget).index()
    $li.removeClass('active-nav').eq(current%4).addClass('active-nav')
    $wrapper.css({transform: `translateX(${-current*920}px)`}).one('transitionend',function(){
        // 这个判断使用的是计时器防抖的思想，在触发一个计时器之前，先去除所有计时器，其实此处只需要去除timer3就好了
        // if (pageTimer["timer1"] !== '' || pageTimer["timer2"] !== '' || pageTimer["timer3"] !== ''){
        //     window.clearInterval(pageTimer["timer1"])
        //     window.clearInterval(pageTimer["timer2"])
        //     window.clearInterval(pageTimer["timer3"])
        // }
        window.clearInterval(pageTimer["timer3"])
        pageTimer["timer3"] = timer($wrapper, $li, current)
    })
})

// 实现计时效果切换动画
function timer($wrapper, $li, current){
    return(setInterval(function(){
        $wrapper.css({transform: `translateX(${-current*920}px)`})
        $li.removeClass('active-nav').eq(current).addClass('active-nav')
        if(current === $li.length-1){
            current = 0
        }else{
            current = current + 1
        }
    },2000))
}