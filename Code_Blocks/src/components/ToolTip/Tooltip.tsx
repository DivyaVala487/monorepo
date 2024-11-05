import React, { useState } from 'react';
import './ToolTip.css'; // Include your styles for the tooltip

interface TooltipProps {
  content: string; // Tooltip text
  position?: 'top' | 'right' | 'bottom' | 'left'; // Tooltip position
  children: React.ReactNode; // Target element that will trigger the tooltip
  backgroundColor?: string; // Optional background color for the tooltip
  textColor?: string; // Optional text color for the tooltip
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  backgroundColor = 'black',
  textColor = 'white',
}) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  return (
    <div
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div
          className={`tooltip-box tooltip-${position}`}
          style={{ backgroundColor, color: textColor }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
