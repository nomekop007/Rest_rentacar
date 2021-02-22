class ClienteRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        return this._db.cliente.findAll();
    }

    getFindByPk(ID) {
        return this._db.cliente.findByPk(ID);
    }

    getFindOne(ID) {
        return this._db.cliente.findOne({
            where: { rut_cliente: ID },
            include: [{ model: this._db.documentoCliente, attributes: ["carnetFrontal", "carnetTrasera", "comprobanteDomicilio"] }]
        })
    }

    postFindOrCreate(DATA, ID) {
        return this._db.cliente.findOrCreate({
            where: { rut_cliente: ID },
            defaults: DATA,
        });
    }

    putUpdate(DATA, ID) {
        return this._db.cliente.update(DATA, {
            where: { rut_cliente: ID },
        });
    }

}

module.exports = ClienteRepository;