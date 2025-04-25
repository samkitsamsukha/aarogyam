import React, { useEffect, useState } from 'react';
import { Clock, Filter, SortAsc, SortDesc } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import FormSelect from '../components/ui/FormSelect';

interface QueueItem {
  id: string;
  organType: string;
  bloodType: string;
  timestamp: number;
}

const Queue: React.FC = () => {
  const { getQueue, isConnected, connectWallet } = useWeb3();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [filteredQueue, setFilteredQueue] = useState<QueueItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    organType: '',
    bloodType: '',
  });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);

  const organTypes = [
    { value: '', label: 'All Organs' },
    { value: 'kidney', label: 'Kidney' },
    { value: 'liver', label: 'Liver' },
    { value: 'heart', label: 'Heart' },
    { value: 'lung', label: 'Lung' },
    { value: 'pancreas', label: 'Pancreas' },
    { value: 'cornea', label: 'Cornea' },
  ];

  const bloodTypes = [
    { value: '', label: 'All Blood Types' },
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  useEffect(() => {
    fetchQueue();
  }, [isConnected]);

  useEffect(() => {
    applyFilters();
  }, [queue, filters, sortOrder]);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      if (!isConnected) {
        await connectWallet();
      }
      const queueData = await getQueue();
      setQueue(queueData);
    } catch (error) {
      console.error('Error fetching queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...queue];

    // Apply organ type filter
    if (filters.organType) {
      filtered = filtered.filter(item => 
        item.organType.toLowerCase() === filters.organType.toLowerCase()
      );
    }

    // Apply blood type filter
    if (filters.bloodType) {
      filtered = filtered.filter(item => item.bloodType === filters.bloodType);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.timestamp - b.timestamp;
      } else {
        return b.timestamp - a.timestamp;
      }
    });

    setFilteredQueue(filtered);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getWaitingTime = (timestamp: number) => {
    const now = Date.now();
    const diffInDays = Math.floor((now - timestamp) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day';
    return `${diffInDays} days`;
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Clock className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="page-title">Transplant Queue</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Current waiting list for organ transplants. For privacy reasons, only non-identifiable information is displayed.
            The list is automatically sorted by registration date.
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleFilters}
              icon={<Filter className="h-4 w-4" />}
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleSortOrder}
              icon={sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
            >
              {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            {filteredQueue.length} {filteredQueue.length === 1 ? 'recipient' : 'recipients'} in queue
          </div>
        </div>

        {showFilters && (
          <Card className="mb-6 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormSelect
                id="organType"
                label="Filter by Organ Type"
                options={organTypes}
                value={filters.organType}
                onChange={(e) => handleFilterChange('organType', e.target.value)}
              />
              <FormSelect
                id="bloodType"
                label="Filter by Blood Type"
                options={bloodTypes}
                value={filters.bloodType}
                onChange={(e) => handleFilterChange('bloodType', e.target.value)}
              />
            </div>
          </Card>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredQueue.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No matching recipients found in the queue.</p>
            {(filters.organType || filters.bloodType) && (
              <Button 
                variant="outline" 
                size="sm"
                className="mt-4"
                onClick={() => setFilters({ organType: '', bloodType: '' })}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredQueue.map((item) => (
              <div key={item.id} className="queue-card p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold text-blue-700">{item.organType} Transplant</div>
                    <div className="text-sm text-gray-600">Blood Type: {item.bloodType}</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-sm font-medium text-gray-900">Waiting since: {formatDate(item.timestamp)}</div>
                    <div className="text-xs text-gray-500">Time in queue: {getWaitingTime(item.timestamp)}</div>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                  Transaction ID: {item.id.substring(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            This queue is updated in real-time as new recipients register or matches are found.
          </p>
          <Button 
            variant="primary"
            onClick={fetchQueue}
            icon={<Clock className="h-5 w-5" />}
          >
            Refresh Queue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Queue;