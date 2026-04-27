# HS-Inspired Layout Redesign Design

## Overview

Redesign the Hearthstone Sound Pack website layout to match the official HS card gallery aesthetic while fixing current layout issues: inconsistent card sizes, poorly positioned audio buttons, cramped "Все карты" banner, and missing footer.

## Goals

1. Enforce uniform card dimensions across the grid
2. Improve audio button styling and positioning
3. Fix "Все карты" banner spacing
4. Add attribution footer with HS-style decoration

---

## Component Specifications

### Card Component

**Structure:**

- Fixed container: 200x280px (portrait ratio matching HS cards)
- Card artwork area: Fills container with `object-fit: cover`
- Card link wrapper: Wraps artwork for hover effects
- Audio buttons container: Full-width decorative bar below card (200px width)
- Individual play buttons: Gold-styled, horizontally centered with gap

**Styling:**

```css
.card {
  border: 3px solid #d4a843;
  border-radius: 15px;
  background: linear-gradient(135deg, #4a3520, #2a1f10);
  width: 200px;
  height: 280px;
}

.art img {
  filter: drop-shadow(rgba(0, 0, 0, 0.6) 0px 3px 3px);
  height: 280px;
  object-fit: cover;
}

.card-link:hover,
.card-link:focus {
  transform: scale(1.1);
  filter: drop-shadow(rgba(252, 209, 68, 0.4) 0px 0px 15px);
}

.actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  border: 2px solid #8d693f;
  border-radius: 5px;
  background: #261d10;
  padding: 10px;
  width: 200px;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #d4a843;
  width: 36px;
  height: 34px;
}

.button:hover,
.button:focus {
  transform: scale(1.1);
  filter: brightness(1.1);
}
```

**Behavior:**

- Card hover triggers 1.1x scale with gold glow
- Play buttons have separate hover (brighter scale 1.1x)
- Each button represents one audio clip

---

### Grid Wrapper & "Все карты" Banner

**Grid Wrapper:**

- Container for cards with responsive grid layout
- Spacing: 12px on mobile (max-width 768px), 20px on desktop
- Grid columns: `repeat(auto-fill, minmax(200px, 1fr))`
- Center alignment for all cards

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-items: center;
  gap: 12px;
  padding: 0 4rem;
}

@media (min-width: 769px) {
  .grid {
    gap: 20px;
  }
}
```

**"Все карты" Banner:**

- Widened from 420px to 500px for better text breathing room
- Container height: Increased from 54px to 60px
- SVG icon: Scaled proportionally to fit wider container
- Text positioning: Centered absolutely with wider available space
- Text styling: Benguiat Bold font, 1.5rem, gold color (#c9a957), subtle text shadow

```css
.all-cards-decoration {
  width: 500px; /* Increased from 420px */
  height: 60px; /* Increased from 54px */
}

.all-cards-icon {
  opacity: 0.9;
  width: 350px; /* Scaled from 300px */
  height: auto;
}

.all-cards-decoration h3 {
  width: 200px; /* Increased from 160px */
  font-size: 1.5rem; /* Adjusted for wider space */
}
```

---

### Footer

**Structure:**

- Single decorative divider line at bottom of content
- Attribution text below divider (not full-width container)

**Styling:**

```css
.footer-divider {
  margin: 2rem 0;
  background: #d4a843;
  width: 100%;
  height: 2px;
}

.footer-content {
  padding: 1rem 0;
  color: #cbbd9b;
  font-family: "Benguiat Bold", Georgia, serif;
  text-align: center;
}

.pixel-heart {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: #fcd144;
}

.repo-link {
  border-bottom: 1px solid #d4a843;
  color: #c9a957;
  text-decoration: none;
}

.repo-link:hover {
  border-color: #fcd144;
  color: #fcd144;
}
```

**HTML Structure:**

```astro
<footer>
  <div class="footer-divider"></div>
  <div class="footer-content">
    <span class="pixel-heart">♥</span>
    <span>Made with love by </span>
    <a href="REPO_URL" class="repo-link">sleonia</a>
  </div>
</footer>
```

---

## Color Palette

These colors are already defined in `index.astro` and should be used consistently:

| Name                  | Value     | Usage                              |
| --------------------- | --------- | ---------------------------------- |
| `--hs-gold-primary`   | `#fcd144` | Highlights, hover states, hearts   |
| `--hs-gold-secondary` | `#d4a843` | Borders, dividers, primary accents |
| `--hs-gold-accent`    | `#f29a2e` | Secondary accents                  |
| `--hs-text-primary`   | `#f8f0dc` | Main text                          |
| `--hs-text-secondary` | `#cbbd9b` | Muted text                         |
| `--hs-bg-card`        | `#1a1a1a` | Card backgrounds                   |
| `--hs-blue-primary`   | `#233a6e` | Cool accents                       |

---

## Responsive Behavior

**Mobile (< 768px):**

- Grid gap: 12px
- Banner: Scales down to 320px width
- Cards: 200x280px (unchanged)

**Desktop (≥ 768px):**

- Grid gap: 20px
- Banner: 500px width
- Cards: 200x280px (unchanged)

---

## Files to Modify

| File                                    | Changes                     |
| --------------------------------------- | --------------------------- |
| `site/src/components/CardTile.astro`    | Card sizing, button styling |
| `site/src/components/GridWrapper.astro` | Banner sizing, grid spacing |
| `site/src/pages/index.astro`            | Add footer component        |

---

## Implementation Notes

1. **Card Sizing**: Use `object-fit: cover` to ensure all cards are exactly 200x280px. Some image content may be cropped, but visual consistency is prioritized.

2. **Button Container**: Make it the same width as the card (200px) and directly below the image using CSS grid, not a separate sibling with independent spacing.

3. **Banner**: The existing HS SVG frame is excellent—just increase container width and scale the SVG proportionally.

4. **Footer**: A single gold divider line is sufficient visual closure. The attribution floats below it without additional framing.
