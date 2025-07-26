import { useState } from "react";
import {
  useCreateBikeMutation,
  useDeleteBikeMutation,
  useGetBikesQuery,
  useUpdateBikeMutation,
} from "../../../redux/api/bikeApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../components/ui/Loading";

// Bike data type expected in the form (with _id as string)
type TBikeData = {
  _id?: string;
  name: string;
  description: string;
  pricePerHour: string;
  cc: string;
  year: string;
  model: string;
  brand: string;
};

// Helper to convert MongoDB Bike type to TBikeData with string _id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapBikeToBikeData = (bike: any): TBikeData => ({
  _id: bike._id?.$oid ?? undefined,
  name: bike.name,
  description: bike.description,
  pricePerHour: String(bike.pricePerHour),
  cc: String(bike.cc),
  year: String(bike.year),
  model: bike.model,
  brand: bike.brand,
});

const BikeManagement: React.FC = () => {
  const { data, isLoading, isError, refetch } = useGetBikesQuery();
  // Transform bikes for UI use:
  const bikes: TBikeData[] = (data?.data ?? []).map(mapBikeToBikeData);

  const [createBike] = useCreateBikeMutation();
  const [updateBike] = useUpdateBikeMutation();
  const [deleteBike] = useDeleteBikeMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bikeData, setBikeData] = useState<TBikeData>({
    name: "",
    description: "",
    pricePerHour: "",
    cc: "",
    year: "",
    model: "",
    brand: "",
  });

  const handleOpenModal = (bike?: TBikeData) => {
    if (bike) {
      setBikeData(bike);
    } else {
      setBikeData({
        name: "",
        description: "",
        pricePerHour: "",
        cc: "",
        year: "",
        model: "",
        brand: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (bikeData.name) {
      try {
        if (bikeData._id) {
          await updateBike({ id: bikeData._id, bikeData });
          toast.success("Bike updated successfully!");
        } else {
          await createBike(bikeData);
          toast.success("Bike added successfully!");
        }
        refetch();
      } catch (error) {
        toast.error("Error occurred while saving bike!");
      }
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBike(id);
      toast.success("Bike deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Error occurred while deleting bike!");
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bike Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-lg hover:bg-blue-700 transition-all"
        >
          Add New Bike
        </button>
      </div>

      {isLoading ? (
        <Loading></Loading>
      ) : isError ? (
        <p>Error loading bikes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.length === 0 ? (
            <p key={bikes?.length}>No bikes available.</p>
          ) : (
            bikes.map((bike) => (
              <div
                key={bike._id}
                className="p-4  shadow-md rounded-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {bike.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {bike.description}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    ${bike.pricePerHour} / hour
                  </p>
                  <p className="text-sm text-gray-600">CC: {bike.cc}</p>
                  <p className="text-sm text-gray-600">Year: {bike.year}</p>
                  <p className="text-sm text-gray-600">Model: {bike.model}</p>
                  <p className="text-sm text-gray-600">Brand: {bike.brand}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleOpenModal(bike)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bike._id!)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 sm:px-0 my-5 mt-10">
          <div className="bg-white dark:bg-[#0C111B] text-gray-800 dark:text-white w-full max-w-lg sm:rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
              {bikeData._id ? "Edit Bike" : "Add New Bike"}
            </h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                value={bikeData.name}
                onChange={(e) =>
                  setBikeData({ ...bikeData, name: e.target.value })
                }
                placeholder="Bike Name"
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-md focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-white/10 backdrop-blur-md"
              />
              <textarea
                value={bikeData.description}
                onChange={(e) =>
                  setBikeData({ ...bikeData, description: e.target.value })
                }
                placeholder="Description"
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-md focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-white/10 backdrop-blur-md"
              ></textarea>
              <input
                type="number"
                value={bikeData.pricePerHour}
                onChange={(e) =>
                  setBikeData({ ...bikeData, pricePerHour: e.target.value })
                }
                placeholder="Price"
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-md focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-white/10 backdrop-blur-md"
              />
              <input
                type="text"
                value={bikeData.cc}
                onChange={(e) =>
                  setBikeData({ ...bikeData, cc: e.target.value })
                }
                placeholder="CC"
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-md focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-white/10 backdrop-blur-md"
              />
              <input
                type="text"
                value={bikeData.year}
                onChange={(e) =>
                  setBikeData({ ...bikeData, year: e.target.value })
                }
                placeholder="Year"
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-md focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-white/10 backdrop-blur-md"
              />
              <input
                type="text"
                value={bikeData.model}
                onChange={(e) =>
                  setBikeData({ ...bikeData, model: e.target.value })
                }
                placeholder="Model"
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-md focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-white/10 backdrop-blur-md"
              />
              <input
                type="text"
                value={bikeData.brand}
                onChange={(e) =>
                  setBikeData({ ...bikeData, brand: e.target.value })
                }
                placeholder="Brand"
                className="w-full p-3 border border-gray-300 dark:border-white/20 rounded-md focus:ring-2 focus:ring-blue-400 bg-white/80 dark:bg-white/10 backdrop-blur-md"
              />
            </form>

            <div className="flex flex-col sm:flex-row justify-end mt-6 gap-3 sm:gap-4">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full sm:w-auto px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default BikeManagement;
