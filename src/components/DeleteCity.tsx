import ReuseableButton from "./ResusableButton";
import { Delete } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";

const DeleteCity = ({
  data,
  setOpenDeleteModal,
  showAlert,
  fetchCities,
  setAlertInfo,
}: any) => {
  const handleDelete = async () => {
    try {
      const response = await Delete(
        `${networkUrls.deleteCity}/${data.city_id}`,
        false
      );
      if (response?.data?.api_status === 200) {
        setOpenDeleteModal(false);

        fetchCities();
        showAlert(true);
        setAlertInfo({
          message: response?.data?.message,
          isSuccess: true,
        });
      } else {
        setOpenDeleteModal(false);
        setAlertInfo({
          message: response?.data?.message,
          isSuccess: false,
        });
      }
    } catch (error) {
      setOpenDeleteModal(false);
      setAlertInfo({
        message: "An error occurred while deleting the city.",
        isSuccess: false,
      });
    }
  };
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

export default DeleteCity;
