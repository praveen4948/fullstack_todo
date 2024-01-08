import React, { useState } from "react";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const SignUp = () => {

  const generateRandomId = () => {
    return Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit integer
  };

  const navigate = useNavigate();
  const [id, setId] = useState(generateRandomId());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handle_login(e) {
    e.preventDefault();
    console.log(email, name, password)
    try {
      await axios.post(`http://localhost:8000/add_user`, {id, name, email, password}).then((res)=>{
        if(res){
          navigate('/')
          setError('');
        } else {
          setError("Please try again.")
        }
      })
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h2>
          <u>Signup Form</u>
        </h2>
        <h4 className="text-danger">{error}</h4>

        <MDBInput
          wrapperClass="mb-4"
          label="Name"
          id="form1"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Email address"
          id="form3"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <MDBInput
          wrapperClass="mb-4"
          label="Password"
          id="form5"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />


        <MDBBtn className="mb-4" onClick={handle_login}>
          Sign up
        </MDBBtn>

        <div className="text-center">
          <p>
            Already member? <a href="/">Login</a>
          </p>

          <div
            className="d-flex justify-content-between mx-auto"
            style={{ width: "40%" }}
          >
            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="facebook-f" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="twitter" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="google" size="sm" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="m-1"
              style={{ color: "#1266f1" }}
            >
              <MDBIcon fab icon="github" size="sm" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </>
  );
};
