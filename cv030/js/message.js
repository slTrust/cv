!function(){
    var view = View('section.message');

    //我是操作Message表的一个对象
    var model = Model({resourceName:"Message"})

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
            this.model.save({name:name,content:content}).then(
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
