 module.exports = {
        PORT: process.env.PORT,
        DB: {
          DB_HOST: process.env.PGHOST,
          DB_USER: process.env.PGUSER,
          DB_DATABASE: process.env.PGDATABASE,
          DB_PASSWORD: process.env.PGPASSWORD,
          DB_PORT: process.env.PGPORT
        },
        SESS_NAME: process.env.SESS_NAME,
        
      }