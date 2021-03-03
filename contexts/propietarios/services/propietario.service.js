class PropietarioService {

    constructor({ PropietarioBusiness }) {
        this._propietarioBusiness = PropietarioBusiness;
    }

    async getPropietario() {
        return this._propietarioBusiness.getPropietario();
    }

}

module.exports = PropietarioService;