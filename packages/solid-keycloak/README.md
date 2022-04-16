# solid-keycloak

[![size](https://img.shields.io/bundlephobia/minzip/@absolid/solid-keycloak?style=for-the-badge)](https://bundlephobia.com/package/@absolid/solid-keycloak)
[![dependencies](https://img.shields.io/librariesio/release/npm/@absolid/solid-keycloak?style=for-the-badge)](https://libraries.io/npm/@absolid%2Fsolid-keycloak)
[![license](https://img.shields.io/npm/l/@absolid/solid-keycloak?style=for-the-badge)](./LICENSE)
[![npm](https://img.shields.io/npm/v/@absolid/solid-keycloak?style=for-the-badge)](https://www.npmjs.com/package/@absolid/solid-keycloak)

Reactive Keycloak binding for SolidJS

## Installation

```sh
npm install @absolid/solid-keycloak
# or
yarn add @absolid/solid-keycloak
# or
pnpm add @absolid/solid-keycloak
```

## Usage

Modify your `App.tsx` as follows:

```tsx
import type {
  KeycloakConfig,
  KeycloakInitOptions,
} from '@absolid/solid-keycloak'
import { KeycloakProvider } from '@absolid/solid-keycloak'

const KEYCLOAK_CONFIG: KeycloakConfig = {
  /* ... */
}
const KEYCLOAK_INIT_OPTIONS: KeycloakInitOptions = {
  /* ... */
}

export default function App() {
  return (
    <KeycloakProvider
      config={KEYCLOAK_CONFIG}
      initOptions={KEYCLOAK_INIT_OPTIONS}
    >
      {/* ... */}
    </KeycloakProvider>
  )
}
```

Then, you can use it:

```tsx
import { useKeycloak } from '@absolid/solid-keycloak'

export default function SomePage() {
  const keycloak = useKeycloak()

  const [resource] = createResource(async () =>
    fetch('...', {
      headers: {
        Authentication: `Bearer ${keycloak?.token()}`,
      },
    }),
  )

  return (
    <>
      <h1>
        Welcome, {keycloak?.profile()?.firstName}{' '}
        {keycloak?.profile()?.lastName}
      </h1>
    </>
  )
}
```
