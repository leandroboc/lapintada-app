const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function testLoginAPI() {
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transportes_libertador',
    port: 3306,
  };

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const usuario = 'admin@transporteslibertador.com';
    const password = 'admin123';
    
    console.log('Intentando login con:', usuario);
    
    // Query the database
    const sql = "SELECT id, nombre, email, dni, password, rol FROM usuarios WHERE email = ? OR dni = ?"
    const [rows] = await connection.execute(sql, [usuario.trim(), usuario.trim()]);
    
    console.log('Filas encontradas:', rows.length);
    
    if (rows.length === 0) {
      console.log('Usuario no encontrado');
      return;
    }
    
    const user = rows[0];
    console.log('Usuario encontrado:', user.email);
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Contraseña válida:', isValidPassword);
    
    if (isValidPassword) {
      console.log('✅ LOGIN EXITOSO');
      console.log('Token would be:', Buffer.from(`${user.id}:${user.rol}:${Date.now()}`).toString('base64'));
    } else {
      console.log('❌ CONTRASEÑA INCORRECTA');
      
      // Test con diferentes contraseñas comunes
      const testPasswords = ['admin123', 'password', '123456', 'admin'];
      for (const testPass of testPasswords) {
        const test = await bcrypt.compare(testPass, user.password);
        if (test) {
          console.log(`Contraseña correcta es: ${testPass}`);
          break;
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) await connection.end();
  }
}

testLoginAPI();