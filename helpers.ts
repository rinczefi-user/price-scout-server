import * as cheerio from "cheerio";

// Scraper class based on the Cheerio library.
export class Scraper {
  constructor(private html: string) {}

  getProducts(
    listElementSelector: string,
    optionsToShow: number,
    productNameSelector: string,
    productPriceSelector: string
  ) {
    const $ = cheerio.load(this.html);

    return $(listElementSelector)
      .children()
      .slice(0, optionsToShow)
      .map((_i, element) => {
        const productNameElement = $(element).find(productNameSelector);
        const priceAmount = $(element)
          .find(productPriceSelector)
          .attr("data-price-amount");

        return {
          title: productNameElement.text().trim(),
          href: productNameElement.find("a").attr("href"),
          price: priceAmount,
        };
      })
      .get();
  }
}
