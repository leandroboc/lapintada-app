const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function testUserCreation() {
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
    
    // Verificar si el usuario existe
    const [users] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = 'admin@transporteslibertador.com' OR email = 'admin@transporteslibertador.com'"
    );
    
    console.log('Usuarios encontrados:', users.length);
    
    if (users.length === 0) {
      console.log('Creando usuario administrador...');
      
      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      // Insertar usuario
      await connection.execute(
        "INSERT INTO usuarios (nombre, email, dni, password, rol) VALUES (?, ?, ?, ?, ?)",
        ['Admin Contador', 'admin@transporteslibertador.com', '12345678', hashedPassword, 'contador']
      );
      
      console.log('Usuario creado exitosamente');
    } else {
      console.log('Usuario ya existe:', users[0]);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) await connection.end();
  }
}

testUserCreation();