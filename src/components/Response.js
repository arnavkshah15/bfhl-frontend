export default function Response({ data }) {
    if (!data) {
      return null; // Or display a placeholder
    }
  
    return (
      <div className="mt-4 p-4 bg-gray-100 text-sm text-gray-900">
        <h2 className="text-lg font-bold mb-2">Filtered Response:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
  