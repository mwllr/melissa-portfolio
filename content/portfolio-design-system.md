# Portfolio Design System

## Purpose

This site uses a lightweight design system so new pages, case studies, and portfolio experiments can stay visually consistent without relying on page-specific styling decisions.

The goal is not to create maximum abstraction. The goal is to make the current visual language reusable, understandable, and easy to extend.

## Token Structure

The token layer is organized in five parts:

### 1. Brand Tokens

These are the raw palette values that define Melissa's visual identity.

- `--color-primary`, `--color-secondary`, `--color-secondary-contrast`
- `--color-slate`, `--color-sage`, `--color-driftwood`, `--color-coral`
- `--color-soft-aqua`, `--color-charcoal`, `--color-stone`
- `--color-warm-linen`, `--color-mist`

Use these when creating or revising semantic tokens. Do not use them directly in component rules unless a component is intentionally tied to brand expression.

### 2. Semantic Tokens

These map the brand palette to interface meaning.

- Surfaces: `--color-page`, `--color-surface`, `--color-surface-alt`, `--color-card`, `--color-header-bg`, `--color-footer-bg`
- Text: `--color-ink`, `--color-text`, `--color-muted`
- Interaction: `--color-link`, `--color-link-hover`, `--color-action`, `--color-action-hover`
- States: `--color-warning`, `--color-error`, `--color-success`, `--color-focus`
- Structure: `--color-border`, `--color-border-strong`, `--color-accent`, `--color-accent-soft`

Use semantic tokens by default in shared rules.

### 3. Typography Tokens

Typography is defined both by scale and by role.

- Fonts: `--font-heading`, `--font-sans`, `--font-mono`
- Scale: `--text-xs` through `--text-3xl`
- Roles: `--type-body`, `--type-lede`, `--type-kicker`, `--type-card-title`, `--type-compact-card-title`, `--type-section-title`, `--type-page-title`, `--type-nav`
- Hero rhythm: `--hero-copy-leading`, `--hero-copy-gap`

Use role tokens when styling components. Reserve raw size tokens for defining the role layer or for rare one-off exceptions.

### 4. Layout Tokens

These tokens control rhythm and width.

- Spacing: `--space-1` through `--space-8`
- Shape: `--radius-sm`, `--radius-md`
- Content width: `--layout-site-width`, `--layout-text-measure`
- Sidebars and media: `--layout-sidebar-width-sm` through `--layout-sidebar-width-xl`, `--layout-media-width-sm`, `--layout-media-width-md`
- Grids: `--layout-card-grid-min`, `--layout-compact-card-min`, `--layout-compact-card-max`
- Positioning: `--layout-content-gap`, `--layout-sticky-offset`, `--layout-form-max`

If a width or gap appears in multiple components, it should usually become a layout token.

### 5. Component Tokens

These capture repeated treatments for shared patterns.

- Cards and panels: `--component-card-*`, `--component-panel-*`
- Tags: `--component-tag-*`, `--component-work-tag-text`
- Buttons and controls: `--control-height`, `--component-button-*`, `--component-input-*`
- Menus and shadows: `--component-menu-*`, `--component-shadow-subtle`
- Content patterns: `--component-callout-*`, `--component-table-*`, `--component-opportunity-bg`, `--component-roadmap-bg`, `--component-value-flow-bg`

Use component tokens when a treatment should stay consistent even if the underlying semantic tokens change later.

### Hero Rhythm

Hero sections share a slightly more open copy rhythm than standard body text.

- `--hero-copy-leading` controls the line-height for hero eyebrow, lede, and supporting hero copy.
- `--hero-copy-gap` controls the spacing between stacked hero paragraphs and the action row that follows them.

Keep these values consistent across all page heroes so the About page remains the reference rhythm.

## Theme Behavior

The site currently ships in a single light theme. If a second theme becomes a future upgrade, it should override semantic and component tokens rather than rewrite component rules from scratch.

That means:

- Color changes should live in theme-level token overrides, not one-off component patches
- Shared component selectors should continue using semantic or component tokens
- Any future theme work should prefer token remapping over selector-specific overrides

## Component Guidance

### Cards

- Standard cards use `--component-card-bg`, `--component-card-border`, and `--component-card-padding`
- Compact cards use `--component-card-padding-compact`
- Focus cards may override background via scoped tokens, but should keep the shared card shell

### Tags

- Base tag styling should come from the shared tag tokens
- Category-specific tag colors should use the `--tag-*` token pairs
- New portfolio categories should add a new token pair before adding a new tag class

### Buttons and Inputs

- Use `--control-height` for tap-target consistency across buttons, menu toggles, and nav controls
- Buttons should use shared component padding and radius tokens
- Inputs and selects should use the shared input/select background and border tokens

### Content Sections

- Full-width content sections may use wider heading measures
- Sidebar and rail layouts should keep headings constrained
- Case-study-specific patterns like value flows, opportunity cards, roadmaps, and quotes should still pull from shared component tokens rather than ad hoc colors

## Usage Rules

- Prefer semantic tokens over raw brand values in component rules.
- Prefer component tokens over semantic tokens when a pattern repeats across multiple components.
- Add a new token when a value is repeated with the same meaning, not merely the same number.
- Avoid introducing one-off hard-coded colors for new work pages.
- Avoid duplicating spacing or width values that already exist in the layout token layer.

## What Still Counts As Acceptable Hard-Coding

Some values are still okay to leave inline when they are truly local:

- Small icon-specific sizing
- Single-use art-direction widths
- Highly specific pseudo-element offsets
- Rare content-measure exceptions that do not indicate a reusable pattern

If a value starts repeating, promote it.

## Accessibility Expectations

- All text and controls must meet accessible contrast targets
- Focus styles should remain visible across cards, menus, and forms
- Responsive changes should collapse structure without changing meaning
- Reusable patterns should preserve keyboard usability and readable hierarchy

## Extension Checklist

Before adding a new section or page:

1. Choose semantic and component tokens first.
2. Reuse an existing layout pattern if one already fits.
3. Promote repeated new values into tokens.
4. Check the current theme and any future theme variants.
5. Confirm the new pattern still reads as part of the same portfolio system.
