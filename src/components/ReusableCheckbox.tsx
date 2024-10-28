import * as React from "react";
import Checkbox, { CheckboxProps } from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import { OverridableStringUnion } from "@mui/types";
import {
  CheckboxPropsColorOverrides,
  CheckboxPropsVariantOverrides,
} from "@mui/joy/Checkbox";

interface CustomCheckboxProps extends CheckboxProps {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string | React.ReactNode;
  helperText?: string | React.ReactNode;
  className?: string;
  id?: string;
  color?: OverridableStringUnion<
    "neutral" | "primary" | "danger" | "success",
    CheckboxPropsColorOverrides
  >;
  disabled?: boolean;
  overlay?: boolean;
  disableIcon?: boolean;
  variant?: OverridableStringUnion<
    "solid" | "outlined",
    CheckboxPropsVariantOverrides
  >;
  checkedIcon?: boolean;
  name?: string;
  readOnly?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  value?: string;
  slotProps?: {
    action?: Record<string, unknown>; // Accepts any key-value pairs with unknown values
    checkbox?: Record<string, unknown>; // Accepts any key-value pairs with unknown values
    input?: Record<string, unknown>; // Accepts any key-value pairs with unknown values
    label?: Record<string, unknown>; // Accepts any key-value pairs with unknown values
    root?: Record<string, unknown>; // Accepts any key-value pairs with unknown values
  };
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  label,
  helperText,
  className,
  id,
  color = "neutral",
  disabled = false,
  overlay = false,
  disableIcon = false,
  variant = "solid",
  name,
  readOnly = false,
  required = false,
  size,
  value,
  slotProps = {},
  ...checkboxProps
}) => {
  console.log(checked, "checked in");
  return (
    
    <FormControl size="sm" sx={{ width: 400 }}>
      <Checkbox
        id={id}
        className={className}
        name={name}
        color={color}
        disabled={disabled}
        overlay={overlay}
        disableIcon={disableIcon}
        variant={variant}
        checked={checked}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        size={size}
        value={value}
        slotProps={slotProps}
        label={label}
        {...checkboxProps}
      />
      {helperText && (
        <FormHelperText>
          <Typography level="body-sm">{helperText}</Typography>
        </FormHelperText>
      )}
    </FormControl>
    
  );
};

export default CustomCheckbox;