const jwt = require('jsonwebtoken')

function verificarToken(request, response, next) {
    const token = request.header('Authorization')

    if(!token) return response.status(401).json({message: "Acesso negado"})

    try {
        const decodificar = jwt.verify(token, 'Titos@2025!')
        request.id = decodificar.id
        next()
    } catch (error) {
        response.status(401).json({message: "Token inválido"})
    }
}

module.exports = verificarToken