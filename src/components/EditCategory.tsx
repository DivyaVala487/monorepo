import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import InputField from "./ReusableTextField";
import ReuseableButton from "./ResusableButton";
import validateForm from "../utils/validations";
import { Put } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";
import DummyImage from "../assessts/images/image.png";

const EditCategory = ({
  data,
  setEditOpenModal,
  setAlertInfo,
  fetchCategories,
  showAlert,
}: any) => {
  const [categoryData, setCategoryData] = useState({
    category: "",
    categoryicon: "",
  });
  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [isDummy, setIsDummy] = useState(false);
  const handleChange = (value: string, field: string) => {
    setCategoryData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    setError((prevErrors: any) => ({
      ...prevErrors,
      categoryData: {
        ...prevErrors.categoryData,
        [field]: undefined,
      },
    }));
  };

  useEffect(() => {
    setCategoryData({
      category: data.category,
      categoryicon: data.categoryicon,
    });
  }, []);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setIsDummy(true);
    handleChange(file, "categoryicon");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const categoryDataErrors = validateForm(categoryData);
    console.log(categoryDataErrors, "categoryDataErrors");

    if (categoryDataErrors.category) {
      setError((prevErrors: any) => ({
        ...prevErrors,
        categoryData: categoryDataErrors,
      }));
    } else {
      setLoading(true);
      setError((prevErrors: any) => ({
        ...prevErrors,
        categoryData: {},
      }));

      const formData = new FormData();
      formData.append("name", categoryData.category);
      formData.append("image", categoryData.categoryicon);
      formData.append("category_id", data.category_id);

      try {
        const response: any = await Put(
          networkUrls.editCategory,
          formData,
          true
        );
        if (response?.response?.api_status === 200) {
          setAlertInfo({
            message: response?.response?.message,
            isSuccess: true,
          });
          const fileInput = document.querySelector(
            'input[name="categoryicon"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          setEditOpenModal(false);
          showAlert(true);
          setCategoryData({ category: "", categoryicon: "" });
          fetchCategories();
          setLoading(false);
        } else {
          setAlertInfo({
            message: response?.response?.message,
            isSuccess: false,
          });
          showAlert(true);
          setEditOpenModal(false);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error getting adding updating sub-category", error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} md={5}>
            <InputField
              type="text"
              placeholder="Enter Category"
              size="sm"
              label="Category"
              value={categoryData.category}
              style={{ width: "100%", height: "36px" }}
              onChange={(e) => handleChange(e.target.value, "category")}
            />
            {error.categoryData?.category && (
              <p className="error-message" style={{ fontSize: "1rem" }}>
                {error.categoryData?.category}
              </p>
            )}
          </Grid>
          <Grid xs={12} md={5}>
            <InputField
              type="file"
              placeholder=""
              label="Sub-Category Icon"
              name="categoryicon"
              size="sm"
              // value={categoryData.icon}
              // ref={fileInputRef}
              style={{ width: "100%", height: "36px", padding: "6px" }}
              onChange={handleFileChange}
            />
            {error.categoryData?.categoryicon && (
              <p className="error-message" style={{ fontSize: "1rem" }}>
                {error.categoryData?.categoryicon}
              </p>
            )}
          </Grid>
          <Grid xs={12} md={1}>
            <img
              src={isDummy ? DummyImage : categoryData.categoryicon}
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
    </>
  );
};

export default EditCategory;
