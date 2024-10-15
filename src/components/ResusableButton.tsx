import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@mui/joy";
import { ColorPaletteProp } from "@mui/joy/styles";

interface ReusableButtonProps extends ButtonProps {
  color?: ColorPaletteProp;
  variant?: "outlined" | "solid" | "plain";
  size?: "sm" | "md" | "lg";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  startDecorator?: ReactNode;
  endDecorator?: ReactNode;
  disabled?: boolean;
  slotProps?: ButtonProps["slotProps"]; // Directly use slotProps from ButtonProps
  styles?: React.CSSProperties;
  loading?: boolean;
  fullWidth?: boolean;
  loadingIndicator?: ReactNode;
  loadingPosition?: "start" | "end" | "center";
  title?: string;
}

const ReuseableButton: React.FC<ReusableButtonProps> = ({
  color,
  variant = "solid",
  size = "md",
  onClick,
  startDecorator,
  endDecorator,
  disabled = false,
  // slotProps,
  styles,
  loading,
  title,
  fullWidth,
  loadingIndicator,
  loadingPosition,
  type,
}) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      startDecorator={startDecorator}
      endDecorator={endDecorator}
      loading={loading}
      loadingIndicator={loadingIndicator}
      loadingPosition={loadingPosition}
      sx={styles}
      type={type}
      // slotProps={slotProps} // Spread additional props
    >
      {title}
    </Button>
  );
};

export default ReuseableButton;