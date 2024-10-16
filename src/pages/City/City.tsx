import React, { useState } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from "@mui/joy/Grid";
import validateForm from "../../utils/validations";
import "../styles.css"
const City: React.FC = () => {
  const [formValues, setFormValues] = useState({ country: "", city: "", state: "" });
  const [errors, setErrors] = useState<any>({ });

  const handleSubmit = (e: any) => {
    console.log("hello")
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors); 
  };

  console.log(errors,"errors")
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


  console.log(errors,"formvalues")
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={10} sx={{ flexGrow: 1, padding: "20px" }}>
        <Grid xs={12} md={3}>
          <Dropdown
            options={[
              { label: "India", value: "india" },
              { label: "US", value: "us" },
              { label: "Dubai", value: "dubai" },
              { label: "Australia", value: "australia" },
            ]}
            placeholder="Select your country"
            width={333}
            onChange={(value) => handleChange(value, 'country')} // Pass the value and field name
          />
          {errors?.country && <p className="error-message">{errors?.country}</p>}
        </Grid>
        <Grid xs={12} md={3}>
          <Dropdown
            options={[
              { label: "Telangana", value: "telangana" },
              { label: "Andhra Pradesh", value: "andhrapradesh" },
              { label: "Maharashtra", value: "maharashtra" },
              { label: "Tamilnadu", value: "tamilnadu" },
            ]}
            placeholder="Select your state"
            width={300}
            onChange={(value) => handleChange(value, 'state')} // Pass the value and field name
          />
             {errors?.state && <p className="error-message">{errors?.state}</p>}
        </Grid>
        <Grid xs={12} md={3}>
          <InputField
            type="text"
            placeholder="Enter City name"
            size="sm"
            style={{ width: "333px", height: "36px" }}
            value={formValues.city}
            onChange={(e) => handleChange(e.target.value, 'city')} // Pass the value directly
          />
             {errors?.city && <p className="error-message">{errors?.city}</p>}
        </Grid>
        <Grid xs={12} md={3}>
          <ReuseableButton variant="solid" size="sm" title="Submit" type="submit"  styles={{backgroundColor:"#735DA5"}} />
        </Grid>
      </Grid>
    </form>
  );
};

export default City;
