module.exports = {
    dialect: 'postgres', 
    host: 'localhost',
    port: 5435,
    username: 'admin',
    password: '1234',
    database: 'nodesequelize',
    define: {
        timestamps: true,
        underscored: true,
    }
}