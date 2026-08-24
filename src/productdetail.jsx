import { useEffect, useState, useContext } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Context } from "./context"
import { imageUrl } from "./imageUrl"
import { API_BASE_URL } from "./apiConfig"


export const Detail = () => {
    const [pi] = useSearchParams()
  
    const prr = pi.get("pid")
    const [pro, setpro] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [value, setValue] = useState()
    const [img, setimg] = useState()
    const [name, setname] = useState()
    const [price, setprice] = useState()
    const [salePrice, setSalePrice] = useState()
    const [detail, setDetail] = useState()
  
     const [id, setId] = useState()
    const navigate=useNavigate()
   
     useEffect(() => {
  
        show()
        const info = JSON.parse(localStorage.getItem("data"))
    if (info) {
      const parts = info.split(".")
      if (parts.length === 3) {
        const payload = parts[1]
        const enc = payload.replace(/-/g, '+').replace(/_/g, '/')
        const str = atob(enc)
        const decode = JSON.parse(str)
       
        setId(decode.id)
      
      }
    }
      
    }, [ ])
 const go = async () => {
        try {
            const data = { value, img, name, price, salePrice, detail, id }
            const result = await fetch(`${API_BASE_URL}/api/cartdata`, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json;charset=UTF-8" }
            })
            const res = await result.json()
            if (res.statuscode === 1) {
                alert("Product added to cart successfully.")
                navigate(`/cart`)
            } else {
                alert(res.message || "Failed to add product to cart.")
            }
        } catch (err) {
            console.error("Cart error:", err)
            alert("Network error: Unable to add product to cart.")
        }
    }
    
    const show = async () => {
        if (!prr) return
        try {
            const result = await fetch(`${API_BASE_URL}/api/getproduct/${prr}`)
            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1 && res.data) {
                    setpro(res.data)
                    setname(res.data.Name)
                    setprice(res.data.Price)
                    setSalePrice(res.data.SalePrice) 
                    setDetail(res.data.Detail)
                    setimg(res.data.Image)
                }
            }
        } catch (err) {
            console.error("Error loading product:", err)
        }
    }

    const addwish = async()=>{
        try {
            const result = await fetch(`${API_BASE_URL}/api/wishlistdata`,{
                method: "post",
                body: JSON.stringify({name, price, img, id}),
                headers: { "Content-Type": "application/json;charset=UTF-8" }
            })
            const res = await result.json()
            if (res.statuscode === 1) {
                alert("Product added to wishlist successfully.")
            } else {
                alert(res.message || "Failed to add to wishlist.")
            }
        } catch (err) {
            console.error("Wishlist error:", err)
            alert("Network error: Unable to add to wishlist.")
        }
    }

    // const decreaseQuantity = () => {
    //     setQuantity((current) => Math.max(1, current - 1))
    // }

    // const increaseQuantity = () => {
    //     setQuantity((current) => Math.min(10, current + 1))
    // }

    return (
    
<>

<div className="container py-5">
  <div className="row g-5">

    {/* Product Image Section */}
    <div className="col-12 col-md-6">
      <div 
        className="d-flex justify-content-center align-items-center rounded-lg shadow-sm p-4"
        style={{ backgroundColor: "#f8f9fa", minHeight: "500px" }}
      >
        <img
          src={imageUrl(pro.Image)}
          alt={pro.Name}
          className="img-fluid"
          style={{ maxHeight: "450px", maxWidth: "100%", objectFit: "contain" }}
        />
      </div>
    </div>

    {/* Product Details Section */}
    <div className="col-12 col-md-6">
      
      {/* Product Name */}
      <h1 className="fw-bold mb-2" style={{ fontSize: "28px", color: "#212529" }}>
        {pro.Name}
      </h1>

      {/* Price Section */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <h2 className="fw-bold mb-0" style={{ color: "#dc3545", fontSize: "32px" }}>
          ₹{pro.SalePrice}
        </h2>
        <h5 className="text-muted mb-0 text-decoration-line-through" style={{ fontSize: "18px" }}>
          ₹{pro.Price}
        </h5>
        <span 
          className="badge"
          style={{ 
            backgroundColor: "#dc3545", 
            fontSize: "12px",
            padding: "6px 10px"
          }}
        >
          Sale
        </span>
      </div>

      <hr className="my-3" />

      {/* Description */}
      <p className="text-secondary mb-4" style={{ fontSize: "15px", lineHeight: "1.6" }}>
        {pro.Detail}
      </p>
      <input type="number" value={quantity} onChange={(e) => setValue(e.target.value)} />

      {/* Info Cards */}
      <div className="row mb-4">
        <div className="col-6 mb-3">
          <div className="p-3 rounded" style={{ backgroundColor: "#e8f5e9", border: "1px solid #c8e6c9" }}>
            <p className="mb-1" style={{ fontSize: "12px", color: "#666" }}>Availability</p>
            <p className="mb-0 fw-bold" style={{ color: "#2e7d32" }}>In Stock</p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="p-3 rounded" style={{ backgroundColor: "#e3f2fd", border: "1px solid #bbdefb" }}>
            <p className="mb-1" style={{ fontSize: "12px", color: "#666" }}>Delivery</p>
            <p className="mb-0 fw-bold" style={{ color: "#1565c0" }}>Free Delivery</p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="p-3 rounded" style={{ backgroundColor: "#fff3e0", border: "1px solid #ffe0b2" }}>
            <p className="mb-1" style={{ fontSize: "12px", color: "#666" }}>Returns</p>
            <p className="mb-0 fw-bold" style={{ color: "#e65100" }}>7 Days</p>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="p-3 rounded" style={{ backgroundColor: "#fce4ec", border: "1px solid #f8bbd0" }}>
            <p className="mb-1" style={{ fontSize: "12px", color: "#666" }}>Warranty</p>
            <p className="mb-0 fw-bold" style={{ color: "#c2185b" }}>Included</p>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Action Buttons */}
      <div className="d-grid gap-3 mb-4">
        <button 
          className="btn btn-lg fw-bold"
          style={{ 
            backgroundColor: "#ff9800",
            border: "none",
            color: "white",
            padding: "12px 24px",
            fontSize: "16px"
          }}
          onClick={go}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#e68900"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#ff9800"}
        >
          🛒 Add to Cart
        </button>

        <button 
          className="btn btn-lg fw-bold"
          style={{ 
            backgroundColor: "#4caf50",
            border: "none",
            color: "white",
            padding: "12px 24px",
            fontSize: "16px"
          }}
          onClick={addwish}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#45a049"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#4caf50"}
        >
          ⚡ WishList
        </button>
      </div>

      {/* Additional Info */}
      <div className="p-3 rounded" style={{ backgroundColor: "#f5f5f5" }}>
        <p className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
          <span className="me-2">✓</span>
          Authentic product guaranteed
        </p>
        <p className="mb-2" style={{ fontSize: "14px", color: "#666" }}>
          <span className="me-2">✓</span>
          Secure checkout
        </p>
        <p className="mb-0" style={{ fontSize: "14px", color: "#666" }}>
          <span className="me-2">✓</span>
          Customer support available 24/7
        </p>
      </div>

    </div>

  </div>
</div>

</>
    
    )
}
