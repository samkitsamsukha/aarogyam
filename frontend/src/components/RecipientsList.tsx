import React, { useEffect, useState } from 'react';
import RecipientCard from './RecipientCard';
import { Filter, Search } from 'lucide-react';
import axios from 'axios'
import { LoadingSpinner } from './ui/LoadingSpinner';

const RecipientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrgan, setFilterOrgan] = useState<string>('');
  const [filterBloodType, setFilterBloodType] = useState<string>('');
  const [loading,setLoading] = useState(true);
  const [mockRecipients,setMockRecipients] = useState<any>()

  useEffect(()=>{
    axios.get('http://localhost:3000/recipients').then((res)=>{
      console.log(res.data)
      setMockRecipients(res.data)
      setLoading(false)
    })
  },[])

  if(!mockRecipients || loading) return <LoadingSpinner/>

  // Sort recipients by waiting time (longest first)
  const sortedRecipients = [...mockRecipients].sort(
    (a, b) => a.waitingSince.getTime() - b.waitingSince.getTime()
  );
  
  // Filter recipients based on search term and filters
  const filteredRecipients = sortedRecipients.filter(recipient => {
    const matchesSearch = recipient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOrgan = filterOrgan ? recipient.requiredOrgan === filterOrgan : true;
    const matchesBlood = filterBloodType ? recipient.bloodType === filterBloodType : true;
    
    return matchesSearch && matchesOrgan && matchesBlood;
  });
  
  // Get unique organ types and blood types for filters
  // @ts-ignore
  const organTypes = Array.from(new Set(mockRecipients.map(r => r.requiredOrgan)));
  // @ts-ignore
  const bloodTypes = Array.from(new Set(mockRecipients.map(r => r.bloodType)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Recipient Waiting Queue</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse the list of recipients currently awaiting organ transplants. Recipients are prioritized by how long they have been waiting—those with the longest wait times appear first.
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-6 mb-8 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-white/70" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative">
              <select
                className="appearance-none bg-white/20 border border-transparent rounded-md py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                value={filterOrgan}
                onChange={(e) => setFilterOrgan(e.target.value)}
              >
                <option value="">All Organs</option>
                {organTypes.map(organ => (
                  // @ts-ignore
                  <option key={organ} value={organ}>{organ}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <Filter className="h-4 w-4" />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="appearance-none bg-white/20 border border-transparent rounded-md py-2 pl-3 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                value={filterBloodType}
                onChange={(e) => setFilterBloodType(e.target.value)}
              >
                <option value="">All Blood Types</option>
                {bloodTypes.map(type => (
                  // @ts-ignore
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <Filter className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecipients.length > 0 ? (
          filteredRecipients.map(recipient => (
            <RecipientCard key={recipient.id} recipient={recipient} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-600">No recipients match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipientsList;