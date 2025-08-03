import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogBySlug, updateBlog } from '../services/api';
import BlogForm from '../components/BlogForm';
import { toast } from 'react-toastify';

const BlogEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  console.log('BlogEdit component rendered with slug:', slug);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log('Fetching blog with slug:', slug);
        setLoading(true);
        const data = await getBlogBySlug(slug);
        console.log('Blog data received:', data);
        setBlog(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      console.log('Updating blog with data:', formData);
      await updateBlog(slug, formData);
      toast.success('Blog updated successfully!');
      navigate('/blogs');
    } catch (err) {
      toast.error('Failed to update blog.');
      console.error('Error updating blog:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading blog...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => navigate('/blogs')}
          className="text-red-700 underline mt-2"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
        <p className="text-yellow-700">Blog not found.</p>
        <button
          onClick={() => navigate('/blogs')}
          className="text-yellow-700 underline mt-2"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/blogs')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Blogs
        </button>
        <h1 className="text-2xl font-bold mt-2">
          Edit Blog: {blog.title}
        </h1>
        <p className="text-gray-500">URL: {blog.slug}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <BlogForm
          initialData={blog}
          onSubmit={handleSubmit}
          isLoading={saving}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default BlogEdit; 