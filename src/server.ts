import express from 'express';
import { Server } from 'http';
import mongoose from 'mongoose';
import routes from './ms';
//ms sender

const app = express();
const PORT = 3006

app.use(express.json());
app.use("/like", routes)
mongoose.connect('mongodb://localhost:27017/url_office',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    async () => {
      console.log('Connected to database at 27017');
      app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
      })
    })

//topic exchange, 
// create an rpc service