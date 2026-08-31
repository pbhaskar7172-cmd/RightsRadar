---
name: Nyaya AI
colors:
  surface: '#fff8f3'
  surface-dim: '#e4d8cb'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fef2e4'
  surface-container: '#f8ecde'
  surface-container-high: '#f2e6d9'
  surface-container-highest: '#ece1d3'
  on-surface: '#201b13'
  on-surface-variant: '#44474d'
  inverse-surface: '#362f26'
  inverse-on-surface: '#fbefe1'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4f5f78'
  primary: '#000919'
  on-primary: '#ffffff'
  primary-container: '#0f2137'
  on-primary-container: '#7889a4'
  inverse-primary: '#b6c8e4'
  secondary: '#5d5f5b'
  on-secondary: '#ffffff'
  secondary-container: '#e0e0db'
  on-secondary-container: '#62635f'
  tertiary: '#140500'
  on-tertiary: '#ffffff'
  tertiary-container: '#371800'
  on-tertiary-container: '#d06d0d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#b6c8e4'
  on-primary-fixed: '#091c32'
  on-primary-fixed-variant: '#374860'
  secondary-fixed: '#e3e3de'
  secondary-fixed-dim: '#c6c7c2'
  on-secondary-fixed: '#1a1c19'
  on-secondary-fixed-variant: '#454744'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#fff8f3'
  on-background: '#201b13'
  surface-variant: '#ece1d3'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Source Serif 4
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system for this product is centered on **Modern Judicial Excellence**. It moves away from the dense, bureaucratic aesthetic of traditional legal portals toward an atmosphere of clarity, intelligence, and premium service. 

The brand personality is **Authoritative yet Accessible**. It evokes the feeling of a high-end, private legal consultation—calm, focused, and profoundly competent. The visual style is a blend of **Minimalism** and **Tactile Modernism**, utilizing a warm, paper-like foundation (Ivory/Cream) contrasted with deep, intellectual tones (Navy). This is punctuated by cinematic depth and subtle atmospheric blurs to handle complex AI interactions without overwhelming the user.

## Colors
The palette is grounded in heritage and modern professionalism.
- **Background (#FDFCF8):** A warm ivory that reduces eye strain and feels more premium/editorial than pure white.
- **Primary (#0F2137):** A deep Navy used for critical text, primary actions, and structural headers to instill trust.
- **Secondary (#F5F5F0):** A Bone white used for subtle card backgrounds and secondary surfaces.
- **Accents:** Burnt Orange (#E67E22) is used sparingly for call-to-actions or highlights to provide warmth and cultural resonance without being loud. Muted Beige (#D5CABD) serves as a soft divider and border color.

## Typography
The system employs an **Editorial Serif / Technical Sans** pairing. 
- **Headings:** Use **Source Serif 4**. Its sturdy yet elegant letterforms provide the authoritative voice of a legal document but with modern legibility. 
- **UI & Body:** Use **Inter**. Its neutral, systematic nature ensures that complex legal data remains highly readable and functional across all screen sizes.
- Use tighter tracking for large headlines and generous line height (1.5x+) for body text to maintain an airy, sophisticated feel.

## Layout & Spacing
The layout follows a **Fluid-Fixed Hybrid** model. Content is centered within a 1200px container on desktop, while background elements and blurs stretch to the viewport edges.
- **Rhythm:** An 8px base grid is used for all internal component spacing.
- **Whitespace:** Emphasize vertical rhythm with larger "stack" values (48px+) between major sections to allow the content to breathe.
- **Responsive:** Transition from a 12-column grid on desktop to a 4-column grid on mobile. Increase the Ivory background exposure on mobile to ensure the interface feels uncluttered.

## Elevation & Depth
Elevation is communicated through **Atmospheric Layering** rather than traditional drop shadows.
- **Surfaces:** Use high-diffusion, low-opacity shadows (Blur 40px, Opacity 4%, Tinted with Primary Navy) to create a soft "lift" for cards.
- **Atmospheric Blurs:** For AI response modules and overlays, use a `24px` backdrop blur with a semi-transparent Ivory (#FDFCF8) fill. This suggests transparency and "computational depth."
- **Transitions:** All state changes should use a `300ms cubic-bezier(0.4, 0, 0.2, 1)` transition to feel cinematic and deliberate.

## Shapes
The shape language is **Refined and Structured**. 
- Default elements (Buttons, Input fields) use an `8px` (rounded-md) corner radius.
- Larger containers and cards use a `16px` (rounded-lg) radius to feel softer and more modern.
- This balance ensures the UI doesn't feel too "bubbly" or "tech-toy," maintaining a professional edge.

## Components
- **Buttons:** Primary buttons use the Navy background with Ivory text. Secondary buttons use a Muted Beige border with Navy text. Ghost buttons use Burnt Orange text for subtle calls to action.
- **Input Fields:** Use a subtle Ivory background (#FDFCF8) with a 1px Muted Beige border. Focus states transition the border to Navy and add a soft 4px Ivory glow.
- **AI Response Cards:** These are the centerpiece. Use a Bone (#F5F5F0) background with a subtle Navy left-accent border (4px) to denote "Nyaya AI" is speaking.
- **Chips/Badges:** Use Navy text on a Muted Beige background for status indicators like "Verified" or "Case Active."
- **Transitions:** Incorporate a "shimmer" effect on Ivory surfaces while the AI is processing, using a gradient of Ivory to Secondary Bone.