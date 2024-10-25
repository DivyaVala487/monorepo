import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import InputField from "./ReusableTextField";
import ReuseableButton from "./ResusableButton";
import validateForm from "../utils/validations";
import { Put } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";
import DummyImage from "../assessts/images/image.png";

const EditCountry = ({
  data,
  setEditOpenModal,
  setAlertInfo,
  fetchCountries,
  showAlert,
}: any) => {
  const [countryData, setCountryData] = useState({ country: "", icon: "" });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isDummy, setIsDummy] = useState(false);

  const handleChange = (value: any, field: any) => {
    setCountryData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      countryData: {
        ...prevErrors.countryData,
        [field]: undefined,
      },
    }));
  };

  useEffect(() => {
    setCountryData({
      country: data.country,
      icon: data.countryicon,
    });
  }, []);

  const handleFileChange: any = (e: any) => {
    const fileList = e.target.files[0];
    setIsDummy(true);
    handleChange(fileList, "icon");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const countryDataErrors = validateForm(countryData);
    if (countryDataErrors.country) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        countryData: countryDataErrors,
      }));
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", countryData.country);
      formData.append("image", countryData.icon);
      formData.append("country_id", data.country_id);
      try {
        const response: any = await Put(
          networkUrls.editCountry,
          formData,
          true
        );
        if (response?.response?.api_status === 200) {
          setAlertInfo({
            message: response?.response?.message,
            isSuccess: true,
          });
          setEditOpenModal(false);
          showAlert(true);
          fetchCountries();
        } else {
          setAlertInfo({
            message: response?.response?.message,
            isSuccess: false,
          });
          showAlert(true);
          setEditOpenModal(false);
        }
      } catch (error) {
        console.log("Error updating country", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid xs={12} md={5}>
          <InputField
            type="text"
            placeholder="Enter Country"
            size="sm"
            label="Country"
            value={countryData.country}
            style={{ width: "100%", height: "36px" }}
            onChange={(e) => handleChange(e.target.value, "country")}
          />
          {errors.countryData?.country && (
            <p className="error-message" style={{ fontSize: "1rem" }}>
              {errors.countryData.country}
            </p>
          )}
        </Grid>
        <Grid xs={12} md={5}>
          <InputField
            type="file"
            label="Country Icon"
            name="icon"
            size="sm"
            style={{ width: "100%", height: "36px", padding: "6px" }}
            onChange={handleFileChange}
          />
          {errors.countryData?.icon && (
            <p className="error-message" style={{ fontSize: "1rem" }}>
              {errors.countryData.icon}
            </p>
          )}
        </Grid>
        <Grid xs={12} md={1}>
          <img
            src={isDummy ? DummyImage : countryData.icon}
            alt="icon"
            style={{
              height: "50px",
              width: "50px",
              paddingTop: isDummy ? "20px" : "12px",
            }}
          />
        </Grid>
        <Grid xs={12} md={12}>
          <ReuseableButton
            variant="solid"
            title="Update"
            type="submit"
            loading={loading}
            styles={{ backgroundColor: "#735DA5" }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditCountry;
