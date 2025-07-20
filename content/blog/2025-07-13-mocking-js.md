---js
const title = '13 July 2025: Vitest Mocking';
const date = "2025-07-13";
const draft = false;
const tags = ["javascript"];
const mermaid = true;
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZKCGilFFFPk?si=KzYO6xsQ8G_Uemka" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Some notes on vitest after working out a few things. Needed to look beyond the cookbook examples to why vitest and jest mocks work.

### Modules are objects

Modules can be structured as objects with method variables. A simple module with one function (not complete):

```ts
// /src/mosaicUtils.ts
export const mosaicFetch = async (): Promise<string[]> => {
  const res = await fetch("/mosaic/index.json");
  const imageList: string[] = await res.json();
  return imageList;
};
```

Can be mocked as:

```ts
// App.test.ts
const exampleData = [
  "15th_century_egyptian_anatomy_of_horse.jpg",
  "163_of_'Five_Years_in_Siam_from_1891_to_1896_..._With_maps_and_illustrations_by_the_author'_(11249062174).jpg",
  "640px-Avon_Fantasy_Reader_8.jpg",
  ...
];

// Argument 1: source of the old module
vi.mock("../src/mosaicUtils", () => {
	// set up the mock function to return the data
  const mockMosaicFetch = vi.fn(async (): Promise<string[]> => exampleData);

  // return a new module
  return {
    mosaicFetch: mockMosaicFetch,
  };
});
```

## `vi.mock()` and vitest "replace" the old module

The utility library is imported with:

```ts
import { mosaicFetch } from "../src/mosaicUtils";
```

vitest intercepts this import call and replaces the entire module, not just mosaicFetch.

## Mocking one or some objects in a module

`vi.mock()` replaces the entire module, not just a single function. Use `vi.importActual(`sourceFile`) to include other objects without modification.

```ts
// from https://vitest.dev/api/vi.html#vi-importactual
vi.mock('./example.js', async () => {
  const originalModule = await vi.importActual('./example.js')

  return { ...originalModule, get: vi.fn() }
})
```

## `vi.spyOn()` watches a *single* method, getter or setter

A spy can be used to watch a single function in a module with optional replacement. See [documentation](https://vitest.dev/api/vi.html#vi-spyon).
The same mock can be made as:

```ts
import * as mosaicUtils from "../src/mosaicUtils";

vi.spyOn(mosaicUtils, "mosaicFetch").mockImplementation(
  async (): Promise<string[]> => exampleData,
);
```

Alternatively, spyOn can be used to count how many times the existing function is called during the test.
