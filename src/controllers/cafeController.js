const cafeService = require('../services/cafeService');

exports.getCafes = async (req, res) => {
  const location = req.query.location;
  try {
    const cafes = await cafeService.getCafes(location);
    res.json(cafes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCafe = async (req, res) => {
  const { name, description, location } = req.body;
  try {
    const cafe = await cafeService.createCafe(name, description, location);
    res.status(201).json(cafe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCafe = async (req, res) => {
  const { id } = req.params;
  const { name, description, location } = req.body;
  try {
    const updatedCafe = await cafeService.updateCafe(id, name, description, location);
    if (!updatedCafe) {
      return res.status(404).json({ error: 'Cafe not found' });
    }
    res.status(200).json(updatedCafe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteCafe = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCafe = await cafeService.deleteCafe(id);
    if (!deletedCafe) {
      return res.status(404).json({ error: 'Cafe not found' });
    }
    res.status(200).json({ message: 'Cafe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
