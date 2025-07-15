const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

const username = "John";

eventEmitter.on('userLoggedIn', (user) => {
  console.log(`> User ${user} logged in`);
});

eventEmitter.on('userLoggedIn', (user) => {
  console.log(`> Notification sent to ${user}`);
});
eventEmitter.on('messageReceived', (message) => {
  console.log(`> New message received: "${message}"`);
});
eventEmitter.on('dataSynced', () => {
  console.log(`> Data sync complete`);
});

console.log("Starting Real-Time Notification System...\n");

setTimeout(() => {
  eventEmitter.emit('userLoggedIn', username);
}, 1000); 

setTimeout(() => {
  eventEmitter.emit('messageReceived', "Welcome to the system, John!");
}, 2500);

setTimeout(() => {
  console.log("> Syncing user data...");
  
  setTimeout(() => {
    eventEmitter.emit('dataSynced');
  }, 1500);

}, 4000);
