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
import { Cancel, CheckCircle } from "@mui/icons-material";
import Alerts from "../../components/ReusableAlerts";
import ReusableModal from "../../components/ReusableModal";
import DeleteState from "../../components/DeleteState";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditState from "../../components/EditState";

const States: React.FC = () => {
  const [formValues, setFormValues] = useState({
    country: "",
    shortName: "",
    state: "",
    gst: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [rows, setRows] = useState<
    {
      id: number;
      country: string;
      shortName: string;
      state: string;
      gst: boolean;
    }[]
  >([]);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );
  const [alert, showAlert] = useState<any>(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", isSuccess: false });
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [editOpenModal, setEditOpenModal] = useState(false);
  // const [alertInfo, setAlertInfo] = useState({ message: "", isSuccess: false });
  const [filterRows, setFilterRows] = useState([]);
  const [deleteOpenModal, setOpenDeleteModal] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await Get(networkUrls.getAllCountry, false);
        const countryOptions = response.data.data.map((country: any) => ({
          label: country.name,
          value: country.country_id,
        }));
        setCountries(countryOptions);
        console.log(countryOptions,"countryOptions");
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };

    fetchCountries();
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await Get(networkUrls.getAllStates, false);
      console.log(response, "poststate");
      const fetchedStates = response.data.data.map(
        (state: any, index: number) => ({
          id: index + 1,
          country: state.name,
          shortName: state.short_name,
          state: state.state_name,
          gst: state.gst,
          state_id:state.state_id,
          country_id:state.country_id
        })
      );
      setRows(fetchedStates);
      console.log(fetchedStates,"fetchedStates");
      console.log(rows, "reows");
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form submitted");

    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);
    console.log("Validation errors:", validationErrors);

    if (
      !validationErrors.country &&
      !validationErrors.shortName &&
      !validationErrors.state
    ) {
      setLoading(true);
      const newState = {
        country_id: selectedCountry,
        state_name: formValues.state,
        short_name: formValues.shortName,
        gst: formValues.gst,
      };
      try {
        const response: any = await Post(networkUrls.addState, newState, false);
        if (response?.data?.api_status === 200) {
          console.log(response.data.message, "response");
          showAlert(true);
          setLoading(false);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: true,
          });
          console.log("API response:", response);
          setFormValues({ country: "", shortName: "", state: "", gst: false });
          fetchStates();
        } else {
          showAlert(true);
          setLoading(false);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: false,
          });
        }
      } catch (error) {
        console.error("Error adding state", error);
        setLoading(false);
      }
    } else {
      console.log("Validation errors:", validationErrors);
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

  const handleCountryChange = (value: string | undefined) => {
    const countryId = value ? parseInt(value) : null;
    setSelectedCountry(countryId);

    setFormValues((prevValues) => ({
      ...prevValues,
      country: value || "",
    }));

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      country: undefined,
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
    console.log("Deleting", row);
    setOpenDeleteModal(true);
    setFilterRows(row);
    console.log(filterRows, "filterrows");
  };

  console.log(alertInfo, "alertinfo");

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
        <Grid
          container
          spacing={2}
          sx={{ flexGrow: 1, margin: 0, padding: "2rem" }}
        >
          <Grid xs={12} md={4}>
            <Dropdown
              options={countries}
              placeholder="Select your Country"
              width={333}
              label="Country"
              value={formValues.country}
              onChange={(value) => handleCountryChange(value)}
            />
            {errors?.country && (
              <p className="error-message">{errors?.country}</p>
            )}
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
            {errors?.shortName && (
              <p className="error-message">{errors?.shortName}</p>
            )}
          </Grid>
          <Grid xs={12} md={3}>
            <label>Is GST Required?</label>
            <CustomCheckbox
              onChange={handleCheckboxChange}
              name="gst"
              checked={formValues.gst}
            />
          </Grid>
          <Grid xs={12} md={12}>
            <ReuseableButton
              variant="solid"
              size="sm"
              title="Submit"
              type="submit"
              loading={loading}
              styles={{ backgroundColor: "#735DA5" }}
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
      {editOpenModal && (
        <ReusableModal
          open={editOpenModal}
          setOpen={setEditOpenModal}
          heading="Edit Category"
          type="edit"
          component={
            <EditState
              data={filterRows}
              setAlertInfo={setAlertInfo}
              setEditOpenModal={setEditOpenModal}
              showAlert={showAlert}
              fetchStates={fetchStates}
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
            <DeleteState
              data={filterRows}
              setOpenDeleteModal={setOpenDeleteModal}
              showAlert={showAlert}
              fetchStates={fetchStates}
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

export default States;
