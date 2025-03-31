const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('start', () => {
    console.log('Application Started!');

});

emitter.on('data', (data)=> {
    console.log(`Data received: ${data}`)
});

emitter.emit('start');
emitter.emit('data', 'name: "Sherelyn Cuanan", age: 20');

emitter.on('error', (error) => {
    console.log(`Error occurred: ${error}`)
});

emitter.emit('error', 'You have an error');