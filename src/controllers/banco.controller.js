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

const createPrestamos  = async (req, res) => {
  try {
    const {usuario_id,monto,plazo,estado,fecha_solicitud } = req.body;
    const data = {usuario_id,monto,plazo,estado,fecha_solicitud };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO prestamos  SET ?", [data]);
    res.json({ message: "Prestamo Exitoso " });
  } catch (err) {
    console.log(err);
  }
};

const getPrestamos  = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query( "SELECT usuario_id,monto,plazo,estado,fecha_solicitud FROM prestamos ");
    res.json(result[0]);
  } catch (err) {
    console.log(err);
  }
};


const createReportes = async (req, res) => {
  try {
    const {usuario_id,historico_ingresos,historico_egresos,deudas } = req.body;
    const data = {usuario_id,historico_ingresos,historico_egresos,deudas };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO reportes SET ?", [data]);
    res.json({ message: "Reporte Generado" });
  } catch (err) {
    console.log(err);
  }
};

const getReportes = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query( "SELECT usuario_id,historico_ingresos,historico_egresos,deudas FROM reportes");
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

const reporteFinanciero = async (req, res) => {
  try {
    const usuarioId = Number(req.params.usuarioId);
    if (!usuarioId) return res.status(400).json({ error: 'usuarioId inválido' });
    const conn = await getConnection();
    const [[rows]] = await conn.query('CALL reporte_financiero(?)', [usuarioId]);
    // MySQL retorna resultados de CALL como matrices; tomamos la primera fila
    res.json(rows?.[0] || { ingresos: 0, egresos: 0, deudas: 0 });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'No se pudo generar el reporte' });
  }
};



export const methodsUsers ={
    createUser,
    getUsuarios,
    // createTransaccion,
    getTransaccion,
    createPrestamos,
    getPrestamos,
    createReportes,
    getReportes,
    depositar,
    retirar,
    transferir,
    reporteFinanciero
}