# IctEvents

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/events`. The app will automatically reload if you change any of the source files.

## Code structure

● app 

 ● events

  --events.component.ts|.html - events component that will call the service methods and display the events.
 
 ● services

  --auth.service.ts - send authentication request and get the request data.

  --eventsquery.service.ts - submit a query to the PHP backend.

  --eventsparser.service.ts - parse the event data.

 ● webapi

  --webapi.service.ts - service that interfaces with the RESTful PHP backend.
 
--app.module.ts

--app-routing.module.ts - route configs.

● asset

  --encrypt.js - encryption and decryption operation.

  --functions.js - provide the functions required.
