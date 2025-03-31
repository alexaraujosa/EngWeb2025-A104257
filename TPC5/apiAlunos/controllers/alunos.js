var Aluno = require("../models/aluno");

module.exports.list = () => {
    return Aluno.find().sort({nome: 1}).exec(); 
}

module.exports.findById = id => {
    return Aluno.findOne({_id: id}).exec();
}

module.exports.insert = aluno => {
    if (Aluno.find({_id: aluno._id}).exec().length != 1) {
        let newAluno = new Aluno(aluno);
        return newAluno.save();
    }
}

module.exports.update = (id, aluno) => {
    return Aluno.findByIdAndUpdate(id, aluno).exec();
}

module.exports.delete = id => {
    return Aluno.findByIdAndDelete({_id: id}).exec();
}

module.exports.inverteTpc = (id, idTpc) => {
    Aluno.findOne({_id: id}).exec().then( aluno => {
        let tpc = `tpc${idTpc}`;
        if (aluno[tpc]) {
            aluno[tpc] = !aluno[tpc];
        } else {
            aluno[tpc] = true;
        }

        return Aluno.findByIdAndUpdate(id, aluno).exec();
    })
}