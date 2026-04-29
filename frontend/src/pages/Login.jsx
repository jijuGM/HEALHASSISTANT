import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { TextField, Button, Container } from "@mui/material";

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleLogin=async()=>{

await signInWithEmailAndPassword(auth,email,password)

alert("Login Success")

}

return(

<Container style={{marginTop:"100px"}}>

<h2>Login</h2>

<TextField
label="Email"
fullWidth
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<TextField
label="Password"
type="password"
fullWidth
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<Button
variant="contained"
onClick={handleLogin}
>

Login

</Button>

</Container>

)

}