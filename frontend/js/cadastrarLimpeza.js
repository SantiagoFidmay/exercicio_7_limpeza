const token = localStorage.getItem('token')

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()

    const descricao = document.getElementById('descricao').value
    const categoria = document.getElementById('categoria').value
    const quantidade = Number(document.getElementById('quantidade').value)
    const lote = document.getElementById('lote').value
    const idCondominio = Number(document.getElementById('idCondominio').value)

    const valores = {
        descricao: descricao,
        categoria: categoria,
        quantidade: quantidade,
        lote: lote,
        idCondominio: idCondominio
    }

    fetch(`http://localhost:3000/limpeza`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
        .then(dados =>{
            resposta.innerHTML = ``
            resposta.innerHTML += `<p>${dados.message}</p>`
        })
        .catch((err)=>{
            console.error('Erro ao cadastrar',err)
        })
})

    