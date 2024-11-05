import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Joi from 'joi';
import './Loader.css';

type LoaderProps = {
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit' | 'error' | 'info' | 'success' | 'warning';
  thickness?: number;
  variant?: 'indeterminate' | 'determinate';
  value?: number;
  showButton?: boolean;
  buttonText?: string;
  onClickButton?: () => void;
  children?: React.ReactNode;
  fullScreen?: boolean;
  showLoadingText?: boolean;  // New prop to show text next to loader
};

const loaderSchema = Joi.object({
  size: Joi.number().min(20).max(100).optional(),
  color: Joi.string().valid('primary', 'secondary', 'inherit', 'error', 'info', 'success', 'warning').optional(),
  thickness: Joi.number().min(1).max(10).optional(),
  variant: Joi.string().valid('indeterminate', 'determinate').optional(),
  value: Joi.number().min(0).max(100).optional(),
  showButton: Joi.boolean().optional(),
  buttonText: Joi.string().optional(),
  fullScreen: Joi.boolean().optional(),
  showLoadingText: Joi.boolean().optional(),
});

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = 'primary',
  thickness = 4,
  variant = 'indeterminate',
  value,
  showButton = false,
  buttonText = 'Retry',
  onClickButton,
  children,
  fullScreen = false,
  showLoadingText = false,  
}) => {
  const { error } = loaderSchema.validate({
    size,
    color,
    thickness,
    variant,
    value,
    showButton,
    buttonText,
    fullScreen,
    showLoadingText,
  });

  if (error) {
    console.warn('Loader component validation error:', error.message);
  }

  return (
    <Box className={`loaderContainer ${fullScreen ? 'fullScreen' : ''}`}>
      
      {showLoadingText ? (
        <Button
          variant="contained"
          color={color}
          startIcon={<CircularProgress size={20} color="inherit" thickness={thickness} />}
          onClick={onClickButton}
        >
          Loading…
        </Button>
      ) : (
        <>
          <CircularProgress
            size={size}
            color={color}
            thickness={thickness}
            variant={variant}
            value={variant === 'determinate' ? value : undefined}
          />
          {children && <Box className="childrenMarginTop">{children}</Box>}
          {showButton && (
            <Button
              variant="contained"
              color={color}
              onClick={onClickButton}
              className="buttonMarginTop"
            >
              {buttonText}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default Loader;
