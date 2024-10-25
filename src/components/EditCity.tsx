import React, { useEffect, useState } from "react";
import InputField from "./ReusableTextField";
import Dropdown from "./ResusableDropdown";
import ReuseableButton from "./ResusableButton";
import { Post, Get } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";
import { Grid } from "@mui/joy";
import validateForm from "../utils/validations";

interface EditCityProps {
  data: any;
  setEditOpenModal: any;
  getCities: any;
  setAlertInfo: any;
  showAlert: any;
}

const EditCity: React.FC<EditCityProps> = ({
  data,
  setAlertInfo,
  setEditOpenModal,
  getCities,
  showAlert,
}) => {
  const [formValues, setFormValues] = useState({
    country: "",
    city: "",
    state: "",
  });
  const [countries, setCountries] = useState<
    { label: string; value: number }[]
  >([]);
  const [states, setStates] = useState<
    { label: string; value: number; country_id: number }[]
  >([]);
  const [filterStates, setFilterStates] = useState<
    { label: string; value: number; country_id: number }[]
  >([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    fetchCountries();
    fetchStates();
    setFormValues({
      country: data.country_id,
      state: data.state_id,
      city: data.city,
    });
  }, []);
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

  const fetchStates = async () => {
    try {
      const response = await Get(networkUrls.getAllStates, false);

      const stateOptions = response.data.data.map((state: any) => ({
        label: state.state_name,
        value: state.state_id,
        country_id: state.country_id,
      }));
      setStates(stateOptions);
      setFilterStates(stateOptions);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  const handleChange = (value: string, fieldName: string) => {
    setFormValues((prevValues) => {
      const updatedValues = { ...prevValues, [fieldName]: value };
      if (fieldName === "country") {
        const countryId = value;
        const statesFiltered = states.filter(
          (state: any) => state.country_id === countryId
        );
        setFilterStates(statesFiltered);
      }
      return updatedValues;
    });

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      formValues: {
        ...prevErrors.formValues,
        [fieldName]: undefined,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCity = {
      country_id: formValues.country,
      state_id: formValues.state,
      city_name: formValues.city,
    };

    const validateCity = validateForm(formValues);
    if (validateCity.city || validateCity.state || validateCity.country) {
      console.log("hello");
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        formValues: validateCity,
      }));
    } else {
      setFormValues({ country: "", state: "", city: "" });
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        formValues: {},
      }));

      try {
        const response = await Post(
          `${networkUrls.editCity}/${data.city_id}`,
          updatedCity,
          false
        );
        if (response?.data?.api_status === 200) {
          // onClose();
          setEditOpenModal(false);
          getCities();
          showAlert(true);
          setAlertInfo({ message: response?.data?.message, isSuccess: true });
        } else {
          setAlertInfo({ message: response?.data?.message, isSuccess: false });
        }
      } catch (error) {
        console.error("Error updating city", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={12} md={5}>
          <Dropdown
            options={countries}
            label="Country"
            value={formValues.country}
            onChange={(value) => handleChange(value, "country")}
            defaultValue={formValues.country}
            name="country"
          />
        </Grid>
        <Grid xs={12} md={5}>
          <Dropdown
            options={filterStates}
            label="State"
            value={formValues.state}
            defaultValue={formValues.state}
            onChange={(value) => handleChange(value, "state")}
            name="state"
          />
        </Grid>
        <Grid xs={12} md={5}>
          <InputField
            label="City"
            value={formValues.city}
            name="city"
            onChange={(value: any) => handleChange(value, "city")}
          />
        </Grid>
        <Grid xs={12} md={12}>
          <ReuseableButton type="submit" variant="solid" title="Update" />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditCity;
