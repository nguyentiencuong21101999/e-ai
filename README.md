# csm-log [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

```
Node.js v16.14.0+
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

To create local environment variables, you can create a `.env.local` file locally at the root folder:

```
NEXT_PUBLIC_XYZ = ABC
...
```

Note that you should use a name with pattern `NEXT_PUBLIC_<feature>` (prefix is necessary for it to be emitted in build).

## Deployment

Node.js Server

```bash
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

Then, run `yarn build` to build your application. Finally, run `yarn start` to start the Node.js server. This server supports all features of Next.js.
