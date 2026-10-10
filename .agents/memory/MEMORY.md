# Project Memory - Mithun Portfolio

## Architectural Conventions

### 1. Next.js App Router Structure
- **Root Landing Page**: Located in `src/app/(home)/page.jsx`, wrapped by `src/app/(home)/layout.jsx` and the root `src/app/layout.jsx`.
- **Inner Pages Route Group**: Located in `src/app/(pages)/` (e.g., `src/app/(pages)/blog`, `src/app/(pages)/projects`, `src/app/(pages)/cases`), wrapped by `src/app/(pages)/layout.jsx`.
- **Layout Rule**: Both `(home)/layout.jsx` and `(pages)/layout.jsx` render `<Navbar />` and `<Footer />` from `@/components/common/Navbar` and `@/components/common/Footer`. Do not duplicate `<Navbar />` or `<Footer />` inside individual page components.

### 2. Component Organization & Direct Imports
- **`src/components/common/`**: Contains ONLY direct common shell components (`Navbar.jsx`, `Footer.jsx`, `BrandLogo.jsx`). Navbar and Footer must NOT be inside `src/app/(home)/_components`.
- **`src/components/shared/`**: Contains ONLY direct card components (`ProjectCard.jsx`, `ServiceCard.jsx`, `BlogCard.jsx`).
- **`src/components/ui/`**: Contains atomic, variant-driven UI components with direct code (`Button.jsx`, `Badge.jsx`, `Input.jsx`, `Textarea.jsx`, `Typography.jsx`, `Card.jsx`).
- **No Barrel Re-exports**: Do not create or use `index.js` files with `export { default as ... } from "./..."`. Always import directly from the component file path (e.g. `import ProjectCard from "@/components/shared/ProjectCard";`, `import Navbar from "@/components/common/Navbar";`).

### 3. Page Sub-components Colocation (`_components`)
- Any component specific to a page or route must be placed inside a `_components/` subfolder within that route's directory (e.g. `src/app/(pages)/cases/[slug]/_components/CaseStudyDetailView.jsx`, `src/app/(home)/_components/Hero.jsx`).

### 4. File Header Path Comment Rule
- Every code file under `src/` must have its relative file path as a comment on line 1:
  ```javascript
  // src/app/(pages)/cases/[slug]/page.jsx
  ```

### 5. Next.js 16+ Server-First & Client Islands Rule (`_clients`)
- **Strict Folder Distinction**:
  - `_components/` = 100% Server Components (RSC). Never place `"use client"` files in `_components/`.
  - `_clients/` = Client Islands only (`"use client"`).
- **No Client Contamination**: Section wrappers like `Hero.jsx`, `Contact.jsx`, and `FAQ.jsx` must remain Server Components. Interactive pieces (e.g., `HeroPreciseImages.jsx`, `ContactForm.jsx`) must be placed in `_clients/`.
- **Async Route Params**: `params` and `searchParams` are Promises in Next.js 15/16; always await them.
- **Image Optimization**: Use Next.js `<Image>` with explicit `sizes` and `priority` for above-the-fold hero assets to ensure optimal LCP and Core Web Vitals.

### 6. Data Colocation Rule (`_data`)
- Route-specific datasets must be colocated in a `_data/` folder adjacent to `_components/` and `_clients/` (e.g. `src/app/(home)/_data/`, `src/app/(pages)/blog/_data/`, `src/app/(pages)/cases/_data/`).
- Shell/navigation data lives in `src/components/common/_data/navigation.js`.
- Never dump all unrelated page datasets into a single unorganized file. Keep each domain's data colocated with its routes.
- Every data file must have `// src/...` relative path comment on line 1.

### 7. Clean Reusable UI Components Pattern (`src/components/ui/`)
- **Zero-Bloat Rule**: Do not install unnecessary extra packages when standard JavaScript and our lightweight `cn` helper can achieve the same result cleanly.
- **`Typography.jsx`**: Provides `Typography` with `variant`, `weight`, `color`, and ergonomic shortcut exports (`H1, H2, H3, H4, H5, H6, P`).
- **`Input.jsx`**: Uses `forwardRef`, supports `prefix` (left icon/adornment), `suffix`, `label`, `error`, `helperText`, and variants (`dark` / `default`).
- **`Button.jsx`**: Supports both named (`export { Button }`) and default export, with variants, sizes, and rounded props.

### 8. Strict Zero-Garbage Props & Comment Discipline
- **Only Active Props**: Do not include speculative props or dead parameters (`isVisible`, `index`, unused `className`, `action`). Keep component prop interfaces minimal.
- **No Unnecessary `cn()`**: Use standard template literals or plain strings instead of importing `cn` for simple class concatenations.
- **Clean Self-Documenting Code**: Do not write comments that reference other websites, templates, or design sources (e.g. Wama).
- **Client Component Isolation**: Heavy client logic (`useEffect`, refs, Web Animations API) belongs in dedicated client components (e.g., `HeroPreciseImages.jsx`), keeping parent section wrappers as React Server Components.
