import { useState,useEffect, useContext } from "react"
import { Context } from "./context"
import { useNavigate } from "react-router-dom"
import { imageUrl } from "./imageUrl"
import { API_BASE_URL } from "./apiConfig"
export const Dashboard=()=>{
    const [totalcategory,settotalcategory]=useState()
    const [totalbrand,settotalbrand]=useState()
    const [users,setusers]=useState()
    const [totalusers,settotalusers]=useState([])
    const [totalorders,settotalorders]=useState([])
    const {utype,setutype}=useContext(Context)
    const navigate=useNavigate()
const show = async () => {
        const result = await fetch(`${API_BASE_URL}/api/getcategory`, {
            method: "get",
        })
        if (result) {
            const res = await result.json()
            if (res.statuscode === 1) {
                settotalcategory(res.data.length)
            }
            else {
                alert("error")
            }
        }
    }

   const show2=async()=>{
    const result = await fetch(`${API_BASE_URL}/api/getallbrand`, {
        method: "get",
    })
    if (result) {
        const res = await result.json()
        if (res.statuscode === 1) {
            settotalbrand(res.data.length)
        }
        else {
            alert("error")
        }
    }
   }
   
   const show3=async()=>{
    const result = await fetch(`${API_BASE_URL}/api/alluser`, {
        method: "get",
    })
    if (result) {
        const res = await result.json()
        if (res.statuscode === 1) {
         
            setusers(res.data.length)
            settotalusers(res.data)
        }
        else {
            alert("error")
        }
    }
   }
   const show4=async()=>{
    const result = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "get",
    })
    if (result) {
        const res = await result.json()
        if (res.statuscode === 1) {
            settotalorders(res.data)
        }
        else {
            alert("error")
        }
    }
   }


   

useEffect(()=>{
    show()
    show2()
    show3()
    show4()
},[])


    return(
       <>
       { utype==="Admin" ? <>
        <style>{`
            * { box-sizing: border-box; }
            .dashboard-page {
                min-height: 100vh;
                padding: 54px 24px;
                overflow: hidden;
                background:
                    radial-gradient(circle at 7% 5%, rgba(111, 74, 232, .20), transparent 25rem),
                    radial-gradient(circle at 95% 15%, rgba(28, 202, 169, .17), transparent 24rem),
                    linear-gradient(135deg, #f8f9ff 0%, #eef2ff 48%, #f5fbff 100%);
                color: #20213c;
                font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }
            .dashboard-content {
                max-width: 1180px;
                margin: 0 auto;
                position: relative;
            }
            .dashboard-heading {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                margin-bottom: 34px;
            }
            .dashboard-heading h1 {
                margin: 0;
                color: #20213c;
                font-size: clamp(30px, 4vw, 44px);
                font-weight: 800;
                letter-spacing: -1.8px;
                line-height: 1;
            }
            .dashboard-heading p {
                margin: 11px 0 0;
                color: #68708f;
                font-size: 15px;
            }
            .dashboard-badge {
                padding: 10px 16px;
                border-radius: 999px;
                border: 1px solid rgba(255, 255, 255, .72);
                background: rgba(255, 255, 255, .62);
                box-shadow: 0 8px 22px rgba(61, 71, 134, .10);
                color: #5841bd;
                font-size: 13px;
                font-weight: 700;
                white-space: nowrap;
            }
            .dashboard-stats {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 22px;
                margin-bottom: 30px;
            }
            .dashboard-stat-card, .dashboard-users {
                border: 1px solid rgba(255, 255, 255, .85);
                background: rgba(255, 255, 255, .84);
                box-shadow: 0 18px 50px rgba(47, 51, 93, .11);
                backdrop-filter: blur(14px);
            }
            .dashboard-stat-card {
                position: relative;
                min-height: 166px;
                padding: 28px;
                overflow: hidden;
                border-radius: 22px;
                transition: transform .25s ease, box-shadow .25s ease;
            }
            .dashboard-stat-card::after {
                position: absolute;
                right: -26px;
                bottom: -38px;
                width: 126px;
                height: 126px;
                border-radius: 50%;
                background: currentColor;
                content: "";
                opacity: .08;
            }
            .dashboard-stat-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 25px 52px rgba(47, 51, 93, .16);
            }
            .dashboard-stat-card p {
                margin: 0 0 15px;
                color: #727994;
                font-size: 14px;
                font-weight: 600;
            }
            .dashboard-stat-card h2 {
                margin: 0;
                font-size: 42px;
                font-weight: 800;
                letter-spacing: -1.8px;
                line-height: 1;
            }
            .dashboard-stat-card:nth-child(1) { color: #7651dc; border-top: 4px solid #7854df; }
            .dashboard-stat-card:nth-child(2) { color: #dc6b3d; border-top: 4px solid #ec875b; }
            .dashboard-stat-card:nth-child(3) { color: #10a386; border-top: 4px solid #26b69b; }
            .dashboard-stat-card h2 { color: currentColor; }
            .dashboard-users { border-radius: 22px; overflow: hidden; }
            .dashboard-users-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 25px 28px;
                border-bottom: 1px solid rgba(94, 103, 151, .12);
            }
            .dashboard-users-header h2 { margin: 0; color: #292947; font-size: 21px; letter-spacing: -.5px; }
            .dashboard-users-header span {
                padding: 7px 11px;
                border-radius: 999px;
                background: #e8f8f4;
                color: #08856d;
                font-size: 13px;
                font-weight: 700;
            }
            .dashboard-table-wrap { overflow-x: auto; }
            .dashboard-table { width: 100%; border-collapse: collapse; min-width: 580px; }
            .dashboard-table th, .dashboard-table td { padding: 18px 28px; text-align: left; }
            .dashboard-table th {
                background: rgba(237, 239, 255, .48);
                color: #7b819a;
                font-size: 12px;
                font-weight: 700;
                letter-spacing: .06em;
                text-transform: uppercase;
            }
            .dashboard-table td { border-top: 1px solid rgba(94, 103, 151, .10); color: #555b75; font-size: 15px; }
            .dashboard-table tbody tr { transition: background .2s ease; }
            .dashboard-table tbody tr:hover { background: rgba(236, 239, 255, .58); }
            .dashboard-table td:first-child { color: #2f3150; font-weight: 700; }
            .dashboard-table td:last-child { color: #6754bd; }
            .dashboard-empty { padding: 42px 24px; color: #7b819a; text-align: center; }
            @media (max-width: 720px) {
                .dashboard-page { padding: 32px 16px; }
                .dashboard-heading { align-items: flex-start; flex-direction: column; }
                .dashboard-stats { grid-template-columns: 1fr; }
                .dashboard-stat-card { min-height: 140px; }
                .dashboard-users-header, .dashboard-table th, .dashboard-table td { padding-left: 18px; padding-right: 18px; }
            }
        `}</style>
        <main className="dashboard-page">
            <div className="dashboard-content">
                <header className="dashboard-heading">
                    <div>
                        <h1>Admin Dashboard</h1>
                        <p>Overview of your store’s current activity.</p>
                    </div>
                    <span className="dashboard-badge">Store overview</span>
                </header>

                <section className="dashboard-stats" aria-label="Store statistics">
                    <article className="dashboard-stat-card">
                        <p>Total Categories</p>
                        <h2>{totalcategory}</h2>
                    </article>
                    <article className="dashboard-stat-card">
                        <p>Total Brands</p>
                        <h2>{totalbrand}</h2>
                    </article>
                    <article className="dashboard-stat-card">
                        <p>Total Users</p>
                        <h2>{users}</h2>
                    </article>
                </section>

                <section className="dashboard-users">
                    <div className="dashboard-users-header">
                        <h2>Registered Users</h2>
                        <span>{users || 0} total</span>
                    </div>
                    <div className="dashboard-table-wrap">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalusers.map((a)=><tr>
                                    <td>{a.FirstName}</td>
                                    <td>{a.LastName}</td>
                                    <td>{a.Email}</td>
                                </tr>)}
                            </tbody>
                        </table>
                        {totalusers.length === 0 && <div className="dashboard-empty">No users to display yet.</div>}
                    </div>
                </section>
                <section className="dashboard-users">
                     <div className="accordion" id="ordersAccordion">

                                {totalorders.map((order) => (

                                    <div className="accordion-item mb-3 shadow-sm" key={order._id}>                            
                                        <h2 className="accordion-header">
                                            <button
                                                className={`accordion-button `}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#order${order._id}`}
                                            >
                                                <div className="w-100 d-flex justify-content-between pe-3">
                                                    <span>Order #{order.OrderNo}</span>
                                                    <strong>{order.FirstName}</strong>
                                                </div>

                                            </button>
                                        </h2>                                
                                        <div
                                            id={`order${order._id}`}
                                            className={`accordion-collapse collapse `}
                                            data-bs-parent="#ordersAccordion"
                                        >
                                            <div className="accordion-body">

                                                <p><strong>Name:</strong> {order.FirstName} {order.LastName}</p>
                                                <p><strong>Payment:</strong> {order.Payment}</p>
                                                <hr />                                            
                                                {order.Order.map((item, idx) => (
                                                    <div key={idx} className="d-flex align-items-center gap-3 mb-2">
                                                        <img
                                                            src={imageUrl(item.Img)}
                                                            width="50"
                                                            height="50"
                                                            className="rounded"
                                                        />
                                                        <div className="flex-grow-1">
                                                            <div>{item.ProductName}</div>
                                                            <small>
                                                                Qty: {item.Quantity} × ₹{item.Price}
                                                            </small>
                                                        </div>
                                                        <strong>₹{item.Quantity * item.Price}</strong>

                                                    </div>

                                                ))}

                                            </div>
                                        </div>

                                    </div>

                                ))}

                            </div>
                    </section>
            </div>
        </main>
        </>:navigate("/")}
       </>
    )
}
