import Dashboard from '../components/Dashboard';
import { RecipientProvider } from '../context/RecipientContext';

function RecipientPage() {
  return (
      <RecipientProvider>
        <div className="min-h-screen bg-gray-50">
          <Dashboard />
        </div>
      </RecipientProvider>
  );
}

export default RecipientPage;