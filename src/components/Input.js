import { useState } from 'react';

export default function Input({ onSubmit }) {
  const [apiInput, setApiInput] = useState('');

  const handleSubmit = () => {
    if (onSubmit && apiInput) {
      onSubmit(apiInput);
    }
  };

  return (
    <div className="p-4 flex flex-col">
    <label
      htmlFor="apiInput"
      className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      API Input
    </label>
    <input
      type="text"
      id="apiInput"
      value={apiInput}
      onChange={(e) => setApiInput(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                 dark:text-white"
      placeholder='{"data":["M","1","334","4","B"]}'
    />
    <br />
    <button
      onClick={handleSubmit}
      className="mt-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs
                 leading-tight uppercase rounded shadow-md hover:bg-blue-700
                 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none
                 focus:ring-0 active:bg-blue-800 active:shadow-lg transition
                 duration-150 ease-in-out"
    >
      Submit
    </button>
  </div>
  
  );
}
