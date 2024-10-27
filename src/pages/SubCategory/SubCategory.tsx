import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/joy/Grid";
import Dropdown from "../../components/ResusableDropdown";
import InputField from "../../components/ReusableTextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import validateForm from "../../utils/validations";
import ReuseableButton from "../../components/ResusableButton";
import { Get, Post } from "../../services/apiServices";
import { networkUrls } from "../../services/networkrls";
import Alerts from "../../components/ReusableAlerts";
import { Cancel, CheckCircle } from "@mui/icons-material";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import ReusableModal from "../../components/ReusableModal";
import EditSubCategory from "../../components/EditSubCategory";
import "../styles.css"
import { colors } from "../../utils/constants";
import { Chip } from "@mui/material";
const SubCategory = () => {
  const [categories, setCategories] = useState<
    { label: string; value: number }[]
  >([]);
  const [alert, showAlert] = useState<any>(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const[filterRows,setFilterRows]=useState([]);
  const [alertInfo, setAlertInfo] = useState({ message: "", isSuccess: false });
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [rows, setRows] = useState<any[]>([
    { subCategory: "", icon: "", isEditing: true } // Prepopulate one empty row
  ]);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );
  const [errors, setErrors] = useState<any>({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "subCategory",
      headerName: "SubCategory",
      flex: 1,
      renderCell: (params) => (
        <>
            {params.value.map((subcategory: any) => (
                    <Chip
                        key={subcategory.id} // Use a unique key, e.g., subcategory id
                        label={subcategory.subcategory_name} 
                        style={{ margin: "2px" }} // Add some margin for spacing
                    />
                ))}
        </>
      ),
    },
    // {
    //   field: "subCategoryIcon",
    //   headerName: "SubCategory icon",
    //   flex: 1,
    //   renderCell: (params) => (
    //     <img
    //       src={params.value}
    //       alt="Sub-Category-Icon"
    //       style={{ width: "45px", height: "45px", objectFit: "cover" }}
    //     />
    //   ),
    // },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <EditIcon
            sx={{ cursor: "pointer", color: colors.primary, marginRight: "10px" }}
            onClick={() => handleEdit(params.row)}
          />
          {/* <DeleteIcon
            sx={{ cursor: "pointer", color: "#735DA5" }}
            onClick={() => handleDelete(params.row)}
          /> */}
        </>
      ),
    },
  ];

  const handleEdit = (row: any) => {
    setEditOpenModal(true);
    setFilterRows(row);

  };
  const handleFileChange = (e: any, index: number) => {
    const file = e.target.files[0];
    handleChange(file, "icon", index);
  };

  const handleCategoryChange = (value: string) => {
    const categoryId: any = value ? parseInt(value) : null;
    setCategoryId(categoryId);
    setCategoryValue(value);
  };

  const handleAddRow = () => {
    const newRow = { subCategory: "", icon: "", isEditing: true };
    setRows((prevRows) => [...prevRows, newRow]);
    setIsSubmit(true);
  };

  const handleChange = (value: string, field: string, index: number) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    // Validate only the field being changed
    const validationErrors = validateForm(updatedRows[index]);

    setErrors((prevErrors: any) => ({
        ...prevErrors,
        dynamicRows: {
            ...prevErrors.dynamicRows,
            [index]: {
                ...(prevErrors.dynamicRows?.[index] || {}),
                [field]: validationErrors[field], 
            },
        },
    }));

    setRows(updatedRows);
};


  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const category=categoryValue
    const validateCategory=validateForm({category})
    const updatedErrors = rows.map((row) => validateForm(row));
    const allRowsValid = updatedErrors.every(
      (err) => Object.keys(err).length === 0
    );
    setErrors({ dynamicRows: updatedErrors ,category:validateCategory});

    if (allRowsValid) {
      setLoading(true);
      const formData: any = new FormData();

      rows.forEach((row) => {
        formData.append(`subcategories`, row.subCategory);
        if (row.icon instanceof File) {
          formData.append(`image`, row.icon);
        }
      });
      formData.append("category_id", categoryId);
      try {
        const response = await Post(networkUrls.addSubCategory, formData, true);
        if (response?.data?.api_status === 200) {
          showAlert(true);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: true,
          });
          setLoading(false);
          setSubmissionSuccess(true);
          setCategoryValue("");
          setRows([{ subCategory: "", icon: "", isEditing: true }]); 
          const fileInput = document.querySelector(
            'input[name="icon"]'
          ) as HTMLInputElement;
          if (fileInput) {
            fileInput.value = "";
          }
          setIsSubmit(false);
          getSubCategories();
        } else {
          setLoading(false);
          showAlert(true);
          setSubmissionSuccess(false);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: false,
          });
        }
      } catch (error) {
        console.log("Error adding sub-category", error);
        setLoading(false);
      }
    }
  };


  console.log(errors,"errors");
console.log(data,"data");
  const getSubCategories = async () => {
    try {
      const response = await Get(networkUrls.getSubCategories, false);
      if (response?.data?.api_status === 200) {
        const subCategoryData = response?.data?.data.map(
          (subcategory: any, index: any) => ({
            id: index + 1,
            category: subcategory.category_name,
            categoryIcon:subcategory.category_icon,
            categoryId:subcategory.category_id,
            subCategory: subcategory.subcategory,
          })
        );
        setData(subCategoryData);
      }
    } catch (error) {
      console.log("Error getting sub-categories", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Get(networkUrls.getCategory, false);
        const categoryOptions = response.data.data.map((category: any) => ({
          label: category.name,
          value: category.category_id,
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };
    fetchCategories();
    getSubCategories();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {alert && (
          <Alerts
            message={alertInfo.isSuccess ? alertInfo.message : alertInfo.message}
            backgroundColor={alertInfo.isSuccess ? "green" : "red"}
            icon={
              alertInfo.isSuccess ? (
                <CheckCircle style={{ color: "white", fontSize: "24px" }} />
              ) : (
                <Cancel style={{ color: "white", fontSize: "24px" }} />
              )
            }
            textColor="light"
            onClose={() => showAlert(false)}
          />
        )}
        <Grid container spacing={4} sx={{ flexGrow: 1, margin: 0, padding: "1rem" }}>
          <Grid xs={12} md={12}>
            <Dropdown
              options={categories}
              onChange={handleCategoryChange}
              placeholder="Select your category"
              width={333}
              value={categoryValue}
              id="category"
              label="Category"
              
            />
          </Grid>

          <Grid xs={12} md={12} className="subcategory-btn">
            <ReuseableButton
              variant="solid"
              title="Add SubCategory"
              startDecorator={<AddIcon />}
              styles={{ backgroundColor: colors.primary }}
              type="button"
              onClick={handleAddRow}
            />
          </Grid>

          <Grid container spacing={4} xs={12} md={12}>
            {rows.map((row, index) => (
              <Grid container spacing={4} xs={12} md={12} key={index} alignItems="center">
                <Grid xs={5} md={5.5}>
                  <InputField
                    type="text"
                    placeholder="Enter Sub-Category"
                    size="sm"
                    label={`SubCategory${index+1}`}
                    value={row.subCategory}
                    style={{ width: "100%", height: "36px" }}
                    onChange={(e) => handleChange(e.target.value, "subCategory", index)}
                    error={errors.dynamicRows?.[index]?.subCategory}
                    helperText={errors.dynamicRows?.[index]?.subCategory}
                  />
                
                </Grid>

                <Grid xs={6} md={5.5}>
                  <InputField
                    type="file"
                    size="sm"
                    label={`Sub-Category Icon${index+1}`}
                    ref={fileInputRef}
                    style={{ width: "100%", height: "36px", padding: "6px" }}
                    onChange={(e) => handleFileChange(e, index)}
                    error={errors.dynamicRows?.[index]?.icon}
                    helperText={errors.dynamicRows?.[index]?.icon}
                  />
                 
                </Grid>
{index!==0 && 
                <Grid xs={1} md={1}>
                  <DeleteIcon
                    sx={{
                      marginTop: "30px",
                      color: "#FF0000",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDeleteRow(index)}
                  />
                </Grid>
}
              </Grid>
            ))}
          </Grid>

          <Grid xs={12} md={4}>
            <ReuseableButton
              variant="solid"
              title="Add"
              loading={loading}
              type="submit"
              styles={{ backgroundColor: colors.primary }}
            />
          </Grid>
          <ReusableDataGrid
        rows={data}
        columns={columns}
        initialPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection={false}
        disableRowSelectionOnClick={true}
        sx={{ width: "98%", marginLeft: "19px" }}
      />
        </Grid>
      </form>

      
        {editOpenModal && (
          <ReusableModal
            open={editOpenModal}
            setOpen={setEditOpenModal}
            heading="Edit Category"
            type="edit"
            component={<EditSubCategory data={filterRows}  setEditOpenModal={setEditOpenModal}   setAlertInfo={  setAlertInfo}  getSubCategories={ getSubCategories}  showAlert={ showAlert}/>}
            size="lg"
          />
        )}
    </>
  );
};

export default SubCategory;
