import {getConnection} from '../database/database.js';

const createUser = async (req, res) => {
  try {
    const {nombre,email,contraseña,numero_cuenta,tipo,saldo } = req.body;
    const data = { nombre,email,contraseña,numero_cuenta,tipo,saldo };
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
    const result = await connection.query( "SELECT nombre,email,contraseña,numero_cuenta,tipo,saldo FROM usuarios");
    res.json(result[0]);
  } catch (err) {
    console.log(err);
  }
};


const createTransaccion = async (req, res) => {
  try {
    const {cuenta_id,tipo,monto,fecha } = req.body;
    const data = { cuenta_id,tipo,monto,fecha };
    const connection = await getConnection();
    const result = await connection.query("INSERT INTO transacciones SET ?", [data]);
    res.json({ message: "Transaccion Exitosa (～￣▽￣)～" });
  } catch (err) {
    console.log(err);
  }
};

const getTransaccion = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query( "SELECT cuenta_id,tipo,monto,fecha FROM transacciones");
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








export const methodsUsers ={
    createUser,
    getUsuarios,
    createTransaccion,
    getTransaccion,
    createPrestamos,
    getPrestamos,
    createReportes,
    getReportes
}