import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/joy/Grid";
import Dropdown from "../../components/ResusableDropdown";
import InputField from "../../components/ReusableTextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import validateForm from "../../utils/validations";
import ReusableModal from "../../components/ReusableModal";
import EditSubCategory from "../../components/EditSubCategory";
import ReuseableButton from "../../components/ResusableButton";
import { Get, Post } from "../../services/apiServices";
import { networkUrls } from "../../services/networkrls";
import Alerts from "../../components/ReusableAlerts";
import { Cancel, CheckCircle } from "@mui/icons-material";
import ReusableDataGrid from "../../components/ReusableDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import DeleteSubCategory from "../../components/DeleteSubCategory";
const SubCategory = () => {
  const [firstRow, setFirstRow] = useState({ subCategory: "", icon: "" });
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [deleteOpenModal, setOpenDeleteModal] = useState(false);
  const [categories, setCategories] = useState<
    { label: string; value: number }[]
  >([]);
  const [alert, showAlert] = useState<any>(false);
  const [alertInfo, setAlertInfo] = useState({ message: "", isSuccess: false });
  const [categoryValue, setCategoryValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [rows, setRows] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean | null>(
    null
  );
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterRows, setFilterRows] = useState([]);
  const [data, setData] = useState([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFirstRowChange = (value: string, field: string) => {
    setFirstRow((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prevErrors: any) => ({
      ...prevErrors,
      firstRow: {
        ...prevErrors.firstRow,
        [field]: undefined,
      },
    }));
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "categoryIcon",
      headerName: "Category icon",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Category-Icon"
          style={{ width: "45px", height: "45px", objectFit: "cover" }}
        />
      ),
    },
    { field: "subCategory", headerName: "SubCategory", flex: 1 },
    {
      field: "subCategoryIcon",
      headerName: "SubCategory icon",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Sub-Category-Icon"
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
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    handleFirstRowChange(file, "icon");
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
        console.error("Error fetching countries", error);
      }
    };
    fetchCategories();
    getSubCategories();
  }, []);

  const handleAddRow = () => {
    const firstRowErrors = validateForm(firstRow);
    if (firstRowErrors.subCategory && firstRowErrors.icon) {
      console.log("hy")
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstRow: firstRowErrors,
      }));
    } else {
      setRows((prevRows) => [...prevRows, { ...firstRow, isEditing: true }]);
      setFirstRow({ subCategory: "", icon: "" });
      const fileInput = document.querySelector(
        'input[name="icon"]'
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
      setIsSubmit(true);

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstRow: {},
      }));
    }
  };
  const handleCategoryChange = (value: string) => {
    const categoryId: any = value ? parseInt(value) : null;
    console.log(categoryId, "categoryid");
    setCategoryId(categoryId);

    setCategoryValue(value);
    if (value !== null) {
      setIsOpen(true);
    }

   ;
  };
  const handleChange = (value: string, field: string, index: number) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;

    setErrors((prevErrors: any) => {
      const newErrors = { ...prevErrors };
      if (newErrors.dynamicRows && newErrors.dynamicRows[index]) {
        newErrors.dynamicRows[index] = {
          ...newErrors.dynamicRows[index],
          [field]: undefined,
        };
      }
      return newErrors;
    });

    const validationErrors = validateForm(updatedRows[index]);
    setErrors((prevErrors: any) => ({
      ...prevErrors,
      dynamicRows: {
        ...prevErrors.dynamicRows,
        [index]: validationErrors,
      },
    }));

    setRows(updatedRows);
  };

  console.log(rows, "rows");
  const handleDelete = (row: any) => {
    setOpenDeleteModal(true);
    setFilterRows(row);
  };

  const handleEdit = (row: any) => {
    setEditOpenModal(true);
    setFilterRows(row);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const firstRowErrors = validateForm(firstRow);
    let isValid = Object.keys(firstRowErrors).length === 0;
  
    const updatedErrors = rows.map((row) => validateForm(row));
    const allRowsValid = updatedErrors.every(
      (err) => Object.keys(err).length === 0
    );
    setErrors({ dynamicRows: updatedErrors });
  
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
          setCategoryValue("");
  
          // Clear the firstRow state
          setFirstRow({ subCategory: "", icon: "" });
          setRows([]); // Clear all rows
  
          // // Reset the file input value
          // const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          // if (fileInput) {
          //   fileInput.value = ""; 
          // }
  
          getSubCategories();
        } else {
          setLoading(false);
          showAlert(true);
          setAlertInfo({
            message: response?.data?.message,
            isSuccess: false,
          });
        }
      } catch (error) {
        console.log("Error adding sub-category", error);
        setLoading(false);
      }
    } else {
      console.log("Validation Failed");
    }
  };
  
  
  const getSubCategories = async () => {
    try {
      const response = await Get(networkUrls.getSubCategories, false);
      if (response?.data?.api_status === 200) {
        console.log(response?.data?.data, "data");
        const subCategoryData = response?.data?.data.map(
          (subcategory: any, index: any) => ({
            id: index + 1,
            category: subcategory.category.name,
            categoryIcon: subcategory.category.icon,
            subCategory: subcategory.sub_category_name,
            subCategoryIcon: subcategory.icon,
            subcategoryId: subcategory.subcategory_id,
            categoryId: subcategory.category_id,
          })
        );
        setData(subCategoryData);
      }
    } catch (error) {
      console.log("Error getting sub-categories", error);
    }
  };

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
        <Grid container spacing={10} sx={{ flexGrow: 1, padding: "2rem" }}>
          <Grid xs={12} md={3}>
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
          {isOpen && (
            <Grid container spacing={4} xs={12} md={12}>
              <Grid xs={12} md={5}>
                <InputField
                  type="text"
                  placeholder="Enter Sub-Category"
                  size="sm"
                  label="SubCategory"
                  value={firstRow.subCategory}
                  style={{ width: "100%", height: "36px" }}
                  onChange={(e) =>
                    handleFirstRowChange(e.target.value, "subCategory")
                  }
                />
                {errors.firstRow?.subCategory && (
                  <p className="error-message">
                    {errors.firstRow?.subCategory}
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
                  ref={fileInputRef}
                  style={{ width: "100%", height: "36px", padding: "6px" }}
                  onChange={handleFileChange}
                />
                {errors.firstRow?.icon && (
                  <p className="error-message">{errors.firstRow?.icon}</p>
                )}
              </Grid>
              <Grid xs={12} md={1}>
                <AddIcon
                  sx={{
                    marginTop: "30px",
                    color: "#735DA5",
                    cursor: "pointer",
                  }}
                  onClick={handleAddRow}
                />
              </Grid>
              {isSubmit &&
              <Grid
               container
               spacing={4}
               xs={12}
               md={12}
               alignItems="center"
               sx={{
                 backgroundColor: "#D3C5E5",
                 width: "90%",
                 margin: "10px",
                 borderRadius:"10px"
               }}
              >
              {rows.map((row, index) => (
                <Grid
                  container
                  spacing={4}
                  xs={12}
                  md={12}
                  key={index}
                  alignItems="center"
                >
                  <Grid xs={12} md={5}>
                    <InputField
                      type="text"
                      placeholder="Enter Sub-Category"
                      size="sm"
                      label="SubCategory"
                      name="subCategory"
                      value={row.subCategory}
                      style={{ width: "100%", height: "36px" }}
                      onChange={(e) =>
                        handleChange(e.target.value, "subCategory", index)
                      }
                      disabled={!row.isEditing}
                    />
                    {errors.dynamicRows?.[index]?.subCategory && (
                      <p className="error-message">
                        {errors.dynamicRows?.[index]?.subCategory}
                      </p>
                    )}
                  </Grid>
                  <Grid xs={12} md={5}>
                    <InputField
                      type="text"
                      placeholder=""
                      label="Sub-Category Icon"
                      name="icon"
                      size="sm"
                      value={row.icon}
                      style={{ width: "100%", height: "36px" }}
                      onChange={(e) =>
                        handleChange(e.target.value, "icon", index)
                      }
                      disabled={!row.isEditing}
                    />
                    {errors.dynamicRows?.[index]?.icon && (
                      <p className="error-message">
                        {errors.dynamicRows?.[index]?.icon}
                      </p>
                    )}
                  </Grid>
                  {/* <Grid xs={12} md={0.5}>
                    <EditIcon
                      sx={{
                        marginTop: "30px",
                        color: "#735DA5",
                        cursor: "pointer",
                      }}
                      onClick={() => toggleEditRow(index)}
                    />
                  </Grid>
                  <Grid xs={12} md={0.5}>
                    <DeleteIcon
                      sx={{
                        marginTop: "30px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDeleteRow(index)}
                    />
                  </Grid> */}
                </Grid>
              ))}
              
              <Grid xs={12} md={12}>
                <ReuseableButton
                  variant="solid"
                  title="Submit"
                  loading={loading}
                  type="submit"
                  styles={{ backgroundColor: "#735DA5" }}
                />
              </Grid>
              </Grid>}
            </Grid>
          )}
        </Grid>
      
      </form>
      <ReusableDataGrid
        rows={data}
        columns={columns}
        initialPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection={false}
        disableRowSelectionOnClick={true}
        sx={{width:"90%",marginLeft:"30px"}}
      />
        {editOpenModal && (
          <ReusableModal
            open={editOpenModal}
            setOpen={setEditOpenModal}
            heading="Edit Category"
            type="edit"
            component={
              <EditSubCategory
                data={filterRows}
                setAlertInfo={setAlertInfo}
                setEditOpenModal={setEditOpenModal}
                showAlert={showAlert}
                getSubCategories={getSubCategories}
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
              <DeleteSubCategory
                data={filterRows}
                setOpenDeleteModal={setOpenDeleteModal}
                showAlert={showAlert}
                getSubCategories={getSubCategories}
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

export default SubCategory;