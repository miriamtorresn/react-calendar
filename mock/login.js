module.exports = {
  'POST /user/login': (req, res) => {
    const users = [
      {
          "id": 1,
          "name": "Ronald",
          "lastName": "Weasley",
          "username": "r.weasley",
          "password": "wingardiumleviosa",
          "email": "r.weasley@hogwarts.edu",
          "image":"https://i.picsum.photos/id/304/400/300.jpg"
      },
      {
          "id": 2,
          "name": "Hermione",
          "lastName": "Granger",
          "username": "h.granger",
          "password": "itsleviosa",
          "email": "h.granger@hogwarts.edu",
          "image":"https://i.picsum.photos/id/305/400/300.jpg"
      },
      {
          "id": 3,
          "name": "Luna",
          "lastName": "Loovegood",
          "username": "l.loovegood",
          "password": "lovethestrals",
          "email": "l.loovegood@hogwarts.edu",
          "image":"https://i.picsum.photos/id/306/400/300.jpg"
      }
    ];
    
    const response = {};
    const { username, password } = req.body;
    // Mocking login and user finding.
    const userFound = users.find(user => user.username === username);
    
    if (userFound) {
      if (userFound.password === password) {
        response.success = true;
        response.code = 200;
        response.data = userFound;
      } else {
        response.success = false;
        response.code = 401;
        response.message = 'Not allowed';
      }
    } else {
      response.success = false;
      response.code = 404;
      response.message = 'User not found';
    }
    res.send(response);
  },
};
