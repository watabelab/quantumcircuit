import React, { useState } from 'react'
import { Circle, Line } from 'react-shapes'
import Draggable from 'react-draggable'
export var a = 1;
const Dot = () => {
    const id_dot = 'HD'
    const [dotplace, setDotplace] = useState([9, 18, 9, 18])
    const handleClick = () => {
        const y2 = dotplace[3] + 3;
        setDotplace([18, -3, 18, y2]);
    }
    return (
        <div>
            <Draggable>
                <div>
                    <div>
                        <Circle r={18} fill={{ color: '#ff0000' }} id={id_dot} />
                    </div>
                    <div>
                        <Line style={{ position: 'absolute', left: '18px', top: '18px' }} x1={dotplace[0]} x2={dotplace[2]} y1={dotplace[1]} y2={dotplace[3]} stroke={{ color: '#f00' }} strokeWidth={3} />
                    </div>
                </div>
            </Draggable>
            <button onClick={handleClick} style={{ width: '100px', height: '50px' }}>click</button>
        </div>
    )
}

export default Dot