import React, { useContext } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../graphql/Mutation";
import { GET_TODOS } from "../graphql/Query";
import { TodoContext } from "../TodoContext.js";

const Todo = ({ id, title, date, detail }) => {
  const [selectedId, setSelectedId] = useContext(TodoContext);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const removeTodo = (id) => {
    deleteTodo({
      variables: { id: id },
      refetchQueries: [{ query: GET_TODOS }],
    });
  };
  return (
    <a
      href="#"
      onClick={() => setSelectedId(id)}
      className="list-group-item list-group-item-action active"
      aria-current="true"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{title}</h5>
        <small>{moment(date).format("yyyy-MM-DD")}</small>
      </div>
      <p className="mb-1">{detail}</p>
      <button onClick={() => removeTodo(id)}>delete</button>
    </a>
  );
};

export default Todo;
