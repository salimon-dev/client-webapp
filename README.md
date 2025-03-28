# Salimon Client Web App

this project contains the client web app for salimon network. it's based on ReactTS and jotai for state management.

## How to install

make sure you have nodejs installed with minimum version 22.x, then run:

```bash
npm run dev
```

by default, this will start a development server at http://localhost:5732 and connects to development nexus service at `https://dev.salimon.net/nexus`. to change the nexus endpoint you can set environment in `.env` file or pass them as command line arguments when running npm script.
there is a `.env.example` file that shows how to configure your own .env file.

## Docker

this project can be containerized using docker. you can serve it with docker compose by running:

```bash
docker compose up --build -d
```
