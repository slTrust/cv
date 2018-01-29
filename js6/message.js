var APP_ID = 'fqJwht8RtYXK5nVQ1uaDjUc5-gzGzoHsz';
var APP_KEY = 'rLVeL79CM0mAVV6GNa27xDpb';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit',function(e){
    e.preventDefault(); //防止刷新页面
    let content = myForm.querySelector('input[name=content]').value;
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'content':content,
    })
    .then(
        function(object) {
            window.location.reload()
            console.log(object)
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
        li.innerText = item.content;
        let messageList = document.querySelector('#messageList');
        messageList.appendChild(li);
    })
    },
    function(error){
    //异常处理
    })
.then(function(msgs) {
    console.log(1)
    console.log(msgs)
}, function (error) {
    // 异常处理
    console.log(2)
    console.log(error)
});

// var hjx = AV.Object.extend('Hjx');
// var obj = new hjx();
// obj.save({
//   words: 'hi',
//   xxxx:'sdfjklsdjflsdjkfadklas',
// }).then(function(object) {
//   console.log(object)
// })