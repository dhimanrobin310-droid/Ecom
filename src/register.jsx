import { useState } from "react"
import { API_BASE_URL } from "./apiConfig"

export const Register=()=>{
const [firstname,setfirstname]=useState()
const [lastname,setlastname]=useState()
const [password,setpassword]=useState()
const[email,setemail]=useState()

const add = async(e)=>{
    e.preventDefault()
  const result= await fetch(`${API_BASE_URL}/api/register`,{
    method:"post",
    body:JSON.stringify({firstname,lastname,password,email}),
    headers:{"Content-type":"application/json;charset=UTF-8"}
  })  
  if(result){
    const res=await result.json()
    if(res.statuscode===1){
        alert("added")
    }
    else{
        alert("error")
    }
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
