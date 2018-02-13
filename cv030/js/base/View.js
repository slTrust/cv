window.View = function(selector){
    return document.querySelector(selector);
}
//这样 就不用每个模块都重复的写 var  view = document.querySelector(selector);