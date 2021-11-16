const path = require('path');

module.exports = {
    'GET /schedule/:id': (req, res) => {
        const { id } = req.params;
        res.sendFile(path.join(__dirname, `schedules/${id}.json`));
      }
  };
  