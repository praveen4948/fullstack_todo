const mongoose = require('mongoose');


const mongoURI = `mongodb+srv://praveenmauryabst:praveenmauryabst@cluster0.gj3kyg3.mongodb.net/todoSystem?retryWrites=true&w=majority`

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err)=>{
  if(err){
    console.log(`Error: ${err}`);
  } else {
    console.log("Database connected successfully.")
  }
})

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
  },
  email:{
    type: String,
  },
  password:{
    type: String
  }
})

const todoListSchema = new mongoose.Schema({
  user_id: {
    type: Number,
  },
  list:{
    type: Array
  }
})

const users = mongoose.model('users', userSchema);
const todo_list = mongoose.model('todo_list', todoListSchema);

module.exports = {users, todo_list};
