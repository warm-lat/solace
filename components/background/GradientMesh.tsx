"use client"
import { Gradient } from "@/components/background/gradient"
import { useEffect } from "react"

export const MeshGradient = () => {
    useEffect(() => {
        const gradient = new Gradient()
        gradient.initGradient("#gradient-canvas")
    }, [])
    return (
        <canvas 
            id="gradient-canvas" 
            data-transition-in 
            className="fixed inset-0 w-full h-full"
            style={{ opacity: 0.4 }}
        />
    )
}
