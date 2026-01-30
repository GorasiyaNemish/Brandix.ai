# Brandix.ai - AI-Powered Brand Kit Generator

Generate complete brand identities instantly using AI. Get brand names, taglines, color palettes, mission statements logo and brand images.

Try it out [here](https://brandix-ai-tau.vercel.app/)

## 🚀 Features

- **AI-Powered Generation**: Uses Llama 3.3 (70B) via Groq Cloud for ultra-fast brand creation
- **Complete Brand Kits**: Brand name, tagline, mission, personality keywords, color palette, and logo
- **Free Image Generation**: Pollinations.ai integration (no API key needed)
- **Modern UI**: Glassmorphism design with smooth animations
- **Instant Preview**: See your brand come to life in real-time
- **Copy & Download**: Easy export of logo and brand kit images

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router) with TypeScript
- **Styling**: Vanilla CSS with modern design system
- **AI Text**: Groq Cloud (Llama 3.3-70B) - Free tier available
- **AI Images**: Pollinations.ai - Completely free, no API key
- **Validation**: Zod for schema validation

## 📋 Prerequisites

- Node.js 18+ and npm
- Groq Cloud API key (free at [console.groq.com](https://console.groq.com))

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd brandix-ai
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

**Get your free Groq API key:**
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Create an API key
4. Paste it in `.env.local`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

1. **Enter Business Description**: Describe your business idea in 10-1000 characters
2. **Generate**: Click "Generate Brand Kit" and wait 3-5 seconds
3. **Preview**: Review your complete brand identity
4. **Export**: Download ZIP file

## 🎨 Customization

### Modify AI Prompts

Edit `lib/groq.ts` to customize the brand generation prompt and adjust creativity/consistency.

### Change Design Theme

Edit `app/globals.css` to modify colors, fonts, spacing, and animations.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add `GROQ_API_KEY` environment variable
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

## 🆓 Free Tier Limits

- **Groq Cloud**: 14,400 requests/day (free tier)
- **Pollinations.ai**: Unlimited, no API key required
- **Next.js**: Deploy free on Vercel

## 🐛 Troubleshooting

### "GROQ_API_KEY not set" error
- Make sure `.env.local` exists with your API key
- Restart the dev server after adding the key

### Logo not loading
- Check internet connection
- Pollinations.ai may be temporarily slow
- Try regenerating the brand kit

### JSON parsing errors
- The AI occasionally returns invalid JSON
- Click "Generate" again for a new result

## 📝 License

MIT License - feel free to use for personal or commercial projects. Don't forget to credit Brandix.ai 😜.

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

## 🔗 Links

- [Groq Cloud](https://console.groq.com)
- [Pollinations.ai](https://pollinations.ai)
- [Next.js Docs](https://nextjs.org/docs)

---

Built with ❤️ By Nemish Gorasiya
