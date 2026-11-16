const token = localStorage.getItem('token')

const resposta = document.getElementById('resposta')
const btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click',(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const cpf = document.getElementById('cpf').value

    const valores = {
        nome: nome,
        email: email,
        senha: senha,
        cpf: cpf
    }

    fetch(`http://localhost:3000/condominio`,{
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

    