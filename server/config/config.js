const config = {
    env: process.env.NODE_ENV || 'development',
    port: 3001,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    db_name : "petDB",
    db_username : "postgres",
    db_password: "admin",
    URL_DOMAIN : '/api',
    URL_IMAGE : 'http://localhost:3001/pet/api/pet/images/',
    URL_API : '/pet/api',
    UPLOAD_DIR : '/storages'
  }
  
export default config
