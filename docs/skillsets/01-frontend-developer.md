# Frontend Developer

## Role Overview

The Frontend Developer is responsible for building the user-facing interface of the JTLD Consulting Inc platform. This includes all pages, components, interactions, and visual elements that candidates and employers interact with in the browser.

## Priority

**Critical** - Phase 1

## Core Technologies

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling, layouts, animations |
| JavaScript | Client-side interactivity and logic |
| TypeScript | Type-safe JavaScript for fewer bugs |
| React.js | Component-based UI library |
| Next.js | React framework (SSR, routing, API) |
| Tailwind CSS | Utility-first CSS framework |

---

## Skills

### 1. Semantic HTML & Page Structure

**Purpose:** This skill exists to ensure every page on the platform uses correct, accessible, semantic HTML elements so that browsers, screen readers, and search engines can properly interpret the content.

**Preconditions:**
- Next.js project is initialized with the App Router (`/app` directory exists)
- A design reference or wireframe is available for the page being built
- The developer has access to the project repository

**Steps:**
1. Review the design or wireframe for the target page and identify all content regions (header, main, nav, aside, footer, sections).
2. Create the page file in the correct App Router location (e.g., `app/jobs/page.tsx`).
3. Map each content region to the correct HTML5 semantic element (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`).
4. Use heading hierarchy strictly: one `<h1>` per page, followed by `<h2>`, `<h3>`, etc. in order. Never skip heading levels.
5. Use `<ul>` / `<ol>` for lists, `<table>` for tabular data, `<form>` for input groups, `<button>` for actions, `<a>` for navigation links.
6. Add `lang` attributes where language changes, and ensure all `<img>` tags have descriptive `alt` text.
7. Validate the output by running the page in a browser, inspecting the DOM tree, and confirming no `<div>` soup exists where semantic elements should be.

**What NOT to Do:**
- Do not use `<div>` or `<span>` as a substitute for semantic elements like `<nav>`, `<main>`, or `<section>`.
- Do not skip heading levels (e.g., jumping from `<h1>` to `<h4>`).
- Do not leave images without `alt` text.
- Do not use `<a>` tags for actions that do not navigate (use `<button>` instead).
- Do not guess the page layout. Always reference the design or wireframe first.

**Done Condition:** The page DOM contains correct semantic elements for all content regions, heading hierarchy is sequential, all images have `alt` text, and the HTML validates without semantic warnings in an accessibility audit tool (e.g., axe DevTools).

---

### 2. CSS Flexbox, Grid & Responsive Layouts

**Purpose:** This skill exists to build layouts that adapt correctly from mobile (320px) through desktop (1440px+) using Tailwind CSS utility classes with Flexbox and Grid.

**Preconditions:**
- Tailwind CSS is installed and configured in `tailwind.config.ts`
- The semantic HTML structure for the page/component is already in place
- Breakpoint requirements are defined (what changes at `sm`, `md`, `lg`, `xl`, `2xl`)

**Steps:**
1. Start with the mobile layout first. Write all base styles assuming the smallest screen width (320px).
2. Use Tailwind Flexbox utilities (`flex`, `flex-col`, `flex-row`, `items-center`, `justify-between`, `gap-*`) for one-dimensional layouts (navbars, card rows, form field groups).
3. Use Tailwind Grid utilities (`grid`, `grid-cols-*`, `col-span-*`, `gap-*`) for two-dimensional layouts (job listing grids, dashboard panels, multi-column forms).
4. Add responsive modifiers in ascending order: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`. Example: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
5. Test each breakpoint by resizing the browser or using Chrome DevTools device toolbar at: 320px, 640px, 768px, 1024px, 1280px, 1536px.
6. Verify no horizontal scrollbar appears at any width. Verify no text overflows its container. Verify touch targets are at least 44x44px on mobile.

**What NOT to Do:**
- Do not design desktop-first and then try to fix mobile. Always start mobile-first.
- Do not use fixed pixel widths (`w-[500px]`) for containers that must be responsive. Use relative sizing (`w-full`, `max-w-*`).
- Do not mix Flexbox and Grid randomly. Choose one per layout context and be intentional.
- Do not assume content will always be short. Test with long text, missing text, and extra items.
- Do not skip testing at every defined breakpoint.

**Done Condition:** The layout renders correctly with no overflow, no broken alignment, and no horizontal scrollbar at all six breakpoint widths (320px, 640px, 768px, 1024px, 1280px, 1536px). Touch targets meet 44x44px minimum on mobile.

---

### 3. React Component Architecture

**Purpose:** This skill exists to build reusable, composable, and maintainable React functional components that form the building blocks of the platform UI.

**Preconditions:**
- Next.js project with TypeScript is initialized
- A `components/` directory structure is established (e.g., `components/ui/`, `components/layout/`, `components/forms/`)
- The component's purpose, props, and usage context are defined before coding begins

**Steps:**
1. Identify whether the component is a Server Component or Client Component. Default to Server Component unless it needs `useState`, `useEffect`, event handlers, or browser APIs. Add `"use client"` directive only when required.
2. Define the component's TypeScript interface for props. Export the interface. Example:
   ```tsx
   interface JobCardProps {
     title: string;
     company: string;
     location: string;
     salary?: string;
     jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | "INTERNSHIP";
     onApply?: () => void;
   }
   ```
3. Write the functional component with explicit return types. Destructure props in the function signature.
4. Keep components focused: one component does one thing. If a component exceeds 150 lines, evaluate whether it should be split.
5. Extract repeated UI patterns into shared components in `components/ui/` (e.g., `Button`, `Card`, `Badge`, `Modal`, `Input`).
6. Pass data down via props. Lift state up to the nearest common parent when two sibling components need the same data.
7. Export the component as a named export (not default export) from its file. Create an `index.ts` barrel file in each component directory.

**What NOT to Do:**
- Do not add `"use client"` to every component. Only add it when the component genuinely needs client-side interactivity.
- Do not use `any` type for props. Always define a typed interface.
- Do not put business logic inside UI components. Separate data fetching and transformation from rendering.
- Do not create components that accept more than 8-10 props. If you need that many, consider composition or a config object.
- Do not duplicate component code. If you are copy-pasting a component, extract a shared version instead.

**Done Condition:** Each component has a typed props interface, is either explicitly a Server or Client Component, renders correctly in isolation, and is importable and reusable from its barrel export. No `any` types exist in component props.

---

### 4. React Hooks (useState, useEffect, useContext, useRef, useMemo, useCallback)

**Purpose:** This skill exists to manage component state, side effects, context access, DOM references, and performance optimizations using React's built-in hooks correctly.

**Preconditions:**
- The component is marked `"use client"` (hooks only work in Client Components)
- The developer understands the component's lifecycle needs: what state it holds, what side effects it performs, what context it reads

**Steps:**
1. Use `useState` for local component state. Initialize with a typed default value. Example: `const [isOpen, setIsOpen] = useState<boolean>(false)`.
2. Use `useEffect` for side effects (fetching data on mount, subscribing to events, updating document title). Always include a dependency array. Always include a cleanup function for subscriptions and timers.
3. Use `useContext` to read values from a React Context (e.g., theme, auth session, global UI state). Never call `useContext` conditionally.
4. Use `useRef` to hold mutable values that do not trigger re-renders (DOM element references, previous values, timer IDs).
5. Use `useMemo` to cache expensive computations. Only apply when the computation is measurably slow or the result is passed as a prop to a memoized child. Example: `const filteredJobs = useMemo(() => jobs.filter(j => j.isActive), [jobs])`.
6. Use `useCallback` to memoize event handler functions that are passed as props to child components wrapped in `React.memo`.
7. After adding hooks, verify the component renders correctly, state updates reflect in the UI, effects run at the right time, and no console warnings about hook rules appear.

**What NOT to Do:**
- Do not call hooks conditionally or inside loops. Hooks must be called at the top level of the component.
- Do not omit the dependency array in `useEffect`. An effect without a dependency array runs on every render.
- Do not use `useMemo` or `useCallback` everywhere. Only use them when there is a measured performance problem or a specific need (preventing unnecessary re-renders of memoized children).
- Do not mutate state directly. Always use the setter function from `useState`.
- Do not ignore the React DevTools warning about missing dependencies in `useEffect`.

**Done Condition:** All hooks follow the Rules of Hooks (no conditional calls, no missing dependencies), `useEffect` cleanup functions are present where needed, state changes correctly re-render the component, and zero hook-related warnings appear in the browser console or React DevTools.

---

### 5. Next.js App Router (Layouts, Pages, Loading, Error Boundaries)

**Purpose:** This skill exists to structure the platform's routing, shared layouts, loading states, and error handling using Next.js App Router conventions.

**Preconditions:**
- Next.js 14+ project is initialized with the App Router (the `/app` directory is the root)
- The site map / route structure is defined (which pages exist, which routes are dynamic)

**Steps:**
1. Define the route structure in the `/app` directory. Each route is a folder with a `page.tsx` file:
   - `app/page.tsx` (home)
   - `app/jobs/page.tsx` (job listings)
   - `app/jobs/[id]/page.tsx` (job detail, dynamic route)
   - `app/dashboard/page.tsx` (user dashboard)
   - `app/auth/login/page.tsx` (login)
   - `app/auth/register/page.tsx` (registration)
2. Create `layout.tsx` files for shared UI. The root `app/layout.tsx` contains the HTML shell, global providers, header, and footer. Nested layouts (e.g., `app/dashboard/layout.tsx`) add sidebar or sub-navigation.
3. Add `loading.tsx` files in each route directory to show skeleton loaders while Server Components fetch data. Use Tailwind `animate-pulse` for skeleton UI.
4. Add `error.tsx` files (must be `"use client"`) in each route directory. Display a user-friendly error message with a "Try Again" button that calls `reset()`.
5. Add `not-found.tsx` at the root and in dynamic route directories to handle 404 cases gracefully.
6. For dynamic routes, extract params using the function signature: `export default function JobPage({ params }: { params: { id: string } })`.
7. Test every route by navigating to it directly via URL bar (not just via links) to confirm it renders correctly as a standalone page.

**What NOT to Do:**
- Do not place page components outside the `/app` directory. The App Router requires file-based routing inside `/app`.
- Do not forget `loading.tsx` for routes that fetch data. Users will see a blank screen otherwise.
- Do not forget `"use client"` on `error.tsx` files. Error boundaries must be Client Components.
- Do not hardcode IDs in dynamic route pages. Always read from `params`.
- Do not skip testing direct URL navigation. A page that only works via client-side navigation is broken.

**Done Condition:** Every defined route resolves to a rendered page. Loading states appear during data fetching. Error boundaries catch and display errors gracefully. 404 pages render for invalid routes. Direct URL navigation works for every route.

---

### 6. Server Components vs Client Components

**Purpose:** This skill exists to correctly decide which components run on the server and which run in the browser, maximizing performance by keeping as much rendering on the server as possible.

**Preconditions:**
- The developer understands the purpose of each component being built
- The component tree for the page is planned out before coding

**Steps:**
1. Default every component to Server Component (no `"use client"` directive). Server Components can fetch data directly, access the database through server-side code, and send zero JavaScript to the browser.
2. Identify components that need to be Client Components. A component MUST be a Client Component only if it uses: `useState`, `useEffect`, `useRef`, `useContext`, event handlers (`onClick`, `onChange`, etc.), browser APIs (`window`, `document`, `localStorage`), or third-party libraries that use any of these.
3. Push `"use client"` boundaries as far down the tree as possible. Example: if a page has a static header and a dynamic search bar, only the search bar component gets `"use client"`, not the whole page.
4. Pass Server Component output as `children` to Client Components when a Client Component needs to wrap server-rendered content.
5. Never import a Server Component into a Client Component. Instead, pass server-rendered content through the `children` prop or as a slot prop.
6. Verify by checking the browser's Network tab: Server Components should not appear in the JavaScript bundle.

**What NOT to Do:**
- Do not add `"use client"` to a component "just in case." Each unnecessary `"use client"` increases the client bundle size.
- Do not import server-only modules (like Prisma, `fs`, or Node.js APIs) in Client Components.
- Do not import a Server Component directly inside a file that has `"use client"` at the top.
- Do not assume all interactive elements need to be Client Components. A simple `<a>` link is interactive but does not require `"use client"`.

**Done Condition:** Every component in the tree is explicitly identified as Server or Client. Only components that genuinely use client-side APIs have the `"use client"` directive. The JavaScript bundle does not contain server-only code. The page renders correctly with no hydration mismatch errors in the console.

---

### 7. Tailwind CSS Styling & Theming

**Purpose:** This skill exists to style all platform UI using Tailwind CSS utility classes consistently, including dark mode support and a coherent design system.

**Preconditions:**
- Tailwind CSS is installed and `tailwind.config.ts` is configured with the project's custom theme (colors, fonts, spacing)
- The design system values are defined (primary color, secondary color, font family, border radius, spacing scale)

**Steps:**
1. Define the design system in `tailwind.config.ts`:
   - Custom colors: `primary`, `secondary`, `accent`, `destructive`, `muted`
   - Font families: heading and body fonts via `next/font`
   - Border radius tokens: `sm`, `md`, `lg`
   - Spacing overrides if needed
2. Apply utility classes directly in JSX. Use the pattern: layout > spacing > sizing > typography > colors > effects. Example: `className="flex items-center gap-4 p-6 w-full text-lg font-semibold text-gray-900 bg-white rounded-lg shadow-md"`.
3. Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) for breakpoint-specific styles.
4. Implement dark mode using Tailwind's `dark:` prefix. Configure `darkMode: "class"` in `tailwind.config.ts`. Add `dark:bg-gray-900 dark:text-white` variants to all relevant elements.
5. For repeated class combinations (e.g., a standard button style used 20+ times), extract them using `@apply` in a global CSS file or create a component that encapsulates the style.
6. Verify visual output across light and dark modes at all breakpoints.

**What NOT to Do:**
- Do not write inline styles (`style={{ }}`) when a Tailwind class exists for the same property.
- Do not create custom CSS files for styles that Tailwind can handle.
- Do not use arbitrary values (`w-[347px]`) unless no Tailwind spacing token matches.
- Do not forget dark mode variants on text, background, border, and shadow classes.
- Do not leave inconsistent spacing or colors across components. Use the defined design tokens.

**Done Condition:** All components are styled exclusively with Tailwind utility classes (no inline styles, no rogue CSS files). Dark mode toggles correctly without visual artifacts. The design system tokens in `tailwind.config.ts` are used consistently across all components.

---

### 8. State Management (Context, Zustand, Forms, URL State)

**Purpose:** This skill exists to manage all application state -- global UI state, complex domain state, form data, and URL-driven filter/search state -- using the right tool for each scenario.

**Preconditions:**
- The state requirements for the feature are defined: what data, who reads it, who writes it, how often it changes
- React Context, Zustand (or Jotai), and React Hook Form are installed as project dependencies

**Steps:**
1. Categorize each piece of state:
   - **Server state** (data from API): Use SWR or TanStack Query. Do not duplicate in local state.
   - **Global UI state** (theme, sidebar open/closed, toast notifications): Use React Context or Zustand.
   - **Complex domain state** (multi-step wizard, shopping cart equivalent): Use Zustand with typed slices.
   - **Form state** (input values, validation, submission): Use React Hook Form with Zod resolver.
   - **URL state** (search query, filters, pagination page number): Use `useSearchParams` from Next.js.
2. For React Context: create the context, provider, and a custom hook (`useAuth`, `useTheme`) in a dedicated file under `context/` or `providers/`. Wrap the relevant subtree in the provider inside a layout file.
3. For Zustand: define a typed store with `create<StoreType>()`. Keep actions inside the store. Example:
   ```tsx
   interface FilterStore {
     location: string;
     jobType: string;
     setLocation: (loc: string) => void;
     setJobType: (type: string) => void;
     reset: () => void;
   }
   ```
4. For React Hook Form: register every field, attach Zod validation via `zodResolver`, and handle `onSubmit` with proper loading and error states.
5. For URL state: read with `useSearchParams().get("query")`, write with `router.push` or `router.replace` to update the URL without full page reload.
6. Test each state mechanism: change the value, verify the UI updates, refresh the page, and confirm persistence behavior (URL state persists, local state resets, server state refetches).

**What NOT to Do:**
- Do not store server-fetched data in `useState`. Use a data-fetching library that handles caching and revalidation.
- Do not use Redux for this project. The platform's state complexity does not justify it.
- Do not manage form state manually with `useState` per field. Use React Hook Form.
- Do not put everything in a single global store. Separate concerns into distinct contexts or stores.
- Do not forget to test the page refresh behavior. State that should persist (URL params) must survive a refresh.

**Done Condition:** Each piece of application state is managed by exactly one appropriate mechanism. No duplicated state exists. Forms validate correctly with Zod schemas. URL state persists across page refreshes. Global UI state is accessible from any component that needs it.

---

### 9. Data Fetching (Server Actions, SWR/TanStack Query, Loading & Error States)

**Purpose:** This skill exists to fetch, cache, revalidate, and display data from the backend API with proper loading indicators and error handling on every data-dependent page.

**Preconditions:**
- Backend API endpoints are defined and functional (or mock data is available)
- The page/component that will display the data is created
- SWR or TanStack Query is installed for client-side fetching

**Steps:**
1. Determine the fetching strategy:
   - **Server Component fetch:** Use `async` Server Components with direct `fetch()` or Prisma calls for initial page data (job listings, profile data). Data is fetched at request time on the server.
   - **Server Actions:** Use for form submissions and mutations (creating a job, submitting an application). Define in a file with `"use server"` directive.
   - **Client-side fetch (SWR/TanStack Query):** Use for data that changes frequently or needs real-time updates on the client (search results as user types, notification counts).
2. For Server Component fetches: call `fetch()` with appropriate caching options (`{ cache: "no-store" }` for dynamic, or `{ next: { revalidate: 60 } }` for ISR). Handle the response inline.
3. For Server Actions: define the action function with `"use server"`, accept `FormData` or typed arguments, validate input with Zod, perform the mutation, and return a result object `{ success: boolean, error?: string }`.
4. For client-side fetching: configure the SWR/TanStack Query hook with the endpoint URL, set `revalidateOnFocus`, handle `isLoading`, `error`, and `data` states explicitly.
5. Display a loading skeleton (not a spinner) while data is being fetched. Use `loading.tsx` for route-level or inline skeleton components for section-level loading.
6. Display an error message with a retry button when fetching fails. Never show a blank screen or a raw error object.
7. Implement optimistic updates for actions where immediate UI feedback improves UX (e.g., bookmarking a job).

**What NOT to Do:**
- Do not fetch data in `useEffect` with raw `fetch()` on the client side. Use SWR or TanStack Query, which handle caching, deduplication, and revalidation.
- Do not show a spinner for initial page loads. Use skeleton loaders that match the layout shape.
- Do not swallow errors silently. Every fetch must have explicit error handling that the user can see.
- Do not fetch the same data in multiple components independently. Fetch once at the appropriate level and pass down via props or use a caching library that deduplicates.
- Do not assume the API will always return successfully. Handle network errors, 4xx, and 5xx responses.

**Done Condition:** Every data-dependent page/component shows a skeleton loader while loading, displays fetched data when available, shows a user-friendly error message with retry on failure, and does not make redundant API calls. Server Actions return structured results and trigger UI updates.

---

### 10. Performance Optimization

**Purpose:** This skill exists to ensure the platform loads fast and scores well on Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1) by applying code splitting, image optimization, memoization, and lazy loading.

**Preconditions:**
- The page or feature to optimize is functionally complete and rendered correctly
- Chrome DevTools and Lighthouse are available for measurement
- Baseline performance metrics have been recorded before optimization

**Steps:**
1. Run a Lighthouse audit in Chrome DevTools (Incognito mode, desktop and mobile). Record the baseline scores for Performance, LCP, FID/INP, CLS.
2. Optimize images: convert all images to WebP/AVIF. Use `next/image` with explicit `width` and `height` to prevent layout shift. Add `priority` prop to above-the-fold images. Use `loading="lazy"` for below-the-fold images.
3. Optimize fonts: use `next/font` to self-host fonts with `display: "swap"`. Preload only the weights and styles actually used.
4. Code split: use `next/dynamic` with `{ ssr: false }` for heavy client-only components (rich text editors, chart libraries, maps). This keeps them out of the initial bundle.
5. Memoize expensive computations with `useMemo`. Memoize callback props with `useCallback`. Wrap child components in `React.memo` when they receive stable props but their parent re-renders frequently.
6. Reduce bundle size: run `npx next build` and inspect the output. Identify pages or chunks over 100KB. Replace heavy libraries with lighter alternatives if possible.
7. Re-run Lighthouse after each optimization. Compare scores to the baseline. Continue until targets are met.

**What NOT to Do:**
- Do not optimize before measuring. Always record baseline metrics first.
- Do not apply `React.memo`, `useMemo`, or `useCallback` everywhere. Only use them when profiling shows unnecessary re-renders or slow computations.
- Do not use unoptimized `<img>` tags. Always use `next/image`.
- Do not load large third-party scripts synchronously in the `<head>`. Use `next/script` with `strategy="lazyOnload"`.
- Do not guess what is slow. Use the Lighthouse report and Chrome Performance tab to identify actual bottlenecks.

**Done Condition:** Lighthouse Performance score is 90+ on both desktop and mobile. LCP < 2.5s, INP < 200ms, CLS < 0.1. No image without `next/image`. No unoptimized fonts. Build output shows no individual page bundle exceeding 200KB.

---

### 11. Accessibility (WCAG 2.1 AA Compliance)

**Purpose:** This skill exists to make every page on the platform usable by people with disabilities, including keyboard-only users, screen reader users, and users with low vision, meeting WCAG 2.1 AA standards.

**Preconditions:**
- The page/component is functionally complete and visually styled
- axe DevTools browser extension is installed
- A screen reader is available for testing (VoiceOver on macOS, NVDA on Windows)

**Steps:**
1. Run axe DevTools on every page. Fix all "Critical" and "Serious" issues. Record the remaining issues for review.
2. Verify keyboard navigation: press Tab through every interactive element on the page. Confirm the focus order is logical (top-to-bottom, left-to-right). Confirm every interactive element (links, buttons, inputs, dropdowns) is reachable and operable via keyboard.
3. Add visible focus indicators: ensure every focusable element has a clear `focus:ring-2 focus:ring-primary focus:outline-none` style.
4. Add ARIA attributes where semantic HTML is insufficient:
   - `aria-label` for icon-only buttons
   - `aria-expanded` for collapsible sections
   - `aria-live="polite"` for dynamic content updates (toast notifications, search result counts)
   - `role="dialog"` and `aria-modal="true"` for modals
5. Check color contrast: all text must meet 4.5:1 ratio (normal text) or 3:1 ratio (large text) against its background. Test in both light and dark modes.
6. Test with a screen reader: navigate the page using only the screen reader. Verify all content is announced, form labels are read, and dynamic updates are spoken.
7. Ensure all form inputs have associated `<label>` elements or `aria-label`. Ensure error messages are linked to their input via `aria-describedby`.

**What NOT to Do:**
- Do not add ARIA attributes that duplicate native HTML semantics (e.g., `role="button"` on a `<button>`).
- Do not remove focus outlines for aesthetic reasons. They are critical for keyboard users.
- Do not rely solely on color to convey information (e.g., red for errors). Always include text or icons too.
- Do not skip screen reader testing. Automated tools catch only ~30% of accessibility issues.
- Do not assume accessibility is a final step. Build it in from the start of each component.

**Done Condition:** axe DevTools reports zero Critical and zero Serious issues on every page. All interactive elements are keyboard-navigable with visible focus indicators. Color contrast passes 4.5:1 for normal text. Screen reader navigation produces coherent, complete narration of all page content and actions.

---

### 12. Testing (Jest, React Testing Library, Storybook)

**Purpose:** This skill exists to verify that components render correctly, respond to user interaction as expected, and do not regress when code changes, using automated unit tests, component tests, and visual documentation.

**Preconditions:**
- Jest and React Testing Library are installed and configured in the project
- The component to be tested is complete and functional
- Test file naming convention is established (e.g., `ComponentName.test.tsx` alongside the component)

**Steps:**
1. For each component, create a test file: `ComponentName.test.tsx` in the same directory as the component.
2. Write a "renders without crashing" test first:
   ```tsx
   import { render, screen } from "@testing-library/react";
   import { JobCard } from "./JobCard";

   test("renders job title", () => {
     render(<JobCard title="Software Engineer" company="JTLD" location="Remote" jobType="FULL_TIME" />);
     expect(screen.getByText("Software Engineer")).toBeInTheDocument();
   });
   ```
3. Write interaction tests: simulate user actions with `fireEvent` or `userEvent` and assert the expected outcome. Example: clicking "Apply" calls the `onApply` prop.
4. Write conditional rendering tests: verify that optional props (like `salary`) show or hide elements correctly.
5. Write edge case tests: empty arrays, missing optional props, very long strings, special characters.
6. For visual documentation, create Storybook stories for each reusable UI component. Define stories for each variant (default, with optional props, loading state, error state, disabled state).
7. Run the full test suite with `npm test` or `npx jest`. Fix any failures. Verify coverage meets the project minimum (aim for 80%+ on UI components).

**What NOT to Do:**
- Do not test implementation details (internal state values, private functions). Test what the user sees and does.
- Do not use `container.querySelector` to find elements. Use `screen.getByRole`, `screen.getByText`, or `screen.getByLabelText` to query the way a user would.
- Do not skip edge case tests. The most common bugs come from unexpected input.
- Do not write tests that pass regardless of the component's behavior (e.g., always-true assertions).
- Do not mock everything. Only mock network requests and external dependencies, not internal component logic.

**Done Condition:** Every reusable component has a test file with at least: a render test, an interaction test (if interactive), and an edge case test. All tests pass with `npm test`. Storybook stories exist for all shared UI components. Test coverage is 80%+ for components.

---

### 13. Building the Landing Page

**Purpose:** This skill exists to build the platform's home page with a hero section, feature highlights, call-to-action buttons, and trust indicators that effectively convert visitors into registered candidates and employers.

**Preconditions:**
- The root layout (`app/layout.tsx`) is set up with global styles, fonts, and navigation
- Reusable UI components (Button, Card) are available in `components/ui/`
- Design or wireframe for the landing page is available
- Header and Footer components exist

**Steps:**
1. Create `app/page.tsx` as a Server Component (no client-side state needed for static content).
2. Build the Hero section: large headline ("Find Your Next IT Opportunity" or similar), subheadline, and two CTA buttons ("Find Jobs" linking to `/jobs`, "Post a Job" linking to `/auth/register?role=employer`).
3. Build the Features section: 3-4 cards highlighting platform benefits (e.g., "Curated IT Jobs," "Smart Matching," "Fast Hiring Process"). Use a responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
4. Build the "How It Works" section: 3 numbered steps for candidates and/or employers.
5. Build a Stats/Trust section: display key numbers (jobs posted, candidates placed, companies served) using placeholder data that will later be replaced by API data.
6. Add a final CTA section at the bottom encouraging sign-up.
7. Ensure the page is fully responsive, all links work, images use `next/image`, and the page passes Lighthouse audit with 90+ Performance score.

**What NOT to Do:**
- Do not use `"use client"` on the landing page unless a specific section requires interactivity.
- Do not hardcode stats that look like real data without marking them as placeholders in the code (add a `// TODO: Replace with API data` comment).
- Do not forget the mobile layout. Test at 320px width.
- Do not add animations that increase CLS or delay LCP.

**Done Condition:** The landing page renders at `/`, contains Hero, Features, How It Works, Stats, and Final CTA sections. All links navigate correctly. The page is responsive from 320px to 1536px. Lighthouse Performance score is 90+. No `"use client"` directive unless justified.

---

### 14. Building the Job Listing Page

**Purpose:** This skill exists to build the job search and listing page where candidates can browse, search, filter, and paginate through available job postings.

**Preconditions:**
- The `GET /api/jobs` endpoint is functional and returns paginated, filterable job data
- `JobCard` component exists and is tested
- The URL state management approach is decided (using `useSearchParams`)

**Steps:**
1. Create `app/jobs/page.tsx`. Fetch initial job data as a Server Component using search params from the URL.
2. Build a search bar component (`"use client"`) that updates the URL search param `?query=` on form submit or after a debounced input change (300ms debounce).
3. Build filter components (`"use client"`) for: location, job type (Full-time, Part-time, Contract, etc.), salary range. Each filter updates its corresponding URL search param.
4. Display job results in a responsive grid of `JobCard` components. Show the total result count.
5. Build pagination controls: "Previous" and "Next" buttons plus page numbers. Update the `?page=` URL param. Disable "Previous" on page 1, disable "Next" on the last page.
6. Show a skeleton loader grid while data is loading. Show an "empty state" message ("No jobs match your search") when results are empty.
7. Ensure the entire search/filter/pagination state is in the URL so that users can bookmark, share, and refresh without losing their place.

**What NOT to Do:**
- Do not store search, filter, or pagination state in `useState` only. It must be in the URL.
- Do not fetch all jobs at once. Use server-side pagination.
- Do not forget the empty state. A blank page with no jobs is confusing.
- Do not debounce too aggressively (>500ms feels sluggish) or too little (<100ms creates too many requests).
- Do not reset filters when paginating. Filters and page number must coexist in the URL.

**Done Condition:** The page loads with job listings from the API. Searching updates results and the URL. Each filter updates results and the URL. Pagination navigates between pages without losing filters. Refreshing the page preserves the exact search/filter/page state. Empty state displays when no results match. Skeleton loaders appear during data fetching.

---

### 15. Building Forms (Registration, Profile, Job Posting)

**Purpose:** This skill exists to build validated, accessible forms for candidate registration, employer registration, user profile editing, and job posting that submit data to the backend reliably.

**Preconditions:**
- React Hook Form and Zod are installed
- The corresponding API endpoints (registration, profile update, job create/update) are defined
- Form field requirements are specified (which fields are required, validation rules, field types)

**Steps:**
1. Define the Zod schema for the form. Example for registration:
   ```tsx
   const registerSchema = z.object({
     firstName: z.string().min(1, "First name is required"),
     lastName: z.string().min(1, "Last name is required"),
     email: z.string().email("Invalid email address"),
     password: z.string().min(8, "Password must be at least 8 characters"),
     role: z.enum(["CANDIDATE", "EMPLOYER"]),
   });
   ```
2. Initialize React Hook Form with `zodResolver`:
   ```tsx
   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
     resolver: zodResolver(registerSchema),
   });
   ```
3. Build the form JSX: each field gets a `<label>`, an `<input>` with `{...register("fieldName")}`, and a conditional error message `{errors.fieldName && <p>{errors.fieldName.message}</p>}`.
4. Style error states: red border on invalid inputs (`border-red-500`), error message text in red below the field.
5. Handle submission: call the API endpoint in the `onSubmit` handler, show a loading state on the submit button (`isSubmitting`), display success feedback (redirect or toast), and display server-side errors if the API returns them.
6. Add `aria-invalid` and `aria-describedby` attributes to inputs for accessibility.
7. Test the form: submit with empty fields (all errors show), submit with invalid data (specific errors show), submit with valid data (success flow completes).

**What NOT to Do:**
- Do not build forms with uncontrolled `useState` per field. Use React Hook Form.
- Do not validate only on the client. The API must also validate. But do validate on the client first for instant feedback.
- Do not display raw API error messages to the user. Map them to user-friendly strings.
- Do not forget to disable the submit button while submitting to prevent double submissions.
- Do not skip testing the error states. If errors do not display, the form is broken.

**Done Condition:** The form renders all required fields with labels. Client-side validation fires on submit and displays field-level error messages. The submit button shows loading state during submission. Successful submission triggers the correct API call and navigates the user or displays success feedback. Server errors are caught and displayed. The form is keyboard-navigable and screen-reader-accessible.

---

### 16. Navigation, Header & Footer Components

**Purpose:** This skill exists to build the platform's persistent navigation, header, and footer that appear on every page, adapt to authentication state, and are fully responsive.

**Preconditions:**
- The root layout (`app/layout.tsx`) is the insertion point for Header and Footer
- Authentication context or session hook is available (`useSession` from NextAuth.js)
- The route structure is finalized so navigation links are known

**Steps:**
1. Create `components/layout/Header.tsx`. Include: logo (links to `/`), main navigation links (Jobs, About, Contact), and auth-dependent controls (Login/Register buttons when logged out; user avatar dropdown with Dashboard/Profile/Logout when logged in).
2. Make the Header responsive: desktop shows a horizontal nav bar; mobile (below `md:`) shows a hamburger button that toggles a slide-out or dropdown mobile menu. The mobile menu is a `"use client"` component with `useState` for open/close.
3. Create `components/layout/Footer.tsx`. Include: copyright notice, navigation links (About, Privacy Policy, Terms, Contact), and social media links. Use a responsive grid layout.
4. Import Header and Footer in `app/layout.tsx` so they appear on every page.
5. Highlight the active navigation link by comparing `usePathname()` with each link's `href`. Apply a distinct style (underline, bold, or color change) to the active link.
6. Test: verify Header/Footer render on every page, mobile menu opens/closes correctly, active link highlights correctly, login/logout state switches controls correctly, all links navigate to the right routes.

**What NOT to Do:**
- Do not put the entire Header in `"use client"`. Only the mobile menu toggle and auth-dependent dropdown need client-side logic. Keep the rest as Server Components or static markup.
- Do not hardcode navigation links as strings. Define them in an array and map over them for maintainability.
- Do not forget the mobile menu. A non-functional hamburger icon is worse than no mobile menu at all.
- Do not forget to close the mobile menu when a link is clicked.
- Do not forget the active link indicator. Users need to know where they are.

**Done Condition:** Header and Footer appear on every page. Desktop navigation shows all links horizontally. Mobile navigation shows a hamburger that opens a functional menu. Auth state correctly toggles between Login/Register and User Dropdown. Active page link is visually distinct. All links navigate correctly. Footer displays on every page below the main content.

---

### 17. Reusable UI Components (Buttons, Cards, Modals, Tables)

**Purpose:** This skill exists to create a library of shared, typed, styled, and accessible UI components that are used consistently throughout the platform to maintain visual and behavioral coherence.

**Preconditions:**
- `components/ui/` directory exists
- The design system (colors, spacing, typography, border radius) is defined in `tailwind.config.ts`
- Component requirements are gathered from the pages that will use them

**Steps:**
1. Build `Button` component: accepts `variant` ("primary", "secondary", "outline", "ghost", "destructive"), `size` ("sm", "md", "lg"), `isLoading`, `disabled`, `children`, and native button props. Uses `<button>` element. Shows a spinner when `isLoading`.
2. Build `Card` component: accepts `children`, optional `className` for overrides. Provides consistent padding, border, rounded corners, shadow.
3. Build `Modal` component: accepts `isOpen`, `onClose`, `title`, `children`. Uses `<dialog>` element or a portal. Traps focus inside when open. Closes on Escape key and backdrop click. Adds `role="dialog"` and `aria-modal="true"`.
4. Build `Table` component: accepts typed `columns` definition and `data` array. Renders `<table>` with `<thead>` and `<tbody>`. Supports sortable columns and optional pagination.
5. Build `Input` component: wraps `<input>` with label, error message slot, and Tailwind styling. Forwards `ref` for React Hook Form integration.
6. Build `Badge`, `Select`, `Textarea`, `Avatar`, `Skeleton` components following the same pattern.
7. Export all components from `components/ui/index.ts` as named exports.
8. For each component, test it in isolation: render with all prop variants, verify keyboard interaction, verify screen reader output.

**What NOT to Do:**
- Do not create UI components that are tightly coupled to a specific page's data. Keep them generic.
- Do not skip the `disabled` and `loading` states. Incomplete components cause bugs downstream.
- Do not forget `forwardRef` on Input components. React Hook Form requires ref access.
- Do not build modals that cannot be closed with the Escape key. This is an accessibility requirement.
- Do not duplicate styling logic. If two components share a style pattern, extract it into a shared Tailwind class or utility.

**Done Condition:** Each UI component is exported from `components/ui/index.ts`, accepts typed props, renders all variants correctly, is keyboard-accessible, and is used consistently across the platform pages. Modals trap focus and close on Escape. Buttons show loading and disabled states. Inputs forward refs and display error messages.

---

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [MDN Web Docs](https://developer.mozilla.org)
- [Web.dev Learn](https://web.dev/learn)

## Tools

- VS Code (code editor)
- React Developer Tools (browser extension)
- Tailwind CSS IntelliSense (VS Code extension)
- ESLint and Prettier (code formatting)
- Chrome DevTools (debugging and performance)
- Figma (design handoff)
