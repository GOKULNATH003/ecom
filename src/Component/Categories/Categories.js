import { useContext } from "react"
import { NewContext } from "../../App"

export default function Category() {
    const [categories, setCategories] = useState()
    useEffect(() => {
        const config = {
            url: `${process.env.REACT_APP_SERVER}/products/categories`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios(config).then((res) => {
            console.log(res.data)
            setCategories(res.data)
            localStorage.setItem("allprods", JSON.stringify(res.data.products))

        }).catch((err) => {
            console.log(err)
        })

    }, [])
    function handleCategory(item) {
        const config = {
            url: `${process.env.REACT_APP_SERVER}/products/category/${item}`,
            method: "get",

        }
        axios(config).then((res) => {
            console.log(res)
            setViewCategory(res.data.products)
            localStorage.setItem("ViewProds", JSON.stringify(res.data.products))
            navigator("/viewprod")
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>
            <div className="categories_list">
                {
                    categories?.map((item, index) => {

                        return (

                            <div className="card_container" key={item + index.toString()} onClick={() => { handleCategory(item) }}>

                                <img src={img} className="Product_frame" alt="" />
                                <p>{item}</p>
                            </div>

                        )
                    })
                }
            </div>
        </>
    )
}