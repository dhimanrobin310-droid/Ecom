import { useContext, useEffect, useState } from "react"
import{Context}from "./context"
import { useNavigate } from "react-router-dom"
export const Addproduct = () => {

    const [name, setname] = useState()
    const [price, setprice] = useState()
    const [detail, setdetail] = useState()
    const [img, setimg] = useState()
    const [brand, setbrand] = useState()
    const [saleprice, setsaleprice] = useState()
    const [cate, setcate] = useState("")
    const [bid, setbid] = useState("")
    const [sale, setsale] = useState(false)
    const [cat, setcat] = useState([])
    const [brand2, setbrand2] = useState([])
    const {utype,setutype}=useContext(Context)
    const navigate=useNavigate()

    useEffect(() => {
        show2();
    }, [])
    useEffect(() => {
        show()
    }, [bid])


    const show = async () => {
        const result = await fetch(`/api/getbrand/${bid}`, {
            method: "get",
        })
        if (result) {
            const res = await result.json()
            if (res.statuscode === 1) {

                setbrand2(res.data)
            }
            else {
                alert("error")
            }
        }
    }
    const show2 = async () => {
        const result = await fetch("/api/getcategory", {
            method: "get",
        })
        if (result) {
            const res = await result.json()
            if (res.statuscode === 1) {
                setcat(res.data)
            }
            else {
                alert("error")
            }
        }
    }

    const add = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append("cate", cate)
        formdata.append("brand", brand)
        formdata.append("name", name)
        formdata.append("price", price)
        formdata.append("detail", detail)
        formdata.append("pic", img)
        formdata.append("saleprice", saleprice)
        formdata.append("sale", sale)
        const result = await fetch("/api/addpro", {
        method: "post",
        body: formdata,


        })
        if (result) {
            const res = await result.json()
            if (res.statuscode === 1) {
                alert("added")
            }
            else {
                alert("error")
            }
        }
    }

    const ab=(e)=>{
        setsale(true)
    }
    return (
      <>
      {
        utype ==="Admin" ?  <>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6">
                        <h3>Add Product</h3>
                        <div class="theme-card">
                            <div class="theme-form">
                                <div class="form-box">
                                    <select class="form-select mb-3" onChange={(e) => {
                                        setcate(e.target.value)
                                        setbid(e.target.value)
                                    }}>
                                        <option>Select category</option>
                                        {
                                            cat.map((a) =>
                                                <>

                                                    <option value={a._id}>{a.Name}</option></>
                                            )
                                        }
                                    </select>
                                </div>
                                <div class="form-box">
                                    <select class="form-select mb-3" onChange={(e) => setbrand(e.target.value)}>
                                        <option>Select category</option>
                                        {
                                            brand2.map((a) =>
                                                <>

                                                    <option value={a._id}>{a.Name}</option>
                                                </>
                                            )
                                        }
                                    </select>
                                </div>
                                <div class="form-box">
                                    <label for="email" class="form-label" >Name</label>
                                    <input type="text" class="form-control" id="email" placeholder="Product Name" required="" onChange={(e) => setname(e.target.value)} />
                                </div>
                                <div class="form-box">
                                    <label for="review" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="review" placeholder="Enter Price" required="" onChange={(e) => setprice(e.target.value)} />
                                </div>
                                <div class="form-box">
                                    <label for="review" class="form-label">Detail</label>
                                    <input type="text" class="form-control" id="review" placeholder="Product Detail" required="" onChange={(e) => setdetail(e.target.value)} />
                                </div>
                                <div class="form-box">
                                    <label for="review" class="form-label">Image</label>
                                    <input type="File" class="form-control" id="review" placeholder="Image" required="" onChange={(e) => setimg(e.target.files[0])} />
                                </div>
                                <input type="checkbox" onChange={ab}></input>
                                <div class="form-box">
                                    <label for="review" class="form-label">Sale Price</label>
                                    <input type="text" class="form-control" id="review" placeholder="Enter Sale Price" required="" onChange={(e) => setsaleprice(e.target.value)} />
                                </div>
                                <button class="btn btn-solid" onClick={add}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>:navigate("/")
      }
      </>
    )
}
