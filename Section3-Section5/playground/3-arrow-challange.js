const tasks = {
    tasks:[
        {
            text: 'Grocery Shopping',
            completed: true
        },
        {
            text: 'Clean yard',
            completed: false
        },
        {
            text: 'Film Course',
            completed: false
        }
    ],
    getTasksToDo(){
        return this.tasks.filter(task=> !task.completed)
    }
}
console.log(tasks.getTasksToDo())