import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AddEntity from './pages/AddEntity';
import DeleteEntity from './pages/DeleteEntity';
import ListEntities from './pages/ListEntities';
import SearchEntity from './pages/SearchEntity';
import { NavLink } from 'react-router-dom';


export default function App() {

  const sidebarItems = [
    { path: '/add', label: 'Add Entity'},
    { path: '/delete', label: 'Delete Entity'},
  ];
  return (
    <div className="flex min-h-screen bg-dark">
      <Sidebar />
      <div className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<div className="card">
            <h1 className="text-2xl font-bold mb-10 pl-6">Entity Management System</h1>

            {sidebarItems.map((item) => (
                  <NavLink 
                    key={item.path} 
                    to={item.path} 
                    className={({isActive}) => 
                      `px-8 py-3 rounded-lg transition-colors shadow-sm hover:shadow-md mx-6 ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
            ))}
            <div>
              <ListEntities />
            </div>
          </div>} />
          <Route path="/add" element={<AddEntity />} />
          <Route path="/delete" element={<DeleteEntity />} />
          <Route path="/list" element={<ListEntities />} />
          <Route path="/search" element={<SearchEntity />} />
          <Route path="/web-service" element={<div>Web Service Operations</div>} />
        </Routes>
      </div>
    </div>
  );
}