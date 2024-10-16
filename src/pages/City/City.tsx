import React, { useState } from "react";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import Dropdown from "../../components/ResusableDropdown";
import Grid from "@mui/joy/Grid";
import validateForm from "../../utils/validations";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import { GridColDef } from "@mui/x-data-grid";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newRow = {
        id: rows.length + 1,
        country: formValues.country,
        state: formValues.state,
        city: formValues.city,
      };
      setRows((prevRows) => [...prevRows, newRow]);
      setFormValues({ country: "", city: "", state: "" });
    }
  };

  const handleChange = (value: string, fieldName: string) => {
    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [fieldName]: value,
      };

      const validationErrors = validateForm(updatedValues);
      setErrors(validationErrors);

      return updatedValues;
    });
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
        <Grid container spacing={10} sx={{ flexGrow: 1, padding: "20px" }}>
          <Grid xs={12} md={3}>
            <Dropdown
              options={[
                { label: "India", value: "india" },
                { label: "US", value: "us" },
                { label: "Dubai", value: "dubai" },
                { label: "Australia", value: "australia" },
              ]}
              placeholder="Select your country"
              width={333}
              onChange={(value) => handleChange(value, "country")}
            />
            {errors?.country && (
              <p className="error-message">{errors?.country}</p>
            )}
          </Grid>
          <Grid xs={12} md={3}>
            <Dropdown
              options={[
                { label: "Telangana", value: "telangana" },
                { label: "Andhra Pradesh", value: "andhrapradesh" },
                { label: "Maharashtra", value: "maharashtra" },
                { label: "Tamilnadu", value: "tamilnadu" },
              ]}
              placeholder="Select your state"
              width={300}
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
