import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isFetchBaseQueryError } from "../../utils/errorUtils";

interface ISignupFormInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormInput>();

  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const onSubmit: SubmitHandler<ISignupFormInput> = async (data) => {
    try {
      await registerUser({ ...data, role: "user" }).unwrap();
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create a New Account
        </h2>

        {isFetchBaseQueryError(error) && (
          <div className="p-2 text-sm text-red-600 bg-red-100 rounded">
            {(error.data as { message?: string })?.message ||
              "Something went wrong!"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone", { required: "Phone number is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your address"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>
          <ToastContainer />
        </form>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
