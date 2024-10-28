import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Typography } from "@mui/joy";
import { colors } from "../utils/constants";

interface SelectIndicatorProps {
  options: Array<{ label: string; value: string | number }>;
  placeholder?: string;
  width?: number;
  onChange?: (value: string) => void;
  value?: string;
  name?: string;
  onClose?: any;
  label?: string;
  id?: string;
  error?: boolean;
  helperText?: string;
  defaultValue?: string;
  disabled?:boolean
  
}

const Dropdown: React.FC<SelectIndicatorProps> = ({
  options,
  placeholder = "Select an option…",
  width = 240,
  onChange,
  value,
  name,
  label,
  id,
  onClose,
  error,
  helperText,
  defaultValue,
  disabled
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {label && (
        <Typography component="label" htmlFor={id} className="label-heading">
          {label}
          <span style={{ color: "red" }}>*</span>
        </Typography>
      )}
      <Select
        value={value}
        name={name}
        onClose={onClose}
        disabled={disabled}
        onChange={(event, newValue) => onChange && onChange(newValue as string)}
        sx={{
          width,
          color: value ? "black" : colors.primary, 
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
      >
        <Option value="" disabled style={{ color: colors.primary }}>
          {placeholder}
        </Option>
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      {error && helperText && (
        <Typography color="danger">{helperText}</Typography>
      )}
    </div>
  );
};

export default Dropdown;
