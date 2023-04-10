const remove = document.querySelector('#button-remove');
const add = document.querySelector('#button-add')
const key = 'To-do Lista'

add.addEventListener('click', function(){
    let input = document.querySelector('#tarefa');
    if(!input.value){
        alert('Verifique a Task e tente novamente')
    } else if(validade()){
        alert('Já existe uma task com este nome')
    }else {
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
        li.classList.add('task-item')
        lista.appendChild(li)
        li.innerHTML = `${task[c]['nome']}<button class="check"><img src="../assets/svg/check.svg"></button>`
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

remove.addEventListener('click', function(){
    localStorage.removeItem(key);
    tasks()
})

function validade(){
    let task = JSON.parse(localStorage.getItem(key) || "[]");
    let input = document.querySelector('#tarefa').value;
    let existe = task.find(function(x){
        return x.nome == input
    })
    return !existe ? false:true
}

tasks()