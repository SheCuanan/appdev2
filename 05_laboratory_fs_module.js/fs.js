const fs = require('fs');

fs.writeFile('sample.txt', 'This is a sample file.', (err) => {
    if (err) {
        return console.error('Error creating sample.txt:', err);
    }
    console.log('sample.txt created successfully.');

    fs.readFile('sample.txt', 'utf8', (err, data) => {
        if (err) {
            return console.error('Error reading sample.txt:', err);
        }
        console.log('Content of sample.txt:', data);

        fs.writeFile('newfile.txt', 'This is a new file created by Node.js!', (err) => {
            if (err) {
                return console.error('Error creating newfile.txt:', err);
            }
            console.log('newfile.txt created successfully.');

            fs.appendFile('sample.txt', '\nAppended content.', (err) => {
                if (err) {
                    return console.error('Error appending to sample.txt:', err);
                }
                console.log('Content appended to sample.txt successfully.');

                fs.unlink('newfile.txt', (err) => {
                    if (err) {
                        return console.error('Error deleting newfile.txt:', err);
                    }
                    console.log('newfile.txt deleted successfully.');
                });
            });
        });
    });
});
