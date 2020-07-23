// include fs module for file
const fs = require("fs");
const util = require("util");
const {
    v4: uuidv4
} = require('uuid');

const writeFileAsync = util.promisify(fs.writeFile);
const readTemplate = util.promisify(fs.readFile);


module.exports = function (app) {

    // Basic route that sends the user first to the AJAX Page
    app.get("/api/notes", async function (err, res) {
        try {
            // reads the notes from json file

            notesData = await readTemplate("./db/db.json", "utf8");

            // parse it so notesData is an array of objects
            notesData = JSON.parse(notesData);

            // error handling
        } catch (err) {
            console.log("\n error (in app.get.catch):");
            console.log(err);
        }
        //   send objects to the browser

        res.json(notesData);
    });

    // writes the new note to the json file
    app.post("/api/notes", async function (req, res) {
        try {

            // reads the json file
            notesData = await readTemplate("./db/db.json", "utf8");
            console.log(notesData);

            // parse the data to get an array of objects
            notesData = JSON.parse(notesData);
            // Set ID
            req.body.id = uuidv4();
            // add the new note to the array of note objects
            notesData.push(req.body); // req.body - user input
            // make it string(stringify)so you can write it to the file
            notesData = JSON.stringify(notesData);
            // writes the new note to file
            writeFileAsync("./db/db.json", notesData, "utf8", function (err) {
                // error handling
                if (err) throw err;
            });
            // changeit back to an array of objects & send it back to the browser(client)
            res.json(JSON.parse(notesData));

            // error Handling
        } catch (err) {
            throw err;
            console.error(err);
        }
    });


    app.delete("/api/notes/:id", async function (req, res) {
        notesData = fs.readFileSync("./db/db.json", "utf8");


        try {



            // if notes data is empty then set '[]' as default value
            //notesData = JSON.parse(notesData || '[]');
            notesData = JSON.parse(notesData);

            notesData = await notesData.filter(function (note) {
                return note.id != req.params.id;
            });

            await writeFileAsync("./db/db.json", JSON.stringify(notesData), "utf8", function (err) {

                res.send(notesData);
            });
        } catch (err) {
            console.log(err);

        }
    });
}