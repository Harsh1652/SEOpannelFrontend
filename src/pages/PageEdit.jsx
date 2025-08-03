import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPageBySlug, updatePageSEO } from '../services/api';
import SEOForm from '../components/SEOForm';
import { toast } from 'react-toastify';

const PageEdit = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  console.log('PageEdit component rendered with slug:', slug);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        console.log('Fetching page with slug:', slug);
        setLoading(true);
        const data = await getPageBySlug(slug);
        console.log('Page data received:', data);
        setPage(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  const handleSubmit = async (formData) => {
    try {
      setSaving(true);
      console.log('Updating page with data:', formData);
      await updatePageSEO(slug, {
        name: page.name,
        seo: formData,
      });
      toast.success('SEO settings saved successfully!');
      navigate('/pages');
    } catch (err) {
      toast.error('Failed to save SEO settings.');
      console.error('Error updating page SEO:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading page...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => navigate('/pages')}
          className="text-red-700 underline mt-2"
        >
          Back to Pages
        </button>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-4">
        <p className="text-yellow-700">Page not found.</p>
        <button
          onClick={() => navigate('/pages')}
          className="text-yellow-700 underline mt-2"
        >
          Back to Pages
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate('/pages')}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back to Pages
        </button>
        <h1 className="text-2xl font-bold mt-2">
          Edit SEO for: {page.name}
        </h1>
        <p className="text-gray-500">URL: {page.slug}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <SEOForm
          initialData={page.seo}
          onSubmit={handleSubmit}
          isLoading={saving}
        />
      </div>
    </div>
  );
};

export default PageEdit; 