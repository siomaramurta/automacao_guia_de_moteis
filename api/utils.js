const fs = require('fs');

function getNextId() {
  const dbContent = fs.readFileSync('db.json', 'utf-8');
  const dbData = JSON.parse(dbContent);

  const users = dbData.users;

  if (users.length === 0) {
    return 1;
  }

  let maxId = 0;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id > maxId) {
      maxId = users[i].id;
    }
  }

  return maxId + 1;
}

module.exports = { getNextId };