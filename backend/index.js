const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')
require('./models/rel')

// const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const limpezaController = require('./controller/limpeza.controller')
const condominioController = require('./controller/condominio.controller')
const funcionarioController = require('./controller/funcionario.controller')
const movimentoController = require('./controller/movimento.controller')

// ------------ Middleware ------------
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

// ----- Rotas Públicas ----

app.post('/funcionario',funcionarioController.cadastrar)
app.post('/login', authController.login)


// app.use(authMiddleware)

//---- rotas Privadas ----

app.post('/condominio',condominioController.cadastrar)
app.get('/fornecedor/buscarNome/:nome',condominioController.consultarNome)
app.get('/condominio/:id', condominioController.consultarID)
app.delete('/condominio/:id',condominioController.apagar)

app.post('/limpeza',limpezaController.cadastrar)


app.post('/movimento',movimentoController.cadastrar)

app.get('/',(req,res)=>{
    res.status(200).json({message: "Aplicação rodando!"})
})

// --------- Sincronizando o servidor com o banco de dados -----

conn.sync()
    .then(()=>{
        app.listen(PORT,hostname, ()=>{
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Erro ao conectar com o banco de dados!',err)

    })