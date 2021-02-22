class ClienteRepository {

    constructor({ db }) {
        this._db = db;
    }

    getFindAll() {
        this._db.cliente.findAll();
    }

    getFindByPk(ID) {
        this._db.cliente.findByPk(ID);
    }

    getFindOne(ID) {
        this._db.cliente.findOne({
            where: { rut_cliente: ID },
            include: [{ model: this._db.documentoCliente, attributes: ["carnetFrontal", "carnetTrasera", "comprobanteDomicilio"] }]
        })
    }

    postFindOrCreate(DATA, ID) {
        this._db.cliente.findOrCreate({
            where: { rut_cliente: ID },
            defaults: DATA,
        });
    }

    putUpdate(DATA, ID) {
        this._db.cliente.update(DATA, {
            where: { rut_cliente: ID },
        });
    }

}

module.exports = ClienteRepository;