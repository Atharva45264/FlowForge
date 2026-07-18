export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  content: string;
}

export const PAGE_TEMPLATES: PageTemplate[] = [
  {
    id: "blank",
    name: "Blank Page",
    description: "Start from scratch",
    icon: "📄",
    content: "",
  },

  {
    id: "meeting",
    name: "Meeting Notes",
    description: "Capture discussions and action items",
    icon: "📝",
    content: `# Meeting Notes

## Agenda

-

## Discussion

-

## Action Items

- [ ]

## Decisions

-

## Next Meeting

-`,
  },

  {
    id: "project",
    name: "Project Plan",
    description: "Plan and organize a project",
    icon: "🚀",
    content: `# Project Plan

## Objective

-

## Timeline

-

## Milestones

- [ ]

## Risks

-

## Resources

-`,
  },

  {
    id: "journal",
    name: "Daily Journal",
    description: "Track your day",
    icon: "📔",
    content: `# Daily Journal

## Today

-

## Highlights

-

## Challenges

-

## Tomorrow

-`,
  },

  {
    id: "brainstorm",
    name: "Brainstorm",
    description: "Capture ideas",
    icon: "💡",
    content: `# Brainstorm

## Ideas

-

## Opportunities

-

## Notes

-`,
  },

  {
    id: "docs",
    name: "Documentation",
    description: "Technical documentation",
    icon: "📚",
    content: `# Documentation

## Overview

-

## Installation

-

## Usage

-

## API

-

## Notes

-`,
  },
];