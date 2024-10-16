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

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "country", headerName: "Country", flex: 1 },
];

const Country: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({ country: "" });
  const [errors, setErrors] = useState<any>({});
  const [alert, showAlert] = useState<any>(false);
  const [rows, setRows] = useState<{ id: number; country: string }[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await Get(networkUrls.getAllCountry, false);
      console.log(response.data.data,"response")
      if (response?.data?.api_status === 200) {
        const fetchedCountries = response.data.data.map((country: any, index: number) => ({
          id: index + 1,
          country: country.name
        }));
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
      const payload: any = {
        name: formValues.country,
      };
      try {
        const response = await Post(networkUrls.addCountry, payload, false);
        if (response?.data?.api_status === 200) {
          showAlert(true);
          setFormValues({ country: "" });
          fetchCountries();
        } else {
          console.error("Error adding country:", response);
        }
      } catch (error) {
        console.error("Error adding country:", error);
      }
    }
  };

  const handleChange = (value: string, fieldName: string) => {
    setFormValues((prevValues: any) => {
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
    <>
      <form onSubmit={handleSubmit}>
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
              style={{ width: "333px !important" }}
              onChange={(e) => handleChange(e.target.value, "country")}
              label="Country"
            />
            {errors?.country && <p className="error-message">{errors?.country}</p>}
          </Grid>

          <Grid xs={12} md={3}>
            <ReuseableButton
              variant="solid"
              size="sm"
              title="Add"
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

export default Country;
