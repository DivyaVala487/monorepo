import ReuseableButton from "./ResusableButton";
import { Delete } from "../services/apiServices";
import { networkUrls } from "../services/networkrls";

const DeleteCategory = ({
  data,
  setOpenDeleteModal,
  showAlert,
  fetchCategories,
  setAlertInfo,
}: any) => {
  const handleDelete = async () => {
    try {
      const response = await Delete(
        `${networkUrls.deleteCategory}/${data.category_id}`,
        false
      );
      if (response?.data?.api_status === 200) {
        setOpenDeleteModal(false);

        fetchCategories();
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

export default DeleteCategory;
