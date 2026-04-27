# Design System: The Editorial Estate

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Concierge"**
This design system moves away from the "utility-first" clutter of standard CRMs to embrace the "editorial-first" language of luxury real estate. The goal is to make the agent feel less like a data entry clerk and more like a high-end curator. 

We break the "template" look through **intentional asymmetry** and **breathable compositions**. By utilizing a high-contrast typography scale (where large, elegant serifs meet functional sans-serifs) and a layout that favors white space over density, we signal exclusivity. This system mimics the experience of flipping through a premium physical portfolio—tactile, layered, and unmistakably bespoke.

## 2. Colors & Surface Philosophy
The palette is rooted in heritage and prestige. Deep teals provide authority, while champagne gold accents offer a touch of light and value.

### The "No-Line" Rule
Traditional CRMs rely on gray borders to separate data. **This design system prohibits 1px solid gray borders for sectioning.** Boundaries must be defined through background color shifts. Use `surface-container-low` sections sitting on a `background` (Ivory) to create natural zones. 

### Surface Hierarchy & Nesting
Think of the UI as a series of physical layers—like heavy vellum paper stacked on a dark teal desk.
*   **The Base Layer:** `background` (#FDF9F4) is your canvas.
*   **The Container Layer:** Use `surface-container-lowest` (Pure White) for cards to create a "lifted" appearance.
*   **The Accent Layer:** Use `secondary_container` (Champagne) sparingly for highlighting VIP client status or high-value properties.

### The Signature Champagne Divider
While we avoid gray borders, a 1px divider using `secondary` (#705B3E) is permitted only when it serves an editorial purpose—such as separating a property title from its metadata—mimicking the layout of a luxury magazine.

## 3. Typography
The tension between the serif and sans-serif is where the brand’s "High-End" identity lives.

*   **Display & Headlines (Cormorant Garamond):** Use these for "Moment" moments—Client Names, Property Titles, and Dashboard Greetings. It should feel like a masthead. 
    *   *Token usage:* `display-lg` to `headline-sm`.
*   **Body & UI (DM Sans / Manrope):** Used for data density, navigation, and input fields. It provides a modern, neutral counterpoint to the expressive serif.
    *   *Token usage:* `title-md` for navigation labels, `body-md` for notes and descriptions.
*   **Visual Hierarchy:** Always use a 2-step jump in scale between a serif headline and a sans-serif subtitle to ensure the "Editorial" look is preserved.

## 4. Elevation & Depth
We eschew traditional "Drop Shadows" in favor of **Tonal Layering** and **Ambient Glows**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift without the "muddy" look of standard shadows.
*   **Ambient Shadows:** When a card must float (e.g., a property preview), use a shadow with a 24px-32px blur at only 4% opacity. The shadow color should be tinted with `primary` (Deep Teal) rather than black, creating a more organic, "lit from above" feel.
*   **The "Ghost Border" Fallback:** For accessibility in input fields, use the `outline-variant` token at 20% opacity. It should be felt, not seen.
*   **Glassmorphism:** For floating action buttons or "Quick View" overlays, use `surface` with a 12px backdrop-blur and 80% opacity. This keeps the ivory background visible, maintaining the "light and airy" feel of the boutique.

## 5. Components

### Buttons
*   **Primary:** `primary_container` (#1A5C5A) background with `on_primary` (White) text. Sharp corners (`sm` - 0.125rem) to maintain a professional, architectural feel.
*   **Secondary:** `secondary` (#705B3E) text with a `secondary_container` hover state. 
*   **Tertiary:** All caps `label-md` text with a 2px underline in Champagne gold.

### Input Fields
*   **Style:** Minimalist. No background fill. Only a bottom border using `outline-variant`. Upon focus, the bottom border transitions to `secondary` (Gold). 
*   **Labels:** Use `notoSerif` (Cormorant) for field labels to make the form-filling experience feel like writing a personalized invitation.

### Cards & Lists
*   **Strict Rule:** No divider lines between list items. Use 16px or 24px of vertical whitespace (`Spacing Scale`) to separate entries. 
*   **The "Portfolio" Card:** Property cards should feature a large image with the price in `headline-sm` overlapping the image in a small `surface` container (Glassmorphism).

### Specialized CRM Components
*   **Status Badges (Chips):** Use `secondary_fixed` for "Active" and `tertiary_fixed` for "Under Contract." Keep them small, with `full` roundedness to contrast with the sharp-edged cards.
*   **Timeline:** For client interactions, use a vertical line in `outline-variant` (20% opacity) with gold dots representing touchpoints.

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical margins. A wider left margin on a page title creates an editorial, "un-templated" look.
*   **Do** prioritize imagery. Use high-quality architectural photography as the backdrop for empty states.
*   **Do** use "Ivory" (#F5F1EC) as the default background instead of pure white to reduce eye strain and feel more like premium paper.

### Don't:
*   **Don't** use icons as the primary way to communicate. Luxury is verbal; use text labels (`label-md`) alongside or instead of icons.
*   **Don't** use standard 8px or 12px border radii. Keep it "Sharp but Sophisticated" at 2px or 4px.
*   **Don't** use vibrant "Success" greens or "Warning" oranges. Use the `tertiary` (Teal-Black) for success and a muted `error` (Rust) for alerts to maintain the palette's dignity.