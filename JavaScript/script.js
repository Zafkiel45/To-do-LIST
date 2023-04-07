const remove = document.querySelector('#button-remove');
const add = document.querySelector('#button-add')
const key = 'To-do Lista'


add.addEventListener('click', function(){
    let input = document.querySelector('#tarefa').value;
    if(!input){
        alert('Verifique a Task e tente novamente')
    } else {
        let task = JSON.parse(localStorage.getItem(key) || "[]");
        task.push({
            nome: input
        })
        localStorage.setItem(key, JSON.stringify(task))
        visible()
    }
})

function visible(){
    let task = JSON.parse(localStorage.getItem(key) || "[]");
    const terafas_container = document.querySelector('#to-do');
    for(let c = 0; c < task.length; c++){
        terafas_container.innerHTML += `<li class="item-to-do visible">${task[c].nome}<button class="checked"><img src="../assets/SVG/check.svg"></button></li>`
    }
    let check = document.querySelectorAll('.checked')
    check.forEach(function(item){
        item.addEventListener('click', hidden)
    })
}

function hidden(){
    alert('pussy')
}



visible()