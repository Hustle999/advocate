import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ADD_TODO, UPDATE_TODO } from "../graphql/Mutation";
import moment from "moment";
import { TodoContext } from "../TodoContext";
import { GET_TODO, GET_TODOS } from "../graphql/Query";

const AddTodos = () => {
  const [selectedId, setSelectedId] = useContext(TodoContext);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [todo, setTodo] = useState({
    title: "",
    detail: "",
    date: moment().format("yyyy-MM-DD"),
  });
  const { loading, error, data } = useQuery(GET_TODO, {
    variables: { id: selectedId },
    onCompleted: (data) => setTodo(data.getTodo),
  });

  const inputAreaRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("outside input area");
        setSelectedId(0);
      } else {
        console.log("inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  const [addTodo] = useMutation(ADD_TODO);
  const onSubmit = (e) => {
    if (todo.title == "") {
      alert("please enter your title");
      return;
    }
    e.preventDefault();
    if (selectedId === 0) {
      addTodo({
        variables: {
          title: todo.title,
          detail: todo.detail,
          date: todo.date,
        },
        refetchQueries: [
          {
            query: GET_TODOS,
          },
        ],
      });
    } else {
      updateTodo({
        variables: {
          id: selectedId,
          title: todo.title,
          detail: todo.detail,
          date: todo.date,
        },
        refetchQueries: [
          {
            query: GET_TODOS,
          },
        ],
      });
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} ref={inputAreaRef}>
        <div className="form-group">
          <label>Title</label>

          <input
            type="text"
            className="form-control"
            placeholder="enter your title"
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Detail</label>
          <input
            type="text"
            className="form-control"
            placeholder="enter your detail"
            value={todo.detail}
            onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={moment(todo.date).format("yyyy-MM-DD")}
            onChange={(e) => setTodo({ ...todo, date: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedId === 0 ? "Add" : "update"}
        </button>
      </form>
    </div>
  );
};

export default AddTodos;
