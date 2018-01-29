!function(){
    var view = document.querySelector('section.message');
    
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

    var controller = {
        view:null,
        messageList:null,
        form:null,
        model:null,
        init:function(view,model){
            this.view = view;
            this.model = model;
            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('form');
            this.model.init();
            this.loadMessage();
            this.bindEvents();
        },
        initAV:function(){
           
        },
        loadMessage:function(){
            this.model.fetch().then(
                                (msgs)=> {
                                // 更新成功
                                let array = msgs.map((item)=> item.attributes )
                                array.forEach((item)=>{
                                    let li = document.createElement('li');
                                    li.innerText = `${item.name}:${item.content}`;
                                    let messageList = document.querySelector('#messageList');
                                    this.messageList.appendChild(li);
                                })
                                },
                                (error)=>{ }
                            )
        },
        bindEvents:function(){
            this.form.addEventListener('submit',(e)=>{
                e.preventDefault(); //防止刷新页面
                this.saveMessage();    
            })
        },
        saveMessage:function(){
            var myForm = this.form;
            let name = myForm.querySelector('input[name=name]').value;
            let content = myForm.querySelector('input[name=content]').value;
            this.model.save(name,content).then(
                function(object) {
                    let li = document.createElement('li');
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`;
                    let messageList = document.querySelector('#messageList');
                    messageList.appendChild(li);
                    //清空表单
                    myForm.querySelector('input[name=name]').value = '';
                    myForm.querySelector('input[name=content]').value = '';
                },
                function(err){
                    alert('提交失败，请改天再来留言')
                }
            )
        }
    };
    controller.init(view,model);
}.call()
