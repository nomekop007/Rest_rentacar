const router = require('express').Router();
module.exports = ({ ReservaController }) => {

    router.get('/cargarReservas', ReservaController.getReservas.bind(ReservaController));
    router.get('/buscarReserva/:id', ReservaController.findReserva.bind(ReservaController));
    router.post('/registrarReserva', ReservaController.createReserva.bind(ReservaController));
    router.put('/editarReserva/:id', ReservaController.updateReserva.bind(ReservaController));
    router.delete('/eliminarReserva/:id', ReservaController.deleteReserva.bind(ReservaController));

    return router;
}
