var Contratos = require("../models/contratos");

module.exports.getContratos = () => {
    return Contratos
            .find()
            .exec();
}

module.exports.getContratoById = id => {
    return Contratos
            .findById(id)
            .exec();
    
    /*
    return Contratos
            .findOne({_id = id})
            .exec();
    */
}

module.exports.getContratosByEntidade = entidade => {
    return Contratos
            .find({"entidade_comunicante": entidade})
            .exec();
}

module.exports.getContratosByEntidadeNIPC = entidadeNIPC => {
    return Contratos
            .find({"NIPC_entidade_comunicante" : entidadeNIPC})
            .exec();
}

module.exports.getContratosByTipo = tipo => {
    return Contratos
            .find({"tipoprocedimento": tipo})
            .exec();
}

module.exports.getTipos = () => {
    return Contratos
            .find()
            .distinct("tipoprocedimento")
            .sort("tipoprocedimento")
            .exec();
}

module.exports.getEntidades = () => {
    return Contratos
            .find()
            .distinct("entidade_comunicante")
            .sort("entidade_comunicante")
            .exec();
}

module.exports.insert = contr => {
    let contrToSave = new Contratos(contr);
    return contrToSave.save();
}

module.exports.update = (contr, id) => {
    return Contratos
            .findByIdAndUpdate(id, contr, {new: true})  // O new devolve o objeto antes de ser atualizado
            .exec();
}

module.exports.delete = id => {
    return Contratos
            .findByIdAndDelete(id, {new: true})  // O new devolve o objeto antes de ser atualizado
            .exec();
}