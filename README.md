# Sacred Pokémon Bestiary

A Next.js 15 application that serves as a digital compendium of Pokémon creatures. This application allows users to "catch" Pokémon, which are then fetched from an external API, validated, and stored in a PostgreSQL database. Users can then view their collection, sorted and displayed by Pokémon type.

## Features

- **Catch Pokémon**: Interactively add new Pokémon to your collection.
- **External API Integration**: Fetches detailed Pokémon data from the PokeAPI.
- **Data Validation**: Uses Zod to ensure data integrity before database insertion.
- **Database Storage**: Leverages Prisma ORM to interact with a PostgreSQL database.
- **Server Actions**: Modern Next.js data mutations and fetching are handled via Server Actions.
- **Categorized Display**: View your collected Pokémon categorized by their elemental types.
- **Detailed View**: Access a dedicated page for each Pokémon with comprehensive information.
- **Responsive UI**: Built with Tailwind CSS and Shadcn/ui components for a clean and modern interface.

## Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Validation**: Zod
- **UI Components**: Shadcn/ui
- **Styling**: Tailwind CSS

## Project Setup

Follow these steps to get the Sacred Pokémon Bestiary running on your local machine.

### 1. Prerequisites

- Node.js (v18.x or later recommended)
- npm or yarn (or pnpm)
- Git

### 2. Install Dependencies

Install the project dependencies using your preferred package manager:

```bash
npm install
# or
# yarn install
# or
# pnpm install
```


### 3. Running the Application

Start the Next.js development server:

```bash
npm run dev
# or
# yarn dev
# or
# pnpm dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

### 8. Using the Application

- **Homepage**: You'll find a "Catch a Pokémon" button. Clicking this will fetch a random Pokémon that you haven't caught yet, retrieve its details from PokeAPI, and save it to your database.
- **View Bestiary**: After catching some Pokémon, click the "View Bestiary" button (or navigate to `/pokemon`) to see your collection. Pokémon are grouped by their types.
- **Pokémon Details**: Click on any Pokémon card in the bestiary to see its detailed page.

## Database Management with Prisma Studio (This allows you to see the data in the db)

Prisma Studio is a visual editor for your database. You can use it to browse, query, and edit data directly.

To open Prisma Studio:

```bash
npx prisma studio
```

This will typically open the studio in your browser at `http://localhost:5555`.

This README provides a comprehensive guide to setting up, running, and managing the Sacred Pokémon Bestiary application.
