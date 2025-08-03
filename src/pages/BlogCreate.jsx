import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../services/api';
import BlogForm from '../components/BlogForm';
import { toast } from 'react-toastify';

const BlogCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (blogData) => {
    try {
      setLoading(true);
      await createBlog(blogData);
      toast.success('Blog created successfully!');
      navigate('/blogs');
    } catch (err) {
      toast.error('Failed to create blog.');
      console.error('Error creating blog:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/blogs')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Blogs
        </button>
        <h1 className="text-2xl font-bold mt-2">Create New Blog</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <BlogForm
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default BlogCreate; 