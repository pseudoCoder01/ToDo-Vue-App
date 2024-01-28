from app import app
from flask import request
from app.Controllers import (
    ToDoController as todo
)

@app.route('/todo', methods=['GET'])
def GetAllToDo():
    result = todo.GetAllToDo()
    return result.jsonify()

@app.route('/todo/guardar', methods=['POST'])
def GuardarToDo():
    result = todo.GuardarToDo(request.json)
    return result.jsonify()

@app.route('/todo/editar', methods=['PUT'])
def EditarToDo():
    result = todo.EditarToDo(request.json)
    return result.jsonify()

@app.route('/todo/completado/<todo_id>', methods=['PATCH'])
def CompletarToDo(todo_id):
    result = todo.CompletarToDo(todo_id)
    return result.jsonify()

@app.route('/todo/eliminar/<todo_id>', methods=['DELETE'])
def EliminarToDo(todo_id):
    result = todo.EliminarToDo(todo_id)
    return result.jsonify()

