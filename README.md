# TTP

## Install/run using Docker

If you have docker installed, you can get the project running using the command `docker-compose up`. If you do not have docker installed, follow the instructions below.

## How to run/install without Docker

1. Clone the project
2. Install dependencies using `npm install`
3. Start the server using `npm start`. This will start the backend server. Leave this running in the background.
4. In a new terminal, navigate to `/client/` directory.
5. Install the client dependencies using `npm install`.
6. Start the client using `npm start`. This will open the application in your browser. If it is not automatically opened, navigate to `http://localhost:3000/`
7. Create a new account and use the app!

#### About

Made with React on the frontend, Express && Passport && Sqlite3 on the backend! Packaged/Containerized with Docker!