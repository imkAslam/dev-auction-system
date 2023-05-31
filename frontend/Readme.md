
# Getting started

# Introduction

This is a simple auction system application build Using [ReactTs]. Where user can register,login, create items for auction ,add payment and can do bidding in it. Complete flow has mention below.

# Application Usage/flow:

If user have an account then he can login using the existing credentials.
He/she can create new item for auction. He/she can deposit amount in his/he account.
He/she can bide on each item , within the Duration mentioned with auction.
He/she cannot bid on same item instantly after bidding on item bid [Button] will be disabled for 5sec and user has to wait for 5sec to bid again on same item.

-------------------

## Installation:

Clone the repository

    git clone https://github.com/devMajidAli/dev-auction-system.git

Switch to the repo folder

    cd frontend
    
Install the dependencies
   
`npm install`

--------------------------------
## Apis configuration:

Initially application was configured with baseurl of `localhost:3001/api`. As you start your server you have to reconfigure your baseurl due to different [port](http://localhost:port/api) or [domain](http://domain-name:port/api), in `/frontend/src/app/api.ts` you have to configure it here.


----------------------------

## Tech-stack
1. frontend ReatTs (written in typescript)
2. backend Nestjs(Node.js framework) written in typescript

 # Project Structure
/src
  ├─ /app                 # Contains axios base api
  ├─ /assets              # Contains images,svgs,fonts,styles and other assets
  ├─ /entities            # Database entities or models
  ├─ /Components          # Contain all the generic components of project
  ├─ /feature             # Contains all api features for the project
  ├─ /Hooks               # All custom hooks for the project
  ├─ /Pages               # All the main pages of the project
  ├─ main.tsx              # Entry point of the application
  └─ app.tsx              # Route file of the application


-----------------------------
## NPM scripts:

- `npm install` - install dependencies
- `npm run dev` - Start application
- `npm run build` - Build application
- `npm run preview` - view the build application
- `npm run lint` - Run Project with linting

----------

## Start application:

- `npm run dev`
- Test frontend with `http://localhost:port/` in your favourite browser

# Contributing
If you want to contribute to this project, follow the steps below:

Fork the repository.
1. Create a new branch for your feature: git checkout -b feature/your-feature-name.
2. Make your changes and commit them: git commit -m 'Add some feature'.
3. Push the changes to your forked repository: git push origin feature/your-feature-name.
4. Submit a pull request to the main repository.

Need help? contact us through email [majidhussaindev@gmail.com].