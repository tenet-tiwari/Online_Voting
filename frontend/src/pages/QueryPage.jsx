import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaReply, FaCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const QueryPage = () => {
  const [queries, setQueries] = useState([]);
  const [activeReply, setActiveReply] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    // Fetch the queries from the database, sorted by time (latest first)
    axios.get('http://localhost:5000/api/query',{
      headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
          },
    })
      .then(response => setQueries(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleReply = (queryId, userEmail) => {
    if (!replyMessage) {
      toast.error('Please enter a reply message.');
      return;
    }

    // Send the reply to the user's email
    // axios.post('/api/admin/reply-query', { queryId, replyMessage, userEmail })
    //   .then(() => {
    //     toast.success('Reply sent successfully!');
    //     setQueries(prevQueries =>
    //       prevQueries.map(query =>
    //         query._id === queryId ? { ...query, replied: true } : query
    //       )
    //     );
    //     setActiveReply(null);
    //     setReplyMessage('');
    //   })
    //   .catch(error => console.error(error));
  };

  const handleDelete = (queryId) => {
    //Delete the query from the database
    if (window.confirm(`Are you sure you want to delete this query?`)){
    axios.delete(`http://localhost:5000/api/query/del/${queryId}`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if required
      },
    })
      .then(() => {
        toast.success('Query deleted successfully!');
        setQueries(prevQueries => prevQueries.filter(query => query._id !== queryId));
      })
      .catch(error => console.error(error));
  }};

  return (
    <div className="p-8 bg-gray-100 min-h-screen bg-gradient-to-b from-green-50 via-pink-100 to-yellow-50">
      <h1 className="text-4xl font-bold text-center bg-blue-950 text-white py-4 rounded-lg shadow-md mb-8">Query</h1>
      <div className="space-y-6 ">
        {queries.map(query => (
          <div key={query._id} className="bg-white p-6 rounded-lg shadow-lg relative  bg-gradient-to-r from-gray-200 via-blue-50 to-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">{query.name}</h2>
              <div className="flex items-center space-x-4">
                <FaCircle className={query.replied ? 'text-green-500' : 'text-red-500'} />
                <button
                  onClick={() => setActiveReply(query._id === activeReply ? null : query._id)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <FaReply className="mr-2" /> Reply
                </button>
                <button
                  onClick={() => handleDelete(query._id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{query.query}</p>

            {activeReply === query._id && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                  rows="4"
                  placeholder="Type your reply here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button
                  onClick={() => handleReply(query._id, query.userEmail)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryPage;
