# 🐛 Bug Tracker — NovaBuy E-Commerce Frontend

This document lists all **20 known issues** in the NovaBuy codebase. Each bug includes the affected file, a description of the incorrect behavior, the open source topic it covers, and context on what should happen instead. Use these as GitHub Issues for the debugging challenge.

---

## Issue #1 — Cart total calculates incorrectly (string concatenation)

**File:** `js/cart.js` → `_calcTotal()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `JavaScript Type Coercion`

The cart total calculation produces absurd values like `"079.9969.99"` instead of a proper numeric sum. The root cause is that the running total variable `t` is initialized as the string `'0'` rather than the number `0`. When JavaScript encounters the `+` operator between a string and a number, it performs string concatenation instead of arithmetic addition. This means every item price gets appended as text rather than added mathematically. For example, adding two items priced at $79.99 and $69.99 would display a total of `"079.9969.99"` instead of `$149.98`. The fix requires initializing the accumulator as a numeric `0` and ensuring arithmetic addition is used throughout the loop.

---

## Issue #2 — Removing a cart item doesn't update correctly

**File:** `js/cart.js` → `removeFromCart()`  
**Labels:** `bug`, `intermediate`  
**Topic:** `Array Manipulation & DOM State Sync`

When a user clicks the remove button on a cart item, the item is deleted using the product name as the lookup key instead of a unique identifier like the product ID. This approach fails when multiple entries of the same product exist in the cart — only the first occurrence gets removed. Additionally, after removing an item, the cart badge count in the header is never updated because `_updateBadge()` is not called after the splice operation. The user sees a stale badge count until they perform another action that triggers a badge refresh. The fix involves switching to ID-based lookup for removal and calling `_updateBadge()` after modifying the cart array.

---

## Issue #3 — Product grid causes horizontal overflow on mobile

**File:** `css/styles.css` → `.product-grid`  
**Labels:** `bug`, `good first issue`  
**Topic:** `CSS Responsive Design`

On screens narrower than the grid's total width, a horizontal scrollbar appears because the product grid uses fixed pixel widths (`320px`) in its `grid-template-columns` definition instead of responsive units like `1fr` or `minmax()`. Even in the responsive media queries for tablet and mobile breakpoints, the columns remain hardcoded at `320px`. This means on a 375px-wide phone screen, a single 320px column plus padding exceeds the viewport width, creating an overflow. The fix requires replacing the fixed `320px` column widths with flexible units such as `1fr` or `minmax(280px, 1fr)` across all media query breakpoints.

---

## Issue #4 — Product search is case-sensitive

**File:** `js/app.js` → `_getFiltered()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `String Methods & Case Normalization`

The search functionality uses JavaScript's `String.includes()` method directly without normalizing the case of either the search query or the product names. This means searching for "headphones" won't find "Quantum Wireless Headphones" because the capital "H" doesn't match the lowercase "h". Users naturally expect search to be case-insensitive, so typing any variation of the product name should return matching results. The fix is to apply `.toLowerCase()` to both the product name and the search query before the `.includes()` comparison.

---

## Issue #5 — Cart data doesn't persist across page reloads (LocalStorage)

**File:** `js/cart.js`  
**Labels:** `bug`, `intermediate`  
**Topic:** `Web Storage API & State Persistence`

The application includes a `_saveCart()` function that serializes the cart array to `localStorage`, and an `_initCart()` function that reads from localStorage on page load. However, `_saveCart()` is never called when items are added to the cart or removed from it. The `addToCart()` and `removeFromCart()` functions both modify the in-memory cart array but skip the persistence step entirely. This means closing the browser tab or refreshing the page wipes the entire cart. Additionally, `_initCart()` loads data into `_cL` (a separate variable) rather than `_cx` (the actual cart array used by all other functions), so even if saves were working, the loaded data would be stored in the wrong variable and ignored.

---

## Issue #6 — Cart quantity can go to zero or negative

**File:** `js/cart.js` → `updateQty()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `Input Validation & Boundary Checking`

The quantity update function applies the delta value (either +1 or -1) to the item quantity without checking whether the result would be zero or negative. Clicking the minus button enough times will decrement the quantity to 0, -1, -2, and so on. This results in negative line items displaying in the cart sidebar, and the cart total calculation produces nonsensical negative dollar amounts. The fix requires adding a minimum value check — if the new quantity would be less than 1 after the decrement, either prevent the update entirely or remove the item from the cart.

---

## Issue #7 — Clicking the modal overlay background doesn't close the modal

**File:** `js/app.js` → `_openModal()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `DOM Event Listeners & UX Patterns`

When a user opens a product detail modal, clicking the dark overlay area surrounding the modal content does nothing. Users universally expect clicking outside a modal to dismiss it. The modal overlay element (`#product-modal`) currently has no click event listener attached to it. Only the explicit × close button inside the modal works. The fix requires adding a click event listener on the modal overlay that calls `_closeModal()`, with a check to ensure clicks on the modal content itself (the child container) don't propagate up and accidentally close the modal.

---

## Issue #8 — Product prices display with floating-point artifacts in the modal

**File:** `js/app.js` → `_openModal()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `IEEE 754 Floating-Point Precision`

When viewing a product's detail modal, prices are displayed by multiplying the price value by `1` (expression: `p.sp * 1` or `p.p * 1`). This produces raw floating-point numbers without formatting, so a price like `$59.99` could display as `$59.99000000000001` due to IEEE 754 floating-point representation. The fix is to use `.toFixed(2)` on the displayed price to ensure exactly two decimal places are shown, producing clean currency formatting like `$59.99`.

---

## Issue #9 — Cart badge shows wrong count

**File:** `js/cart.js` → `_calcItemCount()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `Array Reduction & Data Aggregation`

The cart badge in the header is supposed to show the total number of items in the cart, but it actually shows the number of unique line items (distinct products). If a user adds 3 units of Product A and 2 units of Product B, the badge displays "2" instead of "5". The `_calcItemCount()` function simply returns `_cx.length` (the number of entries in the cart array) rather than summing up the `.qty` property across all entries. The fix requires iterating through the cart and accumulating all quantities.

---

## Issue #10 — All product images have the same generic alt text

**File:** `js/app.js` → `_renderProducts()` and `_openModal()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `Web Accessibility (a11y) & Semantic HTML`

Every product image on the page and in the modal uses the hardcoded alt text `"product"` instead of the actual product name. This severely impacts accessibility for screen reader users, who hear "product, product, product..." for every image. It also hurts SEO since search engines use alt text to understand image content. The fix is to replace the static `alt="product"` with the dynamic product name, e.g., `alt="` + p.n + `"`, so each image has a descriptive and unique alt attribute.

---

## Issue #11 — Category filter and search input conflict with each other

**File:** `js/app.js` → `_setupFilters()`  
**Labels:** `bug`, `intermediate`  
**Topic:** `UI State Management & Filter Logic`

When a user types a search query and then clicks a category filter tab, the search input value is not cleared. This means the results are filtered by BOTH the category AND the leftover search text, which can produce confusing empty results. For example, if you search for "headphones" and then click the "Sports" category tab, the grid shows no results because no sports product contains "headphones" in its name. The user sees an empty grid with no clear indication that a stale search query is still active. The fix requires clearing the search input and resetting the `_fQ` variable when a category tab is clicked.

---

## Issue #12 — Adding the same product creates duplicate cart entries

**File:** `js/cart.js` → `addToCart()`  
**Labels:** `bug`, `intermediate`  
**Topic:** `Deduplication & Idempotent Operations`

When a user clicks "Add to Cart" on a product that's already in their cart, the function creates a brand-new cart entry with `qty: 1` and pushes it to the array, resulting in duplicate line items in the cart sidebar. The expected behavior is that if the product already exists in the cart, its quantity should be incremented by 1 instead. The fix requires checking whether an item with the same `id` already exists in the `_cx` array before pushing. If found, increment its `qty`; otherwise, create a new entry.

---

## Issue #13 — No empty cart message when cart has zero items

**File:** `js/cart.js` → `_renderCart()`  
**Labels:** `bug`, `good first issue`  
**Topic:** `Conditional Rendering & Empty State UX`

When all items are removed from the cart, the cart sidebar shows a completely blank items section with just the "Total: $0" footer. There's no message informing the user that their cart is empty or encouraging them to continue shopping. This is poor UX because users may think the cart failed to load. The fix requires adding a conditional check in `_renderCart()`: if `_cx.length === 0`, render a friendly "Your cart is empty" message with perhaps a "Continue Shopping" prompt instead of the empty HTML string.

---

## Issue #14 — Star ratings are off by one for perfect 5.0 ratings

**File:** `js/app.js` → `_renderStars()`  
**Labels:** `bug`, `intermediate`  
**Topic:** `Off-by-One Errors & Loop Boundaries`

The star rating rendering function uses `i < rating` as the condition for filling a star. For a product with a rating of exactly `5`, the loop checks `i < 5` which is true for `i = 1, 2, 3, 4` but false for `i = 5`. This means a 5-star product only shows 4 filled stars. The condition should be `i <= rating` to ensure the fifth star is also filled. This off-by-one error only visibly affects products with exact integer ratings (especially 5.0), while fractional ratings like 4.5 appear normal since 4 stars being filled looks close enough.

---

## Issue #15 — Sale prices are displayed but never used in cart calculations

**File:** `js/cart.js` → `addToCart()` and `_calcTotal()`  
**Labels:** `bug`, `intermediate`  
**Topic:** `Business Logic & Data Flow Integrity`

Products marked as "SALE" show both the original price (struck through) and the discounted price on the product grid and modal. However, when these items are added to the cart, the `addToCart()` function stores the original price (`_p.p`) in the cart item's `p` property rather than the sale price (`_p.sp`). The `_calcTotal()` function then uses `_item.p` for calculation, meaning customers are charged the full price despite the sale being advertised. The sale price (`sp`) is stored on the cart item but is never referenced during total calculation. The fix requires using `_p.sp || _p.p` (falling back to original price when no sale exists) when storing the cart item price.

---

## Issue #16 — One product is unsearchable due to a hidden Unicode character

**File:** `js/data.js`  
**Labels:** `bug`, `advanced` 🔥  
**Topic:** `Unicode & Invisible Character Encoding`

One of the product names in the data array contains an invisible zero-width space character (U+200B) embedded within the text. The product appears perfectly normal when rendered on the page — the name looks correct to human eyes. However, when a user types the product name into the search bar, the search fails to find it because the typed string doesn't contain the hidden Unicode character. The search input produces regular ASCII characters, while the stored product name has an invisible character injected between visible characters. This is extremely difficult to debug because the character is completely invisible in code editors, browsers, and even most debugging tools. You would need to inspect the actual character codes or use a hex editor to discover it.

---

## Issue #17 — Product cards get visually clipped on hover due to CSS overflow

**File:** `css/styles.css` → `.catalog-section`  
**Labels:** `bug`, `advanced` 🔥  
**Topic:** `CSS Overflow, Stacking Contexts & Visual Clipping`

When hovering over product cards in the top row of the grid, the upward `translateY(-4px)` animation causes the card to move slightly above its container's boundary. This would normally be fine, but the `.catalog-section` parent element has `overflow: hidden` set, which creates a clipping boundary. The top few pixels of the hover lift effect are cut off, making the animation look janky and incomplete for cards near the container edge. This is subtle because it only affects the topmost row of products, and the clipping is only 4 pixels — easy to miss but creates a subconsciously "off" feeling. The fix is to remove `overflow: hidden` from `.catalog-section` or change it to `overflow: visible`.

---

## Issue #18 — Cart UI flickers due to deferred asynchronous re-render

**File:** `js/cart.js` → `addToCart()`  
**Labels:** `bug`, `advanced` 🔥  
**Topic:** `Event Loop, Microtasks & Asynchronous DOM Updates`

After adding an item to the cart, the `addToCart()` function calls `_renderCart()` immediately to update the UI, but then also schedules `setTimeout(_renderCart, 0)` which queues another re-render on the next event loop tick. This deferred re-render fires after any user interactions that might have happened in between (like quickly clicking a quantity button), effectively overwriting the latest state with a stale snapshot. It manifests as a subtle flickering effect where the cart briefly shows the correct state and then "resets" a frame later. This is extremely hard to debug because `setTimeout(..., 0)` runs almost instantly and the re-render appears identical unless the user has interacted with the cart in that microsecond window. The fix is to remove the `setTimeout(_renderCart, 0)` call entirely.

---

## Issue #19 — Cart items lose quantity data when saved to LocalStorage

**File:** `js/cart.js` → `addToCart()`  
**Labels:** `bug`, `advanced` 🔥  
**Topic:** `JSON Serialization Hooks & Object Prototype Methods`

Each cart item object has a custom `toJSON()` method attached to it that defines how `JSON.stringify()` serializes the object. This method intentionally omits the `qty` property from its return value, so when the cart is serialized for localStorage persistence, the quantity information is silently stripped. Even if a developer fixes Bug #5 (making `_saveCart()` actually get called), the persisted data will have every item saved without a quantity — so loading the cart on the next page visit would show items with `undefined` quantities. This is particularly insidious because `toJSON()` is a well-hidden JavaScript serialization hook that most developers don't think to look for, and the omission of `qty` is not obvious when reading the dense, minimized code.

---

## Issue #20 — Product display order permanently mutates after filtering

**File:** `js/app.js` → `_getFiltered()`  
**Labels:** `bug`, `advanced` 🔥  
**Topic:** `Immutability, Array Mutation & Side Effects`

Every time the product filter function `_getFiltered()` is called (which happens on page load, on search input, and on category tab clicks), it calls `_0xPROD.sort()` on the original product data array. JavaScript's `Array.sort()` modifies the array in-place rather than returning a new sorted copy. This means the master product data is permanently reordered by price every time any filter interaction occurs. The first time the user clicks any category tab or types a search character, the original display order is irreversibly destroyed for the lifetime of the page session. When the user clicks "All Products" to go back to the full list, the products are now sorted by price instead of their original order. This is very hard to catch because the sort is stable and deterministic — the products don't appear "randomly scrambled," they just silently shift to price order, which can look intentional unless you specifically remember the original order.
