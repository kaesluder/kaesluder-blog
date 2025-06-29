---js
const title = 'i18n mocks with vitest'
const date = "2025-03-18"
const draft = false
const tags = ["javascript", "react"]
---

This recipe is adapted from [the i18n-react testing page](https://react.i18next.com/misc/testing) and adapted for vitest (which thankfully works the same way its jest counterpart.)

The project I'm working on ran into some difficulty in unit testing. The i18n config object loads data from an api when it first loads. In most cases I use [Mock Service Worker](https://mswjs.io/) (MSW) for API calls, but I couldn't get MSW running before i18n. The solution was to mock i18n-react entirely, which ended up down a rabbit hole of false leads until I read the i18n-react documentation and found a mocking recipe that worked.

Setup the mock in its own file to use in multiple tests.

```javascript
// /src/mocks/i18nVitestMock.js

export const i18nVitestMock = () => {
  // Adapted from i18n-react docs
  vi.mock("react-i18next", () => ({
    useTranslation: () => {
      return {
        t: (i18nKey) => i18nKey,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    initReactI18next: {
      type: "3rdParty",
      init: () => {},
    },
  }));
```

This returns dummy functions for `init`, `useTranslation`, and `changeLanguage` `t(translationKey)` returns *translationKey* in the rendered output.

````js
// /src/components/TestComponent.js
import { i18nVitestMock } from "@src/mocks/i18nVitestMock";
import "@testing-library/jest-dom";
import { vi } from "vitest";

i18nVitestMock();
````

Then call `i18nVitestMock()` at the head of the test file.
