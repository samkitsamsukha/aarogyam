import RecipientsList from '../components/RecipientsList';

function RecipientQueue() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">      
      <main>
        <RecipientsList />
      </main>
      
      <footer className="bg-gradient-to-r from-teal-700 to-cyan-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">OrganMatch</h2>
              <p className="text-teal-200 text-sm">Connecting organ donors with recipients since 2025</p>
            </div>
            <div className="text-sm text-teal-200">
              <p>&copy; 2025 OrganMatch. All rights reserved.</p>
              <p>Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RecipientQueue;