import { useEffect, useState } from "react"
import { API_BASE_URL } from "./apiConfig"

export const Category = () => {
    const [name, setname] = useState()
    const [image, setimage] = useState()
    const [cat, setcat] = useState([])
    const [bname, setbname] = useState()
    const [img2, setimg2] = useState()
    const [category, setcategory] = useState()
    useEffect(() => {
        show()
    }, [])

    const addcategory = async (e) => {
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append("name", name)
            formdata.append("pic", image)
            const result = await fetch(`${API_BASE_URL}/api/category`, {
                method: "post",
                body: formdata
            })
            const res = await result.json()
            if (res.statuscode === 1) {
                alert("Category added successfully!")
                show()
            } else {
                alert(res.message || "Failed to add category.")
            }
        } catch (err) {
            console.error("Add category error:", err)
            alert("Network error: Unable to connect to server.")
        }
    }
    const show = async () => {
        try {
            const result = await fetch(`${API_BASE_URL}/api/getcategory`)
            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    setcat(res.data || [])
                }
            }
        } catch (err) {
            console.error("Error loading categories:", err)
        }
    }
    const addbrand = async (e) => {
        e.preventDefault()
        try {
            const formdata2 = new FormData()
            formdata2.append("bname", bname)
            formdata2.append("pic", img2)
            formdata2.append("cat", category)
            const result = await fetch(`${API_BASE_URL}/api/addbrand`, {
                method: "post",
                body: formdata2
            })
            const res = await result.json()
            if (res.statuscode === 1) {
                alert("Brand added successfully!")
            } else {
                alert(res.message || "Failed to add brand.")
            }
        } catch (err) {
            console.error("Add brand error:", err)
            alert("Network error: Unable to connect to server.")
        }
    }
    return (
        <>
            <div class="breadcrumb-section">
                <div class="container">
                    <h2>Customer's login</h2>
                    <nav class="theme-breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li class="breadcrumb-item active">Category</li>
                        </ol>
                    </nav>
                </div>
            </div>




            <section class="login-page section-b-space">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <h3>category</h3>
                            <div class="theme-card">
                                <form class="theme-form">
                                    <div class="form-box">
                                        <label for="email" class="form-label" >Name</label>
                                        <input type="text" class="form-control" id="email" placeholder="Enter Category Name" required="" onChange={(e) => setname(e.target.value)} />
                                    </div>
                                    <div class="form-box">
                                        <label for="review" class="form-label">Image</label>
                                        <input type="file" class="form-control" id="review" required="" onChange={(e) => setimage(e.target.files[0])} />
                                    </div>
                                    <button class="btn btn-solid" onClick={addcategory}>Add</button>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <h3>Brand</h3>
                            <div class="theme-card">
                                <form class="theme-form">
                                    <div class="form-box">
                                        <label for="email" class="form-label" >Brand Name</label>
                                        <input type="text" class="form-control" id="email" placeholder="Enter Brand Name" required="" onChange={(e) => setbname(e.target.value)} />
                                    </div>
                                    <div class="form-box">
                                        <select class="form-select mb-3" onChange={(e) => setcategory(e.target.value)}>
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
                                        <label for="review" class="form-label">Image</label>
                                        <input type="file" class="form-control" id="review" required="" onChange={(e) => setimg2(e.target.files[0])} />
                                    </div>
                                    <button class="btn btn-solid" onClick={addbrand}>Add</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
