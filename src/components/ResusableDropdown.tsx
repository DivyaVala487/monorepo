import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

// Define interface for the props
interface SelectIndicatorProps {
  options: Array<{ label: string; value: string | number }>; // Array of options to select from
  placeholder?: string; // Placeholder text
  width?: number; // Custom width for the select component
  onChange?: (value: string) => void; // Event handler for value change
  value?:string;
  name?:string;
  onClose?:any
}

const Dropdown: React.FC<SelectIndicatorProps> = ({
  options,
  placeholder = 'Select an option…', // Default placeholder
  width = 240, // Default width
  onChange,
  value,
  name,
  onClose
}) => {
  return (
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
  );
};

export default Dropdown;