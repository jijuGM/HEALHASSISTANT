import { BrowserRouter, Routes, Route } from "react-router-dom"

import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Footer from "./components/Footer"
function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Landing/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>


</Routes>
 <Footer />
</BrowserRouter>

)

}

export default App