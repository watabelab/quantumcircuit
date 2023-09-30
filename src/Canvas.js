import React from 'react'
import CanvasComponent from './CanvasComponent'

const Canvas = () => {
    const id = 'canvas'
    return (
        <div>
            <canvas id={id}></canvas>
            <CanvasComponent id={id} />
        </div>
    )
}

export default Canvas

