## Lattice Take Home Project
Small web app for finding information about all of your favorite movies using the The Movie Database API.

### Features
- Displays 20 movies per page, initially ranked by popularity, in a responsive view
- List controls, like search and pagination
- Debounced search for a more seamless experience
- Movie detail view with poster, release date, ranking, summary, and cast


### Getting Started
1. Clone this repository to your local files.

2. To create environment variables, run the following command from the root directory: `cp .env.example .env`  
Within the newly created `.env` file, add an API key for The Movie Database API as the value for the environment variable on line 4 (`REACT_APP_MDB_API_KEY`). Instructions on obtaining an API key are available [here](https://developers.themoviedb.org/3/getting-started/introduction).

2. To initialize the app, run the following command from the root directory: `npm run app`  
This will call `npm run install-all` as well as `npm run start-all` - so it will install all packages, as well as start both the server and the client in development mode.

3. For subsequent instances of starting the app, simply use: `npm run start-all`


**This project was bootstrapped with:**
- [Create React App](https://github.com/facebook/create-react-app) for front end library
- [Bootstrap](https://getbootstrap.com) for UI component styling
- [The Movie Database API 3](https://developers.themoviedb.org) for movie database queries
