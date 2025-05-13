const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');

// Middleware to parse JSON
app.use(express.json());
app.get('/', (req, res) => res.send('Welcome to Task Manager'));
app.use('/tasks',taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;

if(require.main === module){
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;

