# bgg-sdk

[![GitHub Package](https://img.shields.io/badge/GitHub-Package-blue?logo=github)](https://github.com/Ludoteca-Altomilanese/bgg-sdk/packages)

A modern SDK for interacting with the BoardGameGeek (BGG) XMLAPI2, written in TypeScript and inspired by [BGG](https://www.npmjs.com/package/bgg).

## Core Features

- Support for all BGG XMLAPI2 endpoints (see [documentation](https://boardgamegeek.com/wiki/page/BGG_XML_API2))
- Automatic conversion of responses from XML to JSON
- Exponential retry for queued requests
- Full type safety for requests and responses
- Support for both CommonJS and ES modules
- Usable in both server and browser environments
- Bearer token authentication

## Quickstart

### Installation

1. Configure npm to use GitHub Package Registry. Create or edit `.npmrc` in your project root:

```bash
@ludoteca-altomilanese:registry=https://npm.pkg.github.com
```

2. Install the package:

```bash
npm install @ludoteca-altomilanese/bgg-sdk
```

## Code Example

```typescript
import BGG from "@ludoteca-altomilanese/bgg-sdk";

// Create a new BGG instance with bearer token (required)
const bgg = new BGG({
  bearerToken: "your-bearer-token-here",
});

// Use the instance to make API calls
const results = await bgg.search({ query: "scythe" });

// results
{
  "attributes": {
    "termsofuse": "https://boardgamegeek.com/xmlapi/termsofuse"
  },
  "items": [
    {
      "id": "398158",
      "type": "boardgame",
      "name": "Grind House: Scythes Out",
      "yearPublished": "2023"
    },
    {
      "id": "226320",
      "type": "boardgame",
      "name": "My Little Scythe",
      "yearPublished": "2017"
    },
    ...
  ]
}
```

### Custom Configuration

You can customize the axios instance by passing configuration options to the BGG constructor:

```typescript
import BGG from "@ludoteca-altomilanese/bgg-sdk";

const bgg = new BGG({
  bearerToken: "your-bearer-token-here", // Required: Bearer token for authentication
  retries: 5, // Number of retry attempts (default: 3)
  retryDelay: (retryCount) => retryCount * 1000, // Custom retry delay function
  axiosConfig: {
    baseURL: "https://boardgamegeek.com/xmlapi2/", // Custom base URL
    timeout: 10000, // Request timeout in ms
    headers: {
      "User-Agent": "MyApp/1.0",
      // Note: Authorization header is automatically set with bearerToken
    },
    // Any other axios configuration options
  },
});

const results = await bgg.search({ query: "scythe" });
```

## Contributing

Hey there! 👋

I hope you've found this SDK useful for your project, but if you found any bugs please open an issue and we'll address it as soon as we can.

Of course always feel free to take a crack at fixing it yourself and opening a PR!

### Getting Started

1. **Fork the repo** and clone it to your machine.
2. **Install dependencies** with `npm install`.
3. **Make your changes** in a new branch.
4. **Build and test your changes** to make sure everything works as expected.
   1. Run `npm run build` to ensure the build succeeds.
   2. Run `npm test` to run the test suite.
   3. Run `npm run lint` to check for linting issues.
5. **Submit a pull request** with a clear description of your changes.

## Future Plans

- Do proper type casting so not all return types are strings. (consequence of working with original xml data)
