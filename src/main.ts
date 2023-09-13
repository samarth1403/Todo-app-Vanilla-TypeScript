import './style.css';

interface Todo {
    title : string;
    isCompleted : boolean;
    readonly id : string;
}

const todos:Array<Todo> = [];

const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e:SubmitEvent) => {
   e.preventDefault();
   const todo:Todo = {
    title : todoInput.value,
    isCompleted : false,
    id : (Math.random()*1000).toString()
   }
   todos.push(todo);
   todoInput.value = "";
   renderTodos(todos);
}

const generateTodoItem = (title:string , isCompleted:boolean, id:string) => {
    //Creating todo Item
    const todo:HTMLDivElement = document.createElement("div");
    todo.className = "todo";

    //Creating Checkbox
    const checkBox:HTMLInputElement = document.createElement("input");
    checkBox.setAttribute("type","checkbox");
    checkBox.className = "isCompleted";
    checkBox.checked = isCompleted;
    checkBox.onchange = () => {
        paragraph.className = checkBox.checked ? "textCut" : "";
        todos.find((item)=>{
            if(item.id === id){
                item.isCompleted = checkBox.checked;
            }
        })
    }

    //Creating P for title
    const paragraph = document.createElement("p");
    paragraph.innerText = title;
    paragraph.className = isCompleted ? "textCut" : "";
  
    //Creating delete Button
    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.className = "deleteBtn";
    btn.onclick = () => {
        deleteTodo(id);
    }

    //Appending All to todoItem 
    todo.append(checkBox,paragraph,btn);
    todosContainer.append(todo);
}

const deleteTodo = (id:string) => {
    const index = todos.findIndex(item=>{
        return item.id === id;
    });
    todos.splice(index,1);
    renderTodos(todos);
}

const renderTodos = (todos:Todo[]) => {
   todosContainer.innerText = "";
   todos.forEach((item:Todo) => {
       generateTodoItem(item.title , item.isCompleted , item.id);
   })
}