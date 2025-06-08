
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ReSearchBench is a benchmarking platform that evaluates agentic search and deep research capabilities of AI models. It's built as a Docusaurus-based static documentation website with interactive data visualization for presenting benchmark results.

## Development Commands

Navigate to the `docs/` directory before running these commands:

```bash
cd docs/

# Development
npm start          # Start local development server with hot reload
npm run build      # Generate static production build  
npm run serve      # Serve production build locally
npm run clear      # Clear Docusaurus cache
npm run deploy     # Deploy to GitHub Pages
```

## Architecture

- **Framework**: Docusaurus 3.8.0 with React 19.0.0
- **Visualization**: Recharts library for interactive charts
- **Data**: Benchmark scores stored in `docs/src/data/benchmarkData.js`
- **Components**: Main chart component at `docs/src/components/ResearchBenchmarkChart/`
- **Styling**: CSS Modules + custom CSS overrides

## Key Components

- `docs/src/pages/index.js` - Homepage with benchmark visualization
- `docs/src/components/ResearchBenchmarkChart/index.js` - Interactive bar chart component
- `docs/src/data/benchmarkData.js` - Model performance data
- `docs/docusaurus.config.js` - Docusaurus configuration for GitHub Pages deployment

## Data Structure

Benchmark data follows this format:
```javascript
{ model: 'Model Name', score: number, decimal: number, color: 'hex' }
```

## Deployment

Configured for GitHub Pages deployment to `han.github.io/ReSearchBench/` with base URL `/ReSearchBench/`.