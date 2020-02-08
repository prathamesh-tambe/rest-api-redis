import express from 'express';
import routes from './src/routes/planRoutes';
//var etag = require('etag')
import bodyParser from 'body-parser';

const app = express();
const PORT = 4001;



// bodyParser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//app.set('etag', 'strong');

routes(app);

// to serve static files
app.use(express.static('public')); // public is the folder name which we have to allow to serve static files

app.get("/",(req,res) => 
    res.send(`Welcome to demo of Rest Apis using Node.js/Redis/Etags.\n\nNode and Express server running on port ${PORT}. <a href='http://localhost:4000/plan'>http://localhost:4000/plan</a>`)
);

app.listen(PORT,() => 
    console.log(`yOUR SERVER IS RUNNING ON ${PORT}`)
);