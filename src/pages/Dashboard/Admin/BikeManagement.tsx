import { useState } from "react";
import {
  useCreateBikeMutation,
  useDeleteBikeMutation,
  useGetBikesQuery,
  useUpdateBikeMutation,
} from "../../../redux/api/bikeApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bike Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-lg hover:bg-blue-700 transition-all"
        >
          Add New Bike
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error loading bikes.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.length === 0 ? (
            <p>No bikes available.</p>
          ) : (
            bikes.map((bike) => (
              <div
                key={bike._id}
                className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
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
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
              />
              <textarea
                value={bikeData.description}
                onChange={(e) =>
                  setBikeData({ ...bikeData, description: e.target.value })
                }
                placeholder="Description"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
              ></textarea>
              <input
                type="number"
                value={bikeData.pricePerHour}
                onChange={(e) =>
                  setBikeData({ ...bikeData, pricePerHour: e.target.value })
                }
                placeholder="Price"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                value={bikeData.cc}
                onChange={(e) =>
                  setBikeData({ ...bikeData, cc: e.target.value })
                }
                placeholder="CC"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                value={bikeData.year}
                onChange={(e) =>
                  setBikeData({ ...bikeData, year: e.target.value })
                }
                placeholder="Year"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                value={bikeData.model}
                onChange={(e) =>
                  setBikeData({ ...bikeData, model: e.target.value })
                }
                placeholder="Model"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
              />
              <input
                type="text"
                value={bikeData.brand}
                onChange={(e) =>
                  setBikeData({ ...bikeData, brand: e.target.value })
                }
                placeholder="Brand"
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
              />
            </form>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-all"
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition-all"
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
