const database = require('../database/connection')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {

    async cadastrarUsuario(request, response){
        const {nome, email, senha, situacao} = request.body

        const senhaSegura = await bcrypt.hash(senha, 10)

        database.insert({nome, email, senha: senhaSegura, situacao}).table("users").then(data => {
            response.json({message: "Usuário cadastrado com sucesso !"})
        }).catch(error => {
            console.log(error)
        })
    }

    autenticarUsuario(request, response){
        const {email, senha} = request.body

        database.select('*').where({email: email}).table("users").then(async usuario => {
            if(!usuario[0])
                response.status(401).json({message: "Autenticação falhou !"})
            
            const validarSenha = await bcrypt.compare(senha, usuario[0].senha)
            if(!validarSenha)
                response.status(401).json({message: "Autenticação falhou !"})
               
            const token = jwt.sign({id: usuario[0].id}, 'Titos@2025!', {
                expiresIn: '1h'
            })
            response.status(200).json({cod: 0, token})
                

        }).catch(error => {
            console.log(error)
        })
    }

    listarUsuarios(request, response) {
        database.select('*').table('users').then(usuarios => {
            response.status(200).json({usuarios})
        }).catch(error => {
            console.log(error)
        })
    }

    listarUmUsuario(request, response){
        const { id } = request.params

        database.where({ id: id }).select('*').table('users').then(usuario => {
            response.status(200).json({usuario})
        }).catch(error => {
            console.log(error)
        })
    }

    atualizarUsuario(request, response){
        const { id } = request.params
        const { emai, nome } = request.body

        database.where({ id_usuario: id }).update({ nome: nome, email: emai }).table('users').then(usuario => {
            response.status(200).json({message: "Usuário atualizado com sucesso!"})
        }).catch(error => {
            console.log(error)
        })
    }

    removerUsuario(request, response){
        const { id } = request.params

        database.where({id: id}).del().table('users').then(usuario => {
            response.status(200).json({message: "Usuário deletado com sucesso!"})
        }).catch(error => {
            console.log(error)
        })
    }

    async redefinirSenha(request, response){
        const { id } = request.params
        const { senha } = request.body

        const senhaSegura = await bcrypt.hash(senha, 10)

        database.where({ id_usuario: id }).update({ senha: senhaSegura }).table('users').then(usuario => {
            response.json({message: "Senha atualizada com sucesso!"})
        }).catch(error => {
            console.log(error)
        })
    }
}

module.exports = new UserController()