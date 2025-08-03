import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPages } from '../services/api';

const PagesList = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        setLoading(true);
        const data = await getPages();
        console.log('Pages data:', data);
        setPages(data);
        setError(null);
      } catch (err) {
        setError('Failed to load pages. Please try again.');
        console.error('Error fetching pages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const handleEditClick = (slug) => {
    console.log('Edit clicked for slug:', slug);
  };

  if (loading) {
    return <div className="text-center py-8">Loading pages...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-red-700 underline mt-2"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Page SEO Management</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No pages found. Add some pages to get started.
                </td>
              </tr>
            ) : (
              pages.map((page) => (
                <tr key={page._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {page.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link
                      to={`/pages/${page.slug}`}
                      className="text-primary-600 hover:text-primary-900 mr-4"
                      onClick={() => handleEditClick(page.slug)}
                    >
                      Edit SEO
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagesList; 