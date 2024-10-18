import React from 'react'
import Grid from "@mui/joy/Grid";
import InputField from './ReusableTextField';
import ReuseableButton from './ResusableButton';
const EditSubCategory = () => {
  return (
    <Grid container spacing={4} xs={12} md={12}>
    <Grid xs={12} md={6}>
            <InputField
              type="text"
              placeholder="Enter Sub-Category"
              size="sm"
              label="SubCategory"
            //   value={firstRow.subCategory}
              style={{ width: "100%", height: "36px" }}
            //   onChange={(e) =>
            //     handleFirstRowChange(e.target.value, "subCategory")
            //   }
            />
            {/* {errors.firstRow?.subCategory && (
              <p className="error-message">{errors.firstRow?.subCategory}</p>
            )} */}
          </Grid>
          <Grid xs={12} md={6}>
            <InputField
              type="file"
              placeholder=""
              label="Sub-Category Icon"
              name="icon"
              size="sm"
            //   ref={fileInputRef}
              style={{ width: "100%", height: "36px" }}
            //   onChange={(e) => handleFirstRowChange(e.target.value, "icon")}
            />
            {/* {errors.firstRow?.icon && (
              <p className="error-message">{errors.firstRow?.icon}</p>
            )} */}
          </Grid>
          <Grid xs={12} md={12}>
          <ReuseableButton
            variant="solid"
            title="Submit"
            type="submit"
            styles={{ backgroundColor: "#735DA5" }}
          />
        </Grid>
          </Grid>
  )
}

export default EditSubCategory