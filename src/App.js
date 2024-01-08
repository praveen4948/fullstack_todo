import React from "react";
import { TodoList } from "./component/TodoList";
import { Route, Routes } from "react-router-dom";
import { Login } from "./component/Login";
import { SignUp } from "./component/SignUp";


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todo_list" element={<TodoList />} />
      </Routes>

    </>
  );
}

export default App;
