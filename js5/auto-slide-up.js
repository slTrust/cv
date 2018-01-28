 !function(){
    //给每个模块添加偏移距离的样式    然后当页面滚到对应模块时 去除该样式
    let specialTags = document.querySelectorAll('[data-x]');
    for(let i=0;i<specialTags.length;i++){
        specialTags[i].classList.add('offset');
    }

    findClosestAndRemoveOffset();
    window.addEventListener('scroll',function(){
        findClosestAndRemoveOffset();
    })

    function findClosestAndRemoveOffset(){
        //滚动到对应位置  高亮对应标签      
        let specialTags = document.querySelectorAll('[data-x]');
        //找到现在位置距离顶部最近的那个
        let minIndex = 0; 
        for(let i=1;i<specialTags.length;i++){
            //console.log(specialTags[i].offsetTop)
            if(Math.abs(specialTags[i].offsetTop -window.scrollY) < Math.abs(specialTags[minIndex].offsetTop -window.scrollY)){
                minIndex = i;
            }
        }

        //每个出现的模块添加过渡效果   该元素就是离顶部最近的模块  移除偏移的样式
        specialTags[minIndex].classList.remove('offset');
        
        //选中当前模块对应的a标签
        let id = specialTags[minIndex].id;
        let aTag = document.querySelector('a[href="#'+id+'"]');
        //找到aTag的爸爸 就是 li 给它加 active 同时去除其他li的active
        let li = aTag.parentNode;
        let aLi = li.parentNode.children;
        for(var i=0;i<aLi.length;i++){
            // aLi[i].classList.remove('active');
            //操作两个 样式
            aLi[i].classList.remove('highlight');
        }
        //li.classList.add('active');
        li.classList.add('highlight');
        // **解决bug的关键在于不要让两个不相干的动作操作同一个样式
        //此时已经有bug了  
        //  当前位置高亮了 但是 鼠标移入移出后  就不高亮了  因为移入移出和 滚动都是操作一个active
        //滚动到技能时候 虽然选中了  但是他的列表出现了
    }

    //这样找只有子菜单的li有 边框效果  ==》找所有li
    // let liTags = document.getElementsByClassName('menuTigger');
    let liTags = document.querySelectorAll('nav.menu > ul > li');
    //监听含有子菜单的topNavBar menu
    for(let i=0;i<liTags.length;i++){
        liTags[i].onmouseenter = function(e){
            let li = e.currentTarget;
            li.classList.add('active');
        }
        liTags[i].onmouseleave = function(e){
            let li = e.currentTarget;
            li.classList.remove('active');
        }
    }
}.call()