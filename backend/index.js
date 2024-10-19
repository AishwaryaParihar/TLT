const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const router = require('./routes');
const ADMIN_URL = process.env.ADMIN_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const STUDENTPANEL_URL = process.env.STUDENTPANEL_URL;

const app = express();

// Middleware
// app.use(
//   cors({
//     origin: [`${FRONTEND_URL}`, `${ADMIN_URL}`], // Update with your frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

// Middleware to allow CORS
app.use(
  cors({
    origin: [`${ADMIN_URL}`, `${FRONTEND_URL}`, `${STUDENTPANEL_URL}`], // Allow your frontend and admin URLs
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Enable credentials (if you need to send cookies or authentication headers)
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('/notifiesfiles', express.static('notifiesfiles'));
app.use('/files', express.static('files'));
app.use('/jetFormfiles', express.static('jetFormfiles'));
app.use(
  '/unpaidProductUploadFiles',
  express.static('unpaidProductUploadFiles')
);

app.use('/SyllabusUploadFiles', express.static('SyllabusUploadFiles'));
app.use('/prevYearPDFuploadUpload', express.static('prevYearPDFuploadUpload'));

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 8080; // Changed port number

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Connected to DB');
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB', err);
  });
