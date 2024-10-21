import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import InputField from "./ReusableTextField";
import ReuseableButton from "./ResusableButton";
import validateForm from "../utils/validations";
import { Put } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";
const EditSubCategory = ({data,setSubmissionSuccess,setEditOpenModal}:any) => {
  const [subCategoryData, setSubCategoryData] = useState({ subCategory: "", icon: "" });
  const [errors, setErrors] = useState<any>({});
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

  console.log(data,"data");



  useEffect(()=>{

    setSubCategoryData({
      subCategory:data.subCategory,
      icon:data.subCategoryIcon
    })

  },[])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const subCategoryDataErrors = validateForm(subCategoryData);

    if (Object.keys(subCategoryDataErrors).length > 0) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        subCategoryData: subCategoryDataErrors,
      }));
    } else {
      setSubCategoryData({ subCategory: "", icon: "" });
      // if (fileInputRef.current) {
      //   fileInputRef.current.value = "";
      // }

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        subCategoryData: {},
      }));

      const formData = new FormData();
      formData.append("name",subCategoryData.subCategory );
      formData.append("image", subCategoryData.icon);

      try {
        const response:any = await Put(
          networkUrls.updateSubCategory,
          formData,
          true
        );
        if(response?.data?.api_status === 200){
          setSubmissionSuccess(true)
          setEditOpenModal(false)
        }else{
          setSubmissionSuccess(false)
          setEditOpenModal(false);
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
              // ref={fileInputRef}
              style={{ width: "100%", height: "36px", padding: "6px" }}
              onChange={(e) => handleChange(e.target.value, "icon")}
            />
            {errors.subCategoryData?.icon && (
              <p className="error-message" style={{ fontSize: "1rem" }}>
                {errors.subCategoryData?.icon}
              </p>
            )}
          </Grid>
          < Grid xs={12} md={1}>
          <img src={subCategoryData.icon} alt="icon" style={{height:"50px",width:"50px",paddingTop:"12px"}}/>
          </Grid>
          <Grid xs={12} md={12}>
            <ReuseableButton
              variant="solid"
              title="Update"
              type="submit"
              styles={{ backgroundColor: "#735DA5" }}
            />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default EditSubCategory;
