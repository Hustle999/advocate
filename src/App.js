import "./App.css";
import AddTodos from "./components/AddTodos.js";
import Todo from "./components/Todo.js";
import { GET_TODOS } from "./graphql/Query.js";
import { useQuery } from "@apollo/client";
import { TodoContext } from "./TodoContext.js";
import { useState } from "react";

function App() {
  const [selectedId, setSelectedId] = useState(0);
  const { loading, error, data } = useQuery(GET_TODOS);
  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;
  console.log(data);

  return (
    <TodoContext.Provider value={[selectedId, setSelectedId]}>
      <div className="container todobox">
        <AddTodos />
        <div className="list-group mt-4">
          {data?.getTodos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              date={todo.date}
              detail={todo.detail}
            />
          ))}
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
