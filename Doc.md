## Documentation


## User CRUD

Get all Users:
```sh
Type: GET
url: /api/users/
```

Add User:
```sh
Type: POST
url: /api/users/
body: { 'username': 'username', 'password': 'password', 'email': 'test@test.com'}
```

Get User:
```js
Type: GET
url: /api/users/:id
```

Update User
```sh
url: /api/users/:id
Type: PUT
body: { 'username': 'username', 'password': 'password', 'email': 'test@test.com', 'name': 'name', }
```

Delete User
```sh
url: /api/users/:id
Type: DELETE
```
