import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MatchedPair from '../components/match_components/MatchedPair';
import { Donor, Recipient } from '../types';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

function useQuery(search: string) {
  return new URLSearchParams(search);
}

interface MatchedPairType {
  donor: Donor; 
  recipient: Recipient;
  score?: number;
}

function MatchPage() {
  const location = useLocation();
  const query = useQuery(location.search);
  const id = query.get('id');

  const [matchedPair, setMatchedPair] = useState<MatchedPairType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/get-match?id=${encodeURIComponent(id)}`)
        .then(res => {
          setMatchedPair(res.data);
          setError(null);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to fetch match data.');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if(loading) return <LoadingSpinner/>

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-white to-teal-50 py-12">
      {error && <p className="text-center text-red-500">{error}</p>}
      {matchedPair && <MatchedPair matchedPair={matchedPair} />}
    </div>
  );
}

export default MatchPage;
