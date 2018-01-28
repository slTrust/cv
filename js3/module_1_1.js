!function(){
    var person = window.person = {
        name:'hjx',
        age:18
    }
    window.personAgeGrowUp = function(){
        person.age += 1;
        return person.age;
    }
}.call()