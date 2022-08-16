let http = require('http');
let express = require('express');

let app = express();
let mongoose = require('mongoose');
let cors = require('cors');

let methodOverride = require('method-override');
let bodyParser = require('body-parser');
let path = require('path');

require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;
let URI = process.env.ATLAS_URI;

let connected = false;

if (URI === 'Add your MongoDB connection string') console.log(URI);
else {
  mongoose.connect(URI, {
    useNewUrlParser: true,
  });
  connected = true;
}

app.set('port', port);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let Todo = mongoose.model('Todo', {
  title: String,
  content: String,
  status: String,
});

app.use(cors());

app.get('/api/todos', (req, res) => {
  Todo.find((err, todos) => {
    if (err) res.send(err);
    res.json(todos);
  });
});

app.get('/api/todos/:todo_id', (req, res) => {
  Todo.find(
    {
      _id: req.params.todo_id,
    },
    (err, todos) => {
      if (err) res.send(err);
      res.json(todos);
    },
  );
});

app.post('/api/todos', (req, res) => {
  Todo.create(
    {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    },
    (err, todo) => {
      if (err) res.send(err);
      Todo.find((err, todos) => {
        if (err) res.send(err);
        res.json(todos);
      });
    },
  );
});

app.patch('/api/todos/:todo_id', (req, res) => {
  Todo.findByIdAndUpdate(
    req.params.todo_id,
    {
      status: req.body.status,
    },
    (err, todo) => {
      if (err) res.send(err);
      Todo.find((err, todos) => {
        if (err) res.send(err);
        res.json(todos);
      });
    },
  );
});

app.delete('/api/todos/:todo_id', (req, res) => {
  Todo.deleteOne(
    {
      _id: req.params.todo_id,
    },
    (err, todo) => {
      if (err) res.send(err);
      Todo.find((err, todos) => {
        if (err) res.send(err);
        res.json(todos);
      });
    },
  );
});

const server = http.createServer(app);
if (connected === true)
  server.listen(app.get('port'), () => {
    console.log(`Express server listening on: http://localhost:${app.get('port')}`);
  });
