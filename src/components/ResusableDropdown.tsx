import * as React from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Typography } from "@mui/joy";

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
        defaultValue={defaultValue}
        value={value}
        name={name}
        placeholder={placeholder}
        onClose={onClose}
        onChange={(event, newValue) => onChange && onChange(newValue as string)}
        sx={{
          width,
          [`& .${selectClasses.indicator}`]: {
            transition: "0.2s",
            [`&.${selectClasses.expanded}`]: {
              transform: "rotate(-180deg)",
            },
          },
        }}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
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

export default Dropdown;
