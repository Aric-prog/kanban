# Kanban

Simple note-taking application made using Node and Svelte.

![Kanban Board Screenshot](./screenshot.png)

## Prerequisites

- Node.js >= 20.6.0
- PostgreSQL database

## Technologies Used

- Express.js - Web framework
- TypeScript - Programming language
- PostgreSQL - Database
- JSON Web Token (JWT) - Authentication
- Morgan - HTTP request logger

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Aric-prog/kanban.git
cd kanban
```

2. Install dependencies:

```bash
cd ./frontend
npm install
cd ../backend
npm install
```

3. Run postgresql instance with `docker compose up -d` on the backend folder or externally
4. Create a `.env` file in the backend directory using the template file `.env.template`
5. Replace `ROOT_URL` value in `frontend/src/constants.ts`

## Running the Application

### Development Mode

To run the application in development mode with hot reloading:

Backend:

```bash
npm run dev
```

Frontend:

```bash
npm run dev
```

### Production Mode

For Windows:

Backend:

```bash
npm run start_win
```

For Linux/MacOS:

```bash
npm run start_nix
```

Frontend:

```bash
npm run build
```

Production build is located in `frontend/dist`. `index.html` can be served either through a reverse proxy or as static files from `backend/public`

## Scripts

Backend:

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Compile TypeScript code
- `npm run start_win` - Start production server on Windows
- `npm run start_nix` - Start production server on Linux/MacOS

Frontend:

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Compile svelte application
