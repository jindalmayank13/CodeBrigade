function todo() {
        return {
            todoEditCache: '',
            todoFormsIndex: 0,
            selected: 'All',
            openSelect: false,
            showTodosDeleteConfirmation: false,
            showTodoDeleteConfirmation: false,
            istitleTabActive: 0,
            todoListsIndex: 0,
            checkAll: false,
            showTitleCache: '',
            monthArray: ["Jan","Feb","Mar",
                          "Apr","May","Jun",
                          "Jul","Aug","Sep",
                          "Oct","Nov","Dec"],
            notShowTodos: true,
            hasNoTodoTitle: false,
            keyGen: 3,
            todoForm:[],
            todoTitle: '',
            todoListModel:[],
            showModal: false,
            todoLists: [{
              title:'TITLE 1',
              checkAll: false,
              todos:[{
                todo: 'TODO 1',
                completed: false,
                showEdit: false
              },{
                todo: 'TODO 1',
                completed: false,
                showEdit: false
              }],
             key: 1 ,
              dateCreated: 'Nov 12, 2021'
            },
             {
              title:'TITLE 2',
               checkAll: false,
              todos:[{
                todo: 'TODO 2',
                completed: false
              },{
                todo: 'TODO 2',
                completed: false
              }],
             key: 2 ,
               dateCreated: 'Nov 12, 2021'
            }],
            addTodoForm(index){
              if(this.todoForm.length === 20) return
              this.todoForm.push('')
              setTimeout(() => {
                document.querySelectorAll('.todo-forms')[index].focus()
                this.todoFormsIndex++
              },100)
              // this.todoForm[index].focus()
            },
          showAddModal(){
            setTimeout(() => {
              document.getElementById('todo-title-tb').focus()
            },100)
            this.showModal=true
            console.log(document.getElementById('todo-add-tb'))
          },
          deleteTodoForm(index){
            this.todoForm[index] = ''
            this.todoForm.splice(index,1)
            this.todoFormsIndex--
          },
          finishTyping(event,index){
            event.target.blur()
            if(event.target.value === '')return
            this.addTodoForm(index)
          },
          addTodo(){
            // console.log(this.keyGen++)
            var todos = []
            var dateNowArray = new Date().toLocaleDateString().split('/')
            
            var monthNow = this.monthArray.filter((month,index) => {
              return index+1 === parseInt(dateNowArray[0])
            })
            
            console.log(this.monthArray)
            console.log(`${monthNow} ${dateNowArray[1]}, ${dateNowArray[2]}`)
           
            
            this.todoForm.forEach(todo => {
              if(todo !== '') this.todoListModel.push({
                todo: todo,
                completed: false
              })
            })
     
             if(this.todoTitle === ''){
               this.hasNoTodoTitle = false
               setTimeout(() => {
                  return this.hasNoTodoTitle = true
               }, 100)
               return
             }
            
            this.todoLists.push({
              key: this.keyGen++,
              title: this.todoTitle,
              todos: this.todoListModel,
              checkAll: false,
              dateCreated: `${monthNow} ${dateNowArray[1]}, ${dateNowArray[2]}`
            })
        
            this.todoListModel = []
            this.todoTitle = ''
            this.todoForm = []
            this.showModal = false
            this.todoFormsIndex = 0
          },
          checkAllTodos(index){
            this.todoLists[index].checkAll=!this.todoLists[index].checkAll
            
            this.todoLists[index].todos.forEach(todo => {
              if(!this.todoLists[index].checkAll){
                todo.completed = true
              }
              else{
                todo.completed = false
              }
            })
          },
          deleteTodoList(index){
            this.todoLists.splice(index,1)
            this.showTodosDeleteConfirmation=false
          },
          deleteTodo(key,index){
            this.todoLists.forEach(todoList => {
              if(todoList.key === key){
                todoList.todos.splice(index,1)
              }
            })
            this.showTodoDeleteConfirmation=false
          },
          showRemaining(todoList){
            var remaining = todoList.todos.length;
            todoList.todos.forEach(todo => {
              if(todo.completed) remaining--
            })
            
            return remaining
          },
          showCompleted(todoList){
            var remaining = todoList.todos.length;
            todoList.todos.forEach(todo => {
              if(todo.completed) remaining--
            })

            return todoList.todos.length - remaining
          },
          checkAllComputed(index){
            var todosItems = this.todoLists[index].todos.length
            var todosCompleted = 0;
            
            this.todoLists[index].todos.forEach(todo => {
              if(todo.completed){
                todosCompleted++
              }
            })
            
            if(todosCompleted === todosItems){
              return true
            }
            else{
              return false
            }
          },
          filterTodos(todoList){
            if(this.selected === 'Completed'){
             return todoList.todos.filter(todo => {
                return todo.completed == true
              })
            }
            else if(this.selected === 'Remainings'){
             return todoList.todos.filter(todo => {
                return todo.completed == false
              })
            }
            else{
              return todoList.todos
            }
            
          },
          showEdit(todo,index){
            todo.showEdit=true
            this.todoEditCache = todo.todo
            
            setTimeout(() => {
              document.querySelectorAll('.todos-edit')[index].focus()
            },100)
          },
          doneEdit(todo,index){
            if(todo.todo === '') todo.todo = this.todoEditCache
            todo.showEdit = false
          },
          clickAway(todo){
            if(!todo.showEdit) return
            todo.todo = this.todoEditCache
            todo.showEdit = false
          }
        }
    }