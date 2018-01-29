!function(){
    var view = document.querySelector('section.message');
    
    var controller = {
        view:null,
        messageList:null,
        form:null,
        init:function(view){
            this.view = view;
            this.messageList = view.querySelector('#messageList');
            this.form = view.querySelector('form');
            this.initAV();
            this.loadMessage();
            this.bindEvents()
        },
        initAV:function(){
            var APP_ID = 'fqJwht8RtYXK5nVQ1uaDjUc5-gzGzoHsz';
            var APP_KEY = 'rLVeL79CM0mAVV6GNa27xDpb';
            AV.init({appId: APP_ID, appKey: APP_KEY });
        },
        loadMessage:function(){
            var query = new AV.Query('Message');
            query.find()
            .then(
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
            this.form.addEventListener('submit',function(e){
                e.preventDefault(); //防止刷新页面
                this.saveMessage();
            })
        },
        saveMessage:function(){
            var myForm = this.form;
            let name = myForm.querySelector('input[name=name]').value;
            let content = myForm.querySelector('input[name=content]').value;
            var Message = AV.Object.extend('Message');
            var message = new Message();
            message.save({
                'name':name,
                'content':content,
            })
            .then(
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
    controller.init(view);
}.call()
