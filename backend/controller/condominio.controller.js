const Condominio = require('../models/Condominio')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha || !valores.cpf){
        return res.status(200).json({message: "Todos os campos são obrigatóriso!"})
    }

    try {
        const senhaCripto = cryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

    await Condominio.create({
        nome: valores.nome,
        email: valores.email,
        senha: senhaCripto,
        cpf: cpfCripto
    })

    return res.status(201).json({message: "Dados cadastrados com sucesso!"})

    } catch (err) {
        console.error('Erro ao cadastrar')
        return res.status(500).json({message: "erro ao cadastrar"})
    }
    
}

const consultarID = async(req,res)=>{
    const id = req.params.id

    try {

        const condominio = await Condominio.findByPk(id)
        if(!condominio){
            return res.status(404).json({message: "Condominio não encotnrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(condominio.cpf, CHAVE_SECRETA)
        const cpfCripto = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: condominio.nome,
            email: condominio.email,
            cpf: cpfCripto
        })

    } catch (err) {
        console.error('Erro ao consultar ')
        return res.status(500).json({message: "erro ao consultar "})
    }
}

const consultarNome = async(req,res)=>{
    const nome = req.params.nome

    try {

        const condominio = await Condominio.findOne({where: {nome: nome}})
        if(!condominio){
            return res.status(404).json({message: "Condominio não encotnrado!"})
        }

        const bytes = cryptoJs.AES.decrypt(condominio.cpf, CHAVE_SECRETA)
        const cpfCripto = bytes.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            nome: condominio.nome,
            email: condominio.email,
            cpf: cpfCripto
        })

    } catch (err) {
        console.error('Erro ao consultar ')
        return res.status(500).json({message: "erro ao consultar "})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id

    try {
        const condominio = await Condominio.findByPk(id)
        if(!condominio){
            return res.status(404).json({message: "Condominio não encotnrado!"})
        }

        await Condominio.destroy({where: {codCondominio: id}})
        return res.status(200).json({message: "Dados excluidos com sucesso!"})
        
    } catch (err) {
        console.error('Erro ao apagar ')
        return res.status(500).json({message: "erro ao apagar "})
    }
}

const listar = async(req,res)=>{
    try {
        const condominios = await Condominio.findAll()
        return res.status(200).json(condominios.map((condominio)=> ({
            codCondominio: condominio.codCliente,
            nome: condominio.nome,
            cpf: cryptoJs.AES.decrypt(condominio.cpf, CHAVE_SECRETA).toString(cryptoJs.enc.Utf8),
            email: condominio.email
        })))
    } catch (err) {
        console.error('Erro ao listar condominios', err)
        return res.status(500).json({message: 'Erro ao listar condominios'})
    }
}

module.exports = {cadastrar, consultarID, consultarNome, apagar, listar}