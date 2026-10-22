# MicroBank: Microfrontend Practice

A practice project for learning **microfrontend architecture**. I'm building a small demo banking app called **MicroBank**, split into separate React apps that are developed and run on their own, then put together in the browser at runtime with **Module Federation**.

> Everything here is fictional. No real accounts or money are involved, and transfers are only simulated.

## What is a microfrontend?

A microfrontend architecture splits a frontend into smaller, independently built and deployed apps, the way microservices split a backend. A **host** (also called a shell) app loads **remote** apps over the network and renders them as if they were part of one application.

This project uses [`@module-federation/vite`](https://github.com/module-federation/vite) so that:

- each remote exposes components through a `remoteEntry.js` file,
- the host imports those components with `lazy(() => import("dashboard/Dashboard"))`,
- `react` and `react-dom` are **shared**, so the page loads only one copy of React.

## Architecture

```text
                ┌──────────────────────────────────────┐
                │      microbank (host / shell)        │
                │      http://localhost:5000           │
                │                                      │
                │  Sidebar · Topbar · Transactions ·   │
                │  Profile · notifications             │
                └───────────┬──────────────┬───────────┘
                            │ remoteEntry  │ remoteEntry
                            ▼              ▼
           ┌────────────────────┐   ┌────────────────────┐
           │  dashboard-remote  │   │  transfers-remote  │
           │  localhost:5001    │   │  localhost:5002    │
           │  exposes           │   │  exposes           │
           │  ./Dashboard       │   │  ./Transfers       │
           └────────────────────┘   └────────────────────┘
```

| App | Role | Port | What it contains |
| --- | --- | --- | --- |
| [`microbank/`](microbank/) | Host / shell | 5000 | App layout, sidebar navigation, top bar, the Transactions and Profile pages, and the toast notification. Loads the two remotes. |
| [`dashboard-remote/`](dashboard-remote/) | Remote (`dashboard`) | 5001 | Account overview: balance card, monthly income and expenses, recent transactions. |
| [`transfers-remote/`](transfers-remote/) | Remote (`transfers`) | 5002 | Transfer form with validation that simulates sending money. |

### Host to remote communication

The Transfers remote takes an `onTransferComplete(message)` callback prop. When a simulated transfer succeeds, the remote calls the callback, and the host shows a notification. This is a simple example of a remote passing events back to the host through props.

TypeScript types for the remote modules are declared in [`microbank/src/remotes.d.ts`](microbank/src/remotes.d.ts).

### Loading states

Each remote is wrapped in `<Suspense>` in the host ([`microbank/src/App.tsx`](microbank/src/App.tsx)), so the user sees a "Loading … Remote" panel while the remote's code is fetched.

## Features

- **Overview** (remote): balance, income and expenses, recent activity
- **Transactions** (host): list of recent account activity
- **Transfers** (remote): simulated transfer form with validation and a success notification
- **Profile** (host): fictional customer details

## Tech stack

- React 19 + TypeScript
- Vite 8
- `@module-federation/vite`
- ESLint

## Running locally

Install dependencies in each app:

```bash
cd dashboard-remote && npm install && cd ..
cd transfers-remote && npm install && cd ..
cd microbank && npm install && cd ..
```

Start each app in its own terminal. Start the remotes first so the host can find their `remoteEntry.js` files:

```bash
# Terminal 1
cd dashboard-remote && npm run dev    # http://localhost:5001

# Terminal 2
cd transfers-remote && npm run dev    # http://localhost:5002

# Terminal 3
cd microbank && npm run dev           # http://localhost:5000
```

Then open <http://localhost:5000>.

Each remote can also be opened directly on its own port, which shows that the remotes are standalone apps that can be developed in isolation.

## Project structure

```text
.
├── microbank/              # Host app
│   └── src/
│       ├── App.tsx         # Layout + lazy-loaded remotes
│       ├── remotes.d.ts    # Types for federated modules
│       ├── components/     # Sidebar
│       └── features/       # Local pages (transactions, profile, ...)
├── dashboard-remote/       # Exposes ./Dashboard
│   └── src/Dashboard.tsx
└── transfers-remote/       # Exposes ./Transfers
    └── src/Transfers.tsx
```

## What I'm learning

- How to split a frontend into independently runnable apps
- Configuring Module Federation hosts, remotes and shared dependencies in Vite
- Lazy-loading remote components with `React.lazy` and `Suspense`
- Typing federated modules in TypeScript
- Passing data and events between the host and remotes
- Keeping styles from leaking between apps (each remote uses its own CSS class prefix, such as `dashboard-mfe__` and `transfers-mfe`)

## Possible next steps

- Move Transactions and Profile into their own remotes
- Shared state between microfrontends (for example, a transfer that updates the dashboard balance)
- Error boundaries for when a remote fails to load
- Routing across microfrontends
- Production builds and deploying each app separately
