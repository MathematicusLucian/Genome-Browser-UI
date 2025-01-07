# Genoics-Browser-UI 🔬🧬

## Overview

The GenomeSearch scans/analyses DNA files from popular family tree providers (23andMe, Ancestry.com, etc.), comparing the genome of the user with published literature on health risks/conditions that their [gene variants](https://en.wikipedia.org/wiki/Human_genetic_variation) are correlated to. SNP data is sourced from several sources, i.e. SNPedia, Ensembl, and GProfiler.

For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser **IndexedDB**.) The SNP data from published literature is provisioned by the server.

- This repo is the **React**-based (TypeScript) UI client application (with **NextJs**), and which queries the GenomeSearch API.
- The API/Orchestrator for this project is here: [GenomeSearch API](https://github.com/MathematicusLucian/Genome=Search-API).

### Objectives

DNA files from popular family tree providers (23andMe, Ancestry.com, etc.) are long text files that lack meaning (unless someone had memorised SNP ids, and the associated published literature.)

1. A dashboard UI (grids/tables, charts, etc.) to browse DNA files. Present the major/minor alleles of gene variants, their associated gene, chromosome position, etc..

2. **Long-term**: Cronjob to trigger Python script to download and parse weekly [VCF](./assets/VCFv4.1.pdf) releases of CIViC and ClinVar data, and upload such to a Postgres database. Separate tables will be generated for genome builds [GRCh37](https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000001405.13/) and [GRCh38](https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_000001405.26/) (Genome Reference Consortium Human genome builds 37, and 38; also known as hg38; these builds relate to the [1000 genome project](https://www.internationalgenome.org/human-genome-structural-variation-consortium/)), as well as for mono-allelic variants and complex multi-allelic variants. Rhe tables will be augmented with allele frequencies from the ExAC and gnomAD datasets as these are often consulted when analyzing ClinVar variants.

![chromosomes.png](./assets/chromosomes.png)

3. Compare the DNA file to published literature, i.e. generate a report of the potential health conditions/risks associated with the gene varients that the patient's genome features.

**This also serves to demonstrate:**

- **React** UI app
  - **React Provider**/**Context**, e.g. Dark/Light mode
  - Custom Hooks
- **NextJs** App Router
  - Advanced routing for seamless navigation and performance
  - **React Server Components (RSCs)** and **Server Actions** for server-side rendering and increased performance
  - Middleware to handle API calls
- UI Library: **shadncn/ui**
  - Styling with **Tailwind CSS**
  - Component primitives from **Radix UI** for accessibility and flexibility
- Micro-frontends:
  - **Modular design**: `Single-spa` is ingeniously crafted to be modular, enabling the development of small, independent applications that seamlessly integrate to form a more extensive application.
  - **Framework-agnostic**: `Single-spa` is not confined to any specific front-end framework, granting you the freedom to employ your preferred framework for constructing micro-frontends.
  - **Dynamic loading**: With `Single-spa`, micro-frontends can be dynamically loaded, allowing on-demand loading to minimise the initial load time of your application.
  - **Flexible routing**: `Single-spa` features a versatile routing system, empowering you to define the precise manner in which your micro-frontends are loaded and unloaded.
  - **Shared dependencies**: `Single-spa` facilitates the sharing of dependencies among micro-frontends, significantly reducing the overall size and complexity of the application.
- State Management;
  - **Redux** with **RTK** patterns, and **Axios**. (Alternatives: Zustand, Jotai, or Recoil.)
- **REST**ful and **WebSocket** connections for real-time, low-latency communication.
- Dashboard:
  - Dynmically-composed, lazy-loaded dashboard pages (routes)
    - `patient ID` retrieved from the router path
    - Data retrived at route/page level
    - Render high-level components (templates/organisms, etc.)
    - On render of these, inject into them low-level component (molecules, atoms, etc.) featuring the data. (Employed **shadncn/ui** for the atoms.)
  - `ag-grid` to present list of patients, and to present list of gene variants
    - Select (dropdowns) to filter the table
    - Integrate the column filters
    - Pagination (and that handles data enrichment of local DNA file in IndexedDB with ClinVar notes from server)
  - Drawer (e.g. details for a gene variant)
  - Graphical charts, e.g. bar chart, or some form of gene/genome/chromosome represetation
  - Modal (e.g. file uploader implementation)
  - File uploader
  - CRUD operations on patients, and genomes (DNA files), e.g. add a patient. (DNA file upload features gene variants; the user cannot add the variants individually; nor can they edit the ClinVar notes, which are from published literature.)
- Data Persistence:
  - **IndexedDB**: For security reasons, the user's patient data is not shared to the server, but remains on their machine (in the web browser `IndexedDB`.) (See section below on `Dexie.js`, etc..)
  - **Sqlite3**, and a Sqlite worker (server-side for storage of uploaded clinVar data, etc.; alternatively, Postgres may be employed.)
  - Vercel **Postgres** powered by **Neon** for saving chat history and user data
    - ORM: **Drizzle** (Alternatives: Prisma)
- User Management:
  - Login / Sign-out pages (routes)
  - Authenticiation:
    - **NextAuth.js**: Simple and secure authentication
    - Email/password authentication with JWTs stored to cookies
    - SSO: **Github** integration
- Consideration of `DRY/SOLID principles`, and `Gang of Four design patterns`

**Long-term**

May potentially add:

- UI Views
  - Marketing landing page (/) with animated Terminal element
  - Perhaps a demo Payments page to demosntrate **Stripe** integration
  - Admin dashboards:
    - List of users / user view + payment status
    - Subscription management with **Stripe Customer Portal**
    - Multi-tenancy: List of tenants / tenant view (and respective domain details)
- UI Components:
  - **Storybook**, **Mermaids UML**, etc. documentation
  - Consider **CSS-in-TS** libraries such as **Stitches** and **Vanilla Extract** (instead of Tailwind CSS), or move to **CVA** for a consistent, reusable, and atomic design system
  - Components coupling and cohesion graph (Madge library)
- UI Middlewware:
  - Global middleware to protect logged-in routes
  - Local middleware to protect **Server Actions** or validate **Zod** schemas
- User accounts/membership management (basic `RBAC` with Owner and Member roles)
  - Dashboard pages with `CRUD` operations on users/teams
  - Payments integraton, e.g. **Stripe**, inc. set up a production Stripe webhook
  - Multi-tenancy
  - Custom domains
- ETL Pipelines
  - **Apache Spark** (Python), etc. to update **Postgres** as per ClinVar weekly updates
- LLM model integration
  - **OLlama**, **HuggingFace API**, etc.
- Data Persistence
  - Save search history to **IndexedDB**
  - Option to upload genome data to server (Postgres); and therefore, injection of database manager (**Postgres**, or **IndexedDB**)
  - **Vercel Blob** for efficient file storage (if user opts for the DNA file to be stored/processed on the server, could save it here on load; and add to a queue for conversion)
- Observability/Logging:
  - Open **Telemetry** integration for seamless UI monitoring
  - Activity logging system for any user events
- Env var management:
  - **T3 Env** (checks type validation and transforming at build time)
- Code dependencies management:
  - **Patch-package**, **Renovate BOT**, etc.; absolute imports
- Code Quality
  - **Husky**, **Prettier**, **ESLint**, **ts-reset**, conventional commits git hook, etc. checks before commit/push
  - Bundle analyzer plugin, **Lighthouse** score, etc..
  - Expand **Pydantic** utilisation in the **FastAPI**
- Testing:
  - Expand unit and integration tests (**Jest**, **React-Testing-Library**, etc.)
  - e2e (**Playwright** - UI, and headless modes)
  - Smoke testing to verify UI renders correctly (**Storybook**; where stories written in `TSX`, not `MDX`)
  - Acceptance tests, e.g. that validation for form inputs works as expected (**Storybook**'s play function)
- Deployment
  - Deployment pipeline/**GitHub Actions**, etc.; semantic release
  - Local **Docker** instance/`Dockerfile`

## Pages/Views

### Health Risk/Correlation Report (`patient/report/`)

The report compares the gene variants of the patient with published literature to indiciate which of their respective SNPs are associated with health conditions.

_(Note, the image below features mock data; this is not actual SNP data.)_

![risk_report_dark_mode.png](./assets/risk_report_dark_mode.png)

Light mode:

![risk_report_light_mode.png](./assets/risk_report_light_mode.png)

Theme toggle:

![theme_toggle.png](./assets/theme_toggle.png)

### Browse gene variants (SNPs) present in the patient genome (`patient/genome/`)

From the dropdown, the user can select which profile to view:

![select_patient](./assets/select_patient_profile.png)

**Upload a DNA test results (VCF) file**

A drag-and-drop file uploader feature:

![uploader_view](./assets/uploader_view.png)

If a patient file does not exist, the user is prompted to create one (the default name is `Default Profile`.)

The patient software allows for the upload of several DNA files per patient, as they potentially could have several such as files, as there are many popular family tree providers (23andMe, Ancestry.com, etc..)

![select_dna_file](./assets/select_dna_file.png)

**The rows represent the gene variants associated with the patient.**

(The `rsid` columns is the identifier for the SNP pairs; and a crucial factor in many cases, with respect to risk, is the `genotype` that the user has inherited from their parents - hence, generaly, this consists of two letters, i.e. one from each parent.)

![genome_viewer_dark_mode](./assets/genome_viewer_dark_mode_.png)

Light mode:

![genome_viewer_light_mode_](./assets/genome_viewer_light_mode_.png)

If a user clicks on a row, the app will launch a drawer featuring the details for the gene variant.

![gene_variant_details](./assets/gene_variant_details.png)

### List of Patients (`patient/list/`)

Patient genomes that the user has uploaded.

![list_of_patients_dark_mode](./assets/list_of_patients_dark_mode.png)

Light mode:

![list_of_patients_light_mode](./assets/list_of_patients_light_mode.png)

## UI Client Architecture

The GenomeSearch UI leverages the powerful features of Next.js to build a robust and scalable web application. Below is an overview of the key architectural components and patterns used in this project.

### Key Features

1. **File-based Routing**: Next.js uses a file-based routing system, where each file in the `pages` directory corresponds to a route in the application. This simplifies the creation and management of routes.

2. **Dynamic Routing**: Dynamic routes are created using square brackets in the file names, allowing for the creation of routes with parameters. For example, `pages/patient/[patient_id].tsx` handles routes like `/patient/1`.

3. **API Routes**: Next.js allows the creation of API endpoints within the `pages/api` directory. These endpoints can be used to handle server-side logic and interact with external APIs or databases.

4. **Static Generation (SSG)**: Next.js supports static generation, allowing pages to be pre-rendered at build time. This improves performance and SEO. The `getStaticProps` and `getStaticPaths` functions are used to fetch data and generate static pages.

5. **Server-side Rendering (SSR)**: For pages that require dynamic data fetching at request time, Next.js supports server-side rendering. The `getServerSideProps` function is used to fetch data on each request.

6. **Client-side Rendering**: Next.js also supports client-side rendering for interactive pages. The `useEffect` hook is used to fetch data on the client side after the initial render.

7. **API Integration**: The application integrates with the GenomeSearch API to fetch genome data. API calls are made using the `fetch` API within `getStaticProps`, `getServerSideProps`, or `useEffect` depending on the rendering strategy.

8. **State Management**: React's `useState` and `useEffect` hooks are used for managing local component state and side effects. For more complex state management, libraries like **Redux** (or, alternatively, **Context API**) can be integrated.

- `Immutability in Reducers`: **Redux Toolkit(RTK)** uses **Immer** under the hood, allowing "mutations" directly on state, which is internally handled immutably.
- `useDispatch`: dispatch is used to trigger actions, which in turn update the Redux state based on reducers.
- `useSelector`: Used to select and read values from the Redux state. The state is typically structured in a way where each slice of state is keyed by the name of the reducer (e.g., state.patients).
- `RootState`: This is the TypeScript type for the root state of your Redux store. It helps TypeScript infer the structure of your state. Define it in your store setup:

### Directory Structure

The project follows a structured directory layout to organise the codebase efficiently:

- `/api`
- `/components`
  - `Layout.tsx`: [Layout component for consistent page structure]
  - `TableGrid.tsx`: [Component for displaying data in a table grid]
  - etc.
- `/context`
- `/database`
- `/models`
- `/pages`: Routes/Views
  - `/api`: [API routes for server-side logic]
    - etc.
  - `/patient`: [[...params]].tsx [Dynamic route for patient data]
    - etc.
  - `_app.tsx`: [Custom App component]
  - `index.tsx`: [Home page]
- `/providers`
- `/public`: [Static assets like images, icons, etc.]
- `/services`: [Service functions for API calls and business logic]
- `/state`
- `/styles`: [CSS and SCSS files for styling]
- `/types`
- `/utils`: [Utility functions and helpers]

## IndexedDB

![IndexedDB diagram](./assets/indexeddb.png)

### Dexie,js

Relative to the `IndexedDB` native API, the [`Dexie.js`](https://dexie.org/) wrapper (a promise-based API) provides simplicity and ease of interaction (for TypeScript/JavaScript apps.) It is a clean and efficient way to manage IndexedDB with `Dexie.js` in a `React` and `Next.js` environment.

**Dexie.js Schema**: The `chromosomeName` is defined as the primary key of the object store, ensuring that if a record with the same chromosomeName already exists, it won't be inserted again.

**Database Name**: `patientsIndexedDb`

![IndexedDB in Dev Tools](./assets//dev_tools_indexeddb.png)

**Demo data**:

- To populate tables, e.g. chromosomes, patient profiles, patient genomes/gene varients, etc., if empty. Before adding new data, we check if the table already contains any records using `count`, e.g. `patientsIndexedDb.chromosome.count()`. If the count is 0, that means no records exist and we proceed with adding the data.
- The function `addChromosomesIfNotExist` is called inside a `useEffect` hook, ensuring that the check and insertion happen when the component is loaded. This allows performance of a database update when the page is initialized, but this can also be triggered as the action following any React app event.
  ```shell
  useEffect(() => {
    addChromosomesIfNotExist();
  }, []
  ```
- **Versioning and Object Store Creation:** The first time the app is run, the object store will be created, i.e. `patientsIndexedDb.version(1).stores`. If the object store already exists (i.e., it's the same version), it won't be recreated.
- **Efficient Checks**: Instead of directly checking the presence of the table, this method checks if the table is empty by counting existing records. This ensures that the `bulkPut` operation only happens if the table is empty.

**Other**:

- **Schema Upgrades:** When you upgrade the schema (e.g., by increasing the version number in `patientsIndexedDb.version(...)`), the onupgradeneeded event is triggered, allowing you to modify the schema (e.g., adding or modifying object stores/indexes).
- **Overwriting Records**: If there is a unique key such as `chromosomeName` as the primary key, calling `bulkPut` will overwrite any existing record with the same key. This means if you have a row with `chromosomeName: 'Chromosome 1'` already in the table, calling `bulkPut` with the same `chromosomeName` will update the existing record rather than creating a duplicate.
- **Error Handling**: Any errors in adding chromosomes are caught in the catch block and logged to the console.

### Chrome local storage memory

[Chrome Offline Storage](https://developer.chrome.com/docs/apps/offline_storage/)

```shell
navigator.webkitPersistentStorage.queryUsageAndQuota (
    function(usedBytes, grantedBytes) {
        console.log('we are using ', usedBytes, ' of ', grantedBytes, 'bytes');
    },
    function(e) { console.log('Error', e);  }
);
```

or
`'indexedDB' in window` in the Chrome Dev Tools' Console.

Request memory increase:

```shell
var requestedBytes = 1024*1024*280;
navigator.webkitPersistentStorage.requestQuota (
    requestedBytes, function(grantedBytes) {
        console.log('we were granted ', grantedBytes, 'bytes');

    }, function(e) { console.log('Error', e); }
);
```

## Getting Started

- `npm run dev`: Starts the development server. Browse to `http://127.0.0.1:3000/`.
- Force shutdown Node/Python app running locally: Find `psid` with the command `lsof -i :3000` (or `8000` for the FastAPI backe-end), then `kill -9 [psid]`.
- `npm run build`: Builds the app for production.
- `npm start`: Runs the built app in production mode.

### Environment Variables

**Locally**:
Set up the environment variables (defined in `.env.example`.)

_Note: You should not commit your .env file or it will expose secrets that will allow others to control access._

```bash
cp .env.example .env
```

**Environment Variables on Vercel**:

- Install Vercel CLI: `npm i -g vercel`
- Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
- Download environment variables: `vercel env pull`, then `pnpm install`, and `pnpm dev`
