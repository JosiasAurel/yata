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

// utility functions to manage tasks
function createTask(taskValue) {
    let todoCount = db.get("tasksCount").value()
    let task = {
        id: todoCount+1,
        name: taskValue
    }
    db.get("todos")
        .push(task)
        .write()

    return
}