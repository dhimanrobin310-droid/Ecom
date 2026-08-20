import { useState } from "react"

export const Contact=()=>{
    const[fullname,setfullname]=useState()
    const[email,setemail]=useState()
    const[phone,setphone]=useState()
    const[subject,setsubject]=useState()
    const[message,setmessage]=useState()

    const send=async(e)=>{
      e.preventDefault()
      const result=await fetch("/api/contactus",{
         method:"post",
         body:JSON.stringify({fullname,email,phone,subject,message}),
        headers :{"Content-type":"application/json;charset=UTF-8"}, 
      })
      if(result){
        const res =await result.json()
            if(res.statuscode===1){
            alert("Message sent")
            }
        else{
            alert("error")
        }
      }
    }
    return(
        <>
        <div class="breadcrumb-section">
        <div class="container">
            <h2>Contact us</h2>
            <nav class="theme-breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="index.html">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Contact us</li>
                </ol>
            </nav>
        </div>
    </div>
    


    
    <section class="contact-page">
        <div class="container">
            <div class="row g-sm-4 g-3">
                <div class="col-lg-5">
                    <div class="contact-title">
                        <h2>Get In Touch</h2>
                        <p>We're here to help! Reach out to us with any questions, feedback, or inquiries, and we'll get
                            back to you as soon as possible.</p>
                    </div>
                </div>
                <div class="col-lg-7">
                    <form class="theme-form contact-form">
                        <div class="row g-4">
                            <div class="col-12">
                                <div class="form-box">
                                    <label for="name" class="form-label">Full Name</label>
                                    <input type="text" id="name" class="form-control" placeholder="Full Name" onChange={(e)=>setfullname(e.target.value)}/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-box">
                                    <label for="email">Email</label>
                                    <input type="email" id="email" class="form-control" placeholder="Email" onChange={(e)=>setemail(e.target.value)}/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-box">
                                    <label for="review">Phone</label>
                                    <input type="number" id="review" class="form-control" placeholder="Enter Your Phone Number" onChange={(e)=>setphone(e.target.value)}/>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-box">
                                    <label for="email">Subject</label>
                                    <input type="text" id="last-name" class="form-control" placeholder="Subject" onChange={(e)=>setsubject(e.target.value)}/>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-box">
                                    <label for="review">Write Your Message</label>
                                    <textarea rows="6" class="form-control" placeholder="Write Your Message" onChange={(e)=>setmessage(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-box">
                                    <button class="btn btn-solid" type="button" onClick={send}>Send Your Message</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-12">
                    <div class="contact-right">
                        <ul>
                            <li>
                                <div class="contact-icon">
                                    <i class="ri-phone-fill"></i>
                                </div>
                                <div class="media-body">
                                    <h6>Contact Us</h6>
                                    <p>+91 123 - 456 - 7890</p>
                                </div>
                            </li>
                            <li>
                                <div class="contact-icon">
                                    <i class="ri-map-pin-fill"></i>
                                </div>
                                <div class="media-body">
                                    <h6>Address</h6>
                                    <p>ABC Complex,Near xyz, New York</p>
                                </div>
                            </li>
                            <li>
                                <div class="contact-icon">
                                    <i class="ri-mail-fill"></i>
                                </div>
                                <div class="media-body">
                                    <h6>Email</h6>
                                    <p>support@multikart.com</p>
                                </div>
                            </li>
                            <li>
                                <div class="contact-icon">
                                    <i class="ri-cellphone-fill"></i>
                                </div>
                                <div class="media-body">
                                    <h6>Fax</h6>
                                    <p>support@multikart.com</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    


    
    <section class="map-section">
        <iframe frameborder="0" class="w-100 h-100" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1605.811957341231!2d25.45976406005396!3d36.3940974010114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1550912388321"></iframe>
    </section>
    
        </>
    )
}
