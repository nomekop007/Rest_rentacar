
class StartUp {

    constructor({ server }) {
        this._server = server;
    }

    async start() {
        switch (process.env.NODE_ENV) {
            case 'production':
                await this._server.startProd();
                break;
            case 'testing':
                await this._server.startProd();
                break;
            default:
                await this._server.startDev();
                break;
        }
    }

}


module.exports = StartUp;