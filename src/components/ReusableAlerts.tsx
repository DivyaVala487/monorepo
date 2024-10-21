import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string;
  backgroundColor?: string;
  textColor?: string;
  duration?: number;
  icon?: any;
  borderRadius?: string;
  boxShadow?: string;
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'center';
  padding?: string;
  margin?: string;
  borderColor?: string;
  borderWidth?: string;
  showCloseButton?: boolean;
  closeButtonColor?: string;
  fontSize?: string;
  fontWeight?: 'normal' | 'bold';
  textAlign?: 'left' | 'center' | 'right';
  zIndex?: number;
  onClose?: () => void;
  height?: string;
  width?: string;
  alertPosition?:string;
}

const Alerts: React.FC<AlertProps> = ({
  message,
  backgroundColor = 'lightblue',
  textColor = 'black',
  duration = 3000,
  icon,
  borderRadius = '5px',
  boxShadow = '0 2px 5px rgba(0,0,0,0.1)',
  position = 'top-center',
  padding = '10px',
  margin = '10px',
  borderColor = '#ccc',
  borderWidth = '1px',
  showCloseButton = true,
  closeButtonColor = 'black',
  fontSize = '16px',
  fontWeight = 'normal',
  textAlign = 'left',
  zIndex = 9999,
  onClose,
  height = 'auto',  // Default height
  width = '300px',  // Default width
  alertPosition ="200px"
}) => {
  const [visible, setVisible] = useState(true);

  // Handle auto-dismiss after `duration`
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 300000);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  // Determine the positioning based on the `position` prop
  const getPositionStyle = () => {
    switch (position) {
      case 'top-left':
        return { top: '66px', left: '20px', transform: 'none' };
      case 'top-right':
        return { top: '66px', right: '20px', transform: 'none' };
      case 'top-center':
        return { top: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'bottom-left':
        return { bottom: '20px', left: '20px', transform: 'none' };
      case 'bottom-right':
        return { bottom: '20px', right: '20px', transform: 'none' };
      case 'bottom-center':
        return { bottom: '20px', left: '50%', transform: 'translateX(-50%)' };
      case 'center':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        };
      default:
        return { top: '20px', left: '50%', transform: 'translateX(-50%)' };
    }
  };
  console.log(message,"messagein alert");

  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        // borderRadius,
        boxShadow,
        position: 'fixed',
        ...getPositionStyle(), // Apply dynamic position styles
        padding,
        margin,
        // border: `${borderWidth} solid ${borderColor}`,
        zIndex,
        textAlign,
        fontSize,
        fontWeight,
        height, 
        // width,  
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}
    >
      {icon && <span style={{paddingTop:"8px"}}>{icon}</span>}
      <span style={{color:"white"}}>{message}</span>
      {showCloseButton && (
        <button
          style={{ color: closeButtonColor, marginLeft: alertPosition,cursor:"pointer"}}
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
        >
          &#x2715;
        </button>
      )}
    </div>
  );
};

export default Alerts;
