import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, deleteBlog } from '../services/api';
import { toast } from 'react-toastify';

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      setError('Failed to load blogs. Please try again.');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        setDeleting(slug);
        await deleteBlog(slug);
        setBlogs(blogs.filter((blog) => blog.slug !== slug));
        toast.success('Blog deleted successfully!');
      } catch (err) {
        toast.error('Failed to delete blog.');
        console.error('Error deleting blog:', err);
      } finally {
        setDeleting(null);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading blogs...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => fetchBlogs()}
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
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Link to="/blogs/new" className="btn btn-primary">
          Create New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-2">
            No blogs found
          </h2>
          <p className="text-gray-500 mb-6">
            Create your first blog to get started.
          </p>
          <Link to="/blogs/new" className="btn btn-primary">
            Create New Blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <h3 className="text-lg font-medium mb-2 truncate">
                  {blog.country || blog.slug?.toUpperCase() || 'BLOG'}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-between">
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.slug)}
                    className="text-red-600 hover:text-red-800"
                    disabled={deleting === blog.slug}
                  >
                    {deleting === blog.slug ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsList; 