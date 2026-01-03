import React from 'react'

const NaiveDot = ({x, y, id}: {x: number, y: number, id: number}) => {
    const slowValue = Math.pow(x, y) % 100;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate3d(${x}px, ${y}px, 0)`, // Use transform for better perf
        width: '6px',
        height: '6px',
        backgroundColor: id % 10 === 0 ? 'red' : 'green', // Conditional styling
        borderRadius: '50%',
      }}
    >
      <span style={{ fontSize: '4px', opacity: 0.5 }}>{id}</span>
    </div>
  )
}

export default NaiveDot;