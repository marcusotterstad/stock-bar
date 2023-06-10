# TODO


### Table of Contents
- [TODO](#todo)
    - [Table of Contents](#table-of-contents)
    - [client](#client)
    - [server](#server)
    - [overall-features](#overall-features)
    - [security](#security)


### client
- [ ] Add total to checkout
- [ ] Add skeleton to loading prices
- [ ] Add dynamic pricing if it changes so people dont order for the wrong price
- [x] Make a Checkout button that sends order to server, and displays response information
- [x] Fix top right Cart button, it resets cart
- [ ] Look into all warnings in console
- [x] Actually create a home page
- [ ] Make rows shorter in height

### server
- [ ] Turn classified information into environment variables
  - db.config.js
- [ ] In GET /menu, also give change in percentage within the last x minutes
- [x] In POST /new-order, add a check to see if the order is possible
- [x] in POST /new-order, return information to client about status, drinks ordered, total, and estimated time to complete


### overall-features

- [ ] Stock chart on single drink item
- [ ] Stock market visual on the project
- [ ] Create an employee client for completing orders
  - [ ] Plan visual layout of employee client
    - Thinking of just having a 4x4 grid of card components, each showing how many of each drink, and a button to complete the order
- [x] Think of a way to implement AI into this project
  - <sub>When the project is finished, I can create an employee AI, and a user AI to do different things. One for a video where it orders automatically and displays it in console, and another for stress testing it to see bottlenecks.</sub>
  - <sub>Example:
  `
  CustomerAI: Ordered (1) of drink 2 and (2) of drink 4, total is 240. ------------------------------------
  EmployeeAI: Received order, making (3) drinks.
  `</sub>
- [ ] 


### security
- [ ] make employee client password protected AND only accessible on local network