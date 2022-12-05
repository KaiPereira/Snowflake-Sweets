import React from "react"
import Link from "next/link"

export default function Nav() {
    const [availability, changeAvailability] = React.useState()

    React.useEffect(() => {
        const date = {
            time: parseFloat(new Date().getHours() + "." + new Date().getMinutes()),
            day: new Date().getDay(),
        }

        const block = date.day % 2 === 0 ? 2 : 1
        changeAvailability((block == 1 ? (date.time >= 8.40 && date.time <= 10.00) : (date.time >= 10.10 && date.time <= 11.20)) || (date.time >= 11.30 && date.time <= 12.00))
    }, [])

    return (
        <nav>
            <Link href="/">
                <div className="navHeader">
                    <img src="/logo.png" />
                    <p>Snowflake Sweets</p>
                </div>
            </Link>
            <div>
                <p className="navStatus">We are available all of lunch:</p>
                <p className="navStatusText">Currently: <span style={availability ? {color: "#5ECF4C"} : {color: "#CF4C4C"}}>{availability ? "Available" : "Unavailable"}</span></p>
            </div>
        </nav>
    )
}