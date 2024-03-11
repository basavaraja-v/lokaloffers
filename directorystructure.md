src/
|-- app/
|   |-- layout.tsx       # Your main layout component
|   |-- page.tsx         # A sample page component
|-- components/          # Reusable components
|   |-- Header/
|   |   |-- Header.tsx
|   |   |-- header.module.css (if you prefer CSS modules over Tailwind)
|   |-- Footer/
|   |   |-- Footer.tsx
|   |   |-- footer.module.css (ditto)
|   |-- DealCard/
|   |   |-- DealCard.tsx
|   |   |-- dealCard.module.css (ditto)
|   |-- SearchBar/
|   |   |-- SearchBar.tsx
|   |   |-- searchBar.module.css (ditto)
|-- pages/               # Pages for your Next.js app
|   |-- index.tsx        # Home page
|   |-- deals/
|   |   |-- [id].tsx     # Dynamic page for individual deals
|-- public/              # Static files
|   |-- favicon.ico
|   |-- images/
|   |   |-- ...          # Static images
|-- styles/              # Global styles
|   |-- globals.css      # Tailwind CSS entry point
|-- types/               # TypeScript types and interfaces
|   |-- index.ts         # Centralized type definitions
|-- utils/               # Utility functions
|   |-- api.ts           # Mock API calls or utility functions
|-- data/                # Static data (optional for MVP)
|   |-- deals.json       # Mock data file



as of now use below:
Structure

[Shop Name] (Large font, Bold)
Deal Headline: (Slightly smaller font, still prominent. Color could be used here.)
Description: 1-2 sentences maximum, providing essential details (discount, restrictions).
Expiration Date: Clear and visible. You could highlight if the deal expires soon (e.g., "Ends Today!")
Call to Action: Short and direct "Visit Store" with location icon