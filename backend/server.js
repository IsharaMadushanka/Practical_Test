import express from "express";
import mysql from "mysql";
import cors from "cors"
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const salt = 10;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    }, 
  })
);
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "practical",
  });



app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE `email` = ?";

  db.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ Message: "Login error in server" });
    
    if (result.length > 0) {
      console.log("test : hash");
      console.log(result[0].hash);
      
      console.log("test2 ",req.body.password.toString());
      req.session.email = result[0].email;
      req.session.role = result[0].role;
      req.session.name = result[0].name;
      req.session.uid = result[0].id;

      bcrypt.compare(
        req.body.password.toString(),
        result[0].hash,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            return res.json({
              Status: "Success",
              Name : req.session.name,
              Email: req.session.email,
              Role: req.session.role,
              Userid : req.session.uid
            });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
});


app.post("/createuser",(req, res) => {

    const sql = "INSERT INTO `user` (`name`,`role`, `email`, `age`, `sex`,`mobileNum`,`homeNum`,`hash`) VALUES(?)";
      bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
      if (err) return res.json({ Error: "Error for hashing password" });
      const values = [
        req.body.name,
        "user",
        req.body.email,
        req.body.age,
        req.body.gender,
        req.body.mobileNum,
        req.body.homeNum,
        hash,   
      ];
      console.log(values);
      db.query(sql, [values], (err, result) => {
        //console.log("InsertID : ",result.insertId);
      if (err){ 
        if (err.code === 'ER_DUP_ENTRY' ) { 
          return res.json({ Error: "Duplicate entry. Please make sure name and gmail doesn't belong to a existing user." });
      }else{console.log("error : ",err);
      return res.json({ Error: "Error occur in server" });}
          
        }
        return res.json({ Status: "Success" ,UserId:result.insertId});
      });
    });
  } 
);
app.post("/createhobby",(req, res) => {

  const sql =
    "INSERT INTO `hobbies` (`name`,`description`) VALUES(?)";
     
    const values = [
      req.body.hobby,
      req.body.description
    ];
    console.log(values);
    try{ db.query(sql, [values], (err, result) => {  
      if (err){ 
        if (err.code === 'ER_DUP_ENTRY' ) { 
          return res.json({ Error: "Duplicate entry. Please make sure name and gmail doesn't belong to a existing user." });
      }else{console.log("error : ",err);
      return res.json({ Error: "Error occur in server" });}          
                }
        return res.json({ Status: "Success" });
    });
  }
    catch(err){
      return res.json({Error:"Unknown Error"});
    }
} 
);
app.get("/get_hobby",(req,res)=>{
   const sql = "SELECT * FROM hobbies";
   try{db.query(sql, (err, data) => {
    if (err) return res.json(data);
    else return res.json(data);
  });}
  catch(err){
    console.log("server error");
  }
   
});

app.get("/get_user",(req,res)=>{
  const sql = "SELECT * FROM user WHERE role='user'";
  try{db.query(sql, (err, data) => {
   if (err) return res.json(data);
   else return res.json(data);
 });}
 catch(err){
   console.log("server error");
 }
  
});
app.get("/hobby_delete/:id",(req,res)=>{
  const hobbyId = req.params.id;
  const sql = "DELETE FROM hobbies WHERE id = ?";
  try{db.query(sql,[hobbyId] ,(err, data) => {
   if (err) return res.json(data);
   else {
    const sqls = "DELETE FROM user_hobby WHERE hobbies_id = ?";
      db.query(sqls,[hobbyId] ,(err, data) => {
      if (err) return res.json(data);
      else{
        console.log("user_hobby too cleaned");
      }});
    return res.json(data);}
 });}
 catch(err){
   console.log("server error");
 } 
});
app.get("/user_delete/:id",(req,res)=>{
  const userId = req.params.id;
  const sql = "DELETE FROM user WHERE id = ?";
  try{db.query(sql,[userId] ,(err, data) => {
   if (err) return res.json(data);
   else {
    const sqls = "DELETE FROM user_hobby WHERE user_id = ?";
    db.query(sqls,[userId] ,(err, data) => {
      if (err) return res.json(data);
      else{
        console.log("user_hobby too cleaned");
      }});
    return res.json(data);}
 });}
 catch(err){
   console.log("server error");
 } 
});
app.get("/get_a_hobby/:id", (req, res) => {
  const hobbyId = req.params.id;
  const sql = "SELECT * FROM hobbies WHERE id = ?";
  db.query(sql, [hobbyId], (err, data) => {
    if (err) return res.json({ Error: "Error in server" });
    return res.json(data[0]); 
  });
});
app.get("/get_a_user/:id", (req, res) => {
  
  const userId = req.params.id;
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err) return res.json({ Error: "Error in server" });
    return res.json(data[0]); 
  });
});
app.get("/get_a_userme/:id", (req, res) => {
  
  const userId = req.session.uid;
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [userId], (err, data) => {
    if (err) return res.json({ Error: "Error in server" });
    return res.json(data[0]); 
  });
});
app.get("/userhobby/:id", (req, res) => {
  const userId = req.params.id;
  
  const sql = "SELECT * FROM user_hobby WHERE user_id = ?";
  db.query(sql, [userId] , (err, data) => {
    
    if (err) return res.json({ Error: "Error in server" });
    return res.json(data); 
  });
});
app.get("/userhobbyme", (req, res) => {
  const userId = req.session.uid;
  
  const sql = "SELECT * FROM user_hobby WHERE user_id = ?";
  db.query(sql, [userId] , (err, data) => {
    
    if (err) return res.json({ Error: "Error in server" });
    return res.json(data); 
  });
});
app.post("/updatehobby/:id", (req, res) => {
  const hobbyId = req.params.id;
  const { hobby, description } = req.body;
  const sql = "UPDATE hobbies SET name = ?, description = ? WHERE id = ?";
  const values = [hobby, description, hobbyId];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating hobby:", err);
      return res.json({ Error: "Error updating hobby" });
    }
    return res.json({ Status: "Success" });
  });
});
app.post("/updateuser/:id", (req, res) => {
  const userId = req.params.id;
  const { name, email, age, gender,mobileNum,homeNum } = req.body;
  const sql = "UPDATE user SET name = ?, email = ?,age = ?,sex = ?,mobileNum=?,homeNum=? WHERE id = ?";
  const values = [name, email, age, gender, mobileNum,homeNum,userId];
  console.log("Values : ",values);
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.json({ Error: "Error updating user" });
    }
    return res.json({ Status: "Success" });
  });
});
app.post("/updateuserme", (req, res) => {
  const userId = req.session.uid;
  const { name, email, age, gender,mobileNum,homeNum } = req.body;
  const sql = "UPDATE user SET name = ?, email = ?,age = ?,sex = ?,mobileNum=?,homeNum=? WHERE id = ?";
  const values = [name, email, age, gender, mobileNum,homeNum,userId];
  console.log("Values : ",values);
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating user:", err);
      return res.json({ Error: "Error updating user" });
    }
    return res.json({ Status: "Success" });
  });
});
app.post("/savehobbies", (req, res) => {
  const sql = "INSERT INTO `user_hobby` (`user_id`, `hobbies_id`) VALUES ?";
  const values = req.body.values;

  db.query(sql, [values], (err, result) => { 
    if (err) {
      console.log("error: ", err);
      return res.json({ Error: "Error occur in server" });
    }
    return res.json({ Status: "Success" });
  });
});
app.post("/savehobbieslater", (req, res) => {
  const sql = "INSERT INTO `user_hobby` (`user_id`, `hobbies_id`) VALUES ?";
  const values = req.body.values;
  
  console.log("i was called ");
  console.log(values[0][0]);
  const sqls = "DELETE FROM user_hobby WHERE user_id = ?";
  db.query(sqls, [values[0][0]] , (err, data) => {
    
    if (err) {
      console.log(err);
      return res.json({ Error: "Error in server" });}
    else{
      db.query(sql, [values], (err, result) => { 
        if (err) {
          console.log("error: ", err);
          return res.json({ Error: "Error occur in server" });
        }
        return res.json({ Status: "Success" });
      });
    } 
  });
});

app.post("/updatepassword/:id",(req, res) => {
   const userId = req.params.id
  const sql = "UPDATE user SET hash = ? WHERE id = ?";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [
      hash,
      userId  
    ];
    console.log(values); 
    db.query(sql, values, (err, result) => {
     
    if (err){console.log("error : ",err);
    return res.json({ Error: "Error occur in server" });
        
      }
      return res.json({ Status: "Success" });
    });
  });
} 
);

app.post("/updatepassword",(req, res) => {
  const userId = req.session.uid
 const sql = "UPDATE user SET hash = ? WHERE id = ?";
   bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
   if (err) return res.json({ Error: "Error for hashing password" });
   const values = [
     hash,
     userId  
   ];
   console.log(values); 
   db.query(sql, values, (err, result) => {
    
   if (err){console.log("error : ",err);
   return res.json({ Error: "Error occur in server" });
       
     }
     return res.json({ Status: "Success" });
   });
 });
} 
);
app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.clearCookie("connect.sid");
    console.log("User logout...");
    res.redirect("/"); 
  });
});

app.get("/", (req, res) => {

  if(req.session.role){
    return res.json({
      Valid : true,
      Role :req.session.role,
      Userid : req.session.uid
    });
  }
  else{
    return res.json({Valid:false});
  }
  });

app.listen(8080,()=>{
  console.log("listening....");
})    