// Main CLI

//shebang
// #!/usr/bin/env node

console.log("YATA")


// initialize lowdb 
const low = require("lowdb")

const FileSync = require("lowdb/adapters/FileSync")
const fs = require("fs")

const adapter = new FileSync("todos.json")
const db = low(adapter)

// get cli args
const cliArgs = process.argv.slice(2) // remove the first 2 default args

// YATA can CRUD tasks

function initApp() {
    let isInitialized = false // variable indicating if app is initialized or not
    try {
        fs.readFileSync("./todos.json")
        isInitialized = true
    } catch (error) {
        isInitialized = false
    }

    if (isInitialized) {
        return
    } else {
        db.defaults({
        todos: [],
        tasksCount: 0
    }).write()
    }
    return 
}

function app() {
    db.defaults({
        todos: [],
        tasksCount: 0,
        prevCount: 0
    }).write()
    return
}

// utility functions to manage tasks
function createTask(taskValue) {
    let todoCount = db.get("prevCount").value()
    let task = {
        id: todoCount+1,
        name: taskValue
    }
    db.get("todos") // get the tasks
        .push(task) // add newly created tasks
        .write() // commit change
    db.update("tasksCount", c => c + 1).write()
    db.update("prevCount", c => c + 1).write()

    return
}

function getTask(id) {
    let task = db.get("todos") // get tasks
        .find({ id: id }) //find task with specified ID
        .value().name // read name of the task

    return task
}

function updateTask(id, newName) {
    db.get("todos") // gets tasks
        .find({ id: id }) // find task with specified ID
        .assign({ name: newName }) // setnew name for task
        .write() // commit change

    return "Task Updated!"
}

function deleteTask(id) {

    db.get("todos").remove({ id: id }).write() // remove task
    db.update("tasksCount", n => n - 1).write() // decrement the number of available tasks

    return "Task removed"
}

function showTasks() {
    let tasks = db.get("todos").value() // get all tasks from database

    return tasks
}

module.exports = { showTasks, createTask, deleteTask, updateTask, getTask, app }