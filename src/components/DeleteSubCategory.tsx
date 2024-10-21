import React from "react";
import ReuseableButton from "./ResusableButton";
import { Delete } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";

const DeleteSubCategory = ({
  data,
  setOpenDeleteModal,
  showAlert,
  getSubCategories,
  setMessage,
  setSubmissionSuccess,
}: any) => {
  const { subcategoryId, categoryId } = data;

  const handleDelete = async () => {
    try {
      const response = await Delete(
        `${networkUrls.deleteSubCategory}/${categoryId}/${subcategoryId}`,
        false
      );
      if (response?.data?.api_status === 200) {
        setOpenDeleteModal(false);
        setMessage(response?.data?.message);
        getSubCategories();
        showAlert(true);
        setSubmissionSuccess(true);
      } else {
        setMessage(response?.data?.message);
        setOpenDeleteModal(false);
        setSubmissionSuccess(false);
      }
    } catch (error) {
      console.log("Error while deleting sub category", error);
    }
  };

  console.log(data, "data");
  return (
    <div>
      <ReuseableButton
        title="Delete"
        styles={{ backgroundColor: "#735DA5" }}
        onClick={handleDelete}
      />
    </div>
  );
};

export default DeleteSubCategory;
