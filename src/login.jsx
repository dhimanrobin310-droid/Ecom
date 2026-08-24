import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "./context"
import { API_BASE_URL } from "./apiConfig"
import { Link } from "react-router-dom"
export const Login=()=>{

    const [email,setemail]=useState("")
    const[password,setpassword]=useState()
    const{utype,setutype}=useContext(Context)
    const navigate=useNavigate()


    const login=async(e)=>{ 
        e.preventDefault()
        if (!email || !password) {
            alert("Please enter both email and password.")
            return
        }
        try {
            const data={email,password}
            const result=await fetch(`${API_BASE_URL}/api/login`,{
                method:"post",
                body:JSON.stringify(data),
                headers:{"Content-Type":"application/json"}
            })
            const res=await result.json()
            if(res.statuscode===1){
                alert("Login successful!")
                localStorage.setItem("data",JSON.stringify(res.jwtoken))
                if (res.data && res.data.UserType) {
                    setutype(res.data.UserType)
                }
                navigate("/")
            }
            else{
                alert(res.message || "Invalid email or password.")
            }
        } catch (err) {
            console.error("Login error:", err)
            alert("Network error: Unable to connect to server. Please check your backend connection.")
        }
    }
    return(
    <>
     <div class="breadcrumb-section">
        <div class="container">
            <h2>Customer's login</h2>
            <nav class="theme-breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Customer's login</li>
                </ol>
            </nav>
        </div>
    </div>
    



    
    <section class="login-page section-b-space">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 pt-5">
                    <h3>Login</h3>
                    <div class="theme-card">
                        <form class="theme-form">
                            <div class="form-box">
                                <label for="email" class="form-label" ></label>
                                <input type="text" class="form-control" id="email" placeholder="Email" required="" onChange={(e)=>setemail(e.target.value)}/>
                            </div>
                            <div class="form-box">
                                <label for="review" class="form-label">Password</label>
                                <input type="password" class="form-control" id="review" placeholder="Enter your password" required="" onChange={(e)=>setpassword(e.target.value)}/>
                            </div>
                            <button class="btn btn-solid" onClick={login}>Login</button>
                        </form>
                    </div>
                </div>
                <div class="col-lg-6 right-login">
                    <h3>New Customer</h3>
                    <div class="theme-card authentication-right">
                        <h6 class="title-font">Create A Account</h6>
                        <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                            able to order from our shop. To start shopping click register.</p>
                        <Link to="/register" class="btn btn-solid">
                            Create an Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    </>
    )
}
