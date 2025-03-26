// Import the need modules  
const http = require('http'); 
const fs = require('fs');  
const path = require('path');  
const url = require('url'); 
const EventEmitter = require('events'); 

// Create an EventEmitter instance  
const eventEmitter = new EventEmitter();  
const PORT = 3000; // Define the port number  
const directoryPath = path.join(__dirname, 'files'); // Define the directory path  

// Create the 'files' directory if it doesn't exist  
if (!fs.existsSync(directoryPath)) {  
    fs.mkdirSync(directoryPath);  
}  

// Create the HTTP server  
const server = http.createServer((req, res) => {  
    const parsedUrl = url.parse(req.url, true); // Parse URL and query parameters  
    const pathname = parsedUrl.pathname;  

    // Handle file where it creates a new file.
    if (pathname === '/create') {  
        const filename = parsedUrl.query.filename;  
        fs.writeFile(path.join(directoryPath, filename), '', (err) => {  
            if (err) {  
                res.writeHead(500);  
                return res.end('Error creating file');  
            }  
            eventEmitter.emit('fileCreated', filename); // Emit event  
            res.writeHead(200);  
            res.end('File was created successfully'); 
        });  
    }   
    // Handle file where it reads the content of an existing file.
    else if (pathname === '/read') {  
        const filename = parsedUrl.query.filename;  
        fs.readFile(path.join(directoryPath, filename), 'utf8', (err, data) => {  
            if (err) {  
                res.writeHead(500);  
                return res.end('Error reading file');  
            }  
            res.writeHead(200);  
            res.end(data);  
        });  
    }   
    // Handle file updating where it appends content to an existing file.
    else if (pathname === '/update') {  
        const filename = parsedUrl.query.filename;  
        const content = parsedUrl.query.content;  
        fs.appendFile(path.join(directoryPath, filename), content, (err) => {  
            if (err) {  
                res.writeHead(500);  
                return res.end('Error updating file');  
            }  
            eventEmitter.emit('fileUpdated', filename); // Emit event  
            res.writeHead(200);  
            res.end('The file has been updated');  
        });  
    }   
    // Handle file where it deletes a specified file.
    else if (pathname === '/delete') {  
        const filename = parsedUrl.query.filename;  
        fs.unlink(path.join(directoryPath, filename), (err) => {  
            if (err) {  
                res.writeHead(500);  
                return res.end('Error deleting file');  
            }  
            eventEmitter.emit('fileDeleted', filename); // Emit event  
            res.writeHead(200);  
            res.end('File has been succesfully deleted');  
        });  
    }   
    // Handle 404 Not Found  
    else {  
        res.writeHead(404);  
        res.end('Not Found');  
    }  
});  

// Set up event listeners for logging actions  
eventEmitter.on('fileCreated', (filename) => {  
    console.log(`File created: ${filename}`);  
});  

eventEmitter.on('fileUpdated', (filename) => {  
    console.log(`File updated: ${filename}`);  
});  

eventEmitter.on('fileDeleted', (filename) => {  
    console.log(`File deleted: ${filename}`);  
});  

// Start the server  
server.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});  