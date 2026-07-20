# LucidNotes

A full-stack note-taking application with real-time collaboration and sharing capabilities.

## Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js API Routes, REST API
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Editor**: TipTap (Rich Text)

## Features

- Create, edit, and delete notes with rich text formatting
- Share notes via unique tokens
- Organization and team collaboration
- User authentication and email verification
- Responsive design (mobile, tablet, desktop)
- Dark theme interface

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure environment variables (`.env`)
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/lucidnotes"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Setup database
   ```bash
   npx prisma migrate dev
   ```

5. Run development server
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── api/              # REST API endpoints
│   ├── auth/        # Authentication
│   ├── notes/       # Note CRUD
│   ├── organization/# Organization management
│   └── shared/      # Share links
├── components/       # React components
├── context/          # State management
└── (auth)/          # Auth pages

lib/
├── authOptions.ts   # NextAuth config
└── prisma.ts        # Database client

prisma/
└── schema.prisma    # Database schema
```

## API Endpoints

### Notes
- `GET /api/notes` - List user notes
- `POST /api/notes` - Create note
- `GET /api/notes/[id]` - Get note
- `PUT /api/notes/[id]` - Update note
- `DELETE /api/notes/[id]` - Delete note
- `POST /api/notes/[id]/share` - Generate share link

### Organization
- `GET /api/organization` - List organizations
- `POST /api/organization` - Create organization
- `POST /api/organization/invite` - Send invite
- `POST /api/organization/join` - Join organization

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints

### Shared Notes
- `GET /api/shared/[token]` - Access shared note

## Building

```bash
npm run build
npm start
```

## Database Schema

Key tables: User, Note, Organization, SharedNote, Invite, Account, Session

See `prisma/schema.prisma` for complete schema.

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Commit changes
git commit -m "Description"

# Push to remote
git push origin feature/feature-name
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Session encryption key |
| `NEXTAUTH_URL` | App URL (localhost for dev) |

## Troubleshooting

**Database connection error**: Check `DATABASE_URL` and ensure PostgreSQL is running

**Prisma errors**: Run `npx prisma migrate dev` to apply pending migrations

**Auth issues**: Verify `NEXTAUTH_SECRET` is set

## License

MIT
