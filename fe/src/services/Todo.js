import { ApiService } from "./api.config";

export const GetAllToDo = async () => {
    return ApiService.get('todo')
    .then( response => response.data )
    .catch( response => response.response )
}

export const GuardarToDo = async (todo) => {
    return ApiService.post('todo/guardar', todo)
    .then( response => response.data )
    .catch( response => response.response )
}

export const EditarToDo = async (todo) => {
    return ApiService.put('todo/editar', todo)
    .then( response => response.data )
    .catch( response => response.response )
}

export const CompletarToDo = async (todo_id) => {
    return ApiService.patch(`/todo/completado/${todo_id}`)
    .then( response => response.data )
    .catch( response => response.response )
}

export const EliminarToDo = async (todo_id) => {
    return ApiService.delete(`/todo/eliminar/${todo_id}`)
    .then( response => response.data )
    .catch( response => response.response )
}
