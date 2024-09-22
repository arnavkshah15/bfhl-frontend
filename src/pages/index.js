import { useState } from 'react';
import Input from '../components/Input';
import Filter from '../components/Filter';
import Response from '../components/Response';

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiSubmit = async (inputData) => {
    setLoading(true);   
    setError(null);
 
    try {
       console.log('Sending request with data:', inputData); // Log inputData for debugging
 
       const response = await fetch('https://api-bfhl.vercel.app/bfhl', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(inputData),
       });
 
       console.log('Received response:', response); // Log response for debugging
 
       if (!response.ok) {
         throw new Error(`Network response was not ok: ${response.statusText}`);
       }
 
       const data = await response.json();
       console.log('Received data:', data); // Log the actual data
 
       setApiResponse(data);
    } catch (error) {
       console.error('Error occurred:', error); // Log error details for debugging
       setError(error.message);
       setApiResponse(null);
    } finally {
       setLoading(false);
    }
 };
 
  
  
  

  const handleFilterChange = (selectedOptions) => {
    setFilterOptions(selectedOptions);
  };

  const filteredData = applyFilter(apiResponse, filterOptions);

  return (
    <div className="container mx-auto px-4">
      <Input onSubmit={handleApiSubmit} />
      <Filter onChange={handleFilterChange} />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <Response data={filteredData} />
    </div>
  );
}

function applyFilter(data, filters) {
    if (!data || filters.length === 0) return null;

    let filteredData = '';

    // Apply filters based on selected options
    if (filters.includes('Numbers') && data.numbers) {
      filteredData += `Numbers: ${data.numbers.join(',')}\n`;
    }

    if (filters.includes('Alphabets') && data.alphabets) {
      filteredData += `Alphabets: ${data.alphabets.join(',')}\n`;
    }

    if (filters.includes('Highest Lowercase Alphabet') && data.highest_lowercase_alphabet) {
      filteredData += `Highest Lowercase Alphabet: ${data.highest_lowercase_alphabet.join(',')}\n`;
    }

    return filteredData.trim();  // Remove any extra newlines
}

  
  
