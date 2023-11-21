import React, { useState } from 'react';
import axios from 'axios';

const YTComponent = () => {
  const [url, setUrl] = useState('');
  const [answer, setAnswer] = useState('');
  const [references, setReferences] = useState('');
  const [trainingUrl, setTrainingUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnswerClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/query/llm/?query=${url}&url=${trainingUrl}`);
      // Extract relevant data from the response and set it to the state
      setAnswer(response.data.response);
    } catch (error) {
      console.error('Error fetching answer:', error);
    }
  };

  const handleReferencesClick = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/query/yt/?query=${url}&url=${trainingUrl}`);
      setReferences(response.data.answers[0]);
    } catch (error) {
      console.error('Error fetching references:', error);
    }
  };

  const handleTrainClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/query/ytvid/?query=${trainingUrl}`);

      console.log('Training Response:', response.data);

      if (response.data === 'success') {
        window.alert('Training successful! You can now ask questions.');
      }

      // Optionally, you can update the state or perform other actions based on the response
      // ...

    } catch (error) {
      console.error('Error during training:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-gray-100 rounded-md">
      {/* Training Section */}
      <div className="mb-4">
        <label htmlFor="trainingUrl" className="block text-sm font-medium text-gray-700">
          Enter URL for Training:
        </label>
        <div className="flex">
          <input
            type="text"
            id="trainingUrl"
            className="mt-1 p-2 border rounded-l-md w-full"
            placeholder="Paste YouTube URL here..."
            value={trainingUrl}
            onChange={(e) => setTrainingUrl(e.target.value)}
          />
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-r-md"
            onClick={handleTrainClick}
          >
            {loading ? 'Loading...' : 'Train'}
          </button>
        </div>
      </div>

      {/* Answer and References Section */}
      <div className="mb-4">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Enter Question:
        </label>
        <input
          type="text"
          id="url"
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Write your Question here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleAnswerClick}
        >
          Answer
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleReferencesClick}
        >
          References
        </button>
      </div>

      {answer && (
        <div className="bg-green-100 p-4 rounded-md mb-4">
          <strong className="block text-green-700 mb-2">Answer:</strong>
          <p className="text-green-800">{answer}</p>
        </div>
      )}

      {references && (
        <div className="bg-blue-100 p-4 rounded-md">
          <strong className="block text-blue-700 mb-2">References:</strong>
          <p className="text-blue-800">{references}</p>
        </div>
      )}
    </div>
  );
};

export default YTComponent;
