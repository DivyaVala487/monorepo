import React, { useState, useEffect } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from "@mui/joy/Grid";
import validateForm from "../../utils/validations";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Post, Get } from "../../services/apiServices";
import { networkUrls } from "../../services/networkrls";
import Alerts from "../../components/ReusableAlerts";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { number } from "yup";

const City: React.FC = () => {
  const [formValues, setFormValues] = useState({
    country: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [rows, setRows] = useState<
    { id: number; country: string; state: string; city: string }[]
  >([]);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );
  const [alert, showAlert] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<
    { label: string; value: number }[]
  >([]);
  const [alertInfo, setAlertInfo] = useState({ message: "", isSuccess: false });
  const [states, setStates] = useState<{ label: string; value: number ,country_id: number}[]>([]);
  const [filterStates, setFilterStates] = useState<{ label: string; value: number ,country_id: number}[]>([]);
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
    fetchCities();
    fetchStates();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await Get(networkUrls.getAllCitys, false);
      const fetchedCities = response.data.data.map(
        (city: any, index: number) => ({
          id: index + 1,
          country: city.country_name,
          state: city.state_name,
          city: city.city_name,
        })
      );
      setRows(fetchedCities);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await Get(networkUrls.getAllStates, false);
      const stateOptions = response.data.data.map((state: any) => ({
        label: state.state_name,
        value: state.state_id,
        country_id:state.country_id
      }));
      setStates(stateOptions);
      setFilterStates(stateOptions);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (
      !validationErrors.country &&
      !validationErrors.state &&
      !validationErrors.city
    ) {
      setLoading(true);
      const newCity = {
        country_id: formValues.country,
        state_id: formValues.state,
        city_name: formValues.city,
      };
      try {
        const response = await Post(networkUrls.addCity, newCity, false);
        if (response?.data?.api_status === 200) {
          fetchCities();
          setFormValues({ country: "", city: "", state: "" });
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: true,
          });
          showAlert(true);
          setLoading(false);
        } else {
          showAlert(true);
          setLoading(false);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: false,
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("Error adding city", error);
      }
    }
  };

  const handleChange = (value: string, fieldName: string) => {
    console.log("hey")
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [fieldName]: value };
      console.log(typeof(value)==="number","value")
      if(fieldName==="country" && typeof(value)==="number"){
        const countryId= value;
        console.log(states,countryId,"hhdh")
        const States= states.filter((state,index)=>state.country_id===countryId)
        console.log(States,"filterstates")
        setFilterStates(States)
      }
      console.log(value,"val")
      if(typeof(value)==="number" || value!==null){
        const validationErrors = validateForm(updatedValues);
        console.log(validationErrors,"error")
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          [fieldName]: validationErrors[fieldName],
        }));
      }
     
      return updatedValues;
    });
  };
console.log(states,"states")
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        {alert && (
          <Alerts
            message={
              alertInfo.isSuccess ? alertInfo.message : alertInfo.message
            }
            backgroundColor={alertInfo.isSuccess ? "green" : "red"}
            textColor="light"
            duration={2000}
            icon={
              alertInfo.isSuccess ? (
                <CheckCircle style={{ color: "white", fontSize: "24px" }} />
              ) : (
                <Cancel style={{ color: "white", fontSize: "24px" }} />
              )
            }
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
            fontSize="18px"
            fontWeight="bold"
            textAlign="left"
            zIndex={1000}
            alertPosition="200px"
            onClose={() => showAlert(false)}
          />
        )}
        <Grid container spacing={10} sx={{ flexGrow: 1, padding: "2rem" }}>
          <Grid xs={12} md={3}>
            <Dropdown
              options={countries}
              placeholder="Select your country"
              width={333}
              label="Country"
              value={formValues.country}
              onChange={(value) => handleChange(value, "country")}
            />
            {errors?.country && (
              <p className="error-message">{errors?.country}</p>
            )}
          </Grid>
          <Grid xs={12} md={3}>
            <Dropdown
              options={filterStates}
              placeholder="Select your state"
              width={300}
              value={formValues.state}
              label="State"
              onChange={(value) => handleChange(value, "state")}
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
              onChange={(e) => handleChange(e.target.value, "city")}
              label="City"
            />
            {errors?.city && <p className="error-message">{errors?.city}</p>}
          </Grid>
          <Grid xs={12} md={3}>
            <ReuseableButton
              variant="solid"
              size="sm"
              title="Submit"
              type="submit"
              loading={loading}
              styles={{ marginTop: "30px", backgroundColor: "#735DA5" }}
            />
          </Grid>
          <ReusableDataGrid
            rows={rows}
            columns={columns}
            initialPageSize={5}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableRowSelectionOnClick={true}
            sx={{ marginLeft: "40px", width: "95%" }}
          />
        </Grid>
      </form>
    </>
  );
};

export default City;
