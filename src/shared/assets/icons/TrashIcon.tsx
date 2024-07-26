import React, { useState, useEffect } from 'react';

const TrashIcon = ({
  color = "var(--color-error)",
  width = 32,
  height = 32,
  onClick,
  className = ''
}: {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    if (onClick) onClick();
  };

  useEffect(() => {
    // Create a <style> element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes shake {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-5deg); }
        100% { transform: rotate(0deg); }
      }
      .shake {
        animation: shake 0.4s;
        animation-iteration-count: infinite;
      }
    `;

    // Append the style element to the document head
    document.head.appendChild(styleElement);

    // Cleanup function to remove the style element
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const activeColor = isActive ? 'var(--color-error)' : color;

  return (
    <button
      onClick={handleClick}
      className={`${className} ${isActive ? 'shake' : 'shake'}`}
    >
      <svg width={width} height={height} viewBox="0 -960 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
          fill={activeColor}
        />
      </svg>
    </button>
  );
};

export default TrashIcon;

