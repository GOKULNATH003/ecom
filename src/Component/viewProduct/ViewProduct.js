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
            <div className="prods_container">
                {daata?.map((item) => {
                    return (
                        <div className="card_container" onClick={() => { handleVIewroduct(item) }}   >
                            <div className="">
                                <img src={item.thumbnail} className="card_image" alt="" />
                                <p className="lb30">{item.title}</p>
                                <p className="lb30 fs09">{item.description}</p>
                                <div>₹ {item.price} <sub className="text-line light_black">₹{parseInt(item?.price / (1 - item.discountPercentage / 100))}</sub><span className="color_r"> {item.discountPercentage}%  </span>offer</div>
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </>
    )
}