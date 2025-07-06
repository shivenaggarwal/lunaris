# Lunaris

> _"What if building apps was as easy as just... asking for them?"_

**Lunaris** is an AI-powered app builder that turns your wildest ideas into production-ready Next.js apps. Just describe what you want, and watch the magic happen in real-time.

## What Does It Do?

- **Chat to Code**: Describe your app in plain English
- **Instant Preview**: Watch your app come to life in seconds
- **Full-Stack Magic**: Complete with UI, interactions, and file structure
- **Iterate Fast**: Refine and modify with follow-up messages
- **Production Ready**: Built with Next.js 15, TypeScript, and Tailwind

## Quick Start

```bash
# Clone the chaos
git clone https://github.com/shivenaggarwal/lunaris.git
cd lunaris

# Install the magic
npm install

# Set up your environment
cp .env.example .env.local
# Fill in your secrets (you know the drill)

# Generate the database
npx prisma generate
npx prisma db push

# Launch into orbit
npm run dev
```

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI
- **Database**: PostgreSQL + Prisma
- **Auth**: Clerk
- **AI**: Multi-agent system with OpenAI
- **Sandboxing**: E2B for safe code execution
- **Background Jobs**: Inngest

## Example Prompts

- _"Build a Netflix clone with dark mode"_
- _"Create a kanban board with drag and drop"_
- _"Make an admin dashboard with charts"_
- _"Build a file manager with folders"_

## How It Works

1. **Chat**: Tell Lunaris what you want to build
2. **Generate**: AI agents collaborate to write your app
3. **Preview**: See your app running live in seconds
4. **Iterate**: Refine with natural language feedback
5. **Deploy**: Export and ship your creation

## Project Structure

```
src/
├── app/
├── components/
├── modules/
├── inngest/
├── trpc/
└── lib/
```

## Features

- **Real-time Collaboration**: Multi-agent AI system
- **Live Previews**: Instant visual feedback
- **Code Explorer**: Dive into generated source
- **Usage Tracking**: Credit system with pro tiers
- **Template Library**: Quick-start options

## Contributing

Found a bug? Have a wild idea?

1. Fork it
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - Go wild, build amazing things!

---

_Built with love and excessive amounts of caffeine_
