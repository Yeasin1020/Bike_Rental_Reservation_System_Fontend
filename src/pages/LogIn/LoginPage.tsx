import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils/varifyToken";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isFetchBaseQueryError } from "../../utils/errorUtils";

interface ILoginFormInput {
  email: string;
  password: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
}

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const [login, { error, isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      const token = response.token;

      if (typeof token !== "string") {
        throw new Error("Invalid token received");
      }

      const user = verifyToken(token) as User;

      dispatch(setUser({ user, token }));

      toast.success("Login successful!");

      if (user.role === "admin") {
        navigate("/adminDashboard");
      } else if (user.role === "user") {
        navigate("/userDashboard");
      } else {
        toast.error("Invalid role. Contact support.");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-100 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>

        {isFetchBaseQueryError(error) && (
          <div className="p-2 text-sm text-red-600 bg-red-100 rounded">
            {(error.data as { message?: string })?.message ||
              "Something went wrong!"}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <ToastContainer />
        </form>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/signUp" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
