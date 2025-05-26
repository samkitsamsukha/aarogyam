import { useEffect, useState } from "react";
import DonorDashboard from "../components/DonorDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

function DonorPage() {
  const [donar, setDonar] = useState<any>(null);
  const [recipient, setRecipient] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/get-info", {
          headers: {
            authorization: token,
            "Content-Type": "application/json",
          },
        });
        if (response.data.donor.status == "None") {
          toast.info("Please complete onboarding process");
          navigate("/donor-onboard");
        }
        console.log(response.data.donor)
        setDonar(response.data.donor);
        setRecipient(response.data.matched_recipient);
      } catch (error) {
        setDonar(null);
        setRecipient(undefined);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner/>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <DonorDashboard donor={donar} recipient={recipient} />
    </div>
  );
}

export default DonorPage;
