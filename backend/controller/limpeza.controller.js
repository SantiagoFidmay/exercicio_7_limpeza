const Limpeza = require('../models/Limpeza')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.descricao || !valores.categoria || !valores.quantidade || !valores.lote || !valores.idCondominio){
        return res.status(400).json({message: "Todos os campos são obrigatórios!"})
    }

    try {
        const loteCripto = cryptoJs.AES.encrypt(String(valores.lote), CHAVE_SECRETA).toString()

        await Limpeza.create({
            descricao: valores.descricao,
            categoria: valores.categoria,
            quantidade: valores.quantidade,
            lote: loteCripto,
            idCondominio: valores.idCondominio
        })

        return res.status(201).json({message: "Dados cadastrados com sucesso!"})

    } catch (err) {
        console.error('Erro ao cadastrar', err)
        return res.status(500).json({message: "Erro ao cadastrar"})
    }
}

const listar = async(req,res)=>{
    try {
        const limpezas = await Limpeza.findAll()
        return res.status(200).json(limpezas.map((limpeza)=> ({
            codLimpeza: limpeza.codLimpeza,
            descricao: limpeza.descricao,
            categoria: limpeza.categoria,
            quantidade: limpeza.quantidade,
            idCondominio: limpeza.idCondominio,
        })))
    } catch (err) {
        console.error('Erro ao listar limpezas', err)
        return res.status(500).json({message: 'Erro ao listar limpezas'})
    }
}

module.exports = {cadastrar, listar}