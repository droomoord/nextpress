This is a boilerplate for a Next.js app that fetches data from a Wordpress instance. You need to first install Wordpress (either locally or hosted somewhere) and make sure that you have admin rights.

## Getting Started

### Wordpress

- Make sure your permalinks are set up in this format: http://localhost:8888/sample-post/ (settings -> permalinks -> common settings)
- It's best to create an extra security layer by enabling Application Passwords (users -> [username] -> application passwords). After that install the [REST API toolbox](https://wordpress.org/plugins/rest-api-toolbox/) for Wordpress and in the core tab (settings -> REST API Toolbox -> core) enable Auth for all routes.

### Next

- Open .env.example and change the variables to your Application username and password. Rename the file to .env.local
- Update settings.js

Everything beneath this line is from the Next.js Readme:

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
