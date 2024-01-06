## PR checklist

- [ ] **Eslint:** Ensure that `npm run lint` passes with no errors or warnings.
- [ ] **Styles:**
    1. No global styles.
    2. Root element (App component) should not have any specific styles.
    3. Utilize the MUI (Material-UI) library for styling.
    4. Prefer creating styled components using MUI or custom styling for specific classes/IDs.
    5. Define styles using `sx` prop rather than `style` prop.

- [ ] **File Naming and Folder Structure:**
    1. File naming conventions: 
        - React components in PascalCase, others in camelCase.
    2. Organize files into respective directories for each page or feature.
    3. Database types and api logic is handled in an `entities` directory.
    4. 'Pages' directory for primary page components handled by the router.
    5. Routing in a `Router.tsx` component.
    6. Prefer one React component per file.

- [ ] **General Guidelines:**
    1. Import order: React first, then other libraries, followed by custom components.
    2. Limit additional types/interfaces in `.tsx` files to main function props; place other types/interfaces in separate type files.
    3. Avoid unnecessary comments.
    4. Use either `const xxx = () => {}` for defining functions.
    5. No `console.log()` in the code.
