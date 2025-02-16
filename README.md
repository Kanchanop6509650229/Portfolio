# Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-00758F)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, full-stack portfolio website built with Next.js, TypeScript, Tailwind CSS, and MySQL.

## Screenshots

> 📸 Add your screenshots here:
> - Save portfolio screenshots in `/public/screenshots/`
> - Recommended: Add images of home page, projects section, and admin dashboard
> - Suggested format:
> ```markdown
> ![Home Page](/screenshots/home.png)
> ![Projects](/screenshots/projects.png)
> ![Admin Dashboard](/screenshots/admin.png)
> ```

## Features

- 🎨 Modern UI with responsive design
- 👨‍💼 Admin dashboard for content management
- 📊 Built-in analytics tracking
- 📝 Project showcase with CRUD operations
- 📬 Contact form with message management
- 🔒 Secure authentication system
- 🎯 SEO optimized

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** MySQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your environment variables in the `.env` file.

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Project Structure

- `/src/app` - Next.js app router pages and API routes
- `/src/components` - React components
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/src/styles` - Global styles and CSS utilities

## Available Scripts

```bash
# Development
npm run dev        # Start development server with Turbopack
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint

# Database
npx prisma studio  # Open Prisma database GUI
npx prisma db push # Push schema changes to database
npm run db:seed    # Seed the database with initial data
```

## Dependencies

### Core
- Next.js 15.1
- React 19
- TypeScript 5
- MySQL2
- Prisma ORM
- NextAuth.js 4

### UI/UX
- Tailwind CSS
- Framer Motion
- React Icons
- Animate.css
- Chart.js with react-chartjs-2

### State Management & Validation
- Zustand
- Zod

## Admin Dashboard

Access the admin dashboard at `/admin`. Features include:
- Project management
- Message inbox
- Analytics dashboard
- User authentication

## Admin Dashboard Features

### Security
- Protected routes with NextAuth.js middleware
- Role-based access control (admin only)
- Secure session management
- CSRF protection
- Rate limiting on API routes

### Project Management
- Create, edit, and delete projects
- Upload project images
- Manage project visibility
- Toggle featured projects
- Bulk operations support

### Analytics Dashboard
- Visitor tracking
- Page view statistics
- Geographic data
- Device information
- Referrer tracking
- Custom date ranges

### Message Center
- Contact form submissions
- Message status management
- Email notifications
- Spam filtering
- Archive functionality

### Best Practices
- Mobile-first responsive design
- SEO optimization
- Performance monitoring
- Accessibility compliance
- Regular security updates

## Deployment

### Vercel Deployment

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Configure the following environment variables in Vercel:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET`
   - Any OAuth provider credentials if using social login

### Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL connection string |
| `NEXTAUTH_URL` | Full URL of your application |
| `NEXTAUTH_SECRET` | Random string for session security |

Optional variables (for OAuth):
- `GITHUB_ID` and `GITHUB_SECRET` for GitHub authentication
- `GOOGLE_ID` and `GOOGLE_SECRET` for Google authentication

See `.env.example` for all available options.

## Troubleshooting

### Database Connection Issues
- Ensure MySQL server is running
- Verify credentials in `.env` file
- Try running `npx prisma db push` to sync schema
- Check if database exists and create it if needed

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall dependencies
- Ensure Node.js version matches requirements
- Update dependencies: `npm update`

### Authentication Issues
- Verify NEXTAUTH_URL matches your domain
- Ensure NEXTAUTH_SECRET is set
- Check OAuth provider credentials
- Clear browser cookies and try again

### Development Tips
- Use `npx prisma studio` to manage database content
- Enable debug logs by setting `DEBUG=true` in `.env`
- Check browser console for frontend errors
- Utilize `/admin/analytics` for monitoring

For more help, please open an issue on GitHub.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
