const remove = document.querySelector('#button-remove');
const add = document.querySelector('#button-add')
const key = 'To-do Lista'


add.addEventListener('click', function(){
    let input = document.querySelector('#tarefa');
    if(!input.value){
        alert('Verifique a Task e tente novamente')
    } else {
        let task = JSON.parse(localStorage.getItem(key) || "[]");
        task.push({
            nome: input.value
        })
        localStorage.setItem(key, JSON.stringify(task))
        tasks()
    }
    input.value = ''
})

function tasks(){
    let task = JSON.parse(localStorage.getItem(key) || "[]");
    let lista = document.querySelector('#to-do');

    lista.replaceChildren()
    for(let c = 0; c < task.length; c++){
        let li = document.createElement('li');
        lista.appendChild(li)
        li.innerHTML = `${task[c]['nome']}<button class="check">Ok</button>`
    }

    let buttons = document.querySelectorAll('.check');
    buttons.forEach(function(item, index){
        item.addEventListener('click', function(){
            
            remover(task[index].nome)
        })
    })
}

function remover(x){
    let task = JSON.parse(localStorage.getItem(key) || "[]");
    let idx = task.findIndex(function(storage){
        return storage.nome == x
    })
    task.splice(idx, 1)
    localStorage.setItem(key, JSON.stringify(task))
    tasks()
}

tasks()