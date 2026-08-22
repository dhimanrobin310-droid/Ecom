import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import "./related.css"
import { imageUrl } from "./imageUrl"
import { API_BASE_URL } from "./apiConfig"

export const Related =()=>{
    const[rel,setrel]=useState([])
    const [cid]=useSearchParams()
    const idd=cid.get("cid")
     const[brand,setbrand]=useState([])
    useEffect(()=>{
       
            show();
            show2();
     
    },[])

    const show= async()=>{
        const result=await fetch(`${API_BASE_URL}/api/related/${idd}`,{
            method:"get"
            
        })
        if(result){
            const res=await result.json()
            if(res.statuscode===1){
                setrel(res.Data)
            }
            else{
                alert("nothing to show")
            }
        }
    }
    const show2= async()=>{
        const result=await fetch(`${API_BASE_URL}/api/getbrand/${idd}`,{
            method:"get"
            
        })
        if(result){
            const res=await result.json()
            if(res.statuscode===1){
                setbrand(res.data)
            }
            else{
                alert("nothing to show")
            }
        }
    }

return (
    <>
     <div className="row">
  {
    brand.map((a) =>
      <div className="col-12 col-sm-6 col-lg-3" key={a._id}>
        <img src={imageUrl(a.Image)} alt={a.Name} className="img-fluid" />
        <p>{a.Name}</p>
      </div>
    )
  }
</div>
    <section className="related-page py-5">
        
        <div className="container">
            <div className="text-center mb-5">
                <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 mb-3">
                    Recommended
                </span>
                <h1 className="fw-bold mb-2">Related Products</h1>
                <p className="text-muted mx-auto related-subtitle">
                    Products you may also like from this category.
                </p>
            </div>

            <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {
                    rel.map((a)=>
                        <div className="col" key={a._id}>
                            <div className="card h-100 border-0 shadow-sm related-card">
                                <div className="related-img-box bg-light">
                                    <img
                                        src={imageUrl(a.Image)}
                                        className="card-img-top related-img"
                                        alt={a.Name}
                                    />
                                </div>

                                <div className="card-body d-flex flex-column p-4">
                                    <h5 className="card-title fw-bold mb-2">{a.Name}</h5>
                                    <p className="card-text text-muted small flex-grow-1">{a.Detail}</p>

                                    <div className="d-flex align-items-center justify-content-between gap-3 mt-3 pt-3 border-top">
                                        <div>
                                            <div className="fw-bold text-danger fs-5">${a.SalePrice}</div>
                                            <div className="text-muted small text-decoration-line-through">${a.Price}</div>
                                        </div>
                                        <Link
                                            to={`/productdetail?pid=${a._id}`}
                                            className="btn btn-outline-dark btn-sm rounded-pill px-3"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </section>
 
    </>
)
}
