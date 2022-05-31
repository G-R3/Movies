# Movie Manager

A very simple way to manage your movies

## Features

-   Browse movies
-   View movies
-   Create movie lists
-   Add movies to your movie lists

## Tech Stack

-   Frontend
    -   React
    -   Chakra UI
-   Backend
    -   MongoDB
    -   Express

## How to run

### Root

-   Grab the project and install the root dependencies using `npm i`

### Frontend

-   The react frontend is located under the `/client` directory
-   `cd` into the client directory and install the frontend dependencies using `npm i`

### Backend

-   The node.js backend is located under the `/backend` directory
-   `cd` into the backend directory and install the dependencies by using `npm i`
-   setup your environment variables with the following values:

```bash
MONGO_URI=<your mongo database uri>
API_KEY=<your TMDB api key>
JWT_KEY=<your generated secret key>
```

### Running the app

-   In your terminal navigate to the root directory
-   In the root directory run `npm run dev` to run both the frontend and backend concurrently
-   Open `http://localhost:3000` in your browse

### Alternative method to run the app

-   Navigate to the frontend and run `npm run dev`
-   Navigate to the backend and run `npm run dev`
-   Open `http://localhost:3000` in your browser

## Additional Information

I'm a big movies guy and I've always wanted to keep track of movies I watch or wanted to watch. So i though why not make an app that allows me to do that. At the same time I took this opportunity to learn some typescript and other cool tools. The app is very simple and doesn't offer very much. However, It was fun learning how to create CRUD operations with react as the frontend and node as the backend.

### Other things I learned more about

-   Typescript
-   JWT Auth flow
-   Chakra UI
-   MERN

## What's next?

-   Add Movie reviews
    -   users should be able to review movies
    -   When visiting a moving, users should be able to see reviews
-   Private and Public lists
    -   It would be cool if users could make lists public or private at any given time.
-   Better UI
    -   The UI could always be improved
-   Production ready build
    -   At the moment there is no stable production release. The only way to view this app is locally via development mode
    -   I would like to improve the UI and secure the Auth flow before releasing it to the world wide web
