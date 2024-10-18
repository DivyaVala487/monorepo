import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/joy/Grid";
import Dropdown from "../../components/ResusableDropdown";
import InputField from "../../components/ReusableTextField";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import validateForm from "../../utils/validations";
import ReusableModal from "../../components/ReusableModal";
import EditSubCategory from "../../components/EditSubCategory";
import ReuseableButton from "../../components/ResusableButton";
import { Get } from "../../services/apiServices";
import { networkUrls } from "../../services/networkrls";
const SubCategory = () => {
  const [firstRow, setFirstRow] = useState({ subCategory: "", icon: "" });
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [deleteOpenModal, setOpenDeleteModal] = useState(false);
  const[categories,setCategories]=useState<{ label: string; value: number }[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});
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
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Get(networkUrls.getCategory, false);
        const countryOptions = response.data.data.map((country: any) => ({
          label: country.name,
          value: country.country_id,
        }));
        setCategories(countryOptions);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddRow = () => {
    const firstRowErrors = validateForm(firstRow);

    if (Object.keys(firstRowErrors).length > 0) {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstRow: firstRowErrors,
      }));
    } else {
      setRows((prevRows) => [...prevRows, { ...firstRow, isEditing: true }]);
      setFirstRow({ subCategory: "", icon: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        firstRow: {},
      }));
    }
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

  const handleDeleteRow = (index: number) => {
    setOpenDeleteModal(true);
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const toggleEditRow = (index: number) => {
    setEditOpenModal(true);
    const updatedRows = [...rows];
    updatedRows[index].isEditing = !updatedRows[index].isEditing;
    setRows(updatedRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const firstRowErrors = validateForm(firstRow);
    let isValid = Object.keys(firstRowErrors).length === 0;

    const updatedErrors = rows.map((row) => validateForm(row));
    const allRowsValid = updatedErrors.every(
      (err) => Object.keys(err).length === 0
    );
    setErrors({ dynamicRows: updatedErrors });

    if (isValid && allRowsValid) {
      const formData = {
        firstRow,
        dynamicRows: rows,
      };
      console.log("Form Submitted:", formData);
    } else {
      console.log("Validation Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={10} sx={{ flexGrow: 1, padding: "20px" }}>
        <Grid xs={12} md={3}>
          <Dropdown
            options={[
              { label: "Sports", value: "sports" },
              { label: "Electronics", value: "electronics" },
            ]}
            placeholder="Select your category"
            width={333}
            id="category"
            label="Category"
          />
        </Grid>
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
              <p className="error-message">{errors.firstRow?.subCategory}</p>
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
              style={{ width: "100%", height: "36px" }}
              onChange={(e) => handleFirstRowChange(e.target.value, "icon")}
            />
            {errors.firstRow?.icon && (
              <p className="error-message">{errors.firstRow?.icon}</p>
            )}
          </Grid>
          <Grid xs={12} md={1}>
            <AddIcon
              sx={{ marginTop: "30px", color: "#735DA5", cursor: "pointer" }}
              onClick={handleAddRow}
            />
          </Grid>
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
                  onChange={(e) => handleChange(e.target.value, "icon", index)}
                  disabled={!row.isEditing}
                />
                {errors.dynamicRows?.[index]?.icon && (
                  <p className="error-message">
                    {errors.dynamicRows?.[index]?.icon}
                  </p>
                )}
              </Grid>
              <Grid xs={12} md={0.5}>
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
                  sx={{ marginTop: "30px", color: "red", cursor: "pointer" }}
                  onClick={() => handleDeleteRow(index)}
                />
              </Grid>
            </Grid>
          ))}
          <Grid xs={12} md={12}>
          <ReuseableButton
            variant="solid"
            title="Submit"
            type="submit"
            styles={{ backgroundColor: "#735DA5" }}
          />
        </Grid>
        </Grid>
      </Grid>
      {editOpenModal && <ReusableModal open={editOpenModal} setOpen={setEditOpenModal} heading="Edit Category" type="edit" component={<EditSubCategory/>} size="lg"/>}
      {deleteOpenModal && <ReusableModal open={deleteOpenModal} setOpen={setOpenDeleteModal} heading="Delete Category" type="delete" subHeading="Are you sure want to delete?" buttonText="Delete" size="lg"/>}
    </form>
  );
};

export default SubCategory;
