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
import { CheckCircle, Cancel } from "@mui/icons-material";
import ReusableModal from "../../components/ReusableModal";
import EditSubCategory from "../../components/EditSubCategory";
import DeleteSubCategory from "../../components/DeleteSubCategory";
import EditCountry from "../../components/EditCountry";
import DeleteCountry from "../../components/DeleteCountry";
import { colors } from "../../utils/constants";
import "../styles.css"
const Country: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({
    country: "",
    countryicon: null,
  });
  const [errors, setErrors] = useState<any>({});
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", isSuccess: false });
  const [filterRows, setFilterRows] = useState([]);
  const [deleteOpenModal, setOpenDeleteModal] = useState(false);
  const [alert, showAlert] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<{ id: number; country: string }[]>([]);
  const [data, setData] = useState([]);
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
     {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <EditIcon
            sx={{ cursor: "pointer", color: "#735DA5", marginRight: "10px" }}
            onClick={() => handleEdit(params.row)}
          />
          <DeleteIcon
            sx={{ cursor: "pointer", color: "#735DA5" }}
            onClick={() => handleDelete(params.row)}
          />
        </>
      ),
    },
  ];

  const handleEdit = (row: any) => {
    console.log("Editing row:", row);
    setEditOpenModal(true);
    setFilterRows(row);
  };

  const handleDelete = async (row: any) => {
    console.log("Deleting row with ID:", row);
    setOpenDeleteModal(true);
    setFilterRows(row);
    console.log(filterRows,"filterrows");
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
            country_id: country.country_id
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
          setFormValues({ country: "", countryicon: "" });
          const fileInput = document.querySelector(
            'input[name="countryicon"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          fetchCountries();
          setLoading(false);

          setSubmissionSuccess(true);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: true,
          });
        } else {
          setSubmissionSuccess(false);
          showAlert(true);
          setLoading(false);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: false,
          });
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
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        [fieldName]: validationErrors[fieldName],
      }));

      return updatedValues;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      {alert && (
          <Alerts
          message={alertInfo.isSuccess ? alertInfo.message : alertInfo.message}
            backgroundColor={alertInfo.isSuccess ? colors.success : colors.error}
            icon={
              alertInfo.isSuccess ? (
                <CheckCircle style={{ color: colors.white, fontSize: "24px" }} />
              ) : (
                <Cancel style={{ color: colors.white, fontSize: "24px" }} />
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
        <Grid container spacing={2} className="country-container">
          <Grid xs={12} md={3} lg={4} sm={4}>
            <InputField
              type="text"
              placeholder="Country"
              size="sm"
              value={formValues.country}
              style={{ height: "36px" }}
              onChange={(e) => handleChange(e.target.value, "country")}
              label="Country"
              error={errors?.country}
              helperText={errors?.country}
            />
            {/* {errors?.country && (
              <p className="error-message">{errors?.country}</p>
            )} */}
          </Grid>
          <Grid xs={12} md={3} lg={4} sm={4}>
            <InputField
              type="file"
              placeholder=""
              label="Country Icon"
              name="countryicon"
              size="sm"
              style={{  height: "36px", padding: "6px" }}
              // value={formValues.countryicon}
              onChange={handleFileChange}
              error={errors?.countryicon }
              helperText={errors?.countryicon}
            />
            {/* {errors?.countryicon && (
              <p className="error-message">{errors?.countryicon}</p>
            )} */}
          </Grid>

          <Grid xs={12} md={3} sm={3}>
            <ReuseableButton
              variant="solid"
              size="sm"
              title="Add"
              type="submit"
              loading={loading}
              styles={{ backgroundColor:colors.primary }}
              className="country-btn"
            />
          </Grid>
          <ReusableDataGrid
            rows={rows}
            columns={columns}
            initialPageSize={5}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableRowSelectionOnClick={true}
            sx={{ marginLeft: "9px", width: "95%" }}
          />
        </Grid>
      </form>
      {/* <ReusableDataGrid
        rows={data}
        columns={columns}
        initialPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection={false}
        disableRowSelectionOnClick={true}
        sx={{width:"90%",marginLeft:"40px"}}
      /> */}
        {editOpenModal && (
          <ReusableModal
            open={editOpenModal}
            setOpen={setEditOpenModal}
            heading="Edit Country"
            type="edit"
            component={
              <EditCountry
                data={filterRows}
                setAlertInfo={setAlertInfo}
                setEditOpenModal={setEditOpenModal}
                showAlert={showAlert}
                fetchCountries={fetchCountries}
              />
            }
            size="lg"
          />
        )}
        {deleteOpenModal && (
          <ReusableModal
            open={deleteOpenModal}
            setOpen={setOpenDeleteModal}
            type="delete"
            component={
              <DeleteCountry
                data={filterRows}
                setOpenDeleteModal={setOpenDeleteModal}
                showAlert={showAlert}
                fetchCountries={fetchCountries}
                setAlertInfo={setAlertInfo}
              />
            }
            heading="Are you sure want to delete?"
            buttonText="Delete"
            size="lg"
            style={{ width: 500 }}
          />
        )}
    </>
  );
};

export default Country;
