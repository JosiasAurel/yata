
// here are the tests

/* Testing the code */

 app() // init app

console.log("Create some tasks")
createTask("Eat some meatballs")
createTask("Finish this app")
createTask("You got some assignments dude")

console.log("Get all tasks")
console.log(showTasks())

console.log(`Tasks count ${db.get("tasksCount").value()}`)

console.log("Delete task")
deleteTask(1)
console.log(showTasks())

console.log(`Tasks count ${db.get("tasksCount").value()}`)

deleteTask(2)
console.log(showTasks())

console.log(`Tasks count ${db.get("tasksCount").value()}`)
//console.log("Delete task 1")

 