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
    }).then(function(object) {
        alert('存入成功')
        console.log(object)
    })
})

// var hjx = AV.Object.extend('Hjx');
// var obj = new hjx();
// obj.save({
//   words: 'hi',
//   xxxx:'sdfjklsdjflsdjkfadklas',
// }).then(function(object) {
//   console.log(object)
// })