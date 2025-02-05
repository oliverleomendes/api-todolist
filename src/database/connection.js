let knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'todo_list_uc14'
    }
})

module.exports = knex