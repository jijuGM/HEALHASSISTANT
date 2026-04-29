import { useState } from "react";
import { askAI } from "../services/api";
import "./HealthForm.css";

export default function HealthForm(){

const [question,setQuestion] = useState("")
const [sleep,setSleep] = useState(6)
const [stress,setStress] = useState("low")
const [cycle,setCycle] = useState("follicular")
const [craving,setCraving] = useState("sweet")

const [response,setResponse] = useState("")
const [loading,setLoading] = useState(false)

const handleSubmit = async(e)=>{

e.preventDefault()
setLoading(true)

const res = await askAI({
question,
sleep,
stress,
cycle_phase:cycle,
craving
})

setResponse(res.data.advice)
setLoading(false)

}

return(

<div>

<form className="form" onSubmit={handleSubmit}>

<input
placeholder="Ask something about cravings..."
onChange={(e)=>setQuestion(e.target.value)}
/>

<div className="row">

<input
type="number"
value={sleep}
onChange={(e)=>setSleep(e.target.value)}
placeholder="Sleep"
/>

<select onChange={(e)=>setStress(e.target.value)}>
<option value="low">Low Stress</option>
<option value="medium">Medium</option>
<option value="high">High</option>
</select>

</div>

<div className="row">

<select onChange={(e)=>setCycle(e.target.value)}>
<option value="follicular">Follicular</option>
<option value="luteal">Luteal</option>
<option value="ovulation">Ovulation</option>
</select>

<select onChange={(e)=>setCraving(e.target.value)}>
<option value="sweet">Sweet</option>
<option value="salty">Salty</option>
<option value="carb">Carb</option>
</select>

</div>

<button type="submit">
{loading ? "Thinking..." : "Ask AI"}
</button>

</form>

{response && (

<div className="response">

<h3>AI Advice</h3>

<div className="bubble">
{response}
</div>

</div>

)}

</div>

)
}