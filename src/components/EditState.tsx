import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import InputField from "./ReusableTextField";
import ReuseableButton from "./ResusableButton";
import validateForm from "../utils/validations";
import { Put } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";
import DummyImage from "../assessts/images/image.png"; // Fixed the path typo
import CustomCheckbox from "./ReusableCheckbox";
import "./styles.css";
import { Typography } from "@mui/joy";

const EditState = ({
  data,
  setEditOpenModal,
  setAlertInfo,
  fetchStates,
  showAlert,
}: any) => {
  const [stateData, setStateData] = useState({
    shortName: "",
    state: "",
    gst: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isDummy, setIsDummy] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    handleChange(checked, "gst");
  };

  const handleChange = (value: any, field: any) => {
    setStateData((prev: any) => ({
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
    setStateData({
      state: data.state,
      shortName: data.shortName,
      gst: data.gst,
    });
  }, []);

  console.log(data, "ineditcountrey");
  const handleFileChange: any = (e: any) => {
    const fileList = e.target.files[0];

    setIsDummy(true);
    handleChange(fileList, "icon");

    console.log(fileList, "fileList");
  };

  const handleSubmit = async (e: any) => {
    console.log("incounteysubmit");
    e.preventDefault();
    console.log(stateData, "CountryDataToSee");
    const stateDataErrors = validateForm(stateData);
    console.log(stateDataErrors, "errors");

    console.log(data, "data");

    if (stateDataErrors.country) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        countryData: stateDataErrors,
      }));
    } else {
      setLoading(true);
      const formData: any = new FormData();
      formData.append("short_name", stateData.shortName);
      formData.append("state_name", stateData.state);
      formData.append("gst", stateData.gst);
      formData.append("country_id", data.country_id);
      formData.append("state_id",data.state_id);

      console.log(formData, "formData");

      try {
        const response: any = await Put(
          networkUrls.editState,
          formData,
          false
        );
        console.log(response, "responseToSee");
        if (response?.response?.api_status === 200) {
          setAlertInfo({
            message: response?.response?.message,
            isSuccess: true,
          });
          setEditOpenModal(false);
          showAlert(true);
          fetchStates();
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
        setLoading(false); // Ensure loading state resets after try/catch
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4}>
        <Grid xs={12} md={5}>
          <InputField
            type="text"
            // placeholder="Enter State"
            size="sm"
            name="state"
            label="State Name"
            value={stateData.state}
            style={{ width: "100%", height: "36px" }}
            onChange={(e) => handleChange(e.target.value, "state")}
          />
          {errors.countryData?.country && (
            <p className="error-message" style={{ fontSize: "1rem" }}>
              {errors.countryData.country}
            </p>
          )}
        </Grid>
        <Grid xs={12} md={5}>
          <InputField
            type="text"
            label="Short Name"
            name="shortName"
            size="sm"
            value={stateData.shortName}
            style={{ width: "100%", height: "36px", padding: "6px" }}
            onChange={(e) => handleChange(e.target.value, "shortName")}
          />
          {errors.countryData?.icon && (
            <p className="error-message" style={{ fontSize: "1rem" }}>
              {errors.countryData.icon}
            </p>
          )}
        </Grid>
        <Grid xs={12} md={5}>
        <Typography component="label"  className="label-heading">
          {"Is GST Required?"}
        </Typography>
          <CustomCheckbox
            onChange={handleCheckboxChange}
            // label="Gst"
            name="gst"
            checked={stateData.gst}
            // onChange={(e) => handleChange(e.target.value, "gst")}
          />
          {errors.countryData?.icon && (
            <p className="error-message" style={{ fontSize: "1rem" }}>
              {errors.countryData.icon}
            </p>
          )}
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

export default EditState;
