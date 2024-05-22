import express, { Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

import type { PriceRequest } from "./interfaces";
import { Scraper } from "./helpers";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/price", async (req: PriceRequest, res: Response) => {
  const {
    baseUrl,
    searchEndpoint,
    searchTags,
    listElementSelector,
    optionsToShow = 6,
  } = req.body;

  try {
    // Construct the URL for the search query.
    const url = new URL(`${searchEndpoint}?q=${searchTags.join("+")}`, baseUrl)
      .href;

    // Fetch the HTML content of the search results page.
    const shopResponse = await axios.get(url);

    // Create an instance of the Scraper class.
    const scraper = new Scraper(shopResponse.data);

    // Get relevant properties (name, price, link) from products.
    const products = scraper.getProducts(
      listElementSelector,
      optionsToShow,
      ".productItem-name",
      ".price.price-final"
    );

    res.json({ products });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const port = process.env.PORT || 3000;

// Start the server.
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

export default server;
