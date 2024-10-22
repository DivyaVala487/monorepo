import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { FormHelperText, Typography } from '@mui/joy';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

// Define interface for the props
interface SelectIndicatorProps {
  options: Array<{ label: string; value: string | number }>; // Array of options to select from
  placeholder?: string; // Placeholder text
  width?: number; // Custom width for the select component
  onChange?: (value: string) => void; // Event handler for value change
  value?:string;
  name?:string;
  onClose?:any;
  label?:string;
  id?:string;
  error?:boolean;
  helperText?:string;
}

const Dropdown: React.FC<SelectIndicatorProps> = ({
  options,
  placeholder = 'Select an option…', // Default placeholder
  width = 240, // Default width
  onChange,
  value,
  name,
  label,
  id,
  onClose,
  error,
  helperText
}) => {
  return (
    <div  style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
    {label && (
      <Typography component="label" htmlFor={id} className="label-heading">
        {label}
        <span style={{color:"red"}}>*</span>
      </Typography>
    )}
    <Select
    value={value}
    name={name}
      placeholder={placeholder}
      onClose={onClose}
      
      // indicator={<KeyboardArrowDown />}
      onChange={(event, newValue) => onChange && onChange(newValue as string)}
      sx={{
        width,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      {options.map((option) => (
        <Option key={option.value} value={option.value} >
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