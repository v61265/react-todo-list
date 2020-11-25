import styled from "styled-components";
import "./App.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

const Container = styled.div`
  background: rgba(246, 217, 152, 0.7);
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 40px;
  border-radius: 20px;

  h1 {
    color: ${(props) => props.theme.colors.blue_1};
    text-align: center;
  }

  input {
    width: 98%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid ${(props) => props.theme.colors.blue_1};
    color: ${(props) => props.theme.colors.blue_1};
    border-radius: 5px;
  }

  button {
    padding: 5px;
    background: white;
    border: 1px solid ${(props) => props.theme.colors.blue_1};
    color: ${(props) => props.theme.colors.blue_1};
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.colors.blue_1};
      color: ${(props) => props.theme.colors.yello_1};
    }
  }

  .addTodo {
    width: 100%;
    font-size: 16px;
    margin: 10px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  button + button {
    margin-left: 5px;
  }
`;

// 因為每次 render 都重新呼叫一次 App ，因此不能放裡面。
// 也不用設定成 state ，因為 id 不用 render 。
let id = 3;

function App() {
  const [todos, setTodos] = useState([
    { id: 1, content: "寫履歷", isDone: true, isEditing: false },
    { id: 2, content: "送出履歷！", isDone: false, isEditing: false },
  ]);
  const [filter, setFilter] = useState("all");
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  function handleAddTodo() {
    if (!value) return alert("請輸入內容～");
    setTodos([
      {
        id,
        content: value,
        isDone: false,
        isEditing: false,
      },
      ...todos,
    ]);
    setValue("");
    id++;
  }

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleIsDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const renderAll = () => setFilter("all");
  const renderDone = () => setFilter("done");
  const renderUndone = () => setFilter("undone");

  const handleUpdateTodo = (todo, e) => {
    setTodos(
      todos.map((item) => {
        if (item.id !== todo.id) return item;
        return {
          ...item,
          isEditing: !item.isEditing,
        };
      })
    );
  };

  const handleEditChange = (id, e) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          content: e.target.value,
        };
      })
    );
  };

  return (
    <Container>
      <h1>TODO LIST</h1>
      <input
        type='text'
        placeholder='todo'
        value={value}
        onChange={handleInputChange}
      />
      <button className='addTodo' onClick={handleAddTodo}>
        Add todo
      </button>
      {todos
        .filter((todo) => {
          if (filter === "all") return todo;
          if (filter === "done") return todo.isDone;
          return !todo.isDone;
        })
        .map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleIsDone={handleToggleIsDone}
            handleUpdateTodo={handleUpdateTodo}
            handleEditChange={handleEditChange}
          />
        ))}
      <ButtonWrapper>
        <div>
          <button onClick={renderAll}>全部</button>
          <button onClick={renderDone}>已完成</button>
          <button onClick={renderUndone}>未完成</button>
        </div>
        <div>
          <button onClick={handleDeleteAll}>清空全部</button>
        </div>
      </ButtonWrapper>
    </Container>
  );
}

export default App;
