const express = require("express");
const { users, todo_list } = require("./mongoConnect");
const cors = require("cors");
const port = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.post("/add_user", async (req, res) => {
  try {
    const response = await users.insertMany([req.body]);
    if(response){
      res.json({status: true, message: "User added successfully."})
    } else{
      res.json({status: false, message: "Some error occur."});
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log(req.body)
    const response = await users.findOne({email: req.body.email, password: req.body.password});
    if(response){
      res.json({status: true, message: "User Login successfully.", data: response})
    } else{
      res.json({status: false, message: "Invalid Credential."});
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/add_item/:id', async(req, res) =>{
  try {
    console.log('hit');
    const user_id = req.params.id;
    const item = req.body.item;
    const updatedList = await todo_list.findOneAndUpdate(
      { user_id: user_id },
      { $push: { list: item } }, // $push appends the item to the list array
      { new: true, upsert: true } // If the document doesn't exist, create a new one
    );
    if(updatedList) {
      res.json({status: true, message:'Item added successfully.'})
    } else {
      res.json({status: false, message: 'Some iternal error.'})
    }

  } catch (error) {
    console.log(error)
  }
})

app.get('/get_item/:id', async(req, res) =>{
  try {
    const user_id = req.params.id;
    const list = await todo_list.findOne({user_id: user_id})
    if(list) {
      res.json({status: true, message:'Get list successfully.', list: list})
    } else {
      res.json({status: false, message: 'Some iternal error.'})
    }

  } catch (error) {
    console.log(error)
  }
})

app.delete('/delete_item', async(req, res) =>{
  try {
    const user_id = req.query.user_id;
    const item_name = req.query.item_name;
    console.log(user_id)
    const updatedList = await todo_list.findOneAndUpdate(
      { user_id: user_id },
      { $pull: { list: item_name } },
      { new: true }
    );
    console.log(updatedList)
    if(updatedList) {
      res.json({status: true, message:'Delete item successfully.'})
    } else {
      res.json({status: false, message: 'Some iternal error.'})
    }

  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});
