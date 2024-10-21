import React, { useState, useEffect } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Grid from "@mui/joy/Grid";
import validateForm from "../../utils/validations";
import { Get, Post } from "../../services/apiServices";
import { networkUrls } from "../../services/networkrls";
import Alerts from "../../components/ReusableAlerts";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { CheckCircle, Cancel } from '@mui/icons-material';
const Country: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({
    country: "",
    countryicon: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [alert, showAlert] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<{ id: number; country: string }[]>([]);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "country", headerName: "Country", flex: 1 },
    {
      field: "countryicon",
      headerName: "Country icon",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Country Icon"
          style={{ width: "45px", height: "45px", objectFit: "cover" }}
        />
      ),
    },
  ];

  const handleEdit = (row: any) => {
    console.log("Editing row:", row);
  };

  const handleDelete = async (id: number) => {
    console.log("Deleting row with ID:", id);
  };

  const fetchCountries = async () => {
    try {
      const response = await Get(networkUrls.getAllCountry, false);
      console.log(response.data.data, "response");
      if (response?.data?.api_status === 200) {
        const fetchedCountries = response.data.data.map(
          (country: any, index: number) => ({
            id: index + 1,
            country: country.name,
            countryicon: country.flag,
          })
        );
        setRows(fetchedCountries);
      } else {
        console.error("Error fetching countries:", response);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (!validationErrors.country) {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", formValues.country);
      formData.append("image", formValues.countryicon);
      try {
        const response = await Post(networkUrls.addCountry, formData, true);
        if (response?.data?.api_status === 200) {
          showAlert(true);
          setFormValues({ country: "" });
          fetchCountries();
          setLoading(false);

          setSubmissionSuccess(true);
        } else {
          setSubmissionSuccess(false);
          showAlert(true);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error adding country:", error);
        setLoading(false);
      }
    }
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    handleChange(file, "countryicon");
  };

  const handleChange = (value: string | File, fieldName: string) => {
    setFormValues((prevValues: any) => {
      const updatedValues = {
        ...prevValues,
        [fieldName]: value,
      };

      const validationErrors = validateForm(updatedValues);
      setErrors(validationErrors);

      setErrors(validationErrors);

      return updatedValues;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {alert && (
          <Alerts
            message={
              submissionSuccess
                ? "Country Added Successfully"
                : "Country Submission Failed"
            }
            backgroundColor={submissionSuccess ? "green" : "red"}
            icon={
              submissionSuccess ? (
                <CheckCircle style={{ color: "white", fontSize: "24px" }} />
              ) : (
                <Cancel style={{ color: "white", fontSize: "24px" }} />
              )
            }
            textColor="light"
            duration={2000}
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
            <InputField
              type="text"
              placeholder="Enter Country"
              size="sm"
              value={formValues.country}
              style={{ width: "333px !important", height: "36px" }}
              onChange={(e) => handleChange(e.target.value, "country")}
              label="Country"
            />
            {errors?.country && (
              <p className="error-message">{errors?.country}</p>
            )}
          </Grid>
          <Grid xs={12} md={3}>
            <InputField
              type="file"
              placeholder=""
              label="Country Icon"
              name="countryicon"
              size="sm"
              style={{ width: "333px", height: "36px", padding: "6px" }}
              value={formValues.categoryicon}
              onChange={handleFileChange}
            />
            {errors?.categoryicon && (
              <p className="error-message">{errors?.countryicon}</p>
            )}
          </Grid>

          <Grid xs={12} md={3}>
            <ReuseableButton
              variant="solid"
              size="sm"
              title="Add"
              type="submit"
              loading={loading}
              styles={{ backgroundColor: "#735DA5", marginTop: "30px" }}
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

export default Country;
