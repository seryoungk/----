import React, {useState} from 'react'

function Todo({todo, onDeleteHandler, onCompleteHandler}) {
    return (
        <div className="todo_container">
            <h2>{todo.title}</h2>
        </div>
    )
}

function List({todos, setTodos}) {
    // 다른 형제 컴포넌트들의 event에 의해 부모컴포넌트에서 수정된 props들을 넘겨 받는다.

    const onDeleteHandler = (selectedId) => {
        const remainedTodos = todos.filter((todo)=>{
            return todo.id !== selectedId
        })
        setTodos(remainedTodos)
    }

    const onCompleteHandler = (selectedId) =>{
        const newTodos = todos.map((todo)=>{
            if (todo.id === selectedId) {
                return {...todo, isDone: !todo.isDone}
            } else {
                return {...todo}
            }
        })
        setTodos(newTodos)
    }

    return (
        <div className="list_container">
            
            <div className="list_wrapper">
                {todos.map((todo)=>{
                    if(todo.isDone === false) {
                        return <Todo todo={todo} key={todo.id} setTodos={setTodos} onDeleteHandler={onDeleteHandler} onCompleteHandler={onCompleteHandler}/>
                        }
                    }
                )}
            </div>
            
        </div>
    )
}
function Layout(props) {
    return (
        <div className='layout'>
            {props.children}
        </div>
    )
}

function Header() {
    return (
        <div className="container">
            <div>MY TODO LIST</div>
            <div>React</div>
        </div>
    )
}

function Form({todos, setTodos}) {
    const initialState = {id: 0, title: "", body: "", isDone: false} //초기값

    // 부모컴포넌트인 TodoList에서 선언한 useState가 포장지라면, 여기서 선언한 useState는 그 내용을 채워주는 알맹이라고 생각하기
    const [inputTodo, setInputTodo] = useState(initialState)

    //고유 id값을 설정해주기 위해 useRef사용.. 
    const nextId = useRef(3)

    const onChangeHandler=(event)=>{
        //객체 비구조화 할당으로 인해 event.target.name과 event.target.value에서 value와 name을 추출해 사용할 수 있게 된다.
        const {value, name} = event.target 

        setInputTodo({...inputTodo, [name]: value, id: nextId.current})
        nextId.current++ // 함수가 실행될때마다 아이디도 하나씩 같이 증가
    }
    const onSubmitHandler=(event)=>{
        event.preventDefault() // from의 기능 중 submit을 하면 자동으로 페이지를 리랜더링하는데 이걸 하면 정보가 다 날아가기 때문에 이를 방지
        setTodos([...todos, inputTodo])
        setInputTodo(initialState) // input창을 빈칸으로!
    }
   
    return (
        <form onSubmit={onSubmitHandler} className="form_container">
            <div className='input_container'>
                <label>입력하세요!</label>
                {/* 인풋창을 빈칸으로 두고 submit을 했을 시 id가 모두 0으로 출력되어 삭제/업데이트 시 한꺼번에 이벤트가 일어나는 오류 발생 */}
                {/* 유저가 인풋창에 값을 필수로 넣고 진행할 수 있게 required 속성 추가 */}
                <input type='text' name="title" onChange={onChangeHandler} value={inputTodo.title} required/> 
                
            </div>
            <button>추가하기</button>
        </form>
    )
}

function TodoList() {
    // 자식컴포넌트들끼리의 정보 교환을 위해 공통된 상위 컴포넌트인 TodoList에서 넘겨줄 useState 선언(포장지라고 생각하기)
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "리액트 공부하기",
            body: "리액트 기초를 공부해봅시다.",
            isDone: false
        },
        
    ])

    return (
        <Layout>
            <Header />
            <Form todos={todos} setTodos={setTodos}/>
            <List todos={todos} setTodos={setTodos}/>
        </Layout>
    )
}

function App() {
  return (
    <TodoList />
  );
}

export default App;