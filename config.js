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
        GOOGLE: {
          CLIENT_ID: process.env.CLIENT_ID,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
          CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
        },
        
      }