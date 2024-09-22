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
      const response = await fetch('https://backend-phi-coral.vercel.app/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: inputData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
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
  if (!data || filters.length === 0) return data;

  // Implement your filtering logic here
  // For example:
  const selectedValues = filters.map((filter) => filter.value);

  let filteredData = { ...data };

  if (!selectedValues.includes('numbers')) {
    filteredData.numbers = [];
  }

  if (!selectedValues.includes('letters')) {
    filteredData.letters = [];
  }

  return filteredData;
}
