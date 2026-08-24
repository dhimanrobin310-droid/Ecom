import { useNavigate } from "react-router-dom"

export const Register=()=>{
const [firstname,setfirstname]=useState("")
const [lastname,setlastname]=useState("")
const [password,setpassword]=useState("")
const[email,setemail]=useState("")
const navigate = useNavigate()

const add = async(e)=>{
    e.preventDefault()
    if (!firstname || !lastname || !email || !password) {
        alert("Please fill in all fields.")
        return
    }
    try {
        const result = await fetch(`${API_BASE_URL}/api/register`,{
            method: "post",
            body: JSON.stringify({firstname, lastname, password, email}),
            headers: {"Content-Type": "application/json;charset=UTF-8"}
        })  
        const res = await result.json()
        if (res.statuscode === 1) {
            alert("Account created successfully! Please login.")
            navigate("/login")
        } else {
            alert(res.message || "Failed to create account.")
        }
    } catch (err) {
        console.error("Registration error:", err)
        alert("Network error: Unable to connect to server. Please check your backend connection.")
    }
}


    return(
          <section class="login-page section-b-space">
        <div class="container">
            <h3>create account</h3>
            <div class="theme-card">
                <form class="theme-form">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="email" class="form-label ">First Name</label>
                                <input type="text" class="form-control" id="fname" placeholder="First Name" required="" onChange={(e)=>setfirstname(e.target.value)}/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="review" class="form-label" >Last Name</label>
                                <input type="text" class="form-control" id="lname" placeholder="Last Name" required="" onChange={(e)=> setlastname(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="email" class="form-label" >email</label>
                                <input type="text" class="form-control" id="email" placeholder="Email" required="" onChange={(e)=>setemail(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-box">
                                <label for="review" class="form-label" >Password</label>
                                <input type="password" class="form-control" id="review" placeholder="Enter your password" required="" onChange={(e)=>setpassword(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-solid w-auto" onClick={add} >create Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
    )
}
