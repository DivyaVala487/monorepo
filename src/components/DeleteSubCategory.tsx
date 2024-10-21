import React from "react";
import ReuseableButton from "./ResusableButton";
import { Delete } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";

const DeleteSubCategory = ({
  data,
  setOpenDeleteModal,
  showAlert,
  getSubCategories,
  setAlertInfo,
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

        getSubCategories();
        showAlert(true);
        setAlertInfo({
          message: response?.data?.message,
          isSuccess: true,
        });
      } else {
        setOpenDeleteModal(false);
        setAlertInfo({
          message: response?.data?.message,
          isSuccess: true,
        });
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
