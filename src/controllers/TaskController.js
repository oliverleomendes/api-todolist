const database = require('../database/connection')

class TaskController {

    //Inserção de novas tarefas
    novaTarefa(request, response){
        const { tarefa, descricao, responsavel } = request.body

        database.insert({ tarefa, descricao, responsavel }).table('tasks').then(data => {
            console.log(data)
            response.json({message: "Tarefa criada com sucesso !"})
        }).catch(error => {
            console.log(error)
        })
    }

    listarTarefas(request, response){
        database.select("*").table("tasks").then(tarefas => {
            response.json(tarefas)
        }).catch(error => {
            console.log(error)
        })
    }

    listarUmaTarefa(request, response){
        //const id = request.params.id
        const { id } = request.params

        database.select("*").table("tasks").where({id: id}).then(tarefa => {
            response.json(tarefa)
        }).catch(error => {
            console.log(error)
        })
    }

    atualizarTarefa(request, response){
        const { id } = request.params
        const { descricao } = request.body

        database.where({id: id}).update({descricao: descricao}).table("tasks").then(data => {
            response.json({message: "Tarefa atualizada com sucesso !"})
        }).catch(error => {
            console.log(error)
        })
    }

    removerTarefa(request, response){
        const { id } = request.params

        database.where({id: id}).del().table("tasks").then(data => {
            response.json({message: "Tarefa excluída com sucesso !"})
        }).catch(error => {
            console.log(error)
        })
    }

}

module.exports = new TaskController()