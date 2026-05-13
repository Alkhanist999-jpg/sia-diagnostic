# SIA Stability Diagnostic

This is a standalone HTML, CSS, and JavaScript diagnostic for Workshop 1 of SIA Year 3. It uses a 19-question forced-choice pressure mapping model to show founder dependency, structural gaps, pressure distribution, and top priority pillars across the six SIA pillars.

## How to run locally

1. Open `/Users/alkhami/codex/index.html` in a browser.
2. Complete the participant details form.
3. Answer all diagnostic questions.
4. Review the results screen and use the export buttons if needed.

## How scoring works

- The app uses four choices only: `A`, `B`, `C`, `D`.
- Each pillar uses three question roles:
  - Founder Load
  - Capacity
  - Pressure Behaviour
- Score maps:
  - Founder Load: `A=4`, `B=3`, `C=2`, `D=1`
  - Capacity: `A=1`, `B=2`, `C=3`, `D=4`
  - Pressure Behaviour: `A=4`, `B=3`, `C=2`, `D=1`
- Composite Load = `(Founder Load + Pressure Behaviour) / 2`
- Gap = `Composite Load - Capacity`
- Priority Score = `(Gap × 2) + Composite Load`
- If anchor question `Q19` is answered `A` or `B`, the app adds `+1` to all Composite Load scores.
- Status rules:
  - Pressure Hotspot: gap `>= 1.5`
  - Emerging Pressure: gap `0.5–1.4`
  - Hidden Pressure: gap `-0.5 to 0.5` with high load
  - Structurally Held: all other cases
- The app selects the top two pillars by highest Priority Score, using the specified pillar order to break ties.

## Export options

- `Download JSON` saves participant details, responses, composite scores, gaps, statuses, founder dependency modifier, and priority pillars.
- `Download CSV` saves the same information in flat CSV format.
- `Print / Save as PDF` uses the browser print view for a printable report.

## Data capture later

This V2 build calculates everything in the browser and stores in-progress state with `localStorage`.

To connect external capture later, add a submit step after results or after each answer to send:

- participant details
- question responses
- pillar scores
- overall scores
- founder dependency modifier

Possible next integrations:

- Google Sheets webhook / Apps Script
- Airtable API
- Supabase
