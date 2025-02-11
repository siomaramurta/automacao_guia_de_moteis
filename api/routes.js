const { getNextId } = require('./utils');

function handleError(_, res) {
  res.status(500).json({ error: 'Erro interno no servidor.' });
}

function handleCreateUser(req, res, router) {
    const { name, username, email, address } = req.body;
  
    if (!name || !username || !email || !address || !address.street || !address.suite || !address.city || !address.zipcode || !address.geo || !address.geo.lat || !address.geo.lng) {
      return res.status(400).json({
        error: "Todos os campos do usuário e de seu endereço são obrigatórios.",
      });
    }
  
    const newUser = {
      id: getNextId(),
      name,
      username,
      email,
      address: {
        street: address.street,
        suite: address.suite,
        city: address.city,
        zipcode: address.zipcode,
        geo: {
          lat: address.geo.lat,
          lng: address.geo.lng
        }
      }
    };
  
    router.db.get("users").push(newUser).write();
    res.status(201).json(newUser);
  }  

module.exports = { handleError, handleCreateUser };