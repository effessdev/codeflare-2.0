import type { StaticImageData } from "next/image"

import aresImage from "@/app/assets/ares.jpg"
import athenaImage from "@/app/assets/athena.jpg"
import freyaImage from "@/app/assets/freya.jpg"
import odinImage from "@/app/assets/odin.jpg"
import raImage from "@/app/assets/ra.jpg"
import thorImage from "@/app/assets/thor.jpg"
import zeusImage from "@/app/assets/zeus.jpg"

export type GodId =
  "zeus" | "athena" | "ares" | "odin" | "thor" | "freya" | "ra" | "isis"

export type God = {
  id: GodId
  name: string
  culture: string
  powers: string[]
  description: string
  image: StaticImageData
}

export type QuizOption = {
  id: string
  label: string
  weights: Partial<Record<GodId, number>>
}

export type Question = {
  id: number
  prompt: string
  options: QuizOption[]
}

export const gods: God[] = [
  {
    id: "zeus",
    name: "Zeus",
    culture: "Greek",
    powers: ["Thunderbolt control", "Sky dominance", "Commanding presence"],
    description:
      "You lead with confidence, energy, and the kind of calm authority that makes others instinctively trust your judgment.",
    image: zeusImage,
  },
  {
    id: "athena",
    name: "Athena",
    culture: "Greek",
    powers: ["Strategic wisdom", "Battle insight", "Disciplined thinking"],
    description:
      "You think clearly, solve problems with purpose, and bring a steady blend of intelligence and composure to every challenge.",
    image: athenaImage,
  },
  {
    id: "ares",
    name: "Ares",
    culture: "Greek",
    powers: ["Fierce courage", "Combat passion", "Bold action"],
    description:
      "You move through life with intensity, instinct, and fearless determination, often charging forward before others catch up.",
    image: aresImage,
  },
  {
    id: "odin",
    name: "Odin",
    culture: "Norse",
    powers: ["Sacrificial wisdom", "Mystic insight", "Raven knowledge"],
    description:
      "You are thoughtful, ambitious, and endlessly curious—always searching for meaning, strategy, and the next deep truth.",
    image: odinImage,
  },
  {
    id: "thor",
    name: "Thor",
    culture: "Norse",
    powers: ["Storm strength", "Protective energy", "Unshakable heart"],
    description:
      "You are loyal, brave, and naturally protective, bringing fearless strength and warmth to the people around you.",
    image: thorImage,
  },
  {
    id: "freya",
    name: "Freya",
    culture: "Norse",
    powers: ["Magnetic charm", "Emotional intuition", "Loyal devotion"],
    description:
      "You carry beauty, depth, and emotional intelligence, often leading with empathy while still knowing exactly what you want.",
    image: freyaImage,
  },
  {
    id: "ra",
    name: "Ra",
    culture: "Egyptian",
    powers: ["Solar authority", "Radiant confidence", "Creation energy"],
    description:
      "You shine with purpose and self-possession, drawing people in with a mix of confidence, leadership, and quiet power.",
    image: raImage,
  },
  {
    id: "isis",
    name: "Isis",
    culture: "Egyptian",
    powers: ["Magic intuition", "Healing wisdom", "Emotional mastery"],
    description:
      "You are compassionate, perceptive, and quietly influential, using intuition and care to guide the people you love.",
    image: raImage,
  },
]

export const questionBank: Question[] = [
  {
    id: 1,
    prompt: "When a group project gets chaotic, what do you do first?",
    options: [
      {
        id: "a",
        label: "Take charge and assign roles",
        weights: { zeus: 2, ra: 2 },
      },
      {
        id: "b",
        label: "Listen, then plan the smartest path",
        weights: { athena: 2, odin: 1 },
      },
      {
        id: "c",
        label: "Jump in and fuel the momentum",
        weights: { ares: 2, thor: 1 },
      },
      {
        id: "d",
        label: "Sense the mood and steady everyone",
        weights: { freya: 2, isis: 2 },
      },
    ],
  },
  {
    id: 2,
    prompt: "Which setting feels most like home to you?",
    options: [
      {
        id: "a",
        label: "A grand hall with everyone looking to me",
        weights: { zeus: 2, ra: 2 },
      },
      {
        id: "b",
        label: "A library or quiet thinking space",
        weights: { athena: 2, odin: 1 },
      },
      {
        id: "c",
        label: "A battlefield or making things happen",
        weights: { ares: 2, thor: 1 },
      },
      {
        id: "d",
        label: "A ritual room filled with emotion and meaning",
        weights: { freya: 2, isis: 1, ra: 1 },
      },
      {
        id: "e",
        label: "A stormy cliff where I can think clearly",
        weights: { thor: 2, odin: 1 },
      },
    ],
  },
  {
    id: 3,
    prompt: "Your ideal weekend?",
    options: [
      {
        id: "a",
        label: "Leading an adventure with friends",
        weights: { zeus: 2, thor: 1, ra: 1 },
      },
      {
        id: "b",
        label: "Learning, reflecting, and improving",
        weights: { athena: 2, odin: 2 },
      },
      {
        id: "c",
        label: "Challenge, competition, and physical intensity",
        weights: { ares: 2, thor: 2 },
      },
      {
        id: "d",
        label: "Connection, beauty, and deep conversation",
        weights: { freya: 2, isis: 2 },
      },
    ],
  },
  {
    id: 4,
    prompt: "What kind of challenge excites you most?",
    options: [
      {
        id: "a",
        label: "A test of courage and nerve",
        weights: { ares: 2, thor: 2, zeus: 1 },
      },
      {
        id: "b",
        label: "A puzzle that needs strategy",
        weights: { athena: 2, odin: 2, isis: 1 },
      },
      {
        id: "c",
        label: "Something that lets me protect others",
        weights: { isis: 2, ra: 2, freya: 1 },
      },
    ],
  },
  {
    id: 5,
    prompt: "How do you respond to conflict?",
    options: [
      {
        id: "a",
        label: "Stand firm and take control",
        weights: { zeus: 2, ra: 2 },
      },
      {
        id: "b",
        label: "Analyze the angles and seek a fair fix",
        weights: { athena: 2, odin: 1 },
      },
      {
        id: "c",
        label: "Face it head-on with raw energy",
        weights: { ares: 2, thor: 2 },
      },
      {
        id: "d",
        label: "Use empathy and calm to heal the tension",
        weights: { freya: 2, isis: 2 },
      },
      {
        id: "e",
        label: "Read the deeper motive behind it",
        weights: { odin: 2, isis: 1 },
      },
    ],
  },
  {
    id: 6,
    prompt: "What quality do people most often admire in you?",
    options: [
      {
        id: "a",
        label: "Your confidence and presence",
        weights: { zeus: 2, ra: 2 },
      },
      {
        id: "b",
        label: "Your wisdom and calm judgment",
        weights: { athena: 2, odin: 1 },
      },
      {
        id: "c",
        label: "Your courage and drive",
        weights: { ares: 2, thor: 1 },
      },
      {
        id: "d",
        label: "Your intuition and compassion",
        weights: { freya: 2, isis: 2 },
      },
      {
        id: "e",
        label: "Your wit and depth of thought",
        weights: { freya: 2, odin: 1, athena: 1 },
      },
    ],
  },
  {
    id: 7,
    prompt: "Which trait do you value most in a leader?",
    options: [
      {
        id: "a",
        label: "Authority and vision",
        weights: { zeus: 2, ra: 2 },
      },
      {
        id: "b",
        label: "Wisdom and strategy",
        weights: { odin: 2, athena: 1, zeus: 1 },
      },
      {
        id: "c",
        label: "Bravery and action",
        weights: { ares: 2, thor: 2 },
      },
      {
        id: "d",
        label: "Compassion and intuition",
        weights: { freya: 1, isis: 1 },
      },
    ],
  },
]
