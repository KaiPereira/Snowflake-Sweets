import React from "react"

export default function MenuItem(props) {
    const [goodAmount, changeGoodAmount] = React.useState(0)

    React.useEffect(() => {
        const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
        const good = cart.find((good) => good.header === props.header)
        console.log(cart)
        if (good) {
            changeGoodAmount(good.amount)
        }
    }, [])

    function changeGoodAmountFunction(amount) {
        if (goodAmount + amount == -1) {
            changeGoodAmount(0)
            
        } else {
            changeGoodAmount(prevState => prevState + amount)

            // remove item from cart if amount reaches 0
            if (goodAmount + amount !== 0) {

                // Get the cart or create a new one
                const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
                // Check if the item is already in the cart
                const cartItem = cart.find(item => item.header == props.header)
                // If the item is already in the cart, change the amount
                if (cartItem) { 
                    cartItem.amount += amount
                // If the item is not in the cart, add it
                } else {
                    cart.push({header: props.header, amount: amount})
                }
                // Save the cart
                localStorage.setItem("cart", JSON.stringify(cart))
            } else {
                // remove specific item from cart
                const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
                const cartItem = cart.find(item => item.header == props.header)
                if (cartItem) {
                    cart.splice(cart.indexOf(cartItem), 1)
                }
                localStorage.setItem("cart", JSON.stringify(cart))
            }

        }
    }


    return (
        <div className="menuItem">
            <div className="menuItemPhotoContainer">
                <img src={`/${props.image}`} className="menuItemPhoto" />
            </div>
            <div className="menuItemAbout">
                <p className="menuItemHeader">{props.header}</p>
                <p className="menuItemPrice">${props.price}</p>
                <p className="menuItemDescription">{props.description}</p>
                { props.availability ?
                <div className="menuItemAdd">
                    <button className="menuItemAddButton" onClick={() => changeGoodAmountFunction(1)}>+</button>
                    <p className="menuItemAddAmount">{goodAmount}</p>
                    <button className="menuItemAddButton" onClick={() => changeGoodAmountFunction(-1)}>-</button>
                </div>
                :
                <div className="menuItemAvailability">
                    <i class="fa-regular fa-clock"></i>
                    <p>Unavailable</p>
                </div>
                }
            </div>
        </div>
    )
}