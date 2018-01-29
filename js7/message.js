var APP_ID = 'fqJwht8RtYXK5nVQ1uaDjUc5-gzGzoHsz';
var APP_KEY = 'rLVeL79CM0mAVV6GNa27xDpb';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit',function(e){
    e.preventDefault(); //防止刷新页面
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
})

var query = new AV.Query('Message');
query.find()
.then(
    function (msgs) {
    // 更新成功
    let array = msgs.map((item)=> item.attributes )
    array.forEach((item)=>{
        let li = document.createElement('li');
        li.innerText = `${item.name}:${item.content}`;
        let messageList = document.querySelector('#messageList');
        messageList.appendChild(li);
    })
    },
    function(error){
    //异常处理
    })
.then(function(msgs) {
    console.log(msgs)
}, function (error) {
    // 异常处理
    console.log(error)
});
