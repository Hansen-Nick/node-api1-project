// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db')
server.use(express.json())

server.listen(4000, () => {
  console.log('Server listening on port 4000')
})


server.get('/users', (req, res) => {
  db.find() 
    .then(users => {
      res.status(200).json(users)
    })

    .catch(err => {
      res.status(500).json({
        message: err,
        succes: false
      })
    })
})

server.get('/users/:id', (req, res) => {
  const {id} = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json({success: true, user})
      } else {
        res.status(404).json({success: false, err: 'That is not a valid id'})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, err})
    })
})

server.post('/users', (req, res) => {
  const userInfo = req.body;

  db.insert(userInfo)
    .then(user => {
      res.status(201).json({success: true, user});
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
        });
      })
});

server.delete('/users/:id', (req, res) => {
  const {id} = req.params
  
  db.remove(id)
    .then( user => (req, res) => {
      if(user) {
        res.status(204).json({success: true, message: 'DELETED'});
      } else {
        res.status(404).json({success: true, message: 'That is not a valid ID'})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, err})
    })
})

server.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const changedUser = req.body;

  db.update(id, changedUser)
    .then(user => {
      if (user) {
        res.status(200).json({success: true, changedUser})
      } else {
        res.status(404).json({success: true, message: 'That is not a valid ID'})
      }
    })
})





