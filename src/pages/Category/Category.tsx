import { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import InputField from "../../components/ReusableTextField";
import ReuseableButton from "../../components/ResusableButton";
import "../styles.css";
import validateForm from "../../utils/validations";
import { Get, Post } from "../../services/apiServices";
import { networkUrls } from "../../services/networkrls";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import Alerts from "../../components/ReusableAlerts";
import { Cancel, CheckCircle } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReusableModal from "../../components/ReusableModal";
import EditCategory from "../../components/EditCategory";
import DeleteCategory from "../../components/DeleteCategory";
import { colors } from "../../utils/constants";
const Category = () => {
  const [formValues, setFormValues] = useState<any>({
    category: "",
    categoryicon: "",
  });
  const [alert, showAlert] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<
    { id: number; category: string; image: string }[]
  >([]);
  const [errors, setErrors] = useState<any>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );
  const [filterRows, setFilterRows] = useState([]);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [deleteOpenModal, setOpenDeleteModal] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", isSuccess: false });

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "categoryicon",
      headerName: "Category icon",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Category Icon"
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
  const handleDelete = (row: any) => {
    setOpenDeleteModal(true);
    setFilterRows(row);
  };

  const handleEdit = (row: any) => {
    setEditOpenModal(true);
    setFilterRows(row);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    setErrors(validationErrors);

    if (!validationErrors.category && !validationErrors.categoryicon) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", formValues.category);
        formData.append("image", formValues.categoryicon);

        const response = await Post(networkUrls.addCategory, formData, true);
        if (response?.data?.api_status === 200) {
          setFormValues({ category: "" });
          showAlert(true);
          setLoading(false);
          setAlertInfo({ message: response?.data?.message, isSuccess: true });
          const fileInput = document.querySelector(
            'input[name="categoryicon"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          setSubmissionSuccess(true);
          fetchCategories();
        } else {
          setSubmissionSuccess(false);
          setAlertInfo({ message: response?.data?.message, isSuccess: false });
          setLoading(false);
          showAlert(true);
        }
      } catch (error) {
        setLoading(false);
        console.error("Request failed", error);
        setSubmissionSuccess(false);
        showAlert(true);
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await Get(networkUrls.getCategory, false);
      if (response?.data?.api_status === 200) {
        const fetchedCategories = response.data.data.map(
          (category: any, index: number) => ({
            id: index + 1,
            category: category.name,
            categoryicon: category.icon,
            category_id: category.category_id,
          })
        );
        setRows(fetchedCategories);
      } else {
        console.error("Error fetching countries:", response);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    handleChange(file, "categoryicon");
  };
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
              submissionSuccess ? (
                <CheckCircle style={{ color: colors.white, fontSize: "24px" }} />
              ) : (
                <Cancel style={{ color: colors.white, fontSize: "24px" }} />
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
          sx={{ margin: 0, display: "flex", gap: 4, padding: "2rem" }}
        >
          <Grid xs={12} md={3}>
            <InputField
              type="text"
              placeholder="Enter Category name"
              size="sm"
              name="category"
              label="Category"
              style={{ width: "333px", height: "36px" }}
              value={formValues.category}
              onChange={(e) => handleChange(e.target.value, "category")}
              error={errors.category}
              helperText={errors.category}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <InputField
              type="file"
              placeholder=""
              label="Category Icon"
              name="categoryicon"
              size="sm"
              style={{ width: "333px", height: "36px", padding: "6px" }}
              // value={formValues.categoryicon}
              onChange={handleFileChange}
              error={errors.categoryicon}
              helperText={errors.categoryicon}
            />
          </Grid>
          <Grid xs={12} md={12}>
            <ReuseableButton
              variant="solid"
              title="Add"
              type="submit"
              loading={loading}
              styles={{ backgroundColor: colors.primary }}
            />
          </Grid>
          <ReusableDataGrid
            rows={rows}
            columns={columns}
            initialPageSize={5}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection={false}
            disableRowSelectionOnClick={true}
            sx={{ width: "95%" }}
          />
          {editOpenModal && (
            <ReusableModal
              open={editOpenModal}
              setOpen={setEditOpenModal}
              heading="Edit Category"
              type="edit"
              component={
                <EditCategory
                  data={filterRows}
                  setAlertInfo={setAlertInfo}
                  setEditOpenModal={setEditOpenModal}
                  showAlert={showAlert}
                  fetchCategories={fetchCategories}
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
                <DeleteCategory
                  data={filterRows}
                  setOpenDeleteModal={setOpenDeleteModal}
                  showAlert={showAlert}
                  fetchCategories={fetchCategories}
                  setAlertInfo={setAlertInfo}
                />
              }
              heading="Are you sure want to delete?"
              buttonText="Delete"
              size="lg"
              style={{ width: 500 }}
            />
          )}
        </Grid>
      </form>
    </>
  );
};

export default Category;
