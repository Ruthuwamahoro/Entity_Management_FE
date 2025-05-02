import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

export default function SearchEntity() {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      setError('Please enter a search value');
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);
    
    try {
      const queryParam = searchType === 'name' ? 'name' : 'phoneNumber';
      
      const res = await axios.get(`${API_URL}/entity/search`, {
        params: {
          [queryParam]: searchValue
        }
      });
      if (res.data && res.data.success) {
        if (res.data.data && res.data.data.length === 1) {
          setResult(res.data.data[0]);
        } else if (res.data.data && res.data.data.length > 1) {
          setResult(res.data.data[0]);
        } else {
          setError('No record found with the given criteria');
        }
      } else {
        setError('No record found with the given criteria');
      }
    } catch (error) {
      setError('No record found or server error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Search Entity</h1>
      
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
          <label className="block text-text-secondary mb-2" htmlFor="searchValue">
            {searchType === 'name' ? 'Name' : 'Phone Number'}:
          </label>
          <div className="flex">
            <input
              type="text"
              id="searchValue"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="input flex-1 rounded-r-none"
              placeholder={`Enter ${searchType === 'name' ? 'name' : 'phone number'}`}
            />
            <button 
              onClick={handleSearch} 
              className="btn btn-primary rounded-l-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="p-3 bg-red-800 text-red-100 rounded-md mt-4">
            {error}
          </div>
        )}
        
        {result && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-accent">Result:</h2>
            <div className="bg-dark-accent p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-text-secondary mb-1">Name:</label>
                  <p className="text-text-primary">{result.name}</p>
                </div>
                <div className="form-group">
                  <label className="block text-text-secondary mb-1">Surname:</label>
                  <p className="text-text-primary">{result.surname}</p>
                </div>
                <div className="form-group">
                  <label className="block text-text-secondary mb-1">Age:</label>
                  <p className="text-text-primary">{result.age}</p>
                </div>
                <div className="form-group">
                  <label className="block text-text-secondary mb-1">Email:</label>
                  <p className="text-text-primary">{result.email}</p>
                </div>
                <div className="form-group">
                  <label className="block text-text-secondary mb-1">Phone:</label>
                  <p className="text-text-primary">{result.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}