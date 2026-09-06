# MythosMatch • [Click here to try it!](https://codeflare-2-0.vercel.app)

Built under 3 hours for the CODEFLARE 2.0 Website Development Challenge on the subject of **_Mythology and Folklore_**. 

![Main Screenshot](/assets/main-screenshot.png)

## Overview

MythosMatch is a fast, interactive quiz experience designed to feel premium and immersive. It blends a cinematic landing screen, animated transitions, and a clear storytelling flow that turns a simple personality test into a game-like discovery experience.

The app asks 7 questions, stores the selections in local storage, calculates the highest-scoring deity, and presents a result screen with the matched god’s image, culture, powers, and personality description.

## Key features

- Mythological personality matching across Greek, Norse, and Egyptian deities
- 7-question quiz with weighted scoring logic
- Smooth motion-driven transitions between screens
- Responsive layout for desktop and mobile devices
- Final result screen with deity card and supporting lore text
- Retake flow to replay the quiz instantly

## How it works

1. The user starts on the home screen and begins the quiz.
2. Each question presents multiple answer choices with weighted values tied to specific gods.
3. Answers are saved locally in the browser so the experience persists naturally across navigation.
4. On the final page, the app tallies the selected option weights and selects the deity with the highest score.
5. The result page reveals the matched god with a visual card, powers, and personality summary.

## Tech stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Radix UI primitives
- Motion (formerly Framer Motion)

## Running it locally

### Prerequisites

- Node.js 20+
- npm or pnpm

### Install dependencies

```bash
npm install
```

### Build the app

```bash
npm run build
```

### Run the app

```bash
npm start
```

Then open:

```text
http://localhost:3000
```
