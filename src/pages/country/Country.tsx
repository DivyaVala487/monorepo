import React, { useState } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from '@mui/joy/Grid';
import validateForm from "../../utils/validations";
import { Post } from "../../services/apiServices";
import { networkUrls } from "../../services/networkrls";
import Alerts from "../../components/ReusableAlerts";

const Country: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({ country: ""});
  const [errors, setErrors] = useState<any>({ });
  const [alert,showAlert] = useState<any>(false)

  const handleSubmit =async (e: any) => {
    console.log("hello")
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors); 
    console.log(formValues.country,"formvalues");
    const payload:any ={
      name:formValues.country
    }
    try{
      const response = await Post(networkUrls.addCountry,payload, false);
      console.log(response,"response_to_see");
      if(response?.data?.api_status===200){
        console.log("hello")
       
        showAlert(true)
         setFormValues({
          country:""
        })
         
      }
      else{
        console.log(response,"response_in_else");
        if(response?.data?.api_status===400){
          

          

        }
      }
      

  }catch(error){
      console.log(error,"error")
  }
  };

  const handleChange = (value: string, fieldName: string) => {
    setFormValues((prevValues:any) => {
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
        <InputField type="text" placeholder="Enter Country"  size="sm" style={{width:"333px !important"}}    onChange={(e) => handleChange(e.target.value, 'country')} value={formValues.country} />
        {errors?.country && <p className="error-message">{errors?.country}</p>}
      </Grid>
     
      <Grid xs={12} md={3}>
        <ReuseableButton variant="solid" size="sm" title="Add" type="submit"  styles={{backgroundColor:"#735DA5"}}/>
      </Grid>
    </Grid>
    {alert && (
        <Alerts
        message="Country Added"
        backgroundColor="lightblue"
        textColor="light"
        duration={2000} 
        icon="✅"
        borderRadius="8px"
        boxShadow="0 4px 8px rgba(0,0,0,0.2)"
        position="top-right"  
        height="25px"         
        width="400px"         
        padding="20px"
        margin="30px"
        borderColor="black"
        borderWidth="2px"
        showCloseButton={true}
        closeButtonColor="darkred"
        // closeButtonHoverColor="lightred"
        fontSize="18px"
        fontWeight="bold"
        textAlign="left"
        zIndex={1000}
        alertPosition="200px"
        onClose={() => showAlert(false)} 
      />
      
      )}
    </form>
  );
}

export default Country;
