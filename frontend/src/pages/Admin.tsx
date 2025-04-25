import React, { useState, useEffect } from 'react';
import { Shield, UserCheck, Heart, Activity, Clock, AlertTriangle } from 'lucide-react';
import { useWeb3 } from '../context/Web3Context';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

interface Transaction {
  id: string;
  event: string;
  details: string;
  timestamp: number;
}

const Admin: React.FC = () => {
  const { isConnected, connectWallet, matchOrgan } = useWeb3();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    donors: 0,
    recipients: 0,
    matches: 0,
    pendingMatches: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isConnected) {
      fetchTransactions();
      fetchStats();
    }
  }, [isConnected]);

  const fetchTransactions = async () => {
    // Mock data for transactions
    const mockTransactions = [
      {
        id: '0x1234567890abcdef',
        event: 'Donor Registration',
        details: 'New kidney donor registered',
        timestamp: Date.now() - 86400000 * 2
      },
      {
        id: '0x2345678901abcdef',
        event: 'Recipient Registration',
        details: 'New kidney recipient registered',
        timestamp: Date.now() - 86400000 * 1.5
      },
      {
        id: '0x3456789012abcdef',
        event: 'Organ Match',
        details: 'Kidney match found between donor #1242 and recipient #3568',
        timestamp: Date.now() - 86400000 * 1
      },
      {
        id: '0x4567890123abcdef',
        event: 'Donor Registration',
        details: 'New liver donor registered',
        timestamp: Date.now() - 86400000 * 0.5
      },
      {
        id: '0x5678901234abcdef',
        event: 'Recipient Registration',
        details: 'New heart recipient registered',
        timestamp: Date.now() - 3600000 * 2
      },
    ];

    setTransactions(mockTransactions);
  };

  const fetchStats = async () => {
    // Mock stats data
    setStats({
      donors: 143,
      recipients: 87,
      matches: 42,
      pendingMatches: 12
    });
  };

  const handleMatchOrgan = async () => {
    setLoading(true);
    try {
      await matchOrgan();
      // Add a new transaction
      const newTransaction = {
        id: `0x${Math.random().toString(16).substr(2, 16)}`,
        event: 'Organ Match',
        details: 'Match process triggered by admin',
        timestamp: Date.now()
      };
      setTransactions([newTransaction, ...transactions]);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        matches: prev.matches + 1,
        pendingMatches: Math.max(0, prev.pendingMatches - 1)
      }));
    } catch (error) {
      console.error('Error matching organ:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="page-container">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Monitor system activities, trigger organ matching process, and view blockchain transactions.
            Only authorized administrators have access to this panel.
          </p>
        </div>

        {!isConnected ? (
          <div className="bg-yellow-50 p-6 rounded-lg text-center mb-8">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-yellow-700 mb-2">Authentication Required</h2>
            <p className="text-yellow-600 mb-4">
              You need to connect your wallet and have admin privileges to access this dashboard.
            </p>
            <Button 
              variant="primary" 
              onClick={connectWallet}
            >
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Donors</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.donors}</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Heart className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Recipients</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.recipients}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <UserCheck className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Successful Matches</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.matches}</p>
                  </div>
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Activity className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending Matches</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.pendingMatches}</p>
                  </div>
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions Section */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Actions</h2>
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary"
                  onClick={handleMatchOrgan}
                  isLoading={loading}
                  icon={<Activity className="h-5 w-5" />}
                >
                  Trigger Organ Matching
                </Button>
                <Button 
                  variant="outline"
                  onClick={fetchTransactions}
                  icon={<Clock className="h-5 w-5" />}
                >
                  Refresh Transactions
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <AlertTriangle className="h-4 w-4 inline-block mr-1 text-yellow-500" />
                The matching process will automatically find potential organ matches based on
                compatibility and priority. This action is recorded on the blockchain.
              </p>
            </Card>

            {/* Transactions Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Blockchain Transactions</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transaction ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Event
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                            {tx.id.substring(0, 10)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {tx.event}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {tx.details}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(tx.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;