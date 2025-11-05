import {Router} from 'express';
import { methodsUsers } from '../controllers/banco.controller.js';
const router = Router();


router.post("/usuarios", methodsUsers.createUser);
router.get('/usuarios', methodsUsers.getUsuarios);
router.get('/transacciones', methodsUsers.getTransaccion);
router.post('/transacciones/depositar', methodsUsers.depositar);
router.post('/transacciones/retirar', methodsUsers.retirar);
router.post('/transacciones/transferir', methodsUsers.transferir);
router.post("/prestamos", methodsUsers.createPrestamos);
router.get('/prestamos', methodsUsers.getPrestamos);
router.get('/reportes', methodsUsers.reporteFinanciero);

export default router;