function addItem(event) {
  event.preventDefault()
  let text = document.getElementById('todo-input')
  db.collection('todo-items').add({
    text:text.value,
    status:"active",
    
  })

  text.value = ''
}



function getItems(){
  db.collection('todo-items').onSnapshot(snapshot=>{
    let items = []
    snapshot.forEach(item=>{
     items.push({
      id:item.id,
      ...item.data()
     })
    })
    generateItems(items)

  })
}
function generateItems(items){
  let todoList = ''
items.forEach(item=>{
todoList += ` <div class="todo-item" data-id="${item.id}">
<div class="check">
  <div class="check-mark ${item.status == "completed" ? "checked": ""}" data-id="${item.id}">
    <img src="assets/icon-check.svg" alt="">
  </div>
</div>
<div class="todo-text">
 ${item.text}
</div>
</div>`
})
document.querySelector('.todo-items').innerHTML = todoList
createEventListenner()
}

function createEventListenner(){
  let todoCheckMarks = document.querySelectorAll('.todo-item .check-mark')

  todoCheckMarks.forEach((item)=>{
    item.addEventListener('click',()=>{
      markComplete(item.dataset.id)
      
    })


  })

  document.querySelectorAll('.todo-item').forEach(item=>{
    item.addEventListener('contextmenu',(e)=>{
      e.preventDefault()
      deleteItem(item.dataset.id)
    })
  })
  
}

function markComplete(id){
 let item = db.collection('todo-items').doc(id)
 item.get().then((doc)=>{
  if(doc.exists){
    let status = doc.data().status
    if(status == 'active'){
      item.update({
        status:'completed'
      })
    }else if(status == 'completed'){
      item.update({
        status:"active"
      })
    }
    console.log(doc.data());
  }
 })
  console.log(id);
}

getItems()



function deleteItem(id){
  db.collection("todo-items").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
}

