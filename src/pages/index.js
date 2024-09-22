import { useState } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

// Define filter options
const filterOptions = [
  { value: 'Alphabets', label: 'Alphabets' },
  { value: 'Numbers', label: 'Numbers' },
  { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
];

export default function Home() {
  const [inputData, setInputData] = useState(''); // State for input JSON
  const [response, setResponse] = useState(null); // State for API response
  const [filters, setFilters] = useState([]); // State for selected filters
  const [showOutput, setShowOutput] = useState(false); // State to control output display

  // Handle filter selection
  const handleFilterChange = (selected) => {
    setFilters(selected ? selected.map(option => option.value) : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Parse the JSON input
      const jsonData = JSON.parse(inputData);

      // Send POST request to the backend
      const res = await fetch('/api/post-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const result = await res.json();
      setResponse(result); // Store the response data
      setShowOutput(true); // Show the filtered output
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  // Filter response data based on selected options
  const getFilteredResponse = () => {
    if (!response) return null;

    const filteredData = {};

    if (filters.includes('Alphabets')) {
      filteredData.alphabets = response.alphabets;
    }

    if (filters.includes('Numbers')) {
      filteredData.numbers = response.numbers;
    }

    if (filters.includes('Highest lowercase alphabet')) {
      filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }

    return filteredData;
  };

  const filteredResponse = getFilteredResponse();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <label className="block text-gray-700 text-sm font-bold mb-2">API Input</label>
        <textarea
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='{"data":["M","1","334","4","B"]}'
          rows={3}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        
        {/* Submit Button */}
        <button
          type='submit'
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {/* Dropdown to select filters */}
      <div className="w-full max-w-lg mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Multi Filter</label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={filterOptions}
          onChange={handleFilterChange}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      {/* Display filtered response only after form submission */}
      {showOutput && response && filters.length > 0 && (
        <>
          <h2 className="text-xl font-bold mt-6">Filtered Response</h2>
          <pre className="w-full max-w-lg bg-gray-100 p-4 rounded-lg mt-2">
            {JSON.stringify(filteredResponse, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
