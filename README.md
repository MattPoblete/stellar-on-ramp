This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# Stellar onramp tutorial

Armando stellar onramp:

- Crear proyecto con `create-next-app`
- Crear soroban react provider:
	- Para esto necesito crear una carpeta en src llamada soroban, donde alojaremos SorobanReactProvider para poder comunicar soroban a través de nuestra aplicación
	- Importamos:
  ```ts
  import {SorobanReactProvider} from '@soroban-react/core'
  import { ChainMetadata, Connector } from '@soroban-react/types';
  import { freighter } from '@soroban-react/freighter';
  import { standalone, testnet, mainnet } from '@soroban-react/chains';
  ```
  - Luego definimos nuestro componente:
  ```ts
  export default function MySorobanReactProvider({children}:{children: React.ReactNode}) {

  const appName = 'Paltalabs on-ramp';
  const allowedChains: ChainMetadata[] = process.env.NODE_ENV === 'production' ? [testnet, mainnet] : [standalone, testnet, mainnet];
  const connector: Connector = freighter();

  return (
    <SorobanReactProvider
      chains={allowedChains}
      connectors={[connector]}
      autoconnect={false}
      appName={appName}
      >
        {children}
    </SorobanReactProvider>
  )
  
  }
  ```
  - Después integramos este componente en el layout principal de nuestra aplicación next:

```tsx
  export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <MySorobanReactProvider>
          {children}
        </MySorobanReactProvider>
      </body>
    </html>
  );
}
```
	