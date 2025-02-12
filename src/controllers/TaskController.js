const database = require('../database/connection')

class TaskController {

    //Inserção de novas tarefas
    novaTarefa(request, response){
        const { tarefa, descricao, responsavel } = request.body

        database.insert({ tarefa, descricao, responsavel }).table('tasks').then(data => {
            response.status(201).json({message: "Tarefa criada com sucesso !"})
        }).catch(error => {
            response.status(500).json({message: "Erro ao cadastrar tarefa"})
        })
    }

    listarTarefas(request, response){
        database.select("*").table("tasks").then(tarefas => {
            response.status(200).json(tarefas)
        }).catch(error => {
            response.status(500).json({message: "Erro ao obter a lista de tarefas"})
        })
    }

    listarUmaTarefa(request, response){
        //const id = request.params.id
        const { id } = request.params

        database.select("*").table("tasks").where({id: id}).then(tarefa => {
            response.status(200).json(tarefa)
        }).catch(error => {
            response.status(500).json({message: "Erro ao obter dados da tarefa"})
        })
    }

    atualizarTarefa(request, response){
        const { id } = request.params
        const { descricao } = request.body

        database.where({id: id}).update({descricao: descricao}).table("tasks").then(data => {
            response.status(200).json({message: "Tarefa atualizada com sucesso !"})
        }).catch(error => {
            response.status(500).json({message: "Erro ao atualizar tarefa"})
        })
    }

    removerTarefa(request, response){
        const { id } = request.params

        database.where({id: id}).del().table("tasks").then(data => {
            response.status(200).json({message: "Tarefa excluída com sucesso !"})
        }).catch(error => {
            response.status(500).json({message: "Erro ao remover tarefa"})
        })
    }

}

module.exports = new TaskController()