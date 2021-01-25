const router = require('express').Router();
const ReservaController = require('../../controllers/reserva.controller');
const reserva = new ReservaController();

router.get('/cargarReservas', reserva.getReservas.bind(reserva));

router.get('/buscarReserva/:id', reserva.findReserva.bind(reserva));

router.post('/registrarReserva', reserva.createReserva.bind(reserva));

router.put('/editarReserva/:id', reserva.updateReserva.bind(reserva));

router.delete('/eliminarReserva/:id', reserva.deleteReserva.bind(reserva));

module.exports = router;