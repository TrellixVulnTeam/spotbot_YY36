const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data.db');
const fs = require('fs');

module.exports.createDB = function(userList) {
    db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER UNIQUE , name TEXT, image TEXT)");
    
        const stmt = db.prepare("INSERT OR IGNORE INTO users(id,name,image) VALUES (?, ?, ?)");
        userList.forEach(element => {
                stmt.run(element.id,element.name,element.image);
                console.log(element.id + ": " + element.name + ": " + element.image);
        });
        stmt.finalize();
    });
}

module.exports.dropDB = function() {
    db.serialize(() => {
        db.run("DROP TABLE IF EXISTS users");
    });
    fs.writeFile('users.txt',``, function (err, data) {
        if (err) throw err;
      });
    fs.writeFile('bot.txt',``, function (err, data) {
        if (err) throw err;
    });
    fs.writeFile('.env',``, function (err, data) {
        if (err) throw err;
    });
}