import express from "express";
import axios from "axios";

const routes = express.Router();
const likeChoice = {
  joke: "http://localhost:3004/joke",
};
//services
routes.route("/")
  .put(async (req, res) => {
    const { type } = req.body;
    let url;

    switch (type) {
      case "joke":
        url = likeChoice.joke;
        break;
      default:
        return res.status(400);
    }
    axios({
      method: 'PUT',
      url: likeChoice.joke,
      headers: req.headers,
      data: req.body,
    }).then((response) => {
      response.data = {
        ...response.data,
        type
      }
      res.send(response.data)
    });
  });

export default routes;