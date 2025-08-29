"use client"

import { motion, Transition } from "framer-motion";
import { useEffect, useState } from "react"

export default function LoadingCubes() {
    const [order, setOrder] = useState(initialOrder)

    useEffect(() => {
        const timeout = setTimeout(() => setOrder(shuffle(order)), 250)
        return () => clearTimeout(timeout)
    }, [order])

    return (
        <ul style={container}>
            {order.map((backgroundColor) => (
                <motion.li
                    key={backgroundColor}
                    layout
                    transition={spring}
                    style={{ ...item, backgroundColor }}
                />
            ))}
        </ul>
    )
}

const initialOrder = [
    "#ff0088",
    "#dd00ee",
    "#9911ff",
    "#0d63f8",
]

/**
 * ==============   Utils   ================
 */
function shuffle([...array]: string[]) {
    return array.sort(() => Math.random() - 0.5)
}

/**
 * ==============   Styles   ================
 */

const spring: Transition = {
    type: "spring",
    damping: 20,
    stiffness: 300,
}

const container: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    position: "relative",
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    width: 300,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
}

const item: React.CSSProperties = {
    width: 100,
    height: 100,
    borderRadius: "10px",
}
