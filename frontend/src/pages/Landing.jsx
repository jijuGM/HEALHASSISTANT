import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing(){

return(

<Container style={{textAlign:"center",marginTop:"120px"}}>

<Typography variant="h2">
PCOD AI Assistant
</Typography>

<Typography variant="h6" style={{marginTop:"20px"}}>
AI powered craving and nutrition advisor
</Typography>

<div style={{marginTop:"40px"}}>

<Button
variant="contained"
component={Link}
to="/login"
style={{marginRight:"10px"}}
>

Login

</Button>

<Button
variant="outlined"
component={Link}
to="/signup"
>

Sign Up

</Button>

</div>

</Container>

)

}