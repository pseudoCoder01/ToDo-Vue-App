from . import ControllerObject
from app import db

from app.Models.ToDo import ToDo 
from app.Models.Categoria import Categoria 


def GuardarToDo(todo):
    ret = ControllerObject()
    try:
        newToDo = ToDo(
            todo = todo.get('todo'),
            categoria_id = todo.get('categoria'),
            completado = 0,
        )

        db.session.add(newToDo)
        db.session.commit()

        ret.status  = 200
        ret.mensaje = 'Guardado satisfactoriamente'

    except Exception as e:
        ret.status  = 500
        ret.mensaje = 'Ocurrió un problema, intente de nuevo'

    return ret


def GetAllToDo():
    ret = ControllerObject()
        
    try:
        allToDo = [todo.toDict() for todo in ToDo.query.all()]

        ret.status  = 200
        ret.payload = allToDo

    except Exception as e:
        ret.status = 500
        ret.mensaje = 'Ocurrió un problema al buscar los ToDo'
        print(e)

    return ret


def EliminarToDo(todo_id):
    ret = ControllerObject()

    try:
        ToDo.query.filter(ToDo.id == todo_id).delete()

        db.session.commit()

        ret.status = 200

    except Exception as e:
        ret.status = 500
        print(e)

    return ret


def CompletarToDo(todo_id):
    ret = ControllerObject()

    try:
        todo = ToDo.query.filter(ToDo.id == todo_id).first()
        todo.completado = not todo.completado

        db.session.commit()

        ret.status = 200

    except Exception as e:
        ret.status = 500
        print(e)

    return ret


def EditarToDo(data):
    ret = ControllerObject()
    ret.status = 200

    try:
        todo = ToDo.query.filter(ToDo.id == data["id"]).first()

        if (todo):
            todo.todo         = data.get('todo')
            todo.categoria_id = data.get('categoria')

            db.session.commit()

            ret.mensaje = "Actualizado exitosamente"
        else:
            ret.title = "No existe"
            ret.mensaje = "No se encuentra este ToDo"

    except Exception as e:
        ret.status = 500
        print(e)

    return ret

