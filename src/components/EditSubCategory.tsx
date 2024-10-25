import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import InputField from "./ReusableTextField";
import ReuseableButton from "./ResusableButton";
import validateForm from "../utils/validations";
import { Put } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";
import DummyImage from "../assessts/images/image.png";
const EditSubCategory = ({data,setEditOpenModal,setAlertInfo,getSubCategories, showAlert}:any) => {
  const [subCategoryData, setSubCategoryData] = useState({ subCategory: "", icon: "" });
  const [errors, setErrors] = useState<any>({});
  const[loading,setLoading]=useState(false);
  const[isDummy,setIsDummy]=useState(false);
  const handleChange = (value: string, field: string) => {
    setSubCategoryData((prev: any) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      subCategoryData: {
        ...prevErrors.subCategoryData,
        [field]: undefined,
      },
    }));
  };

  console.log(data,"data for seeing the data value");



  useEffect(()=>{

    setSubCategoryData({
      subCategory:data.subCategory,
      icon:data.subCategoryIcon
    })

  },[])

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setIsDummy(true)
    handleChange(file, "icon");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("clicked");
    const subCategoryDataErrors = validateForm(subCategoryData);

    console.log(typeof(subCategoryData.icon)==="string",subCategoryDataErrors.subCategory)

    console.log(subCategoryDataErrors,"subCategoryDataErrors");

    if ( subCategoryDataErrors.subCategory) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        subCategoryData: subCategoryDataErrors,
      }));
    } else {
      setLoading(true);
      setSubCategoryData({ subCategory: "", icon: "" });

      

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        subCategoryData: {},
      }));

      console.log(subCategoryData,"SubCategoryDataToSee");

      const formData = new FormData();
      formData.append("sub_category_name",subCategoryData.subCategory );
      formData.append("image", subCategoryData.icon);
      formData.append("category_id", data.categoryId);
      formData.append("subcategory_id", data.subcategoryId)

      try {
        const response:any = await Put(
          networkUrls.updateSubCategory,
          formData,
          true
        );
        console.log(response,"res");
        if(response?.response?.api_status === 200){
          setAlertInfo({
            message:response?.response?.message,
            isSuccess:true
          })
          const fileInput = document.querySelector(
            'input[name="icon"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          setEditOpenModal(false)
          showAlert(true)
          getSubCategories()
          setLoading(false);
        }else{
          setAlertInfo({
            message:response?.response?.message,
            isSuccess:false
          })
          showAlert(true)
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
        <Grid container spacing={4} xs={12} md={12}>
          <Grid xs={12} md={5}>
            <InputField
              type="text"
              placeholder="Enter Sub-Category"
              size="sm"
              label="SubCategory"
              value={subCategoryData.subCategory}
              style={{ width: "100%", height: "36px" }}
              onChange={(e) => handleChange(e.target.value, "subCategory")}
            />
            {errors.subCategoryData?.subCategory && (
              <p className="error-message" style={{ fontSize: "1rem" }}>
                {errors.subCategoryData?.subCategory}
              </p>
            )}
          </Grid>
          <Grid xs={12} md={5}>
            <InputField
              type="file"
              placeholder=""
              label="Sub-Category Icon"
              name="icon"
              size="sm"
              // value={subCategoryData.icon}
              // ref={fileInputRef}
              style={{ width: "100%", height: "36px", padding: "6px" }}
              onChange={handleFileChange}
            />
            {errors.subCategoryData?.icon && (
              <p className="error-message" style={{ fontSize: "1rem" }}>
                {errors.subCategoryData?.icon}
              </p>
            )}
          </Grid>
          < Grid xs={12} md={1}>
          <img src={isDummy ? DummyImage : subCategoryData.icon} alt="icon" style={{height:"50px",width:"50px",paddingTop: isDummy ? "20px" : "12px"}}/>
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

export default EditSubCategory;
