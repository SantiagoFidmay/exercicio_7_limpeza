const Condominio = require('./Condominio')
const Funcionario = require('./Funcionario')
const Limpeza = require('./Limpeza')
const Movimento = require('./Movimento')


Condominio.hasMany(Limpeza,{
    foreignKey: 'idCondominio',
    as: 'limpezaCondominio',
    onDelete: 'CASCADE'
})

Limpeza.belongsTo(Condominio,{
    foreignKey: 'idCondominio',
    as: 'condominioLimpeza',
    allowNull: false
})

Limpeza.hasMany(Movimento,{
    foreignKey: 'idLimpeza',
    as: 'movimentoLimpeza',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Limpeza,{
    foreignKey: 'idLimpeza',
    as: 'movimentoLimpeza',
    allowNull: false
})

module.exports = {Condominio, Funcionario, Limpeza, Movimento}