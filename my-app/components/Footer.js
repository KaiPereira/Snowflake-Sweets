import React from "react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer>
            <p className="footerCopyright">© Kai Pereira</p>
            <img src="/logo white.png" alt="snowflake sweets logo" className="footerLogo" />
            <Link href="/cart">
                <div className="footerCart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>View Cart</p>
                </div>
            </Link>
        </footer>
    )
}