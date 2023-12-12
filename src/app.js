import "./config"
import express from "express";
import router from "./routes";
const app = express();
const bodyParser = require('body-parser');
 
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json())

app.use("/", router)
export default app;



