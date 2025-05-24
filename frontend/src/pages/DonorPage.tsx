import { useEffect, useState } from "react";
import DonorDashboard from "../components/DonorDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function DonorPage() {
  const [donar, setDonar] = useState<any>(null);
  const [recipient, setRecipient] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  if (donar) {
    const date = donar.organAvailabilityDate as Date;
    console.log(date.toLocaleString());
  }

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
          navigate("/onboarding");
        }
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

  if (loading) return <>Loading...</>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <DonorDashboard donor={donar} recipient={recipient} />
    </div>
  );
}

export default DonorPage;
