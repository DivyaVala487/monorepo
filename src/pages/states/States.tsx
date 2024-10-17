import React, { useState, useEffect } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from "@mui/joy/Grid";
import CustomCheckbox from "../../components/ReusableCheckbox";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { networkUrls } from "../../services/networkrls";
import validateForm from "../../utils/validations";
import { Get, Post } from "../../services/apiServices";

const States: React.FC = () => {
  const [formValues, setFormValues] = useState({
    country: "",
    shortName: "",
    state: "",
    gst: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [rows, setRows] = useState<
    { id: number; country: string; shortName: string; state: string; gst: boolean }[]
  >([]);
  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]); // For dropdown
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null); // Country ID

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await Get(networkUrls.getAllCountry, false);
        const countryOptions = response.data.data.map((country: any) => ({
          label: country.name,
          value: country.country_id,
        }));
        setCountries(countryOptions);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states based on the selected country
  const fetchStates = async (country_id: number) => {
    try {
      const payload ={
        country_id
      }
      const response = await Post(networkUrls.getAllStates, payload,false);
      console.log(response,"poststate")
      const fetchedStates = response.data.data.map((state: any, index: number) => ({
        id: index + 1,
        country: state.country_name,
        shortName: state.short_name,
        state: state.state_name,
        gst: state.gst,
      }));
      setRows(fetchedStates);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  // Handle form submission (POST request to add state)
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const validationErrors = validateForm(formValues);
  //   setErrors(validationErrors);

  //   if (Object.keys(validationErrors).length === 0 && selectedCountry) {
  //     const newState = {
  //       country_id: selectedCountry,
  //       state_name: formValues.state,
  //       short_name: formValues.shortName,
  //       gst: formValues.gst,
  //     };
  //     try {
  //       await Post(networkUrls.addState, newState, false);
  //       setFormValues({ country: "", shortName: "", state: "", gst: false });
  //       // Refresh states after adding a new one
  //       fetchStates(selectedCountry);
  //     } catch (error) {
  //       console.error("Error adding state", error);
  //     }
  //   }
  // };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted");  // Debugging log
    
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);
    console.log("Validation errors:", validationErrors);  // Debug validation errors
    
    if (Object.keys(validationErrors).length === 0 && selectedCountry) {
      const newState = {
        country_id: selectedCountry,
        state_name: formValues.state,
        short_name: formValues.shortName,
        gst: formValues.gst,
      };
      console.log("Payload: ", newState);  // Log payload before API call
      try {
        const response = await Post(networkUrls.addState, newState, false);
        console.log("API response:", response);  // Log API response
        setFormValues({ country: "", shortName: "", state: "", gst: false });
        fetchStates(selectedCountry);  // Fetch updated states after submission
      } catch (error) {
        console.error("Error adding state", error);
      }
    } else {
      console.log("Validation errors:", validationErrors);  // Log validation errors
    }
  };
  
  
  const handleChange = (value: string | boolean, fieldName: string) => {
    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [fieldName]: value,
      };
      const validationErrors = validateForm(updatedValues);
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [fieldName]: validationErrors[fieldName],
      }));

      return updatedValues;
    });
  };

  // const handleCountryChange = (value: string | undefined) => {
  //   const countryId = value ? parseInt(value) : null; // Convert to number or null
  //   setSelectedCountry(countryId); // Use the correct state setter
  // };
  const handleCountryChange = (value: string | undefined) => {
    const countryId = value ? parseInt(value) : null; // Convert to number or null
    setSelectedCountry(countryId);  // Update selected country ID
  
    // Update formValues.country to ensure validation passes
    setFormValues((prevValues) => ({
      ...prevValues,
      country: value || "",  // Update the form value for country
    }));
  
    // Clear any existing country validation error
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      country: undefined,  // Remove country error
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    handleChange(checked, "gst");
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "shortName", headerName: "Short Name", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    {
      field: "gst",
      headerName: "Is GST Required?",
      flex: 1,
      renderCell: (params) => (params.value ? "Yes" : "No"),
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ flexGrow: 1, padding: "2rem" }}>
          <Grid xs={12} md={4}>
            <label>Country</label>
            <Dropdown
              options={countries}
              placeholder="Select your Country"
              width={333}
              onChange={(value) => handleCountryChange(value)}
            />
            {errors?.country && <p className="error-message">{errors?.country}</p>}
          </Grid>
          <Grid xs={12} md={4}>
            <InputField
              type="text"
              placeholder="Enter name"
              size="sm"
              style={{ width: "333px", height: "36px" }}
              name="state"
              onChange={(e) => handleChange(e.target.value, "state")}
              value={formValues.state}
              label="State"
            />
            {errors?.state && <p className="error-message">{errors?.state}</p>}
          </Grid>
          <Grid xs={12} md={4}>
            <InputField
              type="text"
              placeholder="Enter Short name"
              size="sm"
              style={{ width: "333px", height: "36px" }}
              name="shortName"
              onChange={(e) => handleChange(e.target.value, "shortName")}
              value={formValues.shortName}
              label="Short Name"
            />
            {errors?.shortName && <p className="error-message">{errors?.shortName}</p>}
          </Grid>
          <Grid xs={12} md={3}>
            <label>Is GST Required?</label>
            <CustomCheckbox
              onChange={handleCheckboxChange}
              name="gst"
              checked={formValues.gst}
            />
            {errors?.gst && <p className="error-message">{errors?.gst}</p>}
          </Grid>
          <Grid xs={12} md={12}>
            <ReuseableButton
              variant="solid"
              size="sm"
              title="Submit"
              type="submit"
              styles={{ backgroundColor: "#735DA5" }}
            />
          </Grid>
        </Grid>
      </form>
      <ReusableDataGrid
        rows={rows}
        columns={columns}
        initialPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection={false}
        disableRowSelectionOnClick={true}
      />
    </>
  );
};

export default States;
