import { useState,useContext,useEffect } from "react";
import { Context } from "./context";
import { imageUrl } from "./imageUrl";
import { API_BASE_URL } from "./apiConfig";

export const Wishlist = () => {
    
   const {id,setid}=useContext(Context)
    const [mywishlist, setmywishlist] = useState([])

  const show = async () => {
    if (!id) return
    try {
      const result = await fetch(`${API_BASE_URL}/api/wishlistget/${id}`)
      if (result.ok) {
        const res = await result.json()
        if (res.statuscode === 1) {
          setmywishlist(res.Data || [])
        }
      }
    } catch (err) {
      console.error("Error loading wishlist:", err)
    }
  }

  useEffect(() => {
    show()
  }, [id])

  const totalValue = '$450';

  return (
   
    <section className="bg-light py-5">
       <h1>Wishlist</h1>
      <div className="container">
        <div className="card border-0 bg-dark text-white shadow-lg rounded-4 mb-4 overflow-hidden">
          <div className="card-body p-4 p-md-5">
            <div className="row align-items-center g-4">
              <div className="col-lg-8">
                <span className="badge text-bg-primary text-uppercase rounded-pill px-3 py-2">Saved for later</span>
                <h1 className="display-6 fw-bold mt-3 mb-3">Your wishlist is full of favorites.</h1>
                <p className="lead text-white-50 mb-4">
              Keep track of the pieces you love and move them into your cart whenever you are ready.
                </p>
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <a href="#" className="btn btn-primary rounded-pill px-4">
                    Continue shopping
                  </a>
                  <span className="badge rounded-pill text-bg-secondary px-3 py-2">3 items ready</span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="row g-3">
                  <div className="col-6 col-lg-12">
                    <div className="border border-secondary rounded-3 p-3 h-100 bg-black bg-opacity-25">
                      <strong className="d-block fs-4">3</strong>
                      <span className="text-white-50 small">Saved items</span>
                    </div>
                  </div>
                  <div className="col-6 col-lg-12">
                    <div className="border border-secondary rounded-3 p-3 h-100 bg-black bg-opacity-25">
                      <strong className="d-block fs-4">{totalValue}</strong>
                      <span className="text-white-50 small">Estimated value</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
    {
       mywishlist.map((a)=>
      <div className="col">
        <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="ratio ratio-4x3 bg-white">
            <img className="w-100 h-100 object-fit-contain p-3" src={imageUrl(a.Img)} alt={a.Name} />
          </div>
          <div className="card-body d-flex flex-column p-4">
            <h3 className="h5 card-title fw-semibold text-dark mb-2">{a.Name}</h3>
            <p className="fs-5 fw-bold text-primary mb-0">{a.Price}</p>
          </div>
        </div>
      </div>
    )} 
    </div>
       
      </div>
    </section>
  );
};
