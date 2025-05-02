import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';


export default function AddEntity() {
  const [formData, setFormData] = useState({
    Name: '',
    Surname: '',
    Age: '',
    Email: '',
    Phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await axios.post(`${API_URL}/entity/add`, formData);
      setMessage({ type: 'success', text: 'Entity added successfully!' });
      setFormData({
        Name: '',
        Surname: '',
        Age: '',
        Email: '',
        Phone: ''
      });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to add entity. Please try again.' });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Entity</h1>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' ? 'bg-green-800 text-green-100' : 'bg-red-800 text-red-100'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {['Name', 'Surname', 'Age', 'Email', 'Phone'].map(field => (
          <div key={field} className="form-group">
            <label className="block text-text-secondary mb-2" htmlFor={field}>
              {field}
            </label>
            <input
              type={field === 'Age' ? 'number' : field === 'Email' ? 'email' : 'text'}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="input"
              required
              placeholder={`Enter ${field.toLowerCase()}`}
            />
          </div>
        ))}
        
        <div className="flex justify-end mt-6">
          <button 
            type="submit" 
            className="btn btn-primary"
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
            ) : 'Add Entity'}
          </button>
        </div>
      </form>
    </div>
  );
}