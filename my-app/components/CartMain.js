import React from "react"
import bakedGoods from "./bakedGoods.json"
import Link from "next/link"
import MenuItem from "./MenuItem"
import emailjs from '@emailjs/browser';

export default function CartMain() {
    const [menuItems, changeMenuItems] = React.useState("Nothing")
    const [error, changeError] = React.useState()
    const [menuLocalStorage, changeMenuLocalStorage] = React.useState()
    const [orderDetails, changeOrderDetails] = React.useState({
        name: "",
        roomNumber: "",
        notes: ""
    })

    const form = React.useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const templateParams = {
            name: orderDetails.name,
            room_num: orderDetails.roomNumber,
            notes: orderDetails.notes,
            delivery: localStorage.getItem("cart")
        }

        emailjs.send('service_e9wwm4c', 'template_xxiwp4k', templateParams, 'Mx4BSs--wgH7O-b3f')
            .then(function(response) {
                changeError(false)
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                changeError(true)
                console.log('FAILED...', error);
            });
    };

    function changeDetails(e) {
        changeOrderDetails({
            ...orderDetails,
            [e.target.name]: e.target.value
        })
    }

    React.useEffect(() => {
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
        changeMenuLocalStorage(JSON.stringify(cart))
        const cartElements = cart.map((good, index) => {
            const moreGoodDetails = bakedGoods.find(bakedGood => bakedGood.header === good.header)
            console.log(good)
            if (moreGoodDetails)
            return (
                <MenuItem header={good.header} price={moreGoodDetails.price} description={moreGoodDetails.description} key={index} image={moreGoodDetails.image} availability={moreGoodDetails.availability} />
            )
        })
        changeMenuItems(cartElements)
    }, [])

    


    return (
        <main className="homeMain">
            <div className="homeHeader">
                <h1>Checkout</h1>
                <p>Finish the checkout process and then we’ll deliver your goods to your class!</p>
            </div>
            <div className="menuItems">
                <div className="backButtonContainer">
                    <Link href="/" className="backButton">
                        <svg width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.58333 2L2 7M2 7L6.58333 12M2 7H24" stroke="#1C1D20" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Back to Menu
                    </Link>
                </div>
                {menuItems}
            </div>
            <form ref={form} className="cartInputDetails" onSubmit={sendEmail}>
                <div className="cartInput">
                    <p>* Name</p>
                    <input type="text" name="name" placeholder="John Doe" onChange={changeDetails} required="required" />
                </div>
                <div className="cartInput">
                    <p>* Room Number</p>
                    <input type="text" name="roomNumber" placeholder="Room 112" onChange={changeDetails} required="required" />
                </div>
                <div className="cartInput">
                    <p>Notes</p>
                    <input type="text" name="notes" placeholder="I'm allergic to dairy" onChange={changeDetails} />
                </div>
                <button type="submit" className="menuItemsCheckout menuItemsCheckout2">
                    Checkout
                    <svg width="26" height="14" viewBox="0 0 26 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.4167 2L24 7M24 7L19.4167 12M24 7H2" stroke="white" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <p className={error && "checkoutError"}>{error ? "Order Did Not Go Through" : ""}</p>
            </form>
        </main>
    )
}