class EmpresaRemplazoBusiness {

    constructor({ EmpresaRemplazoRepository, RemplazoRepository ,TarifasEmpresasReemplazoRepository}) {
        this._remplazoRepository = RemplazoRepository;
        this._empresaRemplazoRepository = EmpresaRemplazoRepository;
        this._tarifasEmpresasReemplazoRepository =TarifasEmpresasReemplazoRepository;
    }

    async getEmpresasRemplazo() {
        const empresasRemplazo = await this._empresaRemplazoRepository.getFindAll();
        return empresasRemplazo;
    }

    async createRemplazo(remplazo) {
        const remplazoRepo = await this._remplazoRepository.postCreate(remplazo);
        return remplazoRepo;
    }

    async createTarifaEmpresaReemplazo(tarifa) {

        console.log(tarifa);
        const remplazoRepo = await this._tarifasEmpresasReemplazoRepository.postCreate(tarifa);
        // return remplazoRepo;
        return
    }


}

module.exports = EmpresaRemplazoBusiness;