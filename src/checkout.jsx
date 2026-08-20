import { useState,useEffect } from "react"
import {useContext} from "react"
import { Context } from "./context"
import { data, useLocation } from "react-router-dom"
import { imageUrl } from "./imageUrl"


export const Check =()=>{
    const [mail,setmail]=useState("")
    const [fname , setfname]=useState("")
    const [lname,setlname]=useState("")
    const [address,setaddress]=useState("")
    const [country ,setcountry]=useState("")
    const [city,setcity]=useState("")
    const [state,setstate]=useState("")
    const [zip,setzip]=useState("")
    const [ph , setph]=useState("")
    const location=useLocation()
     const { totalprice } = location.state || {};
    const [payment,setpayment]=useState("")
    const [products,setproducts]=useState([])
    const {id,setid}=useContext(Context)
    
    const placeorder=async()=>{
          const items = products.map(item => ({
            ProductName: item.Name,
            Quantity: item.Quantity,
            Price: item.Price,
            Img:item.Img,
        
        }))
    const data ={mail,fname,lname,address,country,city,state,zip,ph,payment,id,data:items}
    const result = await fetch("/api/checkout",{
        method:"post",
        body:JSON.stringify(data),
        headers: { "Content-type": "application/json;charset=UTF-8" }

    })
    const res = await result.json()
    if(res.statuscode===1){
        alert("checkout successfull")
    }
    else{
        alert("checkout failed")
    }
}
const show = async () => {
        const result = await fetch(`/api/cartget/${id}`, {
            method: "get"
        })
        if (result.ok) {
            const res = await result.json()
            if (res.statuscode === 1) {
                setproducts(res.Data)
            }
            else {
                alert("error")
            }
        }
    }
    useEffect(()=>{
        show()
    },[])
    return(
        <main className="checkout-page">
            <section className="checkout-topbar">
                <div className="container checkout-topbar-inner">
                    <a className="checkout-back" href="/cart">← Back to cart</a>
                    <div className="checkout-brand">Multikart <span>Store</span></div>
                    <div className="checkout-secure">Secure checkout</div>
                </div>
            </section>

            <section className="container checkout-shell">
                <div className="checkout-heading">
                    <p className="checkout-kicker">Almost there</p>
                    <h1>Checkout</h1>
                    <p>A few final details and your order will be on its way.</p>
                </div>

                <div className="checkout-progress">
                    <span className="active"><b>1</b> Details</span><i />
                    <span className="active"><b>2</b> Payment</span><i />
                    <span><b>3</b> Complete</span>
                </div>

                <div className="checkout-layout">
                    <div className="checkout-form">
                        <section className="checkout-card">
                            <div className="checkout-section-title">
                                <span className="checkout-step">1</span>
                                <div><h2>Contact information</h2><p>Where should we send your order updates?</p></div>
                            </div>
                            <label>Email address<input  type="email" placeholder="you@example.com" onChange={(e) => setmail(e.target.value)} /></label>
                            <label className="checkout-check"><input type="checkbox" defaultChecked /><span>Keep me updated on new arrivals and exclusive offers</span></label>
                        </section>

                        <section className="checkout-card">
                            <div className="checkout-section-title">
                                <span className="checkout-step">2</span>
                                <div><h2>Delivery address</h2><p>We’ll use this to ship your order.</p></div>
                            </div>
                            <div className="checkout-fields two">
                                <label>First name<input value={fname} onChange={(event) => setfname(event.target.value)} placeholder="Alex" /></label>
                                <label>Last name<input value={lname} onChange={(event) => setlname(event.target.value)} placeholder="Morgan" /></label>
                            </div>
                            <label>Address<input value={address} onChange={(event) => setaddress(event.target.value)} placeholder="123 Market Street" /></label>
                            <label>Country
                                <select value={country} onChange={(event) => setcountry(event.target.value)}>
                                    <option value="" disabled>Select country</option><option>United States</option><option>Canada</option><option>United Kingdom</option><option>Australia</option><option>India</option>
                                </select>
                            </label>
                            <div className="checkout-fields location">
                                <label>City<input value={city} onChange={(event) => setcity(event.target.value)} placeholder="San Francisco" /></label>
                                <label>State
                                    <select value={state} onChange={(event) => setstate(event.target.value)}>
                                        <option value="" disabled>Select</option><option>California</option><option>New York</option><option>Texas</option>
                                    </select>
                                </label>
                                <label>ZIP code<input value={zip} onChange={(event) => setzip(event.target.value)} placeholder="94103" /></label>
                            </div>
                            <label>Phone number<input type="tel" value={ph} onChange={(event) => setph(event.target.value)} placeholder="(555) 000-0000" /></label>
                        </section>

                        <section className="checkout-card">
                            <div className="checkout-section-title">
                                <span className="checkout-step">3</span>
                                <div><h2>Payment</h2><p>Your payment information is encrypted and secure.</p></div>
                            </div>
                            <div className="checkout-payment-options">
                                <label className="selected"><input type="radio" name="payment" defaultChecked /><span>Credit or debit card</span><b>VISA</b><b>MC</b></label>
                                <label><input type="radio" name="payment" onChange={(e)=>setpayment("card")} /><span>PayPal</span><strong>PayPal</strong></label>
                                <label><input type="radio" name="payment"  onChange={(event) => setpayment("cash on delivery")} /><span>Cash on delivery</span><strong>COD</strong></label>
                            </div>
                            <div className="checkout-card-fields">
                                <label>Name on card<input placeholder="Alex Morgan" /></label>
                                <label>Card number<input inputMode="numeric" placeholder="1234  5678  9012  3456" /></label>
                                <div className="checkout-fields two"><label>Expiration date<input placeholder="MM / YY" /></label><label>Security code<input inputMode="numeric" placeholder="CVC" /></label></div>
                            </div>
                        </section>

                        <button className="checkout-primary" type="button" onClick={placeorder}>Place secure order <span>→</span></button>
                        <p className="checkout-terms">By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
                    </div>

                    <aside className="checkout-order-card">
                        <div className="checkout-order-header"><div><p>Order summary</p><h2>2 items</h2></div><a href="/cart">Edit cart</a></div>
                        <div className="checkout-order-items">
                            {products.map((product) => (
                                <article className="checkout-order-item" key={product.id}>
                                    <div className="checkout-product-image"> <img src={imageUrl(product.Img)} alt={product.Name}></img>
<span>1</span></div>
                                    <div><h3>{product.Name}</h3></div><strong>{product.Price}</strong>
                                </article>
                            ))}
                        </div>
                        <div className="checkout-discount"><input placeholder="Discount code" /><button type="button">Apply</button></div>
                        <div className="checkout-totals"><div><span>Subtotal</span><strong>$113.00</strong></div><div><span>Shipping</span><strong>Free</strong></div><div className="checkout-grand-total"><span>Total</span><strong>{totalprice}</strong></div></div>
                        <div className="checkout-assurance"><span>✦</span><p><b>Easy returns</b><br />30-day returns on eligible items.</p></div>
                    </aside>
                </div>
            </section>
        </main>
    )
}
