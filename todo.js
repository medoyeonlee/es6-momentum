const toDoForm = document.querySelector('.js-toDoForm'),
toDoInput= toDoForm.querySelector('input'),
toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
const TODOS_DONE = 'done';
let toDos = [];


function deleteToDo(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li)
  const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id)
  })
  toDos = cleanToDos
  saveToDos()
}
function saveToDos(){
  
  localStorage.setItem(TODOS_LS,JSON.stringify(toDos))
}
function handleToDoListClick(event){
    const span=event.target;
   
    toDos=[];
    if(span.classList.contains(TODOS_DONE)){ //if completed, change to uncompleted
        span.classList.remove(TODOS_DONE)
        const targetId=event.target.parentNode.id;
        let existing= localStorage[TODOS_LS];
        existing = existing?JSON.parse(existing):{};
       
        existing.forEach(function(eachExisting){
            
         
            const toDoObj = {
                text:eachExisting['text'],
                id:eachExisting['id'],
                done:parseInt(targetId)===eachExisting.id ? !eachExisting['done']:eachExisting['done']
              };
            
             
              toDos.push(toDoObj)
              
              saveToDos();
        })
    
        
        
        
    }else {
      
        span.classList.add(TODOS_DONE)
        const targetId=event.target.parentNode.id;
        let existing= localStorage[TODOS_LS];
        existing = existing?JSON.parse(existing):{};
      
        existing.forEach(function(eachExisting){
            
            const toDoObj = {
                text:eachExisting['text'],
                id:eachExisting['id'],
                done:parseInt(targetId)===eachExisting.id ? !eachExisting['done']:eachExisting['done']
              };
              
           
              toDos.push(toDoObj)
              
              saveToDos();

        })
    
        
      
    }
    
}
function paintToDo(text,done){
  const li=document.createElement('li');
  const delBtn = document.createElement('button');
  
  delBtn.innerText='❌';
  delBtn.addEventListener('click',deleteToDo);
  
  const span = document.createElement('span');
  span.addEventListener('click',handleToDoListClick);
  const newId = toDos.length+1
  span.innerText=text
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li)
  if(done){
      span.classList.add(TODOS_DONE);
    }else{
        span.classList.remove(TODOS_DONE)
    }
  const toDoObj = {
    text:text,
    id:newId,
    done
  };

  toDos.push(toDoObj)
  
  saveToDos();
}
function handleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue,false)
  toDoInput.value='';

}


function loadToDos(){
  const loadedToDos=localStorage.getItem(TODOS_LS);
  
  if(loadedToDos !== null){
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo){
        
        paintToDo(toDo.text,toDo.done)
      })
  }
}


function init(){
  loadToDos();
  toDoForm.addEventListener('submit',handleSubmit)
}

init();