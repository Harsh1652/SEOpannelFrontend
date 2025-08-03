import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

const SEOForm = ({ initialData, onSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState('basic');
  
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: initialData || {
      title: '',
      description: '',
      metaTags: [],
      linkTags: [],
      scriptTags: []
    }
  });

  const { fields: metaFields, append: appendMeta, remove: removeMeta } = useFieldArray({
    control,
    name: "metaTags"
  });

  const { fields: linkFields, append: appendLink, remove: removeLink } = useFieldArray({
    control,
    name: "linkTags"
  });

  const { fields: scriptFields, append: appendScript, remove: removeScript } = useFieldArray({
    control,
    name: "scriptTags"
  });

  const addMetaTag = (tagType) => {
    switch (tagType) {
      case 'name':
        appendMeta({ type: 'name', name: '', content: '' });
        break;
      case 'property':
        appendMeta({ type: 'property', property: '', content: '' });
        break;
      case 'http-equiv':
        appendMeta({ type: 'http-equiv', httpEquiv: '', content: '' });
        break;
      case 'charset':
        appendMeta({ type: 'charset', charset: 'UTF-8' });
        break;
      default:
        appendMeta({ type: 'name', name: '', content: '' });
    }
  };

  const addLinkTag = (tagType) => {
    switch (tagType) {
      case 'canonical':
        appendLink({ rel: 'canonical', href: '' });
        break;
      case 'icon':
        appendLink({ rel: 'icon', href: '' });
        break;
      case 'alternate':
        appendLink({ rel: 'alternate', href: '', hreflang: '' });
        break;
      default:
        appendLink({ rel: '', href: '' });
    }
  };

  const addScriptTag = () => {
    appendScript({ type: 'application/ld+json', content: '{\n  "@context": "https://schema.org",\n  "@type": "WebPage"\n}' });
  };

  const renderMetaTagFields = (field, index) => {
    switch (field.type) {
      case 'name':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Name (e.g., description)"
                {...register(`metaTags.${index}.name`)}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Content"
                {...register(`metaTags.${index}.content`)}
              />
            </div>
          </div>
        );
      case 'property':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Property (e.g., og:title)"
                {...register(`metaTags.${index}.property`)}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Content"
                {...register(`metaTags.${index}.content`)}
              />
            </div>
          </div>
        );
      case 'http-equiv':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Http-Equiv (e.g., Content-Language)"
                {...register(`metaTags.${index}.httpEquiv`)}
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Content"
                {...register(`metaTags.${index}.content`)}
              />
            </div>
          </div>
        );
      case 'charset':
        return (
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <input
                type="text"
                className="form-input"
                placeholder="Charset (e.g., UTF-8)"
                {...register(`metaTags.${index}.charset`)}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderLinkTagFields = (field, index) => {
    return (
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <input
            type="text"
            className="form-input"
            placeholder="Rel (e.g., canonical)"
            {...register(`linkTags.${index}.rel`)}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            className="form-input"
            placeholder="Href (e.g., https://example.com)"
            {...register(`linkTags.${index}.href`)}
          />
        </div>
        {field.rel === 'alternate' && (
          <div className="flex-1">
            <input
              type="text"
              className="form-input"
              placeholder="Hreflang (e.g., en)"
              {...register(`linkTags.${index}.hreflang`)}
            />
          </div>
        )}
      </div>
    );
  };

  const renderTabs = () => {
    return (
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap">
          <button
            type="button"
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'basic'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('basic')}
          >
            Basic SEO
          </button>
          <button
            type="button"
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'meta'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('meta')}
          >
            Meta Tags
          </button>
          <button
            type="button"
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'link'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('link')}
          >
            Link Tags
          </button>
          <button
            type="button"
            className={`py-4 px-6 border-b-2 font-medium text-sm ${
              activeTab === 'script'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('script')}
          >
            Script Tags
          </button>
        </nav>
      </div>
    );
  };

  const renderBasicSEO = () => {
    return (
      <>
        <div>
          <label htmlFor="title" className="form-label">
            Meta Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="Enter meta title"
            {...register('title', { required: 'Meta title is required' })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Recommended length: 50-60 characters
          </p>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="form-label">
            Meta Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows="3"
            className="form-input"
            placeholder="Enter meta description"
            {...register('description', { required: 'Meta description is required' })}
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Recommended length: 150-160 characters
          </p>
        </div>
      </>
    );
  };

  const renderMetaTags = () => {
    return (
      <>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addMetaTag('name')}
          >
            Add name
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addMetaTag('property')}
          >
            Add property
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addMetaTag('http-equiv')}
          >
            Add http-equiv
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addMetaTag('charset')}
          >
            Add charset
          </button>
        </div>

        {metaFields.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No meta tags added yet. Click the buttons above to add tags.
          </div>
        ) : (
          <div className="space-y-4">
            {metaFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-md p-4 relative">
                <div className="mb-2 flex justify-between items-center">
                  <span className="font-medium">
                    {field.type === 'name' && 'Meta Name'}
                    {field.type === 'property' && 'Meta Property'}
                    {field.type === 'http-equiv' && 'Meta Http-Equiv'}
                    {field.type === 'charset' && 'Meta Charset'}
                  </span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeMeta(index)}
                  >
                    Remove
                  </button>
                </div>
                {renderMetaTagFields(field, index)}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderLinkTags = () => {
    return (
      <>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addLinkTag('canonical')}
          >
            Add canonical
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addLinkTag('icon')}
          >
            Add icon
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addLinkTag('alternate')}
          >
            Add alternate
          </button>
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={() => addLinkTag('custom')}
          >
            Add custom
          </button>
        </div>

        {linkFields.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No link tags added yet. Click the buttons above to add tags.
          </div>
        ) : (
          <div className="space-y-4">
            {linkFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-md p-4 relative">
                <div className="mb-2 flex justify-between items-center">
                  <span className="font-medium">
                    Link Tag: {field.rel || 'Custom'}
                  </span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeLink(index)}
                  >
                    Remove
                  </button>
                </div>
                {renderLinkTagFields(field, index)}
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderScriptTags = () => {
    return (
      <>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className="btn btn-secondary text-sm px-3 py-1"
            onClick={addScriptTag}
          >
            Add JSON-LD
          </button>
        </div>

        {scriptFields.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No script tags added yet. Click the button above to add a JSON-LD script.
          </div>
        ) : (
          <div className="space-y-4">
            {scriptFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-md p-4 relative">
                <div className="mb-2 flex justify-between items-center">
                  <span className="font-medium">
                    Script Tag: {field.type}
                  </span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeScript(index)}
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <textarea
                    rows="6"
                    className="form-input font-mono text-sm"
                    placeholder="JSON-LD content"
                    {...register(`scriptTags.${index}.content`)}
                  ></textarea>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter valid JSON for structured data
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'basic':
        return renderBasicSEO();
      case 'meta':
        return renderMetaTags();
      case 'link':
        return renderLinkTags();
      case 'script':
        return renderScriptTags();
      default:
        return renderBasicSEO();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {renderTabs()}
      {renderActiveTab()}

      <div className="pt-4 border-t border-gray-200 mt-8">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save SEO Settings'}
        </button>
      </div>
    </form>
  );
};

export default SEOForm; 