# Kinetix

**Kinetix** is an Angular 17 blog management system built as a learning and practice project.

The project currently focuses on building a modern Angular frontend for managing blog posts. It includes CRUD functionality, Angular Material UI, standalone components, reactive forms, RxJS, NgRx state management, and component communication.

> **Current status:** Frontend-only. The application does not have a real backend API yet. A Laravel or Node.js API will be developed and integrated in a future phase.

## Features

- Blog post CRUD interface
- View posts in a table/list
- View post details
- Create new posts
- Edit existing posts
- Delete posts
- Reactive forms with validation
- Multi-select form practice
- Angular Material UI
- Standalone Angular components
- Angular routing
- RxJS Observables and `BehaviorSubject`
- NgRx state management
- Complex state structure practice
- Component-to-component communication
- Frontend API/service architecture ready for future backend integration

## Tech Stack

- **Angular:** 17.3.12
- **TypeScript**
- **Angular Material**
- **RxJS**
- **NgRx**
- **Reactive Forms**
- **SCSS/CSS**
- **Git & GitHub**
- **Netlify** — deployment

## Project Structure

The application is organized around common Angular concepts and separates responsibilities between components, services, state management, models, and routing.

The main blog entity is the `Post` model, which currently contains fields such as:

```
id
title
slug
excerpt
description
is_published
created_at
updated_at
```

## Current Architecture

At the moment, the application works without a backend.

The frontend uses local/mock data and Angular services/state management to simulate the blog system.

The planned architecture is:

```
Angular Frontend
       ↓
   NgRx Store
       ↓
 Angular Services
       ↓
    HTTP Client
       ↓
 Laravel / Node.js API
       ↓
    Database
```

The backend layer will be added later so the application can work with real persistent data.

## Learning Goals

This project is being developed alongside learning and practicing:

- Angular standalone components
- Reactive Forms
- Form validation
- RxJS
- `Observable`
- `BehaviorSubject`
- NgRx
- Complex state management
- Component communication
- Angular routing
- HTTP services
- REST APIs
- Authentication and authorization
- Frontend/backend integration
- Building a real-world CRUD application

## TODO

### Angular & Frontend

- [ ] Improve overall UI/UX
- [ ] Add loading states
- [ ] Add better error handling
- [ ] Add confirmation dialogs for destructive actions
- [ ] Improve form validation and error messages
- [ ] Add pagination
- [ ] Add search/filter functionality
- [ ] Add sorting
- [ ] Improve responsive design
- [ ] Add reusable UI components

### RxJS

- [ ] Practice advanced RxJS operators
- [ ] Improve Observable composition
- [ ] Practice `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap`
- [ ] Practice error handling with RxJS
- [ ] Better understand `Subject` vs `BehaviorSubject`
- [ ] Practice subscription cleanup and lifecycle management

### NgRx

- [ ] Organize actions, reducers, effects, selectors, and models
- [ ] Practice NgRx Effects with HTTP requests
- [ ] Improve complex state structure
- [ ] Add loading/error/success state handling
- [ ] Create reusable selectors
- [ ] Practice entity-style state management

### Backend API

- [ ] Build a real REST API
- [ ] Choose backend: Laravel or Node.js
- [ ] Create `Post` API endpoints
- [ ] Connect Angular to the real API
- [ ] Add database persistence
- [ ] Add server-side validation
- [ ] Add pagination and filtering
- [ ] Handle API errors properly
- [ ] Add authentication
- [ ] Add authorization

### Deployment

- [x] Deploy frontend to Netlify
- [ ] Connect frontend to production API
- [ ] Configure environment variables
- [ ] Configure production API URL
- [ ] Configure CORS
- [ ] Deploy backend
- [ ] Connect production database

## Development Server

Install dependencies:

```
npm install
```

Run the development server:

```
ng serve
```

Then open:

```
http://localhost:4200/
```

The application automatically reloads when source files are changed.

## Build

Create a production build:

```
ng build
```

Build artifacts will be generated in the `dist/` directory.

## Testing

Run unit tests:

```
ng test
```

End-to-end testing can be added later using a testing framework such as Playwright or Cypress.

## Deployment

The current frontend is deployed on **Netlify**.

The application will initially remain frontend-only. Once the backend API is developed, the production frontend will be connected to the deployed API.

## Roadmap

The project will evolve in the following stages:

```
Phase 1
Angular Fundamentals
      ↓
Phase 2
RxJS + Reactive Forms
      ↓
Phase 3
NgRx State Management
      ↓
Phase 4
Real REST API
      ↓
Phase 5
Authentication
      ↓
Phase 6
Production Deployment
```

## Resources

- [Angular Documentation](https://angular.io/)
- [Angular Component Interaction](https://v17.angular.io/guide/component-interaction)
- [NgRx Documentation](https://ngrx.io/)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular Material](https://material.angular.io/)

  **Kinetix** is primarily a learning project, but the goal is to gradually turn it into a complete real-world blog management application with an Angular frontend and a production-ready backend API.
