import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { TextField, Button, Container } from "@mui/material";

export default function Signup(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleSignup=async()=>{

await createUserWithEmailAndPassword(auth,email,password)

alert("Account Created")

}

return(

<Container style={{marginTop:"100px"}}>

<h2>Signup</h2>

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
onClick={handleSignup}
>

Signup

</Button>

</Container>

)

}