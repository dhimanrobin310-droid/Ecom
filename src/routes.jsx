import { Route, Routes } from "react-router-dom"
import { Landing } from "./landing"
import { Register } from "./register"
import { Login } from "./login"
import { Contact } from "./contact"
import { Category } from "./category"
import { Addproduct } from "./addproduct"
import { Related } from "./related"
import { Detail } from "./productdetail"
import { Cart } from "./cart"
import { Wishlist } from "./wishlist"
import { Check } from "./checkout"
import { Order } from "./order"
import { Dashboard } from "./dashboard"
export const Routee=()=>{


    return(
        <Routes>
            <Route path="/" element={<Landing></Landing>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/contact" element={<Contact></Contact>}/>
            <Route path="/category" element={<Category></Category>}/>
            <Route path="/add" element={<Addproduct></Addproduct>}/>
            <Route path="/related" element={<Related></Related>}/>
            <Route path="/productdetail" element={<Detail></Detail>}/>
            <Route path="/cart" element={<Cart></Cart>}/>
            <Route path="/wishlist" element={<Wishlist></Wishlist>} />
            <Route path="/checkout" element={<Check></Check>} />
            <Route path="/order" element={<Order></Order>} />
            <Route path="/dashboard" element={<Dashboard></Dashboard>} />
        </Routes>
    )
}
