class PropietarioBusiness {

    constructor({ PropietarioRepository }) {
        this._propietarioRepository = PropietarioRepository;
    }

    async getPropietario() {
        const propietario = await this._propietarioRepository.getFindAll();
        return propietario;
    }

}

module.exports = PropietarioBusiness;