var express = require('express');
var router = express.Router();

let users = [
  { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "admin", "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" },
  { "id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "user", "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" },
  { "id": 3, "name": "Bob Johnson", "email": "bob@example.com", "role": "user", "creationAt": "2026-02-01T19:28:25.000Z", "updatedAt": "2026-02-01T19:28:25.000Z" }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  const { name, email, role } = req.query;
  let filteredUsers = users;

  if (name) {
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (email) {
    filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
  }

  if (role) {
    filteredUsers = filteredUsers.filter(user => user.role === role);
  }

  res.json(filteredUsers);
});

// GET /users/:id - Lấy user theo id
router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const user = users.find(user => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// POST /users - Tạo user mới
router.post('/', function(req, res, next) {
  const { name, email, role } = req.body;
  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const newId = Math.max(...users.map(u => u.id)) + 1;
  const newUser = {
    id: newId,
    name,
    email,
    role,
    creationAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Cập nhật user
router.put('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { name, email, role } = req.body;
  const updatedUser = {
    ...users[index],
    name: name || users[index].name,
    email: email || users[index].email,
    role: role || users[index].role,
    updatedAt: new Date().toISOString()
  };
  users[index] = updatedUser;
  res.json(updatedUser);
});

// DELETE /users/:id - Xóa user
router.delete('/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
