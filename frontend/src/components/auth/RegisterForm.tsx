import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Eye, EyeOff } from "lucide-react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import RoleSelector from "./RoleSelector";
import axios from "axios";
import useWallet from "../../hooks/useWallet";
import contractABI from "../../../contracts/contract.abi.json";
import { toast } from "sonner";

const contractAddress = "0x3e31740428F2d0cE9666B715c838f4855c78EA99";

interface RegisterFormProps {
  onLoginClick: () => void;
}

let toastId: number | string;

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "recipient", // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [web3, account, _walletLoading] = useWallet();

  async function registerDonorHandler() {
    if (!web3 || !account) {
      console.log("Wallet not connected");
      return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    contract.methods
      .registerAsDonor()
      .send({ from: account })
      .on("transactionHash", (hash: any) => {
        console.log("Transaction sent, hash:", hash);
      })
      .on("receipt", (receipt: any) => {
        console.log("Transaction confirmed:", receipt);

        if (receipt.events && receipt.events.Registered) {
          const event = receipt.events.Registered.returnValues;
          console.log("Registered event detected:", event);
          toast.dismiss(toastId);
          toast.success("Donor registered successfully !!");
          toast.info("Please login to continue !!");
          // alert(
          //   `Registration completed! Role: ${event.role}, Timestamp: ${event.timestamp}`
          // );
        }
      })
      .on("error", (error: any) => {
        console.log(error.message);
      });
  }

  async function registerRecipientHandler() {
    if (!web3 || !account) {
      console.log("Wallet not connected");
      return;
    }

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    contract.methods
      .registerAsRecipient()
      .send({ from: account })
      .on("transactionHash", (hash: any) => {
        console.log("Transaction sent, hash:", hash);
      })
      .on("receipt", (receipt: any) => {
        console.log("Transaction confirmed:", receipt);

        if (receipt.events && receipt.events.Registered) {
          const event = receipt.events.Registered.returnValues;
          console.log("Registered event detected:", event);
          toast.dismiss(toastId);
          toast.success("Recipient registered successfully !!");
          toast.info("Please login to continue !!");
          // alert(
          //   `Registration completed! Role: ${event.role}, Timestamp: ${event.timestamp}`
          // );
        }
      })
      .on("error", (error: any) => {
        console.log(error.message);
      });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role: string) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      if (formData.role == "donor") {
        toastId = toast.loading("Registering donor...");
        await registerDonorHandler();
      } else {
        toastId = toast.loading("Registering recipient...");
        await registerRecipientHandler();
      }

      const response = await axios.post("http://localhost:3000/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setIsLoading(false);
      console.log("Registration successful:", response.data.message);
      setTimeout(onLoginClick, 2000);
    } catch (error: any) {
      setIsLoading(false);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Registration failed. Please try again.");
      }
      console.error("Registration error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        <RoleSelector value={formData.role} onChange={handleRoleChange} />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="John"
            required
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
          />
        </div>

        <FormInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john.doe@example.com"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              placeholder="Create a password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters with letters and numbers
          </p>
        </div>

        <FormInput
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />

        <div className="flex items-start mt-4">
          <input
            id="terms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={() => setAgreeToTerms(!agreeToTerms)}
            className="h-4 w-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{" "}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </a>
          </label>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          icon={<UserPlus size={18} />}
        >
          Create Account
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onLoginClick}
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
