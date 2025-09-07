# RightsGuard AI

**Understand and Assert Your Legal Rights Instantly**

A Base Mini App that provides clear, actionable 'Know Your Rights' cards and AI-powered tools for users facing common legal interactions.

## 🚀 Features

### Core Features
- **Interactive Rights Cards**: Mobile-first, one-page guides with shareable links, offline access, and printable PDFs
- **AI-Powered Scripts**: Generates tailored scripts and interactive checklists for critical interactions
- **Legal Aid Integration**: Connects users with verified local legal aid organizations
- **Multilingual Support**: Rights information available in multiple languages
- **Localized Content**: Legal information tailored to specific jurisdictions

### Technical Features
- **Production-Ready**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Base Mini App**: Optimized for Farcaster ecosystem with MiniKit integration
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Real-time Data**: React Query for efficient data fetching and caching
- **Toast Notifications**: User-friendly feedback system
- **PDF Generation**: On-demand PDF creation for rights cards

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query (TanStack Query)
- **Database**: Supabase (PostgreSQL)
- **AI**: OpenAI API via Vercel AI SDK
- **Blockchain**: Base network integration via OnchainKit
- **Storage**: IPFS via Pinata for decentralized content
- **Notifications**: React Hot Toast

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.local` and add your API keys:
   ```bash
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_key
   OPENAI_API_KEY=your_openai_key
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main application page
├── providers.tsx      # MiniKit provider setup
├── globals.css        # Global styles and design system
└── api/
    └── generate-script/ # AI script generation endpoint

components/
├── AppShell.tsx       # Main app layout
├── RightsCardView.tsx # Rights card display
├── AiScriptGenerator.tsx # AI script generation
├── LegalAidDirectory.tsx # Legal aid listings
└── FAB.tsx           # Floating action button

lib/
├── types.ts          # TypeScript type definitions
├── constants.ts      # App constants and data
└── utils.ts          # Utility functions
```

## Key Components

### Rights Cards
Interactive cards providing clear legal guidance for specific scenarios like traffic stops, workplace disputes, and housing issues.

### AI Script Generator
Generates personalized scripts, checklists, and templates using OpenAI to help users communicate effectively in legal situations.

### Legal Aid Integration
Directory of verified legal aid organizations with contact information and jurisdiction-specific resources.

## Design System

The app uses a professional, accessible design system with:
- **Primary Color**: `hsl(209 63% 49%)` (Professional blue)
- **Typography**: Inter font with semantic sizing
- **Components**: Glass morphism cards with subtle shadows
- **Motion**: Smooth transitions with appropriate durations

## Legal Disclaimer

This application provides legal information for educational purposes only. It is not a substitute for professional legal advice. Always consult with a qualified attorney for legal advice specific to your situation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
