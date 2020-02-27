const form = document.querySelector('.js-form'),
input = form.querySelector('input'),
greeting = document.querySelector('.js-greetings')
const USER_LS = 'currentUser',
SHOWING_CN = 'showing'

function handleEditClick(){
    localStorage.removeItem(USER_LS)
    greeting.classList.remove(SHOWING_CN);
    form.classList.add(SHOWING_CN);
    

}
function saveName(text){
  localStorage.setItem(USER_LS,text)
}
function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  saveName(currentValue)
  paintGreeting(currentValue)

}

function askForName(){
  form.classList.add(SHOWING_CN)
  form.addEventListener("submit",handleSubmit)
}
function paintGreeting(text){
  form.classList.remove(SHOWING_CN)
  greeting.classList.add(SHOWING_CN)
  greeting.innerText = `Hello ${text}`
  const editBtn = document.createElement('div');
  editBtn.innerText='✏️';
  greeting.appendChild(editBtn)
  editBtn.addEventListener("click",handleEditClick);

}
function loadName(){
  const currentUser = localStorage.getItem(USER_LS)

  if(currentUser === null){
    askForName();
  }else {
    paintGreeting(currentUser)
  }
}
function init(){
  loadName()
}

init();