class RegionBusiness {

    constructor({ RegionRepository }) {
        this._regionRepository = RegionRepository;
    }

    async getRegiones() {
        const regiones = await this._regionRepository.getFindAll();
        return regiones;
    }


}
module.exports = RegionBusiness;