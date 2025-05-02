import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

export default function DeleteEntity() {
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState('name');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleDelete = async () => {
    if (!identifier.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid identifier' });
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const params = {};
      if (identifierType === 'name') {
        params.name = identifier;
      } else {
        params.phoneNumber = identifier;  
      }
      
      const response = await axios.delete(`${API_URL}/entity/delete`, { params });
      
      if (response.data.success) {
        setMessage({ type: 'success', text: response.data.message || 'Record deleted successfully' });
        setIdentifier('');
      } else {
        setMessage({ type: 'error', text: response.data.message || 'Failed to delete record' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete record. Record might not exist.';
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Delete Entity</h1>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
        }`}>
          {message.text}
        </div>
      )}

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
                name="identifierType"
                value="name"
                checked={identifierType === 'name'}
                onChange={() => setIdentifierType('name')}
                className="mr-2"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="phone"
                name="identifierType"
                value="phone"
                checked={identifierType === 'phone'}
                onChange={() => setIdentifierType('phone')}
                className="mr-2"
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
          </div>
        </div>
        
        <div className="form-group">
          <label className="block text-text-secondary mb-2" htmlFor="identifier">
            {identifierType === 'name' ? 'Name' : 'Phone Number'}:
          </label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="input"
            placeholder={`Enter ${identifierType === 'name' ? 'name' : 'phone number'}`}
            required
          />
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={handleDelete} 
            className="btn btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Delete Entity'}
          </button>
        </div>
      </div>
    </div>
  );
}