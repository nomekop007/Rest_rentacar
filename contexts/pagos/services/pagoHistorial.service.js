
class PagoHistorialService {

    constructor({ PagoHistorialRepository }) {
        this.pagoHistorialRepository = PagoHistorialRepository;
    }

    async createPagoHistorial(PagoHistorial, idArriendo) {
        return this.pagoHistorialRepository.createPagoHistorial(PagoHistorial, idArriendo);
    }

    async mostrarPagosHistorial(idArriendo) {
        return this.pagoHistorialRepository.mostrarPagosHistorial(idArriendo);
    }


}

module.exports = PagoHistorialService;