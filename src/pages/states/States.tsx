import React, { useState } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from '@mui/joy/Grid';
import { useFormik } from "formik";
import * as Yup from "yup"; // For validation schema
import validateForm from "../../utils/validations";
import CustomCheckbox from "../../components/ReusableCheckbox";


const States: React.FC = () => {
  const [formValues, setFormValues] = useState({ country: "", shortName: "", state: "",gst:false });
  const [errors, setErrors] = useState<any>({ });

  const handleSubmit = (e: any) => {
    console.log("hello")
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors); 
  };
  const handleChange = (value: string | boolean, fieldName: string) => {
    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [fieldName]: value,
      };
      // Validate only the updated field
      const validationErrors = validateForm(updatedValues);
      setErrors((prevErrors:any) => ({
        ...prevErrors,
        [fieldName]: validationErrors[fieldName],
      }));

      return updatedValues;
    });
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target; 
    handleChange(checked, 'gst'); 
  };
  console.log(errors,"errors")

  console.log(formValues,"values")
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ flexGrow: 1, padding: "2rem" }}>
        <Grid xs={12} md={4}>
          <label>Country</label>
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
            {errors?.country!=="" && <p className="error-message">{errors?.country}</p>}
        </Grid>
        <Grid xs={12} md={4}>
        <label>State</label>
          <InputField
            type="text"
            placeholder="Enter name"
            size="sm"
            style={{ width: "333px", height: "36px" }}
            name="state"
            onChange={(e) => handleChange(e.target.value, 'state')} 
            value={formValues.state}
          />
        {errors?.state!=="" && <p className="error-message">{errors?.state}</p>}
        </Grid>
        <Grid xs={12} md={4}>
        <label>Short Name</label>
          <InputField
            type="text"
            placeholder="Enter Short name"
            size="sm"
            style={{ width: "333px", height: "36px" }}
            name="shortName"
            onChange={(e) => handleChange(e.target.value, 'shortName')} 
            value={formValues.shortName}
          />
           {errors?.shortName!=="" && <p className="error-message">{errors?.shortName}</p>}
        </Grid>
        <Grid xs={12} md={3}>
        <label>Is GST Required?</label>
         <CustomCheckbox  onChange={handleCheckboxChange}  name="gst" checked={formValues.gst}/>
         {errors?.gst!=="" && <p className="error-message">{errors?.gst}</p>}
        </Grid>
        <Grid xs={12} md={12}>
          <ReuseableButton variant="solid" size="sm" title="Submit" type="submit" styles={{backgroundColor:"#735DA5"}} />
        </Grid>
      </Grid>
    </form>
  );
};

export default States;
