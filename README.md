# MicroBank: Microfrontend Practice

A practice project for learning **microfrontend architecture**. I'm building a small demo banking app called **MicroBank**, split into separate React apps that are developed and run on their own, then put together in the browser at runtime with **Module Federation**.

> Everything here is fictional. No real accounts or money are involved, and transfers are only simulated.

## What is a microfrontend?

A microfrontend architecture splits a frontend into smaller, independently built and deployed apps, the way microservices split a backend. A **host** (also called a shell) app loads **remote** apps over the network and renders them as if they were part of one application.

This project uses [`@module-federation/vite`](https://github.com/module-federation/vite) so that:

- each remote exposes one component through a `remoteEntry.js` file,
- the host imports those components with `lazy(() => import("dashboard/Dashboard"))`,
- `react` and `react-dom` are **shared**, so the page loads only one copy of React.

## Architecture

The host is now only a shell. Every page is its own remote.

```text
  ┌────────────────────────────────────────────────────────────────────┐
  │                      microbank (host / shell)                      │
  │                       http://localhost:5000                        │
  │                                                                    │
  │                  Sidebar · Topbar · notifications                  │
  └───────┬─────────────────┬─────────────────┬─────────────────┬──────┘
          │                 │                 │                 │   remoteEntry.js
          ▼                 ▼                 ▼                 ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  dashboard   │  │ transactions │  │  transfers   │  │   profile    │
  │    :5001     │  │    :5004     │  │    :5002     │  │    :5003     │
  │   exposes    │  │   exposes    │  │   exposes    │  │   exposes    │
  │ ./Dashboard  │  │./Transactions│  │ ./Transfers  │  │  ./Profile   │
  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

| App | Role | Port | What it contains |
| --- | --- | --- | --- |
| [`microbank/`](microbank/) | Host / shell | 5000 | App layout, sidebar navigation, top bar and the toast notification. Loads all four remotes. |
| [`dashboard-remote/`](dashboard-remote/) | Remote (`dashboard`) | 5001 | Account overview: balance card, monthly income and expenses, recent transactions. |
| [`transfers-remote/`](transfers-remote/) | Remote (`transfers`) | 5002 | Transfer form with validation that simulates sending money. |
| [`profile-remote/`](profile-remote/) | Remote (`profile`) | 5003 | Fictional customer details. |
| [`transactions-remote/`](transactions-remote/) | Remote (`transactions`) | 5004 | List of recent account activity. |

The remote URLs are configured in [`microbank/vite.config.ts`](microbank/vite.config.ts).

### Host to remote communication

The Transfers remote takes an `onTransferComplete(message)` callback prop. When a simulated transfer succeeds, the remote calls the callback, and the host shows a notification. This is a simple example of a remote passing events back to the host through props.

### Types for remote modules

TypeScript types for the four remote modules are written by hand in [`microbank/src/remotes.d.ts`](microbank/src/remotes.d.ts). The plugin's automatic type generation is turned off (`dts: false`) in every app. When a remote's props change, update this file too.

### Loading states

The remotes are rendered inside one `<Suspense>` boundary in the host ([`microbank/src/App.tsx`](microbank/src/App.tsx)), so the user sees a "Loading … Remote" panel while the current page's remote code is fetched.

### Style isolation

Each remote ships its own CSS and prefixes every class with its name (`dashboard-mfe__`, `transfers-mfe`, `profile-mfe__`, `transactions-mfe__`). The host's `App.css` only styles the shell, so styles don't leak between apps.

## Features

- **Overview** (remote): balance, income and expenses, recent activity
- **Transactions** (remote): list of recent account activity
- **Transfers** (remote): simulated transfer form with validation and a success notification
- **Profile** (remote): fictional customer details

## Tech stack

- React 19 + TypeScript
- Vite 8
- `@module-federation/vite`
- ESLint

## Running locally

Install dependencies in each app:

```bash
for app in dashboard-remote transfers-remote profile-remote transactions-remote microbank; do
  (cd "$app" && npm install)
done
```

Start each app in its own terminal. Start the remotes first so the host can find their `remoteEntry.js` files:

```bash
# Terminal 1
cd dashboard-remote && npm run dev      # http://localhost:5001

# Terminal 2
cd transfers-remote && npm run dev      # http://localhost:5002

# Terminal 3
cd profile-remote && npm run dev        # http://localhost:5003

# Terminal 4
cd transactions-remote && npm run dev   # http://localhost:5004

# Terminal 5
cd microbank && npm run dev             # http://localhost:5000
```

Then open <http://localhost:5000>.

### Running the production build

To try the built apps instead of the dev servers, build every app and serve each `dist/` folder with `vite preview`. The preview servers use the same ports as the dev servers, so the host's remote URLs don't change.

```bash
for app in dashboard-remote transfers-remote profile-remote transactions-remote microbank; do
  (cd "$app" && npm run build)
done
```

Then start each preview server in its own terminal, remotes first:

```bash
cd dashboard-remote && npm run preview      # http://localhost:5001
cd transfers-remote && npm run preview      # http://localhost:5002
cd profile-remote && npm run preview        # http://localhost:5003
cd transactions-remote && npm run preview   # http://localhost:5004
cd microbank && npm run preview             # http://localhost:5000
```

Rebuild an app after changing its code, since `vite preview` only serves what is already in `dist/`.

Each remote can also be opened directly on its own port. Its `src/App.tsx` renders just the exposed component, which shows that the remotes are standalone apps that can be developed in isolation.

## Project structure

```text
.
├── microbank/                 # Host app (shell only)
│   ├── vite.config.ts         # Remote URLs + shared deps
│   └── src/
│       ├── App.tsx            # Layout + lazy-loaded remotes
│       ├── remotes.d.ts       # Types for federated modules
│       └── components/        # Sidebar
├── dashboard-remote/          # Exposes ./Dashboard
├── transfers-remote/          # Exposes ./Transfers
├── profile-remote/            # Exposes ./Profile
└── transactions-remote/       # Exposes ./Transactions
```

Every remote has the same layout:

```text
<name>-remote/
├── vite.config.ts             # federation({ name, exposes })
└── src/
    ├── <Name>.tsx             # The exposed component
    ├── <Name>.css             # Its prefixed styles
    ├── App.tsx                # Standalone preview (not loaded by the host)
    ├── main.tsx
    └── index.css              # Base styles for standalone mode only
```

## What I'm learning

- How to split a frontend into independently runnable apps
- Configuring Module Federation hosts, remotes and shared dependencies in Vite
- Lazy-loading remote components with `React.lazy` and `Suspense`
- Typing federated modules in TypeScript
- Passing data and events between the host and remotes
- Keeping styles from leaking between apps with per-remote CSS class prefixes

## Possible next steps

- Shared state between microfrontends (for example, a transfer that updates the dashboard balance)
- Error boundaries for when a remote fails to load
- Routing across microfrontends
- Production builds and deploying each app separately
