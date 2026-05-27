# Portfolio Design System

## Purpose

This site uses a small local design system to make portfolio decisions traceable to reusable guidance rather than page-specific styling.

## Token Layer

- Color: neutral enterprise surfaces, accessible text contrast, action blue, teal accent, and explicit success, warning, error, and focus states.
- Typography: system sans stack, constrained measure, clear heading scale, and no viewport-based body text scaling.
- Spacing: eight reusable spacing tokens modeled after component and layout rhythm rather than ad hoc margins.
- Borders and radius: restrained card and panel styling, with no nested card patterns.
- Motion: reduced-motion media query disables animation and smooth scrolling for users who request less motion.

Influence: Carbon for disciplined token reuse and enterprise polish; USWDS for accessible state colors and focus behavior; adapter framework for traceable token categories.

## Component Layer

- Navigation: semantic landmarks, descriptive links, visible current state, and keyboard focus.
- Buttons: primary and secondary variants, native button for form submission, links for navigation.
- Cards and panels: reusable summary, metadata, and status containers.
- Metadata tags: short, scan-friendly labels for role, scope, status, and topic.
- Forms: persistent labels, field help text, browser validation, and support for `aria-invalid` custom error states.
- Work summaries: consistent cards for context, capability area, outcomes, and organizational value.

Influence: Carbon for component structure and action hierarchy; USWDS for forms, focus, and plain-language content; adapter framework for pattern governance.

## Accessibility Layer

- Landmarks: header, nav, main, section, aside, and footer are used consistently.
- Heading order: each page starts with one `h1`, followed by ordered section headings.
- Keyboard behavior: links, buttons, inputs, and textarea preserve visible focus.
- Forms: labels are visible and help text is programmatically associated with fields.
- Reduced motion: global media query respects `prefers-reduced-motion`.
- Responsive behavior: grids collapse to one column, sticky sidebars become static, and tables support horizontal scroll on small screens.

Influence: USWDS for inclusive interaction expectations and WCAG A/AA practicality; adapter framework for repeatable accessibility guidance.
