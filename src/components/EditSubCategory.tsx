import React, { useEffect, useState } from "react";
import Grid from "@mui/joy/Grid";
import InputField from "./ReusableTextField";
import ReuseableButton from "./ResusableButton";
import validateForm from "../utils/validations";
import { Put } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";
import DummyImage from  "../assessts/images/image.png"
import DeleteIcon from "@mui/icons-material/Delete"; 
import "./styles.css"
interface SubCategoryData {
  subCategory: string;
  icon: File | string;
  subCategoryId?: number;
}

interface EditSubCategoryProps {
  data:any,
  setEditOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertInfo: React.Dispatch<React.SetStateAction<{ message: string; isSuccess: boolean }>>;
  getSubCategories: () => void;
  showAlert: (isVisible: boolean) => void;
}

const EditSubCategory: React.FC<EditSubCategoryProps> = ({
  data,
  setEditOpenModal,
  setAlertInfo,
  getSubCategories,
  showAlert
}) => {
  const [subCategoryData, setSubCategoryData] = useState<SubCategoryData[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data.subCategory) {
      const initialSubcategories = data.subCategory.map((item:any) => ({
        subCategory: item.subcategory_name,
        icon: item.subcategory_icon || "",
        subCategoryId: item.subcategory_id
      }));
      setSubCategoryData(initialSubcategories);
    }
  }, [data]);

  const handleChange = (value: string | File, field: keyof SubCategoryData, index: number) => {
    setSubCategoryData((prev) =>
      prev.map((item, idx) => 
        idx === index ? { ...item, [field]: value } : item
      )
    );

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`row_${index}`]: {
        ...prevErrors[`row_${index}`],
        [field]: undefined
      }
    }));
  };

  const handleFileChange = (e: any, index: number) => {
    const file = e.target.files?.[0];
    if (file) handleChange(file, "icon", index);
  };

  
  

  const deleteSubCategoryRow = (index: number) => {
    setSubCategoryData((prev) => prev.filter((_, idx) => idx !== index));
  };
  const addSubCategoryRow = () => {
    setSubCategoryData((prev) => [...prev, { subCategory: "", icon: "" }]);
    
    // Initialize errors for the new row with empty values
    setErrors((prevErrors) => ({
      ...prevErrors,
      [`row_${subCategoryData.length}`]: { subCategory: undefined, icon: undefined },
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formErrors = subCategoryData.map((item, index) => validateForm(item));
    
    const hasErrors = formErrors.some((errors) => Object.keys(errors).length);
  
    if (hasErrors) {
      const errorsObject = formErrors.reduce((acc, cur, index) => {
        acc[`row_${index}`] = cur;
        return acc;
      }, {} as { [key: string]: any });
  
      setErrors(errorsObject); 
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("category_id", data.categoryId.toString());
  
    subCategoryData.forEach((item, index) => {
      formData.append(`subcategories[${index}][sub_category_name]`, item.subCategory);
      if (item.subCategoryId) {
        formData.append(`subcategories[${index}][subcategory_id]`, item.subCategoryId.toString());
      }
      if (item.icon instanceof File) {
        formData.append("image", item.icon); 
      }
    });
  
    try {
      const response: any = await Put(networkUrls.updateSubCategory, formData, true);
      if (response?.response?.api_status === 200) {
        setAlertInfo({ message: response?.response?.message, isSuccess: true });
        setEditOpenModal(false);
        showAlert(true);
        getSubCategories();
      } else {
        setAlertInfo({ message: response?.response?.message, isSuccess: false });
      }
    } catch (error) {
      console.error("Error updating sub-categories", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={4} className="edit-modal">
        {subCategoryData.map((item, index) => (
          <React.Fragment key={index}>
            <Grid xs={12} md={5}>
              <InputField
                type="text"
                placeholder="Enter Sub-Category"
                size="sm"
                label={`SubCategory${index+1}`}
                value={item.subCategory}
                onChange={(e) => handleChange(e.target.value, "subCategory", index)}
                style={{ width: "100%", height: "36px" }}
              />
              {errors[`row_${index}`]?.subCategory && (
                <p className="error-message" style={{ fontSize: "1rem" }}>
                  {errors[`row_${index}`]?.subCategory}
                </p>
              )}
            </Grid>

            <Grid xs={12} md={5}>
              <InputField
                type="file"
                label={`Sub-Category Icon${index+1}`}
                size="sm"
                onChange={(e) => handleFileChange(e, index)}
                style={{ width: "100%", height: "36px", padding: "6px" }}
              />
              {errors[`row_${index}`]?.icon && (
                <p className="error-message" style={{ fontSize: "1rem" }}>
                  {errors[`row_${index}`]?.icon}
                </p>
              )}
            </Grid>

            <Grid xs={12} md={1}>
              <img
                src={item.icon instanceof File ? URL.createObjectURL(item.icon) : item.icon || DummyImage}
                alt="icon"
                style={{ height: "50px", width: "50px", paddingTop: item.icon ? "12px" : "20px" }}
              />
            </Grid>

            {/* <Grid xs={12} md={1}>
              <DeleteIcon
                onClick={() => deleteSubCategoryRow(index)}
                style={{ cursor: "pointer", color: "red" }}
              />
            </Grid> */}
          </React.Fragment>
        ))}

        <Grid xs={12} md={12} style={{ marginTop: "1rem" }}>
          <ReuseableButton
            variant="solid"
            title="Add Subcategory"
            type="button"
            onClick={addSubCategoryRow}
            styles={{ backgroundColor: "#735DA5", marginRight: "10px" }}
          />
          
        </Grid>

        <Grid xs={12} md={12} sx={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end"}}>
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
  );
};

export default EditSubCategory;
