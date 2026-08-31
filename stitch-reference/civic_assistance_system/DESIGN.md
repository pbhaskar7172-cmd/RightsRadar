---
name: Civic Assistance System
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#44474d'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#74777d'
  outline-variant: '#c4c6cd'
  surface-tint: '#4f5f78'
  primary: '#000919'
  on-primary: '#ffffff'
  primary-container: '#0f2137'
  on-primary-container: '#7889a4'
  inverse-primary: '#b6c8e4'
  secondary: '#605e57'
  on-secondary: '#ffffff'
  secondary-container: '#e6e2d8'
  on-secondary-container: '#66645d'
  tertiary: '#140600'
  on-tertiary: '#ffffff'
  tertiary-container: '#361900'
  on-tertiary-container: '#ce7000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d4e3ff'
  primary-fixed-dim: '#b6c8e4'
  on-primary-fixed: '#091c32'
  on-primary-fixed-variant: '#374860'
  secondary-fixed: '#e6e2d8'
  secondary-fixed-dim: '#cac6bd'
  on-secondary-fixed: '#1c1c16'
  on-secondary-fixed-variant: '#484740'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  headline-xl:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style

This design system is built to convey **institutional trust** through a **modern editorial** lens. It bridges the gap between traditional government authority and modern AI-driven efficiency.

The aesthetic utilizes **Modern Minimalism** with a focus on high-quality typography and intentional white space to reduce the cognitive load often associated with civic procedures. The personality is helpful, dignified, and clear, avoiding the "stiffness" of legacy platforms while maintaining the seriousness required for financial and social assistance. 

Visual markers include:
- Heavy use of whitespace to create a "breathable" interface.
- Subtle background gradients to suggest depth and warmth.
- Precise, thin-line iconography paired with expressive serif headlines.

## Colors

The palette is rooted in a "Heritage Modern" spectrum, utilizing high-contrast pairings to ensure legibility and accessibility for a broad citizen demographic.

- **Primary (Deep Navy):** Used for primary actions, text, and structural elements to establish authority.
- **Secondary (Soft Cream):** The primary canvas color. It is warmer and more inviting than pure white, reducing eye strain during long reading sessions.
- **Accent (Vibrant Orange):** Reserved for call-to-actions, status highlights, and progress indicators. It provides a focal point against the neutral backdrop.
- **Muted Accents:** Semi-transparent versions of the primary navy (8-12% opacity) are used for secondary button backgrounds and input fields.

## Typography

The typographic strategy uses a **Serif-Display/Sans-Body** pairing. 

**Source Serif 4** provides the "voice" of the platform—authoritative yet human. It should be used for all primary headlines and welcome messages. **Plus Jakarta Sans** is the "utility" font, chosen for its high x-height and friendly, open apertures, making it exceptionally readable for dense information like scheme eligibility and document lists.

- **Scale:** Maintain generous line heights (1.5x for body) to ensure readability for elderly users.
- **Hierarchy:** Use the `label-sm` (uppercase) for small metadata tags or section overlines to differentiate from standard body text.

## Layout & Spacing

The system uses a **Fluid-Fixed Hybrid Grid**. Content is centered within a maximum width container of 1280px.

- **Desktop (12 columns):** 64px side margins. Large sections are separated by `stack-xl` (64px) to emphasize a premium, uncluttered feel.
- **Mobile (4 columns):** 20px side margins. Headlines scale down but maintain their serif character.
- **Alignment:** Information is predominantly left-aligned to mirror natural reading patterns for complex data. 
- **The "AI Chat" Space:** Center-aligned or wider-than-normal margins are used for the assistant interface to distinguish "conversation" from "static information."

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** rather than heavy shadows.

- **Surface Levels:** The base level is the Soft Cream background. Secondary surfaces (like cards or chat bubbles) use a white background with a very subtle 1px border in a muted navy (opacity 10%).
- **Interactive Depth:** Only the primary "Action" cards and buttons use a soft ambient shadow. The shadow should be tinted with the primary navy color (e.g., `rgba(15, 33, 55, 0.08)`) with a large blur radius (20px+) to feel "airy" rather than heavy.
- **Blurs:** Use backdrop-blur (12px) for sticky navigation headers to maintain a sense of context as the user scrolls.

## Shapes

The shape language is **Rounded**, signaling accessibility and approachability.

- **Standard Elements:** Buttons and input fields use a `0.5rem` (8px) radius.
- **Large Containers:** Content cards and modal sheets use `rounded-xl` (1.5rem / 24px) to create a soft, friendly frame for government data.
- **Interaction Elements:** The AI Assistant chat bubble and specific status chips may use "pill-shaped" (full-round) corners to denote their dynamic, interactive nature.

## Components

### Buttons
- **Primary:** Deep Navy background, White text. Bold and high-contrast.
- **Secondary:** Transparent background, Deep Navy 1px border.
- **Ghost:** No border, Navy text. Used for "Cancel" or "Go Back."

### AI Input Field
A prominent, full-width white bar at the bottom of the viewport with high roundedness (24px+). Includes a distinctive orange "Send" button and secondary icons for voice/attachment in muted navy.

### Scheme Cards
White surfaces with 24px padding. Use the Serif headline (headline-lg) for the scheme name and Jakarta Sans for the metadata. Ensure high contrast for "Eligibility" tags—use a soft orange tint for positive matches.

### Document Checklists
Clean, list-based components with 16px vertical spacing. Checkboxes should be custom-styled in Deep Navy with a 2px stroke when active.

### Progress Steppers
Horizontal, thin lines using the Accent Orange for completed steps and Muted Navy for upcoming steps, ensuring the user always knows their position in an application flow.