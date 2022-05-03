 module.exports = {
        PORT: process.env.PORT,
        SALT_ROUNDS: process.env.SALT_ROUNDS,
        DB: {
          DB_HOST: process.env.PGHOST,
          DB_USER: process.env.PGUSER,
          DB_DATABASE: process.env.PGDATABASE,
          DB_PASSWORD: process.env.PGPASSWORD,
          DB_PORT: process.env.PGPORT
        },
        SESS_NAME: process.env.SESS_NAME,
        SESS_SECRET: process.env.SESS_SECRET,
        JWT_SECRET: process.env.JWT_SECRET,
        SESSION_EXPIRY: process.env.SESSION_EXPIRY,
        
      }