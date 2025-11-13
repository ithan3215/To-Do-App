const pendingContainer = document.getElementById("taskElements")
const form = document.getElementById("forms")
const small = document.getElementById("small")
const inputTask = document.getElementById("inputTask")
const completedContainer = document.getElementById("taskElementsCompleted");
const pendingSort = document.getElementById("sortA")
const completedSort = document.getElementById("sortB")
const addTitle = document.querySelector(".add-title")

let lista = []
let clicks = 0


let proof = document.createElement("span")



form.addEventListener("submit", (e) => {
  clicks++;
  if(clicks == 3){
    addTitle.classList.add("opac")
    addTitle.innerHTML = "Now mess with things"
    
  }
  e.preventDefault();
  const inputValue = inputTask.value.trim();
  inputTask.value = "";

  if (!inputValue ) {
    Swal.fire({
  icon: "error",
  title: "This value is empty",
  });
    return;
  }
  
  lista.push(inputValue);
  
  proof.innerText = "+ " + lista.length;
  proof.className = "span";

  small.innerText = `Elements added to the list`
  small.appendChild(proof)

  const li = document.createElement("li")
  li.innerText = inputValue
  li.dataset.valor = inputValue

  const pencil = document.createElement("i")
  pencil.className = "bi bi-pencil"
  pencil.id = "edit"
  li.appendChild(pencil)
  
  const doneButton = document.createElement("button")
  doneButton.className = "buttons"
  doneButton.innerText = "Done"
  
  const deleteButton = document.createElement("button")
  deleteButton.className = "buttons"
  deleteButton.innerText = "Delete"
  
  const buttonContainer = document.createElement("div")
  buttonContainer.className = "button-container"
  buttonContainer.append(doneButton, deleteButton)

  pendingContainer.append(li,buttonContainer)


async function taskEdit(){
  const { value: edit } = await Swal.fire({
  title: "Edit the task",
  input: "text",
  showCancelButton: true,
  })
if(edit){
  li.innerText = edit
  li.appendChild(pencil)
}

}
function removeItems(){
  li.remove()
  buttonContainer.remove()
    
}

function completeTask(){
  const isDone = li.classList.toggle("tachado");
  doneButton.innerText = isDone ? "Incomplete" : "Done";

  if (isDone) {
    completedContainer.append(li, buttonContainer)
  } else {
    pendingContainer.append(li, buttonContainer)
  }
};

  pencil.addEventListener("click", taskEdit);
  deleteButton.addEventListener("click", removeItems);
  doneButton.addEventListener("click", completeTask);
  
});

  




  
  function listOrder(parent){
    const items = Array.from(parent.querySelectorAll("li"))

    items.sort((a, b) => a.textContent.localeCompare(b.textContent))

    items.forEach(li => {
      let next = li.nextElementSibling;
      parent.appendChild(li);
      if(next && next.classList.contains("button-container")){
        parent.appendChild(next)
      }
    })
  }
  

  pendingSort.addEventListener('click', () => listOrder(pendingContainer))
  completedSort.addEventListener('click', () => listOrder(completedContainer))
  