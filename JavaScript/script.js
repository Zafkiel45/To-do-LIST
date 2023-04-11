const remove = document.querySelector('#button-remove');
const add = document.querySelector('#button-add')
const key = 'To-do Lista'; // chave do LocalStorage


/*
    abaixo um evento de click que adiciona o valor do input como o valor de uma propriedade "nome" do localStorage;
*/ 

add.addEventListener('click', function(){
    let input = document.querySelector('#tarefa'); // pega o container no HTML
     // verifica se existe algum valor no input, se não tiver, mostra o aviso
    if(!input.value){
        alert('Verifique a Task e tente novamente')
        // abaixo chama uma função que verifica se o nome da task no input já existir
    } else if(validade()){
        alert('Já existe uma task com este nome')
        // Abaixo pego a chave e verifico se existe elementos, senão existir, retorno um array vazio e transformo em um objeto. 
    }else {
        let task = JSON.parse(localStorage.getItem(key) || "[]");
        // como retorna um array vazio, podemos manipular com suas propriedades, portanto toda vez que o valor do input for digitado, será adicionando ao valor de "nome"
        task.push({
            nome: input.value
        })
        // "escreve" o array no localStorage. basicamente acima armazena em uma variável, e abaixo estamos pegando o que está na variável e adicionando ao LocalStorage. 
        localStorage.setItem(key, JSON.stringify(task))
        // Para atualizar os novos elementos na tela, chamamos a função task()
        tasks()
    }
    // reseta o valor toda vez que adicionar um outro valor
    input.value = ''
})


// função responsável por criar as tasks e mostrar na tela. 
function tasks(){
    // precisamos pegar mais uma vez a chave pois a declaração anterior está em um outro escopo.
    let task = JSON.parse(localStorage.getItem(key) || "[]"); 
    // pegando o container que vai armazenar as tasks
    let lista = document.querySelector('#to-do');
    // apaga todos os itens filhos da lista, para que ao adicionar novos, não fique repetindo
    lista.replaceChildren()
    // cria um loop que é ativiado toda vez que o comprimento de "c" for menos que a quantidade de elementos de task (localStorage) e cria um <li> para cada elemento.
    for(let c = 0; c < task.length; c++){
        // cria um elemento dinamicamente com JavaScript 
        let li = document.createElement('li');
        // adiciona uma classe as tasks
        li.classList.add('task-item')
        // coloco o elemento dentro um container do HTML
        lista.appendChild(li)
        // escreve nas tasks <li> o valor do nome já armazenados do LocalStorage, o valor do nome é determinado pelo atual icrementação do "c"
        li.innerHTML = `${task[c]['nome']}<button class="check"><img src="./assets/svg/check.svg"></button>`
        }
        // armazeno a classe que foi crianda dinamicamente com JavaScript, é necessário.
    let buttons = document.querySelectorAll('.check');
    // crio um loop que adiciona um evento de click, e pegando a posição atual do elemento com 'index' como argumento.
    buttons.forEach(function(item, index){
        item.addEventListener('click', function(){
            // toda vez que eu clicar no botão, chamará a função. 
            // o ponto chave aqui (que deu mais dificuldade) é os argumentos passados dentro do "remove()". Basicamente tinha um problema, onde eu queria exluir um determinado problema de uma determinada posição, para isso, obviamente, preciso associar de algum forma. A forma que encontrei foi a seguinte: toda vez que eu clicar vai retornar "task" (variável que armazena os valores de LocalStorage) e a índice é determinado pelo o "index", pois a quantidade de botões é igual a quantidade de tasks, senão não seria possível associar. e por fim, pegando o valor do nome da posição determinado pelo o index.
            remover(task[index].nome)
        })
    })
}


// função responsável por remover elementos onde a argumento X é o principal responsável. 
function remover(x){
    // chamando a variável por motivos de escopo
    let task = JSON.parse(localStorage.getItem(key) || "[]");
    // cria um variváel que retorna a posição do primeiro elemento que atingir os requisitos
    let idx = task.findIndex(function(storage){
        // requisito é que o nome armazenado em task seja igual ao nome armazenado no X
        return storage.nome == x
    })
    // remove o elemento da posição retornada
    task.splice(idx, 1)
    // adiciona o array atualizado com o nome removido no LocalStorage
    localStorage.setItem(key, JSON.stringify(task))
    // Atualiza visualmente a página.
    tasks()
}

// adiciona um evento de click ao botão responsável por apagar todos os elementos do LocalStorage.
remove.addEventListener('click', function(){
    // remove todos os itens
    localStorage.removeItem(key);
    // atualiza a página
    tasks()
})


// função que verifica se já existe um elemento com o menos nome do valor de entrada do input.
function validade(){
    // por motivos de escopo...
    let task = JSON.parse(localStorage.getItem(key) || "[]");
    // pegando o valor de tarefa por motivos de escopo 
    let input = document.querySelector('#tarefa').value;
    // retorna o primeiro elemento que atingir os requesitos
    let existe = task.find(function(x){
        // requesitos: que o elemento de task seja igual ao valor do input
        // lembrando que se existir um elemento, retorna um elemento que é o mesmo que "true"
        return x.nome == input
    })
    // se não existir, retorne false, assim seguindo o programa normalmente, caso o contrário mostre o aviso que está mais acima do programa.
    return !existe ? false:true
}

tasks()