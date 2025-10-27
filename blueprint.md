# Packing List Application Blueprint

## Overview

A simple and intuitive application for creating and managing packing lists. Users can add items, assign them to categories, and check them off as they pack.

## Features

*   **Add Items**: Quickly add new items to your packing list.
*   **Categorize**: Organize items by category (e.g., "Clothes", "Toiletries").
*   **Check Off**: Mark items as packed.
*   **Filter Items**: View all items, or only packed or unpacked items.
*   **Responsive Design**: Works on both desktop and mobile devices.
*   **Summary View**: Shows a summary of how many items are packed.

## Implemented Design

*   **Layout:** A clean, single-column layout with a header for the title, a form for adding items, filter controls, and the packing list itself grouped by category.
*   **Styling:** Modern and clean look and feel.
    *   **Colors**: Uses a blue primary color for buttons and active states, with a neutral color scheme for the rest of the UI.
    *   **Typography**: Uses a standard sans-serif font for readability.
    *   **Interactivity**: Buttons have clear hover and disabled states. Packed items are visually distinguished with a line-through style. Active filter is highlighted.
*   **Components:**
    *   `AppComponent`: The root component that holds the main application state (the list of items) and orchestrates the child components.
    *   `PackingListComponent`: Displays the form to add items, the filter controls, and the list of packing items grouped by category. It emits events to the `AppComponent` to add or toggle items.
    *   `SummaryComponent`: Displays a summary of the packing progress (e.g., "3 / 5 items packed").

## Implementation Details

*   **Standalone Components**: The entire application is built with standalone components, following modern Angular best practices.
*   **State Management**: The primary state (the array of `PackingItem`s) is managed within the `AppComponent` using an Angular Signal (`signal()`).
*   **Component Communication**:
    *   `AppComponent` passes the `items` array down to the `PackingListComponent` and `SummaryComponent` as an `input()`.
    *   `PackingListComponent` uses `output()` to emit events for adding a new item and toggling an item's packed status. `AppComponent` listens for these events to update the state.
*   **Reactivity**: The UI automatically updates in response to state changes thanks to Angular's signal-based components.
    *   `computed()` signals are used in `PackingListComponent` to derive the list of categories and the grouped items based on the current filter and item list.
*   **Control Flow**: The new built-in `@for` and `@if` control flow syntax is used in templates for rendering lists and conditional content.
