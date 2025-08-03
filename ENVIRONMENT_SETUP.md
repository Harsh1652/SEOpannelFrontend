# Frontend Environment Setup

This guide explains how to configure environment variables for the SEO Panel Frontend.

## 📋 Environment Variables

### Required Variables

Create a `.env` file in the frontend root directory with the following variables:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BACKEND_URL=http://localhost:5000

# Environment
REACT_APP_NODE_ENV=development
```

### Variable Descriptions

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Base URL for API endpoints | `http://localhost:5000/api` | Yes |
| `REACT_APP_BACKEND_URL` | Backend URL for file access (images, uploads) | `http://localhost:5000` | Yes |
| `REACT_APP_NODE_ENV` | Environment mode | `development` | No |

## 🚀 Setup Instructions

### 1. Create Environment File

```bash
# In the frontend directory
cp .env.example .env
```

### 2. Configure for Different Environments

#### Development
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_NODE_ENV=development
```

#### Production
```env
REACT_APP_API_URL=https://your-production-api.com/api
REACT_APP_BACKEND_URL=https://your-production-api.com
REACT_APP_NODE_ENV=production
```

#### Staging
```env
REACT_APP_API_URL=https://your-staging-api.com/api
REACT_APP_BACKEND_URL=https://your-staging-api.com
REACT_APP_NODE_ENV=staging
```

## 🔧 Configuration Files

### API Configuration (`src/config/api.js`)

This file centralizes all API configuration:

```javascript
import API_CONFIG, { getApiUrl, getBackendUrl } from '../config/api';

// Get API URL for endpoints
const apiUrl = getApiUrl('/pages');

// Get backend URL for file access
const imageUrl = getBackendUrl('/uploads/image.jpg');
```

### Usage in Components

```javascript
import { getApiUrl, getBackendUrl } from '../config/api';

// For API calls
const response = await fetch(getApiUrl('/auth/login'));

// For file access
const imageUrl = getBackendUrl('/uploads/blog-image.jpg');
```

## 📁 File Structure

```
frontend/
├── .env                    # Environment variables (create this)
├── .env.example           # Example environment file
├── src/
│   ├── config/
│   │   └── api.js         # Centralized API configuration
│   ├── services/
│   │   ├── api.js         # API service (updated)
│   │   └── authAPI.js     # Auth service (updated)
│   ├── context/
│   │   └── AuthContext.js # Auth context (updated)
│   └── components/
│       └── BlogForm.jsx   # Blog form (updated)
```

## 🔄 Changes Made

### 1. Centralized Configuration
- Created `src/config/api.js` for centralized API configuration
- All hardcoded URLs now use environment variables

### 2. Updated Services
- `src/services/api.js` - Now uses environment variables
- `src/services/authAPI.js` - Now uses environment variables

### 3. Updated Components
- `src/context/AuthContext.js` - Uses environment variables for login
- `src/components/BlogForm.jsx` - Uses environment variables for image URLs

### 4. Helper Functions
- `getApiUrl(endpoint)` - Get full API URL
- `getBackendUrl(path)` - Get full backend URL for files
- `isDevelopment()` - Check if in development mode

## 🚨 Important Notes

1. **React Environment Variables**: All environment variables must start with `REACT_APP_`
2. **Restart Required**: After changing `.env` file, restart the development server
3. **Build Process**: Environment variables are embedded at build time
4. **Security**: Never commit `.env` files to version control

## 🔍 Troubleshooting

### Common Issues

1. **API calls failing**: Check `REACT_APP_API_URL` is correct
2. **Images not loading**: Check `REACT_APP_BACKEND_URL` is correct
3. **Environment not updating**: Restart the development server

### Debug Commands

```bash
# Check environment variables
echo $REACT_APP_API_URL

# Restart development server
npm run dev

# Build with production environment
npm run build
```

## 📞 Support

For issues with environment configuration, check:
1. `.env` file exists in frontend root
2. All required variables are set
3. Development server is restarted
4. Backend server is running on the configured port 