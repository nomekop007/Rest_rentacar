class EmpresaRemplazoController {

    constructor({ EmpresaRemplazoRepository, sendError }) {
        this._serviceEmpresaRemplazo = EmpresaRemplazoRepository;
        this.sendError = sendError;
    }


    async getEmpresasRemplazo(req, res) {
        try {
            const empresasRemplazo = await this._serviceEmpresaRemplazo.getFindAll();
            res.json({
                success: true,
                data: empresasRemplazo,
            });
        } catch (error) {
            this.sendError(error, req, res);
        }
    }


}

module.exports = EmpresaRemplazoController;