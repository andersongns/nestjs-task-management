export default {
    mode: process.env.NODE_ENV,
    port: Number(process.env.PORT) || 3000,
    database: {
        host: process.env.DB_HOST||'127.0.0.1',
        port: Number(5432) || 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'task-management',
    }
}