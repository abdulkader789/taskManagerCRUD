const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showTask = async () => {
  try {

    const response = await fetch(`/api/v1/tasks/${id}`);
    const data = await response.json();
    const { task } = data
    const { _id: taskID, completed, name } = task

    console.log('all the tasks', task);



    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked


    const response = await fetch(`/api/v1/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: taskName,
        completed: taskCompleted,
      }),
    });

    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data);

    const { _id: taskID, completed, name } = data.task

    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    taskNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
