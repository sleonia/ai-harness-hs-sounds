# Hearthstone Blizzard Site Style Research

Research conducted on https://hearthstone.blizzard.com/ru-ru/cards to extract design patterns, CSS styles, and visual elements for replication.

## Screenshots

### Main Page View

![Main Page](/Users/sleonia/Projects/hs-sound-pack/hearthsite-main.png)

### Filter Section Detail

![Filter Section](/Users/sleonia/Projects/hs-sound-pack/hearthsite-filters.png)

## Typography

### Primary Font

- **Font Family**: `"Open Sans", Helvetica, Arial, sans-serif`
- **Base Font Size**: `15.4776px` (approximately 1rem)

### Heading Styles

- **Headings**: Various sizes throughout the interface
- **Font Weight**: `700` for bold elements, `400` for regular text
- **Color Range**: White (#FFFFFF) to dark colors depending on context

### Text Elements

```css
/* Base text style */
body {
  color: rgb(0, 0, 0);
  font-size: 15.4776px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
```

## Color Palette

### Primary Colors

- **White**: `rgb(255, 255, 255)` - #FFFFFF
- **Black**: `rgb(0, 0, 0)` - #000000
- **Dark Blue**: `rgb(35, 58, 110)` - #233A6E (active tabs, links)
- **Gold/Amber**: `rgb(252, 209, 68)` - #FCD144
- **Cream/Beige**: `rgb(241, 212, 171)` - #F1D4AB
- **Dark Brown**: `rgb(97, 67, 38)` - #614326
- **Blue**: `rgb(56, 96, 190)` - #3860BE

### Accent Colors

- **Mana Text**: `rgb(255, 255, 255)` - #FFFFFF
- **Active Tab**: `rgb(35, 58, 110)` - #233A6E
- **Hover State**: `rgb(143, 110, 110)` - #8F6E6E
- **Light Gray**: `rgb(242, 235, 227)` - #F2EBE3

### Transparent Colors

- `rgba(0, 0, 0, 0)` - Fully transparent
- `rgba(0, 0, 0, 0.5)` - 50% black opacity
- `rgba(255, 255, 255, 0.3)` - 30% white opacity
- `rgba(0, 0, 0, 0.8)` - 80% black opacity

## Layout & Spacing

### Card Container

```css
.Card {
  display: flex;
  position: relative;
  transition: all;
  cursor: pointer;
  box-shadow: none;
  border-radius: 0px;
  background-color: rgba(0, 0, 0, 0);
  width: 240px;
  height: 350px;
}
```

### Filter Container

```css
.CardGalleryFilters-mainContainer {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: normal;
  border-bottom: 0px none rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0);
  padding: 0px 20px 0px 10px;
}
```

### Header Section

```css
.CardSetBackground {
  display: block;
  background-color: rgba(0, 0, 0, 0);
  padding: 0px;
  min-height: 335px;
}

.CardSetLogo {
  display: block;
  background-image: url("https://d2q63o9r0h0ohi.cloudfront.net/images/icons/yearIcons/frame_library_header_standard-704e0c33344e8ca0a367f8a321aa72ab29e9949ec0ad3671b098b58cd4e2120595adc302fbd87f609573dccefbd74ab2498c98a177bb15eec8eebf699f812832.png");
  background-position: 50% 50%;
  background-size: contain;
  width: 300px;
}
```

## Mana Buttons (Crystal Elements)

### Main Button Style

```css
.mana-button {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0px none rgb(0, 0, 0);
  border-radius: 0px;
  background-image: url("https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/icon_mana-25ac7617a8c7f5f992660316dd307cf16b36001d1fa9693a5aca46eb01db420041018a1bbed19055f963b2421b7f615b887e84e1508be42c7b74138ee4794829.png");
  background-position: 50% 50%;
  background-size: contain;
  background-color: rgba(0, 0, 0, 0);
  width: 36px;
  height: 34px;
}
```

### Hover/Selected State (Pseudo-element)

```css
.mana-button::before {
  display: block;
  position: absolute;
  background-image: url("https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/icon_mana_hoverselected-4b4e72e3465b332fb2535f178dac9db4f5a279dc6432c57bb309c2bd63229e4ef7fea8be1a8b1463410983c2316ae33f95a91a75d2407a6952551bb3c17b1478.png");
  background-size: contain;
  width: 56px;
  height: 54px;
  content: "";
}
```

### Mana Number Text

```css
.mana-number {
  position: relative;
  padding: 0px;
  color: rgb(255, 255, 255);
  font-weight: 700;
  font-size: 23.7592px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
```

### Mana Button Container

```css
.mana-container {
  display: flex;
  gap: normal;
  background-color: rgba(0, 0, 0, 0);
  padding: 0px;
}
```

## Filter Dropdowns

### Filter Button Style

```css
.filter-button {
  display: flex;
  align-items: center;
  gap: normal;
  cursor: pointer;
  border: 0px none rgb(0, 0, 0);
  border-radius: 0px;
  background-color: rgba(0, 0, 0, 0);
  padding: 0px 0px 0px 20px;
  color: rgb(0, 0, 0);
  font-weight: 400;
  font-size: 15.4776px;
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
}
```

### Filter Label Examples

- "Стандартные карты" (Standard Cards)
- "Все классы" (All Classes)
- "Тип карты" (Card Type)
- "Мана" (Mana)

### Dropdown Icons

```css
.dropdown-icon {
  /* Custom blizzard dropdown icon component */
  /* Uses BLZ-NAV-DROPDOWN tag */
}
```

## Card Gallery Elements

### Card Classes

- `.Card` - Main card container
- `.CardImage` - Card image element
- `.CardSetBackground` - Set background wrapper
- `.CardSetLogo` - Set logo/branding
- `.CardGalleryFiltersRoot` - Filter container root
- `.CardGalleryFilters-mainContainer` - Main filter container

### Card Image Style

```css
.CardImage.loaded {
  /* Card images are loaded dynamically */
  /* Standard card size: 240px x 350px */
}
```

## Interactive States

### Hover Effects

- Cards have `transition: all` for smooth animations
- Cursor changes to `pointer` on interactive elements
- Mana buttons show hover state via pseudo-element with larger crystal image

### Active States

```css
.active {
  color: rgb(35, 58, 110); /* #233A6E */
}
```

### Transitions

```css
/* Smooth transitions on interactive elements */
transition: all;
```

## CSS Class Naming Convention

The site uses a combination of:

- **BEM-like naming**: `.Card`, `.CardImage`, `.CardSetBackground`
- **Utility classes**: `.css-3hns2a`, `.e1fr4lu22` (likely generated by CSS-in-JS)
- **Semantic classes**: `.active`, `.standard`, `.cards`

## Key Design Patterns

### 1. Mana System

- Crystal-based visual representation
- Numbers centered in crystal graphics
- Hover/selected states with larger crystal overlay
- Container-based layout with flexbox

### 2. Filter System

- Horizontal flexbox layout
- No visible borders or backgrounds
- Left padding for hierarchy
- Icon-based dropdown indicators

### 3. Card Display

- Fixed dimensions (240px x 350px)
- Flexbox positioning
- Image-based card rendering
- Interactive hover states

### 4. Color Usage

- Dark backgrounds with light text
- Gold/amber accents for highlighting
- Blue for active states and links
- Transparent backgrounds for overlay elements

## Asset URLs

### Mana Crystal Images

- **Normal State**: `https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/icon_mana-25ac7617a8c7f5f992660316dd307cf16b36001d1fa9693a5aca46eb01db420041018a1bbed19055f963b2421b7f615b887e84e1508be42c7b74138ee4794829.png`
- **Hover/Selected**: `https://d2q63o9r0h0ohi.cloudfront.net/images/card-gallery/icon_mana_hoverselected-4b4e72e3465b332fb2535f178dac9db4f5a279dc6432c57bb309c2bd63229e4ef7fea8be1a8b1463410983c2316ae33f95a91a75d2407a6952551bb3c17b1478.png`

### Set Logo Image

- **Standard Set**: `https://d2q63o9r0h0ohi.cloudfront.net/images/icons/yearIcons/frame_library_header_standard-704e0c33344e8ca0a367f8a321aa72ab29e9949ec0ad3671b098b58cd4e2120595adc302fbd87f609573dccefbd74ab2498c98a177bb15eec8eebf699f812832.png`

## Implementation Recommendations

### 1. Mana Buttons

- Use flexbox for button layout
- Implement hover states with CSS pseudo-elements
- Center text absolutely positioned over crystal image
- Use background-image for crystal graphics

### 2. Filter Dropdowns

- Flexbox horizontal layout
- Minimal styling with transparent backgrounds
- Left padding for visual hierarchy
- Custom dropdown icons

### 3. Card Grid

- Fixed card dimensions
- Flexbox or grid layout
- Image-based card rendering
- Smooth hover transitions

### 4. Typography

- Open Sans as primary font
- Varied weights (400 for regular, 700 for bold)
- Appropriate font sizes (15-24px range)
- High contrast for readability

## Responsive Considerations

The site appears to use:

- Fixed card widths (240px)
- Responsive container widths
- Flexbox for layout flexibility
- Fluid typography

## Accessibility Notes

- Interactive elements have cursor: pointer
- High contrast colors for text
- Semantic HTML structure
- Keyboard-navigable elements

---

**Research Date**: April 27, 2026
**Site**: https://hearthstone.blizzard.com/ru-ru/cards
**Locale**: Russian (ru-ru)
**Tools Used**: Playwright MCP for browser automation and style extraction
