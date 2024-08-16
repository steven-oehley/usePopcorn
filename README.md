# usePopcorn 🍿

This is a React application for managing and exploring movies. Users can search for movies, view detailed information, rate movies, and maintain a list of watched movies. The application leverages Tailwind CSS for styling, along with custom CSS for component-specific designs. It also uses custom hooks for data fetching, debounced search input, and local storage management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Styling](#styling)
- [Project Structure](#project-structure)
- [Custom Hooks](#custom-hooks)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Search Movies:** Users can search for movies using a debounced search input that fetches data from an API.
- **View Movie Details:** Display detailed information about a selected movie, including title, year, plot, actors, and IMDb rating.
- **Rate Movies:** Users can rate movies and update their ratings, with a summary of ratings available.
- **Watched Movies List:** Keep track of movies you’ve watched, with the ability to delete movies from the list.
- **Responsive Design:** The app is styled to be responsive and user-friendly across different devices.

## Installation

To get started with the project, clone the repository and install the necessary dependencies:

```
git clone https://github.com/your-username/movie-management-app.git
cd movie-management-app
npm install
```

## Usage

To run the application locally, use:

```
npm start
```

Create a .env file 
In the .env place two variables:

```
REACT_APP_API_URL=http://www.omdbapi.com/
REACT_APP_API_KEY=YOUR_KEY_HERE
```

You can get an api key from <a href="https://www.omdbapi.com/">OMDBApi</a>

The application will be available at `http://localhost:3000`.

## Components

### Main Components

- **Main**: The main layout component that wraps the content of the app.
- **NavBar**: Contains the logo, search bar, and number of search results.
- **SearchBar**: A debounced input field for searching movies.
- **MovieList**: Displays a list of movies returned from the search query.
- **MovieDetails**: Shows detailed information about a selected movie.
- **WatchedList**: Displays the list of watched movies.
- **WatchedSummary**: Provides a summary of the watched movies, including average ratings and runtime.
- **StarRating**: A component to rate movies with stars.

### Utility Components

- **Loader**: A loading spinner to indicate data fetching.
- **Box**: A container component with a toggleable view.

## Styling

The project uses Tailwind CSS for styling, with additional custom styles defined in \`src/styles.css\`. The custom properties in \`:root\` allow for easy theming and consistent design.

### Key Styles

- **Root Variables**: Defined in \`:root\` for colors like \`--color-primary\`, \`--color-text\`, and \`--color-background-900\`.
- **Global Styles**: Include box-sizing, margin resets, and a responsive font size system.
- **Component Styles**: Specific styles for \`.nav-bar\`, \`.box\`, \`.loader\`, \`.details\`, and more.

## Project Structure

The project is organized as follows:

```
├── public
├── src
│ ├── components
│ │ ├── Main
│ │ ├── NavBar
│ │ ├── MovieDetails
│ │ ├── MovieList
│ │ ├── WatchedList
│ │ ├── WatchedSummary
│ │ ├── StarRating
│ │ └── SearchBar
│ ├── hooks
│ ├── helpers
│ ├── styles.css
│ ├── App.js
│ └── index.js
└── package.json
```

## Custom Hooks

- **useDebounce**: Debounces input values to limit the number of API requests during search.
- **useFetchMovies**: Fetches movies based on the search query.
- **useLocalStorageState**: Manages the state of the watched movies list using local storage.
