import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState(0,0)
  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.pageX, y: e.pageY})
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  return mousePosition
}
