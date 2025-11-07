import {getConnection} from '../database/database.js';

const createUser = async (req, res) => {
  try {
    const {id,nombre,email,contraseña,tipo_cuenta,saldo } = req.body;
    const data = { id,nombre,email,contraseña,tipo_cuenta,saldo };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO usuarios SET ?", [data]);
    res.json({ message: "Usuario, creado" });
  } catch (err) {
    console.log(err);
  }
};

const obtenerSaldo = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    if (!usuario_id) return res.status(400).json({ error: 'usuario_id es requerido' });

    const conn = await getConnection();
    const [rows] = await conn.query('SELECT saldo FROM usuarios WHERE id = ?', [usuario_id]);
    const saldo = rows[0].saldo;
    return res.status(200).json({ usuario_id, saldo });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener el saldo' });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query( "SELECT id, nombre,email,contraseña,tipo_cuenta,saldo FROM usuarios");
    res.json(result[0]);
  } catch (err) {
    console.log(err);
  }
};

const getTransaccion = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query( "SELECT cuenta_origen_id, cuenta_destino_id, tipo_cuenta, tipo, monto, fecha FROM transacciones");
    res.json(result[0]);
  } catch (err) {
    console.log(err);
  }
};

const getPrestamos  = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query( "SELECT usuario_id, monto_solicitado, monto_pendiente, plazo, estado, fecha_solicitud, fecha_aprobacion FROM prestamos ");
    res.json(result[0]);
  } catch (err) {
    console.log(err);
  }
};

const depositar = async (req, res) => {
  try {
    const { id, monto } = req.body;
    if (!id || !monto) return res.status(400).json({ error: 'id y monto son requeridos' });
    const conn = await getConnection();
    await conn.query('CALL hacer_deposito(?, ?)', [id, monto]);
    res.status(201).json({ message: 'Depósito exitoso' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Operación inválida' });
  }
};

const retirar = async (req, res) => {
  try {
    const { usuario_id, monto } = req.body;
    if (!usuario_id || !monto) return res.status(400).json({ error: 'usuario_id y monto son requeridos' });
    const conn = await getConnection();
    await conn.query('CALL hacer_retiro(?, ?)', [usuario_id, monto]);
    res.status(201).json({ message: 'Retiro exitoso' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Operación inválida' });
  }
};

const transferir = async (req, res) => {
  try {
    const { cuenta_origen_id, cuenta_destino_id, monto } = req.body;
    if (!cuenta_origen_id || !cuenta_destino_id || !monto) {
      return res.status(400).json({ error: 'cuenta_origen_id, cuenta_destino_id y monto son requeridos' });
    }
    const conn = await getConnection();
    await conn.query('CALL hacer_transferencia(?, ?, ?)', [cuenta_origen_id, cuenta_destino_id, monto]);
    res.status(201).json({ message: 'Transferencia exitosa' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Operación inválida' });
  }
};

const solicitarPrestamo = async (req, res) => {
  try {
    const { usuario_id, monto, plazo } = req.body;
    if (!usuario_id || !monto || !plazo) {
      return res.status(400).json({ error: 'usuario_id, monto y plazo son requeridos' });
    }
    const conn = await getConnection();
    await conn.query('CALL solicitar_prestamo(?, ?, ?)', [usuario_id, monto, plazo]);
    res.status(201).json({ message: 'Préstamo solicitado exitosamente' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'No se pudo solicitar el préstamo' });
  }
};

const reporteIngresos = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id es requerido' });
    }
    const conn = await getConnection();
    const [rows] = await conn.query('CALL reporte_ingreso(?)', [usuario_id]);
    const ingresos = rows[0];
    res.status(200).json({ usuario_id, ingresos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'No se pudo generar el reporte de ingresos' });
  }
};

const reporteEgresos = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id es requerido' });
    }
    const conn = await getConnection();
    const [rows] = await conn.query('CALL reporte_egreso(?)', [usuario_id]);
    const egresos = rows[0];
    res.status(200).json({ usuario_id, egresos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'No se pudo generar el reporte de egresos' });
  }
};

const reporteDeuda = async (req, res) => {
  try {
    const { usuario_id } = req.body;
    if (!usuario_id) {
      return res.status(400).json({ error: 'usuario_id es requerido' });
    }
    const conn = await getConnection();
    const [rows] = await conn.query('CALL reporte_deuda(?)', [usuario_id]);
    const deudas = rows[0];
    res.status(200).json({ usuario_id, deudas });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'No se pudo generar el reporte de deudas' });
  }
};


export const methodsUsers ={
    createUser,
    getUsuarios,
    getTransaccion,
    getPrestamos,
    solicitarPrestamo,
    depositar,
    retirar,
    transferir,
    reporteIngresos,
    reporteEgresos,
    reporteDeuda,
    obtenerSaldo
}