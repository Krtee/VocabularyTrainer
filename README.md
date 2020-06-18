# London

## Vocabulary Training App

App to train vocabulary for different languages.

### Features

- Train vocabulary and track process
- Add custom words
- customize your training experience
- Vocab overview
- Account Setting

## Team

| Name            | ID    |
| --------------- | ----- |
| Regina Dietrich | rd027 |
| Roland Gassen   | rg041 |
| Minh Vu Nguyen  | mn055 |

## Milestones

| Date       | Milestone          |
| ---------- | ------------------ |
| 24.4.2020  | Kick-Off           |
| 22.5.2020  | Mid-Term Session   |
| 19.06.2020 | Final Presentation |

## Tech-Stack

### Frontend

- ReactJS
- Style: Bootstrap

### Backend

- Node.js
- API: REST
- Database: MongoDB

## Run Project

### Prerequisites

- install node (incl. npm)
- OR: install docker

### Get started
#### node
1. pull repository
2. cd into ./backend
3. `npm install`
4. `npm start`
5. cd into ./frontend
6. `npm install`
7. `npm start`
8. Open `localhost:3000` in Browser

#### docker
1. pull repository
2. cd into root
3. `docker-compose up --build`
4. Open `localhost:3000` in Browser

### Testing
1. pull repository
2. cd into ./backend
3. `npm test`
4. cd into ./frontend
5. `npm test`

> Last Update: 2020-06-18

<<<<<<< Updated upstream
---
=======
----

### Präsi
1. App Funktionsumfang 
   > Regina 
2. Code Structure
   > Roland
3.  Testing
   > Minh
4. lessons learned
  - React
  - Mongo
  - Testing
  - (Global) State Management
  - Git Workflow
    - Full Remote work
  - Render processing
  - Merging
  - (REST) API Management
    - trouble finding good one, IBM is best for free so far, but still kinda sucks
  - Docker
  - Bootstrap
  - browser dev tools
  - proper logging
  - Everyone learned at least some things in every major topic. 
5. Versioning
>>>>>>> Stashed changes

Internal Stuff, removed before release

### Ideas

- [Using Systran.io as API](https://platform.systran.net/index)
  - Later: [Linguee](https://github.com/imankulov/linguee-api)
  - Sample Sentences
- Login-Page: Every user has his/her own account
- Language selection: Users can learn different languages. For every language they've got their 'personal dictionary'
- Users can add vocabulary to their dictionary
- Progress:
  - All vocabularies have a progress (numbers 1 - 3)
  - Progress shows how well the user already knows a word
- Vocabulary training:
  - User can set options:
    - How many words are asked?
    - Shall only words with a certain progress level be asked?
    - Which direction shall be asked?
  - After the vocabulary training there's a summary showing if the translations were right
- Settings:
  - How many right guesses in a row shall lead to a new progress level?

### Technical

- Design: Bootstrap
- Library: React
- MongoDB
- ExpressJS

### get started

### TODOs

- ... are listed under issues
