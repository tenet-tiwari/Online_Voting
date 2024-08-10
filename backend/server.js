// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const electionRoutes=require('./routes/election');
const candidateRoutes = require('./routes/candidateRoutes');
const editRoutes = require('./routes/edit');
const queyRoutes = require('./routes/queryRoutes');
const voteRoutes = require('./routes/voteRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/election',electionRoutes);
app.use('/api/candidate',candidateRoutes);
app.use('/api/edit',editRoutes);
app.use('/api/query',queyRoutes);
app.use('/api/vote',voteRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
