# London

## Vocabulary Training App

App to train some vocabulary.

### Features

- Train vocabulary and track process
- Add custom words
- customize your training experience

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

### Testing

- TBD

## Run Project

### Prerequisites

- install node (incl. npm)
- (install docker)

### Get started

1. pull repository
2. cd into ./backend
3. `npm install`
4. `npm start`
5. cd into ./frontend
6. `npm install`
7. `npm start`

> Last Update: 2020-05-22

---

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
