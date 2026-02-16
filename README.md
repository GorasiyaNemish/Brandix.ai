# Brandix.ai - AI-Powered Brand Kit Generator

Generate complete brand identities instantly using AI. Get brand names, taglines, color palettes, mission statements logo and brand images.

Try it out [here](https://brandix-ai-tau.vercel.app/)

## 🚀 Features

- **AI-Powered Generation**: Uses Llama 3.3 (70B) via Groq Cloud for ultra-fast brand creation
- **Complete Brand Kits**: Brand name, tagline, mission, personality keywords, color palette, and logo
- **AI Image Generation**: Pollinations.ai integration for logos and custom brand images
- **Secure API Proxy**: API keys kept secure on the server side
- **Modern UI**: Glassmorphism design with smooth animations
- **Instant Preview**: See your brand come to life in real-time
- **Custom Images**: Generate up to 3 brand-relevant images with your brand's style
- **Download as ZIP**: Export complete brand kit with all assets

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (App Router) with TypeScript
- **Styling**: Vanilla CSS with modern design system
- **AI Text**: Groq Cloud (Llama 3.3-70B) - Free tier available
- **AI Images**: Pollinations.ai - Free tier with daily credits
- **Validation**: Zod for schema validation

## 📋 Prerequisites

- Node.js 18+ and npm/pnpm
- **Groq Cloud API key** (free at [console.groq.com](https://console.groq.com))
- **Pollinations.ai API key** (free at [enter.pollinations.ai](https://enter.pollinations.ai))

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

Edit `.env.local` and add your API keys:

```env
# Groq API key for text generation
GROQ_API_KEY=your_groq_api_key_here

# Pollinations.ai API key for image generation
POLLINATIONS_API_KEY=your_pollinations_api_key_here
```

**Get your free API keys:**

#### Groq Cloud (Text Generation)
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Create an API key
4. Paste it in `.env.local`

#### Pollinations.ai (Image Generation)
1. Visit [enter.pollinations.ai](https://enter.pollinations.ai)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Paste it in `.env.local`
5. You get daily "Pollen" credits that reset every 24 hours

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
3. Add environment variables:
   - `GROQ_API_KEY`
   - `POLLINATIONS_API_KEY`
4. Deploy

### Other Platforms

Build the production bundle:

```bash
npm run build
npm start
```

Make sure to set both environment variables on your hosting platform.

## 🆓 Free Tier Limits

- **Groq Cloud**: 14,400 requests/day (free tier)
- **Pollinations.ai**: Daily "Pollen" credits (resets every 24 hours)
- **Next.js**: Deploy free on Vercel

## 🐛 Troubleshooting

### "GROQ_API_KEY not set" error
- Make sure `.env.local` exists with your API key
- Restart the dev server after adding the key

### "API key not configured" for images
- Make sure `POLLINATIONS_API_KEY` is set in `.env.local`
- Get your free API key from [enter.pollinations.ai](https://enter.pollinations.ai)
- Restart the dev server after adding the key

### Images not loading / 400 Bad Request
- Check that your Pollinations API key is valid
- Verify you have Pollen credits remaining (check dashboard)
- Try regenerating the image

### Logo not loading
- Check internet connection
- Verify `POLLINATIONS_API_KEY` is set correctly
- Try regenerating the brand kit

### JSON parsing errors
- The AI occasionally returns invalid JSON
- Click "Generate" again for a new result

### Out of Pollen credits
- Pollinations.ai provides daily free credits
- Credits reset every 24 hours
- Check your dashboard at [enter.pollinations.ai](https://enter.pollinations.ai)

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
