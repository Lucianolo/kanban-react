export default {
  getTasks () {
    // Eventually convert to an actual ajax request for retrieving data
    return new Promise((resolve, reject) => {
      try {
        resolve(JSON.parse(localStorage.getItem('tasks')))
      } catch (e) {
        reject(e)
      }
    })
  },

  setTasks (tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
}
