# React 18 vs 19 Suspense Test

## Installation

API for the API tests

```
cd api-server && pnpm i && node --watch server.mjs
```

Various tests

In any project directory, run `pnpm i && pnpm dev`. For API tests the API server must be running (see above).

| Directory           | Test                                                                                |
| ------------------- | ----------------------------------------------------------------------------------- |
| react-18-api        | React 18 fetching from API in sibling suspenses                                     |
| react-18-local      | React 18 using local time promise in sibling suspenses                              |
| react-19-api        | React 19 fetching from API in sibling suspenses                                     |
| react-19-local      | React 19 using local time promise in sibling suspenses                              |
| react-19-api-parent | React 19 fetching from API in the parent component, displaying in sibling suspenses |
