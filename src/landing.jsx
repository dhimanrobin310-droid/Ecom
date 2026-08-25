import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { imageUrl } from "./imageUrl"
import { API_BASE_URL } from "./apiConfig"

export const Landing = () => {

    const[cat,setcat]=useState([])

    useEffect(()=>{

        showcat()
    },[])

    const showcat = async () => {
        try {
            const result = await fetch(`${API_BASE_URL}/api/getcategory`, {
                method: "get",
            })
            if (result.ok) {
                const res = await result.json()
                if (res.statuscode === 1) {
                    setcat(res.data || [])
                }
            }
        } catch (err) {
            console.error("Failed to load categories:", err)
        }
    }

    return (
        <>
            <section className="pt-0 overflow-hidden slider-minus-margin">
                <div className="slide-1">
                    <a href="category-page.html">
                        <div className="home">
                            <img src="/assets/images/electronics-1/full-banner/1.png" alt="" className="img-fluid blur-up lazyload" />
                        </div>
                    </a>
                    <a href="category-page.html">
                        <div className="home">
                            <img src="/assets/images/electronics-1/full-banner/2.png" alt="" className="img-fluid blur-up lazyload" />
                        </div>
                    </a>
                </div>
            </section>

            {/* Categories Section with Adjusted Gap */}
            {cat && cat.length > 0 && (
                <section className="py-4 my-2">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-center flex-wrap gap-4 gap-md-5">
                            {cat.map((a) => (
                                <Link 
                                    key={a._id} 
                                    to={`/related?cid=${a._id}`}
                                    className="text-decoration-none text-center"
                                    style={{ color: "inherit" }}
                                >
                                    <div 
                                        className="d-flex flex-column align-items-center"
                                        style={{ transition: "transform 0.25s ease" }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                                    >
                                        <div 
                                            style={{
                                                width: "95px",
                                                height: "95px",
                                                borderRadius: "50%",
                                                backgroundColor: "#ffffff",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                overflow: "hidden",
                                                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                                                border: "2px solid #eaeaea",
                                                marginBottom: "10px",
                                            }}
                                        >
                                            <img 
                                                src={imageUrl(a.Image)} 
                                                alt={a.Name} 
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                                            />
                                        </div>
                                        <p className="m-0 fw-semibold text-capitalize" style={{ fontSize: "14px", color: "#333" }}>
                                            {a.Name}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <div className="layout-8-bg">
                <section className="banner-goggles banner-section">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-md-4">
                                <a href="category-page.html" className="collection-banner">
                                    <img src="/assets/images/electronics-1/banner/1.png" className="img-fluid blur-up lazyload" alt="" />
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="category-page.html" className="collection-banner">
                                    <img src="/assets/images/electronics-1/banner/2.png" className="img-fluid blur-up lazyload" alt="" />
                                </a>
                            </div>
                            <div className="col-md-4">
                                <a href="category-page.html" className="collection-banner">
                                    <img src="/assets/images/electronics-1/banner/3.png" className="img-fluid blur-up lazyload" alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-b-space ratio_square">
                    <div className="container">
                        <div className="title2">
                            <h4>new collection</h4>
                            <h2 className="title-inner2">trending products</h2>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="theme-tab">
                                    <ul className="tabs tab-title">
                                        <li className="current"><a href="tab-1">new arrival</a></li>
                                        <li><a href="tab-2">featured</a></li>
                                    </ul>
                                    <div className="tab-content-cls">
                                        <div id="tab-1" className="">
                                            <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
                                                <div>
                                                    <div className="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/1.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Smart Tech
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Apple Mac Mini</h6>
                                                            <h4 class="price">$ 150.00<del> $200.00 </del><span class="discounted-price"> 25% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/2.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6> Macbook Pro</h6>
                                                            <h4 class="price">$ 150.50<del> $200.00 </del><span class="discounted-price"> 25% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/3.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Gadget
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Sound in Air</h6>
                                                            <h4 class="price">$ 60.50<del> $75.00 </del><span class="discounted-price"> 20% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/4.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Gadget Galaxy </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Playstation Controller</h6>
                                                            <h4 class="price">$ 30.00<del> $40.00 </del><span class="discounted-price"> 10% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">

                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/5.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Digital Smart Watch</h6>
                                                            <h4 class="price">$ 25.79<del> $30.00 </del><span class="discounted-price"> 5% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/6.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Eve Outdoor Cam</h6>
                                                            <h4 class="price">$ 40.50<del> $50.00 </del><span class="discounted-price"> 5% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/7.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Klighten LED Lamp</h6>
                                                            <h4 class="price">$ 20.00<del> $25.00 </del><span class="discounted-price"> 5% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/8.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Smart LED TV</h6>
                                                            <h4 class="price">$ 100.50<del> $125.00 </del><span class="discounted-price"> 15% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab-2" class="tab-content">
                                            <div class="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">

                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/5.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Digital Smart Watch</h6>
                                                            <h4 class="price">$ 25.79<del> $30.00 </del><span class="discounted-price"> 5% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/6.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Eve Outdoor Cam</h6>
                                                            <h4 class="price">$ 40.50<del> $50.00 </del><span class="discounted-price"> 5% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/7.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Klighten LED Lamp</h6>
                                                            <h4 class="price">$ 20.00<del> $25.00 </del><span class="discounted-price"> 5% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div class="basic-product theme-product-5">
                                                        <div class="img-wrapper">
                                                            <a href="product-page(accordian).html"><img src="/assets/images/electronics-1/product/8.jpg" class="img-fluid blur-up lazyload" alt="" /></a>
                                                            <div class="cart-info">
                                                                <button data-bs-toggle="modal" data-bs-target="#addtocart" title="Add to cart">
                                                                    <i class="ri-shopping-cart-line"></i>
                                                                </button>
                                                                <a href="wishlist.html" title="Add to Wishlist">
                                                                    <i class="ri-heart-line"></i>
                                                                </a>
                                                                <a href="#quickView" data-bs-toggle="modal" title="Quick View">
                                                                    <i class="ri-eye-line"></i>
                                                                </a>
                                                                <a href="compare.html" title="Compare">
                                                                    <i class="ri-loop-left-line"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="product-detail">
                                                            <div class="brand-w-color">
                                                                <a class="product-title" href="product-page(accordian).html">
                                                                    Digital Haven
                                                                </a>
                                                                <div class="rating-w-count mb-0 d-sm-inline-flex d-none">
                                                                    <div class="rating"><i class="ri-star-fill"></i> <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                        <i class="ri-star-fill"></i> <i class="ri-star-fill"></i>
                                                                    </div>
                                                                    <span>(10)</span>
                                                                </div>
                                                            </div>
                                                            <h6>Smart LED TV</h6>
                                                            <h4 class="price">$ 100.50<del> $125.00 </del><span class="discounted-price"> 15% Off </span>
                                                            </h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
