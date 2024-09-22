// pages/api/post-data.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { data } = req.body;
  
        // Mock response logic based on provided data
        const numbers = data.filter(item => !isNaN(item)); // Filter numbers
        const alphabets = data.filter(item => isNaN(item)); // Filter alphabets
        const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
        const highestLowercaseAlphabet = lowercaseAlphabets.length > 0
          ? [lowercaseAlphabets.sort().reverse()[0]]
          : [];
  
        // Example response based on the given challenge
        const result = {
          is_success: true,
          user_id: 'john_doe_17091999',
          email: 'john@xyz.com',
          roll_number: 'ABCD123',
          numbers,
          alphabets,
          highest_lowercase_alphabet: highestLowercaseAlphabet,
          file_valid: false,
        };
  
        res.status(200).json(result);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to process data' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  