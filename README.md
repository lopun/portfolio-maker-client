# Portfolio Maker Client

Portfolio Maker Client

- [Demo Page](https://lopun.github.io/portfolio-maker-client/)

## Scripts

### Start Server

```js
yarn start
npm run start
```

### Apollo Types Generate from Server

```js
// Generate every Queries to Types based on Server Schema(schema.json)
// Source directory : src/types/api.d.ts
yarn codegen
```

## Environment Configuration

## Source Struture

### Routes

- Routing configured on src/Components/AppPresenter.tsx
- Routes Components directory : src/Routes/\*_/_.\*

### Queries

- Shared Queries
  - Locally Shared Queries(@client) : src/locallysharedQueries.tsx(tsx because of codegen configuration. Email me if u feel confused.)
  - Shared Queries : src/sharedQueries.ts
- Queries needed in each Components
  - src/Components | Routes/Component_Name/Component_NameQueries.ts

### Components

- src/Components
- Used Container/Presenter pattern
- index.ts in each Components import Container file and export.
- Container.tsx does every state & Query & Mutation thing and pass these as props to Presenter.tsx.
- Presenter.tsx is a dumb component. It does only css & rendering.
