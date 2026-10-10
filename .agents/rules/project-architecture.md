# Project Architecture Rules - Mithun Portfolio

## Directory Structure & Route Groups

1. **Route Groups**:
   - `(home)`: Landing page (`/`) with `(home)/layout.jsx`.
   - `(pages)`: Internal pages (`/blog`, `/projects`, `/cases`) with `(pages)/layout.jsx`.
   - Both route group layouts render `<Navbar />` and `<Footer />` from `@/components/common`.

2. **Components**:
   - `src/components/common/`: Common shell elements (`Navbar`, `Footer`, `BrandLogo`).
   - `src/components/shared/`: Shared feature cards (`ProjectCard`, `ServiceCard`, `BlogCard`).
   - `src/components/ui/`: Atomic UI components with variant support (`Button`, `Badge`, `Input`, `Textarea`, `Typography`, `Card`).
   - Page-specific sub-components must reside in a `_components/` folder colocated with that route (e.g. `src/app/(pages)/cases/[slug]/_components/CaseStudyDetailView.jsx`).

3. **Next.js 16+ Strict Server-First & Client Islands Architecture (`_clients/`)**:
   - **`_components/` (Server Only)**: Must contain ONLY React Server Components (RSC). Never place a component with `"use client"` inside `_components/`.
   - **`_clients/` (Client Islands Only)**: All interactive components requiring `"use client"` (`useState`, `useEffect`, `useRef`, animations, event listeners) must reside in `_clients/`.
   - **Section Component Purity**: Top-level section wrappers (`Hero.jsx`, `Contact.jsx`, `FAQ.jsx`) must remain Server Components. Isolate interactive sub-features into `_clients/` and import them down.
   - **Async Request APIs**: Always await dynamic route params (`const { slug } = await params;`) in pages and `generateMetadata`.

4. **No Barrel Index Files**:
   - Always import directly from component files (e.g. `import ProjectCard from "@/components/shared/ProjectCard"`).

5. **File Header Path Comments**:
   - Every file under `src/` must declare its relative path on line 1:
     `// src/path/to/file.jsx`

6. **Data Colocation (`_data/`)**:
   - Route-specific datasets must be placed in a `_data/` folder colocated with that route (e.g. `src/app/(home)/_data/`, `src/app/(pages)/blog/_data/`, `src/app/(pages)/cases/_data/`).
   - Shell navigation data belongs in `src/components/common/_data/navigation.js`.
   - Never dump all data into a monolithic unorganized file. Keep data cleanly colocated with the components that consume it.

7. **Clean UI Components (`src/components/ui/`)**:
   - Clean, zero-bloat components using native props and lightweight `cn` utility (no unnecessary heavy external libraries like `cva` or `@radix-ui/react-slot`).
   - `Typography.jsx`: Provides `Typography` and helper components (`H1`, `H2`, `H3`, `H4`, `H5`, `H6`, `P`) with `variant`, `weight`, and `color` props.
   - `Input.jsx`: Wrapped with `forwardRef`, supports `prefix`, `suffix`, `label`, `error`, `helperText`, and variants.
   - `Button.jsx`: Supports both default and named export (`export { Button }`), with variant, size, and rounded props.

8. **Strict Zero-Garbage Props & Lean Component Rule**:
   - Declare ONLY props that are actively used today. Never add speculative, anticipatory, or unused props (`action`, `className`, `titleClassName`, `isVisible`, `index`, etc.) "just in case".
   - If a prop is needed in the future, add it only when that feature is being built.
   - Avoid importing or wrapping classes in `cn()` in custom components when standard template literals or plain strings are sufficient.

9. **No Third-Party Reference Comments**:
   - Never add comments mentioning external templates, references, or third-party site names (e.g., "matching Wama's depth layering").
   - Code must be clean, professional, and self-documenting.
