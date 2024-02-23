const mongoose = require('mongoose');

const connectionString = `mongodb+srv://new_user:iV09YAj6pCC0hriA@cluster0.1znnbzj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(connectionString).then(() => console.log('Database connected')).catch((err) => console.log(err));