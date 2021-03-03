class RegionService {

    constructor({ RegionBusiness }) {
        this._regionBusiness = RegionBusiness;
    }

    async getRegiones() {
        return await this._regionBusiness.getRegiones();
    }

}

module.exports = RegionService;