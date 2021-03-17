class LogService {

    constructor({ LogBusiness }) {
        this._logBusiness = LogBusiness;
    }

    async registrarLog(log) {
        return await this._logBusiness.registrarLog(log);
    }

    async registrarLogError(logError) {
        return await this._logBusiness.registrarLogError(logError);
    }

}

module.exports = LogService;