import React from "react"
import MenuItem from "./MenuItem"
import bakedGoods from "./bakedGoods.json"
import Link from "next/link"

export default function HomeComponent() {
    const [bakedGoodElements, changeBakedGoodElement] = React.useState()

    React.useEffect(() => {
        changeBakedGoodElement(bakedGoods.map((bakedGood, index) => {
            return <MenuItem header={bakedGood.header} price={bakedGood.price} description={bakedGood.description} key={index} image={bakedGood.image} availability={bakedGood.availability} />
        }))
    }, [])



    return (
        <main className="homeMain">
            <div className="homeHeader">
                <h1>Menu</h1>
                <p>Disclaimer:  Food prepared may contain allergens or cross-contamination</p>
            </div>
            <div className="menuItems">
                {bakedGoodElements}
            </div>
                <button className="menuItemsCheckoutContainer">
                    <Link href="/cart" className="menuItemsCheckout">
                        Continue to Checkout
                        <svg width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.4167 2L24 7M24 7L19.4167 12M24 7H2" stroke="white" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                </button>
        </main>  
    )
}