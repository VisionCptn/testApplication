import { Router } from 'express';
import fs         from 'fs';
import path       from 'path';
import marked     from 'marked';
import reject     from 'lodash/reject';
import map        from 'lodash/map';

const router = Router();

let todos = [
  { id: '1', text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`, user: 'John', dateCreated: Date.now() },
  { id: '2', text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`, user: 'John', dateCreated: Date.now() + 1 },
  { id: '3', text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`, user: 'John', dateCreated: Date.now() + 2 },
];
let lastIndex = 5;

router.get('/about', (req, res) => {
  fs.readFile(path.join(__dirname, '../../../README.md'), { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      res.json({ text: marked(data) });
    } else {
      console.log(err);
    }
  });
});

router.get('/todos', (req, res) => {
  // Uncomment one of these to see error handling system at work
  // return res.sendStatus(500);
  // return res.sendStatus(404);
  res.json(todos);
});

router.post('/todos', (req, res) => {
  if (req.session.user) {
    const todo = { ...req.body, id: String(++lastIndex) };
    todos = [...todos, todo];
    return res.json(todo);
  }
  return res.sendStatus(401);
});

router.put('/todos/:id', (req, res) => {
  if (req.session.user) {
    const id = req.body.id;
    todos = map(todos, (todo) => (id === todo.id ? req.body : todo));
    return res.json(req.body);
  }
  return res.sendStatus(401);
});

router.delete('/todos/:id', (req, res) => {
  if (req.session.user) {
    const id = req.params.id;
    todos = reject(todos, ['id', id]);
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

router.get('/loadAuth', (req, res) => {
  res.send(req.session.user);
});

router.post('/login', (req, res) => {
  fs.readFile(path.join(__dirname, '../../../users.json'), { encoding: 'utf-8' }, (err, data) => {
    if (!err) {
      data = JSON.parse(data);
      const { name, pass } = req.body;
      for (let i = 0; i < data.users.length; i++){
        if (data.users[i].login == name && data.users[i].password == pass){
          req.session.user = name;
          return res.send(req.session.user);
        }
      }
      return res.sendStatus(401);
    } else {
      console.log(err);
    }
  });

});

router.post('/logout', (req, res) => {
  if (req.session.user) {
    req.session.user = ''; // eslint-disable-line no-param-reassign
  }
  res.sendStatus(200);
});

export default router;
