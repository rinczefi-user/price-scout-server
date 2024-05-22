import request from "supertest";
import server from "../server";
import axios from "axios";

import shopResponse from "../mocks/shopResponse";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("POST /price", () => {
  afterAll((done) => {
    server.close(done);
  });

  it("responds with json", async () => {
    mockedAxios.get.mockResolvedValue({
      data: shopResponse,
    });

    const optionsToShow = 3;
    const response = await request(server)
      .post("/price")
      .send({
        baseUrl: "https://carrefour.ro",
        searchEndpoint: "/catalogsearch/result/",
        searchTags: ["pampers", "premium", "care", "5"],
        listElementSelector: "ol.products.list",
        optionsToShow,
      });

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body.products).toHaveLength(optionsToShow);
  });
});
