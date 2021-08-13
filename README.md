# react-example

## About

The application is a part of the financial system that calculates project indicators (eg budget, commitment, costs, etc.), makes forecasts and analyzes investments

This module presents a part of the functional for calculating the feasibility study (FS) of the project

The module is the FS-editor and contains four steps:

1. Setting up the investment period
2. Editing project costs
3. Editing post-project costs
4. Editing the economic effect

Based on the completed data, such financial indicators as IRR, NPV, PP, DPP and EBITDA are calculated in real time

## Технологии

The module is a React project written on Typescript

The application uses:

- Apollo GraphQL to connect to the backend

- Keycloak for authentication

- Sentry to catch errors in the production mode
