import { useState } from "react";
import DonorCard from "./DonorCard";
import RecipientCard from "./RecipientCard";
import { MatchedPair as MatchedPairType } from "../../types";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface MatchedPairProps {
  matchedPair: MatchedPairType;
}

export default function MatchedPair({ matchedPair }: MatchedPairProps) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAcceptOrgan = () => {
    setShowModal(true);
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Matched Donor & Recipient
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Review the compatibility details for this matched pair
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch">
          <DonorCard donor={matchedPair.donor} />
          <RecipientCard
            recipient={matchedPair.recipient}
            onAcceptOrgan={handleAcceptOrgan}
          />
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Confirm Organ Acceptance
              </h3>
              <p className="text-gray-600 mb-6">
                You are about to accept the {matchedPair.donor.organType}{" "}
                donation from {matchedPair.donor.name}. This action will notify
                the medical team to proceed with the transplant process.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const toastId = toast.loading("Confirming acceptance...");
                    axios
                      .post(
                        `http://localhost:3000/match-confirm?id=${matchedPair.recipient._id}`
                      )
                      .then(() => {
                        toast.success("Organ acceptance confirmed!", { id: toastId });
                        navigate('/')
                        setShowModal(false);
                      })
                      .catch(() => {
                        toast.error(
                          "Failed to confirm acceptance. Please try again.",
                          { id: toastId }
                        );
                      });
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-md hover:from-teal-600 hover:to-cyan-600"
                >
                  Confirm Acceptance
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
