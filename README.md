# Interactive Card

An interactive credit card form built with Next.js and React. Users can enter card details and see a live preview of the card, with validation and error messages for incorrect input.

## Features
- Live card preview updates as you type
- Input validation for card number, name, expiry date, and CVC
- Responsive design using Tailwind CSS
- Success message on valid submission

## Technologies Used
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm (or npm/yarn)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abuchi-ude/Interactive-Card.git
   cd Interactive-Card
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
interactive-card/
├── public/           # Static assets (images, icons)
├── src/app/          # Main app code (pages, layout, styles)
│   ├── page.tsx      # Interactive card component
│   ├── layout.tsx    # Root layout
│   └── globals.css   # Global styles
├── package.json      # Project metadata and scripts
├── README.md         # Project documentation
└── ...
```

## Customization
- Update styles in `src/app/globals.css`.
- Modify card preview and form logic in `src/app/page.tsx`.

## License
This project is licensed under the MIT License.
