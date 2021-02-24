class LogBusiness {

    constructor({ LogRepository, LogErrorRepository }) {
        this._logRepository = LogRepository;
        this._logErrorRepository = LogErrorRepository;
    }

    async registrarLog(log) {
        return await this._logRepository.postCreate(log);
    }

    async registrarLogError(logError) {
        return await this._logErrorRepository.postCreate(logError);
    }

}

module.exports = LogBusiness;