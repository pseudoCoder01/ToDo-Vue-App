<template>

    <div style="height: 100vh;" class="bg-body-tertiary">
        <img class="img-fluid w-100" src="../static/img/bg-desktop-light.jpg"/>
    </div>
    
    <section class="w-100 d-flex justify-content-center">

        <div style="position: absolute; top:100px" class="w-50">

            <header class=" d-flex align-items-center justify-content-between ">
                <h1 class="fw-bold text-white" style="letter-spacing: 1rem;">TODO</h1>
                <img class="img-fluid" src="../assets/icon-moon.svg">
            </header>

            <form autocomplete="off" @submit="guardarToDo">
                <label style="margin-top: 42px" for="input-todo" class="rounded-2 bg-body d-flex align-items-center gap-4 p-3">
                    <div class="border rounded-circle" style="width: 30px; height: 30px;"></div>
                    <input v-model="todo.todo" id="input-todo" class="fs-5 w-100" type="text" placeholder="Create a new todo..."/>
                </label>
            </form>

            <div class="mt-8 shadow rounded-2 overflow-hidden bg-body">

                <div v-for="nota, index in todoList" :key="nota.id" class="d-flex align-items-center border-bottom border-1 justify-content-between gap-4 p-3">

                    <div @click="completarToDo(nota.id, index)" style="cursor: pointer;" class="d-flex align-items-center gap-4 w-100">
                        <div class="border d-flex align-items-center justify-content-center rounded-circle" :class="nota.completado && ('bg-primary bg-gradient')" style="width: 30px; height: 30px;">
                            <img v-if="nota.completado" src="../assets/icon-check.svg"/>
                        </div>
                        <p :class="nota.completado && ('text-decoration-line-through')" class="fs-5 m-0 w-100">{{ nota.todo }}</p>
                    </div>

                    <img width="28" style="cursor: pointer;" @click="editarToDo(nota)" src="../assets/icon-editar.svg"/>
                    <img style="cursor: pointer;" @click="eliminarToDo(nota.id, index)" src="../assets/icon-cross.svg"/>
                </div>

                <!--------------------------->

                <div class="d-flex justify-content-around py-3">
                    <span>N Items left</span>
                    <div class="d-flex gap-4">
                        <span>All</span>
                        <span>Active</span>
                        <span>Completed</span>
                    </div>
                    <span>Clear completed</span>
                </div>
            </div>

        </div>

        <v-dialog v-model="editar">
            <div class="d-flex justify-content-center w-100">
                <div class="bg-body-tertiary p-3">

                    <h4>Editar ToDo</h4>
                    <div class="d-flex gap-4 ">
                        <input autofocus v-model="todoEdit.todo" class="form-control" type="text"/>
                        <button @click="actualizarToDo" class="btn btn-primary">Modificar</button>
                    </div>

                </div>
            </div>
        </v-dialog>

    </section>

</template>

<script>

import * as todoService from '../services/Todo.js';

export default {
    data(){
        return {
            todo : {
                "id" : 0,
                "todo" : '',
                "categoria" : 1,
                "completado" : false
            },
            todoList : [],
            editar : false,
            todoEdit : {},
            todoRef : {},
        }
    },
    methods: {
        actualizarToDoList(){
            todoService.GetAllToDo()
                .then( response => {
                    response.length > 0 ?
                    this.todoList = response :
                    this.todoList = []
                })
        },
        actualizarToDo(){
            this.editar = false
            Object.assign(this.todoRef, this.todoEdit)
            
            todoService.EditarToDo(this.todoEdit)
                .then(response => {
                    response.status != 200 ?
                    this.actualizarToDoList() :
                    null 
                })
        },
        completarToDo(todo_id, index){
            console.log(todo_id)
            this.todoList[index].completado = !this.todoList[index].completado

            todoService.CompletarToDo(todo_id)
                .then(response => {
                    response.status != 200 ?
                    this.actualizarToDoList() :
                    null 
                })
        },  
        eliminarToDo(todo_id, index){

            this.todoList.splice(index, 1)

            todoService.EliminarToDo(todo_id)
                .then(response => {
                    response.status != 200 ?
                    this.actualizarToDoList() :
                    null 
                })  
        }, 
        editarToDo(todo){
            this.editar = true
            this.todoRef = todo
            Object.assign(this.todoEdit, todo)
        }, 
        guardarToDo(event){
            event.preventDefault()

            let obj1 = {}
            
            this.todo.id = this.obtenerNuevoId()

            Object.assign(obj1, this.todo)
            this.todoList.push(obj1)
            
            todoService.GuardarToDo(this.todo)
                .then(response => {
                    response.status != 200 ?
                    this.actualizarToDoList() :
                    null
                })

            this.todo.todo = ''
        },
        obtenerNuevoId(){
            return this.todoList.length > 0 ? this.todoList[this.todoList.length - 1].id + 1 : 0 
        }
    },
    mounted() {
        this.actualizarToDoList()
    }
}

</script>