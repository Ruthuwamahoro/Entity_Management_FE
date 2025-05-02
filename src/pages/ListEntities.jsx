import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

export default function ListEntities() {
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    fetchEntities();
  }, []);

  const fetchEntities = async () => {
    setIsLoading(true);
    setSearchPerformed(false);
    setSearchError('');
    
    try {
      const res = await axios.get('http://localhost:5079/api/entity/list');
      if (res.data && res.data.success) {
        setEntities(res.data.data || []);
      } else {
        setError('Failed to load entities. Please try again later.');
      }
    } catch (err) {
      console.error('Failed to fetch entities', err);
      setError('Failed to load entities. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setSearchError('Please enter a search value');
      return;
    }

    setIsSearching(true);
    setSearchError('');
    
    try {
      let params = {};
      if (searchType === 'name') {
        params.name = searchValue;
      } else {
        params.phoneNumber = searchValue;
      }

      const res = await axios.get(`${API_URL}/entity/search`, { params });
      
      if (res.data && res.data.success) {
        setEntities(res.data.data || []);
        setSearchPerformed(true);
        
        if (res.data.data.length === 0) {
          setSearchError('No records found with the given criteria');
        }
      } else {
        setSearchError(res.data?.message || 'No records found with the given criteria');
      }
    } catch (error) {
      setSearchError('An error occurred while searching. Please try again.');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    setSearchPerformed(false);
    setSearchError('');
    fetchEntities();
  };

  return (
    <div className="card">
        <div className="mb-8 bg-dark-accent p-4 rounded-md">
        
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-text-secondary mb-2">
              Search by:
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="name"
                  name="searchType"
                  value="name"
                  checked={searchType === 'name'}
                  onChange={() => setSearchType('name')}
                  className="mr-2"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="phone"
                  name="searchType"
                  value="phone"
                  checked={searchType === 'phone'}
                  onChange={() => setSearchType('phone')}
                  className="mr-2"
                />
                <label htmlFor="phone">Phone Number</label>
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <div className="flex">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="input flex-1 rounded-r-none"
                placeholder={`Enter ${searchType === 'name' ? 'name' : 'phone number'}`}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button 
                onClick={handleSearch} 
                className="btn btn-primary rounded-l-none rounded-r-none"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : 'Search'}
              </button>
              {searchPerformed && (
                <button 
                  onClick={clearSearch} 
                  className="btn btn-secondary rounded-l-none"
                  disabled={isLoading}
                >
                  Show All
                </button>
              )}
            </div>
          </div>
          
          {searchError && (
            <div className="p-3 bg-red-800 text-red-100 rounded-md">
              {searchError}
            </div>
          )}
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {searchPerformed 
              ? `Search Results (${entities.length})` 
              : `All Entities (${entities.length})`}
          </h2>
          
          {isLoading && (
            <div className="flex items-center text-accent">
              <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </div>
          )}
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-800 text-red-100 rounded-md">
            {error}
          </div>
        )}
        
        {!isLoading && entities.length === 0 && !searchError && (
          <div className="text-center py-12 text-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>No entities found. Add some entities to see them here.</p>
          </div>
        )}
        
        {entities.length > 0 && (
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-header-cell">Name</th>
                  <th className="table-header-cell">Surname</th>
                  <th className="table-header-cell">Age</th>
                  <th className="table-header-cell">Email</th>
                  <th className="table-header-cell">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-accent">
                {entities.map((entity, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-cell">{entity.name}</td>
                    <td className="table-cell">{entity.surname}</td>
                    <td className="table-cell">{entity.age}</td>
                    <td className="table-cell">{entity.email}</td>
                    <td className="table-cell">{entity.phoneNumber || entity.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}