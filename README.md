# SEO Panel Frontend

A React-based frontend application for managing SEO content for Balaji Exports website.

## 🚀 Features

- **Modern React App**: Built with React 18 and modern hooks
- **Tailwind CSS**: Beautiful, responsive UI design
- **Authentication System**: JWT-based login/logout functionality
- **SEO Management**: CRUD operations for pages and blogs
- **Rich Text Editor**: Quill editor for blog content
- **File Upload**: Image upload support for blog posts
- **Environment Configuration**: Flexible API configuration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see backend repository)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh1652/SEOpannelFrontend.git
   cd SEOpannelFrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_BACKEND_URL=http://localhost:5000
   
   # Environment
   REACT_APP_NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 📚 Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (not recommended)
npm run eject
```

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static files
├── src/
│   ├── components/         # Reusable components
│   │   ├── Layout/        # Layout components
│   │   ├── BlogForm.jsx   # Blog creation/editing
│   │   ├── Login.jsx      # Authentication
│   │   └── SEOForm.jsx    # SEO management
│   ├── config/
│   │   └── api.js         # API configuration
│   ├── context/
│   │   └── AuthContext.js # Authentication context
│   ├── pages/             # Page components
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── PagesList.jsx  # SEO pages list
│   │   └── BlogCreate.jsx # Blog management
│   ├── services/          # API services
│   │   ├── api.js         # Main API service
│   │   └── authAPI.js     # Authentication API
│   ├── App.js             # Main app component
│   └── index.js           # Entry point
├── .env                   # Environment variables
├── package.json           # Dependencies
└── tailwind.config.js     # Tailwind configuration
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Base URL for API endpoints | `http://localhost:5000/api` | Yes |
| `REACT_APP_BACKEND_URL` | Backend URL for file access | `http://localhost:5000` | Yes |
| `REACT_APP_NODE_ENV` | Environment mode | `development` | No |

### API Configuration

The app uses a centralized API configuration in `src/config/api.js`:

```javascript
import { getApiUrl, getBackendUrl } from '../config/api';

// For API calls
const response = await fetch(getApiUrl('/auth/login'));

// For file access
const imageUrl = getBackendUrl('/uploads/image.jpg');
```

## 🎨 UI Components

### Layout Components
- **Header**: Navigation and user info
- **Sidebar**: Menu navigation
- **MainLayout**: Overall page structure

### Form Components
- **BlogForm**: Rich text editor for blog posts
- **SEOForm**: SEO metadata management
- **Login**: Authentication form

### Page Components
- **Dashboard**: Main overview
- **PagesList**: SEO pages management
- **BlogCreate**: Blog creation/editing

## 🔐 Authentication

The app uses JWT-based authentication:

- **Login**: User authentication
- **Protected Routes**: Role-based access
- **Token Management**: Automatic token handling
- **Logout**: Secure session termination

## 📱 Responsive Design

Built with Tailwind CSS for responsive design:
- Mobile-first approach
- Responsive breakpoints
- Modern UI components
- Accessibility features

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Configuration
For production, update `.env`:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
REACT_APP_BACKEND_URL=https://your-backend-url.com
REACT_APP_NODE_ENV=production
```

### Deploy to Platforms
- **Vercel**: Automatic deployment from GitHub
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Static hosting
- **AWS S3**: Static website hosting

## 🔍 Development

### Local Development
```bash
# Start development server
npm start

# Open http://localhost:3000
```

### Code Structure
- **Components**: Reusable UI components
- **Pages**: Route-specific components
- **Services**: API communication
- **Context**: Global state management
- **Config**: Environment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Balaji Exports.

## 📞 Support

For support, contact the development team.

## 🔗 Related Repositories

- **Backend**: [BalajiExportSeoPannelBackend](https://github.com/Harsh1652/BalajiExportSeoPannelBackend)
- **Main Website**: [Balaji Exports Website](https://github.com/Harsh1652/BalajiExports)
