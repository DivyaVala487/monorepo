import React from "react";
import ReuseableButton from "./ResusableButton";
import { Delete } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";

const DeleteCountry = ({
  data,
  setOpenDeleteModal,
  showAlert,
  fetchCountries,
  setAlertInfo,
}: any) => {
//   const { countryId } = data;

  const handleDelete = async () => {
    try {
      const response = await Delete(
        `${networkUrls.deleteCountry}/${data.country_id}`,
        false
      );
      if (response?.data?.api_status === 200) {
        setOpenDeleteModal(false);
        console.log(response?.data?.message , "message");

        fetchCountries();
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

export default DeleteCountry;
