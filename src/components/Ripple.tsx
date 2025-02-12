'use client';

import React, { useReducer, useEffect, useRef, useState } from 'react';

interface Ripple {
  id: string;
  x: number;
  y: number;
}

interface RippleCursorProps {
  maxSize?: number;
  duration?: number;
  blur?: boolean;
}

type RippleState = Ripple[];

type RippleAction =
  | { type: 'ADD_RIPPLE'; payload: Ripple }
  | { type: 'REMOVE_RIPPLE'; payload: string };

const rippleReducer = (
  state: RippleState,
  action: RippleAction
): RippleState => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      return [...state, action.payload].slice(-30);
    case 'REMOVE_RIPPLE':
      return state.filter((ripple) => ripple.id !== action.payload);
    default:
      return state;
  }
};

const Ripple: React.FC<RippleCursorProps> = ({
  maxSize = 1,
  duration = 10000000,
  blur = false,
}) => {
  const [ripples, dispatch] = useReducer(rippleReducer, []);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useRef<number | null>(null);
  const mouseY = useRef<number | null>(null);

  // Detect if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return; // Disable the effect on mobile devices

    const moveHandler = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    window.addEventListener('mousemove', moveHandler);

    const intervalId = setInterval(() => {
      if (mouseX.current !== null && mouseY.current !== null) {
        const ripple: Ripple = {
          id: `${Date.now()}-${Math.random()}`,
          x: mouseX.current,
          y: mouseY.current,
        };

        dispatch({ type: 'ADD_RIPPLE', payload: ripple });

        setTimeout(() => {
          dispatch({ type: 'REMOVE_RIPPLE', payload: ripple.id });
        }, duration);
      }
    }, 8000); // 7 seconds

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      clearInterval(intervalId);
    };
  }, [duration, isMobile]);

  if (isMobile) {
    return null; // Render nothing on mobile
  }

  return (
    <div className='fixed top-0 left-0 w-screen h-screen pointer-events-none overflow-hidden z-[9999]'>
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="ripple-container"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        >
          <div className="ripple-border"></div>
        </div>
      ))}
    </div>
  );
};

export default Ripple;
