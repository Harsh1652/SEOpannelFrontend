import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getPages, getBlogs } from '../services/api';

const Dashboard = () => {
  const location = useLocation();
  const [stats, setStats] = useState({
    pages: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [pagesData, blogsData] = await Promise.all([
        getPages(),
        getBlogs(),
      ]);
      
      setStats({
        pages: pagesData.length,
        blogs: blogsData.length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [location.pathname]); // Refresh when route changes

  // Refresh stats when component comes into focus
  useEffect(() => {
    const handleFocus = () => {
      fetchStats();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const statCards = [
    {
      title: 'Pages',
      value: stats.pages,
      link: '/pages',
      color: 'bg-blue-500',
    },
    {
      title: 'Blogs',
      value: stats.blogs,
      link: '/blogs',
      color: 'bg-green-500',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh Stats'}
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading stats...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="block"
            >
              <div className={`${card.color} rounded-lg shadow-md p-6 text-white`}>
                <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link
              to="/blogs/new"
              className="btn btn-primary w-full flex justify-center"
            >
              Create New Blog
            </Link>
            <Link
              to="/pages"
              className="btn btn-secondary w-full flex justify-center"
            >
              Manage Page SEO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 