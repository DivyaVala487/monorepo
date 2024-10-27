import React from "react";
import Input from "@mui/joy/Input";
import { Textarea, Typography } from "@mui/joy";
import "./styles.css"

import { colors } from "../utils/constants";
interface InputFieldProps {
  placeholder?: string;
  variant?: "solid" | "outlined" | "plain";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "neutral" | "danger" | "success" | "warning";
  required?: boolean;
  disabled?: boolean;
  value?: string;
  type?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  label?: string;
  name?: string;
  helperText?: string;
  rows?: number;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  format?: string;
  onBlur?:any;
  ref?:any
  //   slotProps?: SlotProps;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  variant,
  size,
  color,
  required = true,
  disabled,
  value,
  type = "text",
  onChange,
  error,
  className,
  id,
  name,
  label,
  style,
  helperText,
  multiline,
  minRows,
  maxRows,
  onBlur,
  ref
  //   slotProps,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {label && (
        <Typography component="label" htmlFor={id} className="label-heading">
          {label}
          <span style={{color:"red"}}>*</span>
        </Typography>
      )}
      {!multiline ? (
        <Input
          placeholder={placeholder}
          variant={variant}
          onBlur={onBlur}
          size={size}
          color={color}
          disabled={disabled}
          value={value}
          type={type}
          onChange={onChange}
          error={error}
          className={className}
          sx={{
            ...style,
            "& input::placeholder": {
              color: colors.primary ,
              fontWeight:400
            }
          }}
          id={id}
          name={name}
          slotProps={{
            input:{ref}
          }}
          //   slotProps={slotProps}
        />
      ) : (
        <Textarea
          placeholder={placeholder}
          variant={variant}
          size={size}
          color={color}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
          error={error}
          className={className}
          id={id}
          name={name}
          minRows={minRows}
          maxRows={maxRows}
        />
      )}
      {error && (
        <>
          {helperText && (
            <Typography color={error ? "danger" : "neutral"}>
              {helperText}
            </Typography>
          )}
        </>
      )}
    </div>
  );
};

export default InputField;