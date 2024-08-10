const Query = require('../models/Query');

exports.submitQuery = async (req, res) => {
    try {
        const { name, email, query } = req.body;

        if (!name || !email || !query) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        const newQuery = new Query({ name, email, query });
        await newQuery.save();

        res.status(201).json({ message: 'Query submitted successfully', query: newQuery });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getAllQueries = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        const queries = await Query.find().sort({ createdAt: -1 }); // Sort by time (latest first)
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a query (admin only)
exports.deleteQuery = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        const queryId  = req.params.id;
        const query = await Query.findById(queryId);
        if (!query) {
            return res.status(404).json({ error: 'Query not found.' });
        }

           await query.deleteOne({_id:queryId});
        res.status(200).json({ message: 'Query deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
