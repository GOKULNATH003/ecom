import { useContext } from "react"
import { NewContext } from "../../App"
import './ViewProduct.css'
import { useNavigate } from "react-router-dom"
export default function ViewProduct() {
    const { viewCategory } = useContext(NewContext)
    const navigator = useNavigate()
    function handleVIewroduct(item) {
        localStorage.setItem("DisplayProd", JSON.stringify(item))
        navigator("/displayproduct")
    }

    const daata = JSON.parse(localStorage.getItem("ViewProds"))
    return (

        <>
            <h1>{daata[0]?.category}</h1>
            <div className="viewcategory_container">
                {daata?.map((item) => {
                    return (
                        <div className="view_card pointer" onClick={() => { handleVIewroduct(item) }}>
                            <img src={item.thumbnail} lazy className="" alt="" />
                            <p>{item.title} - {item?.brand}</p>
                            <p>Des:{item.description}</p>
                            <p>Price:{item.price}</p>
                            <p>rating:{item.rating}</p>
                            <p>Available Stocks:{item.stock}</p>
                        </div>
                    )
                })

                }
            </div>
        </>
    )
}