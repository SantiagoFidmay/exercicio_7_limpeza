const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const Limpeza = db.define('limpeza',{
    codLimpeza: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false

    },
    
    idCondominio: {
        type: DataTypes.INTEGER,
        references: {
            model: 'condominios',
            key: 'codCondominio'
        },
        allowNull: false
    }
    
},{
    timestamps: false,
    tableName: 'limpezas'
})

module.exports = Limpeza