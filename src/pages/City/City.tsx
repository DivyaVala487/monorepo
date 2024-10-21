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
  const[loading,setLoading]=useState(false);
  const [countries, setCountries] = useState<
    { label: string; value: number }[]
  >([]);
  const [states, setStates] = useState<{ label: string; value: number }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [selectedState, setSelectedState] = useState<number | null>(null);

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
    fetchCities();
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

  const fetchStates = async (country_id: number) => {
    try {
      const payload = { country_id };
      const response = await Post(networkUrls.getAllStates, payload, false);
      const stateOptions = response.data.data.map((state: any) => ({
        label: state.state_name,
        value: state.state_id,
      }));
      setStates(stateOptions);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length === 0 &&
      selectedCountry &&
      selectedState
    ) {
      setLoading(true);
      const newCity = {
        country_id: selectedCountry,
        state_id: selectedState,
        city_name: formValues.city,
      };
      try {
        const response = await Post(networkUrls.addCity, newCity, false);
        if (response?.data?.api_status === 200) {
          fetchCities();
          setFormValues({ country: "", city: "", state: "" });
          showAlert(true);
          setLoading(false)
          setSubmissionSuccess(true);
        } else {
          showAlert(true);
          setLoading(false)
          setSubmissionSuccess(false);
        }
      } catch (error) {
        setLoading(false)
        console.error("Error adding city", error);
      }
    }
  };

  const handleChange = (value: string, fieldName: string) => {
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [fieldName]: value };
      const validationErrors = validateForm(updatedValues);
      setErrors(validationErrors);
      return updatedValues;
    });
  };

  const handleCountryChange = (value: string) => {
    const countryId = parseInt(value);
    setSelectedCountry(countryId);
    fetchStates(countryId);
  };

  const handleStateChange = (value: string) => {
    const stateId = parseInt(value);
    setSelectedState(stateId);
  };

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
              submissionSuccess
                ? "Category Added Successfully"
                : "Category Submission Failed"
            }
            backgroundColor={submissionSuccess ? "green" : "red"}
            textColor="light"
            duration={2000}
            icon={
              submissionSuccess ? (
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
        <Grid container spacing={10} sx={{ flexGrow: 1, padding: "20px" }}>
          <Grid xs={12} md={3}>
            <Dropdown
              options={countries}
              placeholder="Select your country"
              width={333}
              label="Country"
              onChange={(value) => handleCountryChange(value)}
            />
            {errors?.country && (
              <p className="error-message">{errors?.country}</p>
            )}
          </Grid>
          <Grid xs={12} md={3}>
            <Dropdown
              options={states}
              placeholder="Select your state"
              width={300}
              label="State"
              onChange={(value) => handleStateChange(value)}
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
              styles={{ marginTop: "30px" }}
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

export default City;
