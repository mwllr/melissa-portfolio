# Melissa Waller Portfolio Site

Local static HTML foundation for the Melissa Waller professional platform.

This site is intentionally simple in implementation and structured in design:

- semantic HTML
- shared CSS
- no JavaScript dependency
- accessible navigation and page structure
- reusable portfolio design system tokens and components
- content aligned to accessibility leadership, systems thinking, UX operations, and organizational enablement

## Local Preview

Open `index.html` in a browser.

## Structure

```plaintext
03-portfolio-site/
+-- app/
+-- archive/
+-- components/
+-- content/
+-- public/
+-- styles/
+-- lib/
+-- index.html
+-- about.html
+-- selected-work.html
+-- resume.html
+-- contact.html
```

The `app`, `components`, `content`, `public`, `styles`, and `lib` folders mirror the future Next.js structure from the platform plan.

## Design Foundation

The portfolio uses the adapter framework as a governance layer:

- Carbon-inspired: enterprise spacing, action hierarchy, component discipline, reusable metadata patterns.
- USWDS-inspired: visible focus, persistent labels, plain language, practical validation, inclusive content structure.
- Adapter-inspired: major UI patterns map to tokens, components, accessibility behavior, and reusable pattern guidance.

## Content Guardrail

Do not change portfolio page content unless Melissa explicitly asks for content changes. Styling, layout, tokens, accessibility behavior, and component structure may be improved, but existing page copy, positioning, navigation labels, work descriptions, resume content, and personal story content should remain stable by default.
