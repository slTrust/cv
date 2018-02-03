/*
var model = Model({resourceName:"Message"})
model.init()
model.fetch()
model.save({name:'xxx',content:'xxx'})
Model办事 我放心
Model 就是个模板
*/
window.Model = function(options){
    let resourceName = options.resourceName
    return {
        init:function(){
            var APP_ID = 'fqJwht8RtYXK5nVQ1uaDjUc5-gzGzoHsz';
            var APP_KEY = 'rLVeL79CM0mAVV6GNa27xDpb';
            AV.init({appId: APP_ID, appKey: APP_KEY });
        },
        fetch:function(){
            var query = new AV.Query(resourceName);
            return query.find();  //Promise对象
        },
        save:function(object){
            var X = AV.Object.extend(resourceName);
            var x = new X();
            //Promise对象
            return x.save(object);
        }
    }
}
//这样 就不用每个模块都重复的写 Model = {...}
/*
//以前的写法  每次都要重复
var model = {
    init:function(){
        var APP_ID = 'fqJwht8RtYXK5nVQ1uaDjUc5-gzGzoHsz';
        var APP_KEY = 'rLVeL79CM0mAVV6GNa27xDpb';
        AV.init({appId: APP_ID, appKey: APP_KEY });
    },
    //获取数据
    fetch:function(){
        var query = new AV.Query('Message');
        return query.find();  //Promise对象
    },
    // 创建数据
    save:function(name,content){
        var Message = AV.Object.extend('Message');
        var message = new Message();
        //Promise对象
        return message.save({  
            'name':name,
            'content':content,
        });
    }
}
*/