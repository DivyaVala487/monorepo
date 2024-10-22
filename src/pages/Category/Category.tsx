import React, { useEffect, useState } from "react";
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
const Category = () => {
  const [formValues, setFormValues] = useState<any>({
    category: "",
    categoryicon: null,
  });
  const [alert, showAlert] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<
    { id: number; category: string; image: string }[]
  >([]);
  const [errors, setErrors] = useState<any>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(null);
  console.log(formValues);
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "categoryicon", headerName: "Category icon", flex: 1,renderCell: (params) => (
      <img
        src={params.value} 
        alt="Category Icon"
        style={{ width: '45px', height: '45px', objectFit: 'cover'}} 
      />
    ), },
  ];
  const handleSubmit = async (e: any) => {
    console.log("hello");
    e.preventDefault();
    const validationErrors = validateForm(formValues);
    console.log(validationErrors,"errors")
    setErrors(validationErrors);

    if (!validationErrors.category && !validationErrors.categoryicon) {
      setLoading(true)
      try {
        const formData = new FormData();
        formData.append("name", formValues.category);
        console.log(formValues.categoryicon, "icon");
        formData.append("image", formValues.categoryicon);

        const response = await Post(networkUrls.addCategory, formData, true);
        if (response?.data?.api_status === 200) {
          console.log("Success:", response);
          setFormValues({category:""})
          showAlert(true);
          setLoading(false)
          const fileInput = document.querySelector(
            'input[name="categoryicon"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          setSubmissionSuccess(true)
          fetchCategories()
        } else {
          console.error("Error:", response?.data?.api_status);
          setSubmissionSuccess(false)
          setLoading(false)
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
      console.log(response.data.data, "response");
      if (response?.data?.api_status === 200) {
        const fetchedCategories = response.data.data.map(
          (category: any, index: number) => ({
            id: index + 1,
            category: category.name,
            categoryicon:category.icon
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
            submissionSuccess
              ? "Category Added Successfully"
              : "Category Submission Failed"
          }
            backgroundColor={submissionSuccess ? "green" :"red"}
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
        <Grid container sx={{ padding: "2rem", display: "flex", gap: 4 }}>
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
            />
            {errors?.category && (
              <p className="error-message">{errors?.category}</p>
            )}
          </Grid>
          <Grid xs={12} md={3}>
            <InputField
              type="file"
              placeholder=""
              label="Category Icon"
              name="categoryicon"
              size="sm"
              style={{ width: "333px", height: "36px",padding:"6px" }}
                // value={formValues.categoryicon}
              onChange={handleFileChange}
            />
            {errors?.categoryicon && (
              <p className="error-message">{errors?.categoryicon}</p>
            )}
          </Grid>
          <Grid xs={12} md={12}>
            <ReuseableButton
              variant="solid"
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
        sx={{  width: "95%" }}
      />
        </Grid>
      </form>
     
    </>
  );
};

export default Category;
