module.exports = {
    db: {
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "grupo-15",
        password: process.env.DB_PASSWORD || "web-app",
        database: process.env.DB_NAME || "LaboratorioPatito",
    },
};
