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
        let lista = document.createElement('li')
        terafas_container.appendChild(lista)
        lista.innerHTML += `${task[c].nome}<button class="checks"><img src="../assets/SVG/check.svg"></button>`
    }

    let check = document.querySelectorAll('.checks')
    const checkArray = Array.from(check)
    checkArray.forEach(function(item){
        item.addEventListener('click', function(evento){
            let task = JSON.parse(localStorage.getItem(key) || "[]");
            let index = checkArray.find(function(elemento){
                return 
            })
            console.log(index)
        })
    })
} 

visible()