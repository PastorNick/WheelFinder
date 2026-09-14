## Getting Started

The simplest way to get the web app going:

```bash
npm run dev
```

Alternatively, if you want to build and then run it:

```bash
npm run build
npm run start
```

## Structure of the Project

I started by thinking of a basic architecture for this that I came up with without using any AI.

I always like to have a full understanding of the basic pattern down in my head before using any AI tools. I've found that building the foundation myself helps me stay close to the project without risking too much cognitive debt.

The basic architecture is as follows:

### Home Page (`page.tsx`)

This page serves as the primary orchestration layer. It houses most of the state management such that all of the filtering and sorting input from the users is centralized into one place. Otherwise, multiple copies of the filter state would have to be maintained in order for the wheel grid to know what happens when a user interacts with a filter, given that they are two separate components.

### Filter Bar (`filterBar.tsx`)

This component powers the UI dropdowns and checkboxes that allow users to filter the different options like diameter, width, offset, etc.

### Wheel Grid (`wheelGrid.tsx`)

This component allows an arbitrary number of wheel card components to be displayed on the page in a grid fashion.

### Card Component (`card.tsx`)

This component represents a reusable and configurable UI card that displays each individual wheel image and its accompanying information (Size, Offset, Bolt Pattern, etc.).

### `wheels.ts`

A TypeScript representation of the `wheels.json` data. The dataset that provides the information for what the UI displays.

## Challenges

There were a few challenges to overcome in this project, mostly relating to handling inconsistencies and other quirks found in the dataset.

The first one I noticed was that `weight_lb` was null in most cases. I handled that one by simply displaying it in the UI when there's an actual value and hiding it when it's null.

The second one I noticed was that all of the values in the data, including things like diameter and price, etc., were stored as strings. This presents some problems, especially when considering sorting, where you have to parse out things like dollar signs and commas, then convert the strings to the numbers before successful sorting can be accomplished.

The final primary challenge to overcome was the fact that 3 of the image URLs were returning 404 errors. So having a graceful way to handle that error when it happens is imperative. My solution was to simply display a message that says "Image Unavailable" in the spot where the image would have otherwise appeared.

## What Could be Improved

I did not have enough time to get to the portion that incorporated the `tires.json` dataset and displaying a summary of the wheel and tire packages. So that would be good to include.

Some more enhancements that could be made with more time include creating more reusable UI components for things like the clear all filters button or the multi-select filter dropdown.
