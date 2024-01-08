import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardHeader,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';



export const TodoList = () => {
  const navigate = useNavigate();
  const storedUserData = sessionStorage.getItem("user");
  const userObject = storedUserData ? JSON.parse(storedUserData) : null;
  const user_id = userObject?.id;
  const user_name = userObject?.name;

  const [allList, setAllList] = useState();
  const [load, setLoad] = useState(false);

  const get_all_todo_list = async () => {
    try {
      await axios
        .get(`http://localhost:8000/get_item/${user_id}`)
        .then((res) => {
          if (res) {
            setAllList(res.data.list);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user_id) {
      navigate("/");
    }
    get_all_todo_list();
  }, [load, user_id]);

  const [item, setItem] = useState("");
  const handle_add = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:8000/add_item/${user_id}`, { item: item })
        .then((res) => {
          if (res.data.status === true) {
            setItem("");
            setLoad(!load);
            // alert("item_added succesffully.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };


 const handle_delete = async (item) => {
  try {
    await axios.delete(`http://localhost:8000/delete_item?user_id=${user_id}&item_name=${item}`).then((res) => {
      if (res) {
        setLoad(!load);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

  const handle_logout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div
        className="logout"
        style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}
      >
        <span style={{ margin: "0 10px 0 0" }}>Hi {user_name} </span>{" "}
        <button onClick={handle_logout}>Logout</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <MDBCard>
          <MDBCardHeader>Todo List</MDBCardHeader>
          <MDBCardHeader
            className="add_input"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MDBInput value={item} onChange={(e) => setItem(e.target.value)} />
            <MDBBtn
              onClick={handle_add}
              style={{ width: "30%", marginLeft: "2px" }}
              color="success"
            >
              <AddIcon/>
            </MDBBtn>
          </MDBCardHeader>

          <MDBListGroup>
            {allList?.list?.map((item, idx) => (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <MDBListGroupItem key={idx} style={{width:'100%'}}>{item}</MDBListGroupItem>
                <MDBBtn onClick={() => {handle_delete(item)}} outline rounded className="my-1" color="danger">
                  <RemoveIcon/>
                </MDBBtn>
              </div>
            ))}
          </MDBListGroup>
        </MDBCard>
      </div>
    </>
  );
};
