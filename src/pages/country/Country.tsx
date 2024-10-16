import React, { useState } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from '@mui/joy/Grid';
import validateForm from "../../utils/validations";

const Country: React.FC = () => {
  const [formValues, setFormValues] = useState({ country: ""});
  const [errors, setErrors] = useState<any>({ });

  const handleSubmit = (e: any) => {
    console.log("hello")
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors); 
  };

  const handleChange = (value: string, fieldName: string) => {
    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [fieldName]: value,
      };
      
      const validationErrors = validateForm(updatedValues);
      setErrors(validationErrors); 
      
      return updatedValues;
    });
  };
  return (
    <form onSubmit={handleSubmit}>
    <Grid container spacing={10} sx={{ flexGrow: 1,padding:"20px" }}>
      
      <Grid xs={12} md={3}>
        <InputField type="text" placeholder="Enter Country"  size="sm" style={{width:"333px !important"}}    onChange={(e) => handleChange(e.target.value, 'country')} />
        {errors?.country && <p className="error-message">{errors?.country}</p>}
      </Grid>
     
      <Grid xs={12} md={3}>
        <ReuseableButton variant="solid" size="sm" title="Add" type="submit"  styles={{backgroundColor:"#735DA5"}}/>
      </Grid>
    </Grid>
    </form>
  );
}

export default Country;
