<template>
  <div class="hello">
      <!-- ==================TODO===================== -->
      <div class="row">
          <div class="col s4">
            <div class="card blue-grey darken-1">
              <div class="card-title white-text">
                <span class="card-title">Todo</span>
                <button class="btn-floating btn-large halfway-fab waves-effect waves-light red modal-trigger pulse" data-target="modal1" @click="modalJs()"><i class="material-icons">add</i></button>
              </div>
              <div class="card-content white-text" v-for="(todo,index) in todoAll" :key="index">
                <ul >
                  <li id="todo-list">
                    <div class="row">
                      <span class="col s10">
                        {{todo.name}}
                      </span>
                     <button class="btn-floating btn-small waves-effect waves-light green" @click="doTask(index)"><i class="material-icons">arrow_forward</i></button>
                    </div>
                    <hr>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        <!-- ==================WIP===================== -->
          <div class="col s4">
            <div class="card blue-grey darken-1">
              <div class="card-title white-text">
                <span class="card-title">Wip</span>
              </div>
              <div class="card-content white-text" v-for="(wip,index) in wipAll" :key="index">
                <ul >
                  <li id="todo-list">
                    <div class="row">
                      <span class="col s10">
                        {{wip.name}}
                      </span>
                      <button class="btn-floating btn-small waves-effect waves-light green" @click="completeTask(index)"><i class="material-icons">arrow_forward</i></button>
                    </div>
                    <hr>
                  </li>
                </ul>
              </div>
            </div>
          </div>
            <!-- ==================DONE===================== -->
          <div class="col s4">
            <div class="card blue-grey darken-1">
              <div class="card-title white-text">
                <span class="card-title">Done</span>
              </div>
              <div class="card-content white-text" v-for="(done,index) in doneAll" :key="index">
                <ul >
                  <li id="todo-list">
                    <div class="row">
                      <span class="col s10">
                        {{done.name}}
                      </span>
                      <button class="btn-floating btn-small waves-effect waves-light green" @click="completeTask(index)"><i class="material-icons">done</i></button>
                    </div>
                    <hr>
                  </li>
                </ul>
              </div>
            </div>
          </div>  
      </div>
      <!-- Modal Structure -->
      <div id="modal1" class="modal bottom-sheet">
        <div class="modal-content">
          <h4>Add Task</h4>
          <textarea v-model="taskName" id="taskName" class="materialize-textarea"></textarea>
          <label for="taskName">TaskName</label>
        </div>
        <div class="modal-footer">
          <button class="modal-close waves-effect waves-green btn" @click="deleteTask()">Add</button>
        </div>
      </div>

  </div>
</template>

<script>

import { todo,wip,done } from '../helpers/firebase.js'

export default {
  data() {
    return {
      taskName:"",
      todoAll:{},
      wipAll:{},
      doneAll:{}
    }
  },
  methods:{
    modalJs() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems);
    },
    addTask() {
      let task = {
        name: this.taskName
      }
      todo.push(task)
      .then(snapshot=>{
        console.log("push===",snapshot);
      })
    },
    doTask(index) {
      let wipTask={}
      todo.child(index).once('value')
      .then(snapshot=>{
        wipTask = snapshot.val()
        wip.child(index).set(wipTask)
        .then(snapshot=>{
        })
      })
      todo.child(index).remove()
    },
    completeTask(index) {
      let doneTask={}
      wip.child(index).once('value')
      .then(snapshot=>{
        doneTask = snapshot.val()
        done.child(index).set(doneTask)
        .then(snapshot=>{

        })
      })
      wip.child(index).remove()
    },
    deleteTask(index){
      done.child(index).remove()
    }

  },
  created() {
    todo.on("value", snapshot=>{
      this.todoAll = snapshot.val()
      console.log(this.todoAll)
    })

    wip.on("value", snapshot=>{
      this.wipAll = snapshot.val()
      console.log(this.wipAll)
    })

    done.on("value",snapshot=>{
      this.doneAll = snapshot.val()
      console.log(this.doneAll);
      
    })

  }

}
</script>


<style scoped>
  #todo-list{
    padding:0 !important;
    margin:0 !important
  }
</style>
