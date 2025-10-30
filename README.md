# Christian Tabernacle of Atlanta

A modern, full-featured church website built with React, TypeScript, and tRPC, featuring event management, sermon library, online donations, prayer requests, and more.

## 🌟 Features

### Core Functionality
- **Animated Hero Section** - Beautiful Bible image with Ken Burns zoom effect and background gospel music
- **Service Times Display** - Saturday 6:00 PM - 8:00 PM and Sunday 10:00 AM - 1:00 PM
- **Event Management** - Create, manage, and display upcoming church events
- **Sermon Library** - Upload and organize sermons with video/audio support
- **Online Donations** - Secure donation forms with multiple giving options
- **Prayer Requests** - Submit and view prayer requests from the community
- **Contact Forms** - Easy communication with automatic admin notifications
- **Newsletter Signup** - Build your email list for church updates
- **Staff Directory** - Showcase pastors and staff with photos and biographies
- **Admin Dashboard** - Comprehensive content management system

### Ministry Content
- **William Branham Ministry** - Dedicated section about prophetic ministry
- **Ewald Frank Ministry** - Matthew 24:45-47 ministry information
- **Biblical Foundation** - Scripture-centered content and teachings
- **Choir Gallery** - Photo showcase and embedded YouTube videos

## 🎨 Design

- **Clean White Theme** - Professional white background with sky blue accents
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- **Smooth Animations** - Engaging user experience with subtle transitions
- **Accessibility** - WCAG compliant with keyboard navigation support

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Wouter** - Lightweight routing
- **date-fns** - Date formatting utilities

### Backend
- **Express 4** - Web server framework
- **tRPC 11** - End-to-end typesafe APIs
- **Drizzle ORM** - Type-safe database queries
- **MySQL/TiDB** - Relational database
- **Manus OAuth** - Authentication system

### Development
- **Vite** - Fast build tool
- **pnpm** - Efficient package manager
- **TypeScript** - Static type checking
- **ESLint** - Code quality

## 📋 Prerequisites

- Node.js 22.x or higher
- pnpm package manager
- MySQL or TiDB database

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bertintshisuaka2/Christian_Tabernacle_Atlanta.git
cd Christian_Tabernacle_Atlanta
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database credentials and other configuration.

4. Push database schema:
```bash
pnpm db:push
```

5. Seed initial data (optional):
```bash
npx tsx scripts/seed.ts
npx tsx scripts/seed-staff.ts
```

6. Start development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
church-website/
├── client/                 # Frontend application
│   ├── public/            # Static assets
│   │   ├── bible-logo.png
│   │   └── ...
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Page components
│       ├── lib/           # Utilities and tRPC client
│       └── App.tsx        # Main application component
├── server/                # Backend application
│   ├── routers.ts         # tRPC API routes
│   ├── db.ts              # Database queries
│   └── _core/             # Core server functionality
├── drizzle/               # Database schema and migrations
│   └── schema.ts          # Table definitions
├── scripts/               # Utility scripts
│   ├── seed.ts            # Database seeding
│   └── seed-staff.ts      # Staff data seeding
└── shared/                # Shared types and constants
```

## 🔧 Configuration

### Environment Variables

Key environment variables (automatically injected by Manus platform):

- `DATABASE_URL` - MySQL/TiDB connection string
- `JWT_SECRET` - Session cookie signing secret
- `VITE_APP_ID` - Manus OAuth application ID
- `OAUTH_SERVER_URL` - Manus OAuth backend URL
- `VITE_OAUTH_PORTAL_URL` - Manus login portal URL
- `VITE_APP_TITLE` - Application title
- `VITE_APP_LOGO` - Logo image URL

### Customization

To customize the church information:

1. **Church Name & Logo**: Update in `client/src/const.ts`
2. **Contact Information**: Edit in `client/src/components/Layout.tsx` and `client/src/pages/Contact.tsx`
3. **Service Times**: Modify via admin dashboard or database
4. **Colors**: Adjust in `client/src/index.css`

## 📱 Features Guide

### Admin Access

As the project owner, you automatically have admin privileges. Access the admin dashboard by clicking the "Admin" button in the navigation menu.

### Managing Content

- **Events**: Create and manage church events with dates, times, and locations
- **Sermons**: Upload sermon recordings with titles, speakers, and scripture references
- **Prayer Requests**: Review and manage prayer submissions
- **Donations**: Track giving and donor information
- **Staff**: Add or update pastor and staff profiles
- **Service Times**: Modify worship service schedules

### Background Music

The homepage features auto-playing background music (subject to browser autoplay policies). Users can mute/unmute using the button in the top-right corner of the hero section.

## 🗄️ Database Schema

Main tables:
- `users` - User accounts and authentication
- `events` - Church events and activities
- `sermons` - Sermon library with media links
- `prayerRequests` - Prayer request submissions
- `donations` - Giving records
- `contactMessages` - Contact form submissions
- `newsletterSubscribers` - Email list
- `staff` - Pastors and staff directory
- `serviceTimes` - Worship service schedule

## 🚢 Deployment

### Using Manus Platform

1. Save a checkpoint:
   - All changes are automatically tracked
   - Create checkpoints for major milestones

2. Click the "Publish" button in the Management UI header

3. Your site will be deployed to a public URL

### Manual Deployment

The application can be deployed to any Node.js hosting platform:

1. Build the application:
```bash
pnpm build
```

2. Set environment variables on your hosting platform

3. Start the production server:
```bash
pnpm start
```

## 📞 Contact Information

**Christian Tabernacle of Atlanta**
- Address: 4350 Peachtree Industrial Blvd, Peachtree Corners, GA 30071
- Phone: (678) 979-6811
- Email: bertintshisuaka@hotmail.com

## 📖 Scripture References

The website prominently features:
- **Hebrews 13:8** - "Jesus Christ is the same yesterday, today and forever"
- **Matthew 24:14** - Gospel proclamation to all nations
- **Revelation 14:6** - The eternal gospel message

## 🤝 Contributing

This is a church website project. For suggestions or issues, please contact the church administration.

## 📄 License

Copyright © 2025 Christian Tabernacle of Atlanta. All rights reserved.

## 🙏 Acknowledgments

- Built with [Manus](https://manus.im) - AI-powered web development platform
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**For technical support or questions about the website, please contact the church office.**

