import { toast } from "react-toastify";

const DeleteModal = ({ onRemoveFood, foodId, _id }) => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg lg:text-xl text-center mt-6">
          Confirm Deletion!
        </h3>
        {/* buttons */}
        <div className="flex justify-center space-x-4 mt-12 mb-5">
          <form method="dialog">
            <button className="bg-secondary hover:bg-teal-600 text-white px-4 py-2 rounded-lg">
              Cancel
            </button>
          </form>
          <button
            //   onClick={() => onRemoveFood(food)}
            onClick={() => {
              onRemoveFood(foodId, _id);
              document.getElementById("my_modal_3").close();
              toast.success("Food removed successfully!");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteModal;


