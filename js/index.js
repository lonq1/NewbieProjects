const listaDeProdutos = document.querySelector('.lista-produtos')
const carrinhoLista = document.querySelector('.carrinho-itens')
const quantidadeItensCarrinho = document.querySelector('.quantidade-carrinho')
const valorItensCarrinho = document.querySelector('.total-carrinho')
const inputPesquisa = document.querySelector('input')
const botaoPesquisa = document.querySelector('.pesquisar-botao')

let itensCarrinho = [];

function criarCardProdutos (produtos) {
    listaDeProdutos.innerHTML = ''

    produtos.forEach((produto) => {      
        let li = document.createElement('li')
        li.innerHTML = `
            <figure>
                <img src="${produto.img}" alt="${produto.nameItem}">
            </figure>
            <div>
                <span class="categoria-produto">${produto.tag[0]}</span>
                <h2>${produto.nameItem}</h2>
                <p>${produto.description}</p>
                <p class="preco-item">R$ ${String(produto.value.toFixed(2)).replace('.',',')}</p>
                <button id="${produto.id}" class="adicionar-carrinho-botao">Adicionar ao carrinho</button>
            </div>`
            li.classList.add('produto-descricao')
            listaDeProdutos.appendChild(li);
            
    });
    inputPesquisa.focus()
    
}
criarCardProdutos(data)

//CARRINHO
listaDeProdutos.addEventListener('click', (event) => { 
    if(event.target.tagName === 'BUTTON') {
        let idProduto = event.target.id
        console.log(idProduto)
        let produto = data.find((produto) => {
            if(produto.id == idProduto) {
                return produto
            }
        })
        itensCarrinho.push(produto)
        listarNoCarrinho()
        inputPesquisa.focus()
    }
})

function listarNoCarrinho() { 
    carrinhoLista.innerHTML = ''

    for(let i = 0; i < itensCarrinho.length; i++) {
        let li = document.createElement('li')
        li.classList.add('produto-carrinho')
        li.innerHTML = `
        <figure>
            <img src="${itensCarrinho[i].img}" alt="${itensCarrinho[i].nameItem}">
        </figure>
        <div>
            <h3>${itensCarrinho[i].nameItem}</h3>
            <p>R$ ${String(itensCarrinho[i].value.toFixed(2)).replace('.',',')}</p>
            <button id=${i} class = carrinho-botao >Remover produto</button>
        </div>`
        carrinhoLista.append(li)  
    }
    if(itensCarrinho.length === 0) {
        carrinhoLista.innerHTML = `
        <div class="carrinho-vazio">
            <h3>Carrinho Vazio</h3>
            <p>Adicione itens</p>
        </div>`
    }   
    inputPesquisa.focus()
    valorCarrinho()
}

function valorCarrinho () {
    let total = 0;
    let quantidade = 0;
    
    itensCarrinho.forEach(produto => {
        total += produto.value
        quantidade++
    });

    quantidadeItensCarrinho.innerHTML = `
    <span>Quantidade:</span>
    <span class="quantidade-valor">${quantidade}</span>`

    valorItensCarrinho.innerHTML = `
    <span>Total:</span>
    <span class="total-valor">R$ ${String(total.toFixed(2)).replace('.',',')}</span>`   
}

carrinhoLista.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON') {
        let idProduto = event.target.id
        itensCarrinho.splice(idProduto, 1)
       listarNoCarrinho()    
    }
})

//BUSCA


inputPesquisa.addEventListener('keyup', filtrarUsandoEnter)
botaoPesquisa.addEventListener('click', filtrarUsandoClick)

function adicionandoCategoriaTodos(produtos) {
    produtos.forEach(produto => {
        produto.tag.push('Todos')
    });
}
adicionandoCategoriaTodos(data)

function filtrarUsandoClick () {
    let pesquisarUser = inputPesquisa.value
    let resultado = buscarItem(pesquisarUser)
    criarCardProdutos(resultado)
    inputPesquisa.value = ''
    inputPesquisa.focus()
    
}

function filtrarUsandoEnter (event) {
    if(event.keyCode == 13) {
        let pesquisaUser = inputPesquisa.value
        let resultado = buscarItem(pesquisaUser)
        inputPesquisa.value = ''
        criarCardProdutos(resultado)     
    }
}

function buscarItem(valorPesquisa) {
    let resultadoBusca = [];

    data.forEach(produto => {
        let pesquisa = valorPesquisa.toLowerCase().trim()
        let nomeProduto = produto.nameItem.toLowerCase().trim()
        let categoriaProduto = produto.tag[0].toLowerCase().trim()
        if(nomeProduto.includes(pesquisa) || categoriaProduto.includes(pesquisa)) {
            resultadoBusca.push(produto)
        }
    });

    return resultadoBusca
}

//FILTRO CATEGORIA

const navMenu = document.querySelector('nav');
const categoriaSpan = document.querySelector('.categoria-produto')

navMenu.addEventListener('click', filtrarLink)

function filtrarLink (event) {
    let resultadoLink = [];
    if(event.target.tagName === 'A') {
        listaDeProdutos.innerHTML = ''
        let link = event.target.innerText
        for(let i = 0; i < data.length; i++) {
            if(data[i].tag.includes(link)) {
                resultadoLink.push(data[i])
            }
        }

        for (let i = 0; i < navMenu.children.length; i++) {   
            if(navMenu.children[i].className.includes('focoMenuNavegacao')) {
                navMenu.children[i].classList.remove('focoMenuNavegacao')
            } 
        }
        event.target.classList.add('focoMenuNavegacao')

        if(resultadoLink.length === 0) {
            let notificacao = document.createElement('h2')
            notificacao.innerText = `Não encontramos produtos nessa categoria`
            notificacao.classList.add('sem-produtos')
            listaDeProdutos.append(notificacao)
        }   else {
            criarCardProdutos(resultadoLink)
        }
        inputPesquisa.focus()
    }
}