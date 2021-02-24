class LogService {

    constructor({ LogBusiness, LogErrorBusiness }) {
        this._logBusiness = LogBusiness;
        this._logErrorBusiness = LogErrorBusiness;
    }

    async registrarLog(log) {
        return await this._logBusiness.registrarLog(log);
    }

    async registrarLogError(logError) {
        return await this._logBusiness.registrarLogError(logError);
    }

}

module.exports = LogService;