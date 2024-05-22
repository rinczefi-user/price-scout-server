import type { Request } from "express";

export interface PriceRequest extends Request {
  body: {
    baseUrl: string;
    searchEndpoint: string;
    searchTags: string[];
    listElementSelector: string;
    optionsToShow?: number;
  };
}
