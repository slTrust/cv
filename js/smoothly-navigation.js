function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
}
requestAnimationFrame(animate);

//监听导航菜单定位到对应位置
let aTags = document.querySelectorAll('nav.menu > ul > li > a');
for(let i=0;i<aTags.length;i++){
    aTags[i].onclick = function(e){
        //阻止默认行为  就是a标签的 锚点
        e.preventDefault();
        let a = e.currentTarget;
        let href = a.getAttribute('href');
        let element = document.querySelector(href);
        
        let top = element.offsetTop;
        //当前位置
        let currentTop = window.scrollY;
        //目标点
        let targetTop = top - 80;
        //总路程
        let s = targetTop - currentTop;
        //总时间   因为路程可能是负数  但是 时间不能是负的
        let t = Math.abs((s/100)*300);
        t = t>500?500:t;
        var coords = { x:currentTop}; 
        var tween = new TWEEN.Tween(coords) 
                .to({ x: targetTop },t) 
                .easing(TWEEN.Easing.Quadratic.Out) 
                .onUpdate(function() { 
                    window.scrollTo(0,coords.x);
                })
                .start();
    }
}