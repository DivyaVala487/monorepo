import React, { useState } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from '@mui/joy/Grid';
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation schema
import validateForm from "../../utils/validations";


const States: React.FC = () => {
  const [formValues, setFormValues] = useState({ country: "", shortName: "", state: "" });
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
      <Grid container spacing={10} sx={{ flexGrow: 1, padding: "2rem" }}>
        <Grid xs={12} md={3}>
          <Dropdown
            options={[
              { label: "India", value: "india" },
              { label: "US", value: "us" },
              { label: "Dubai", value: "dubai" },
              { label: "Australia", value: "australia" },
            ]}
            placeholder="Select your Country"
            width={333}
            onChange={(value) => handleChange(value, 'country')} 
          />
            {errors?.country && <p className="error-message">{errors?.country}</p>}
        </Grid>
        <Grid xs={12} md={3}>
          <InputField
            type="text"
            placeholder="Enter name"
            size="sm"
            style={{ width: "333px", height: "36px" }}
            name="state"
            onChange={(e) => handleChange(e.target.value, 'state')} 
            value={formValues.state}
          />
        {errors?.state && <p className="error-message">{errors?.state}</p>}
        </Grid>
        <Grid xs={12} md={3}>
          <InputField
            type="text"
            placeholder="Enter Short name"
            size="sm"
            style={{ width: "333px", height: "36px" }}
            name="shortName"
            onChange={(e) => handleChange(e.target.value, 'shortName')} 
            value={formValues.shortName}
          />
           {errors?.shortName && <p className="error-message">{errors?.shortName}</p>}
        </Grid>
        <Grid xs={12} md={3}>
          <ReuseableButton variant="solid" size="sm" title="Submit" type="submit" />
        </Grid>
      </Grid>
    </form>
  );
};

export default States;
