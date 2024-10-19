// controllers/marqueeControllers.js
const Marquee = require('../models/marquee');

// Create a new marquee
const createMarquee = async (req, res) => {
    const { text } = req.body;
    const newMarquee = new Marquee({ text });

    try {
        const savedMarquee = await newMarquee.save();
        return res.status(201).json(savedMarquee);
    } catch (error) {
        console.error("Error creating marquee:", error);
        return res.status(500).json({ message: 'Error creating marquee', error: error.message });
    }
};

// Get all marquees
const getMarquees = async (req, res) => {
    try {
        const marquees = await Marquee.find();
        return res.status(200).json(marquees);
    } catch (error) {
        console.error("Error fetching marquees:", error);
        return res.status(500).json({ message: 'Error fetching marquees', error: error.message });
    }
};

// Get a marquee by ID
const getMarqueeById = async (req, res) => {
    const { id } = req.params;

    try {
        const marquee = await Marquee.findById(id);
        if (!marquee) {
            return res.status(404).json({ message: 'Marquee not found' });
        }
        return res.status(200).json(marquee);
    } catch (error) {
        console.error("Error fetching marquee:", error);
        return res.status(500).json({ message: 'Error fetching marquee', error: error.message });
    }
};

// Update marquee by ID
const updateMarquee = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedMarquee = await Marquee.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedMarquee) {
            return res.status(404).json({ message: 'Marquee not found' });
        }
        return res.status(200).json(updatedMarquee);
    } catch (error) {
        console.error("Error updating marquee:", error);
        return res.status(500).json({ message: 'Error updating marquee', error: error.message });
    }
};

// Delete marquee by ID
const deleteMarquee = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedMarquee = await Marquee.findByIdAndDelete(id);
        if (!deletedMarquee) {
            return res.status(404).json({ message: 'Marquee not found' });
        }
        return res.status(200).json({ message: 'Marquee deleted successfully' });
    } catch (error) {
        console.error("Error deleting marquee:", error);
        return res.status(500).json({ message: 'Error deleting marquee', error: error.message });
    }
};

module.exports = {
    createMarquee,
    getMarquees,
    getMarqueeById,
    updateMarquee,
    deleteMarquee
};
