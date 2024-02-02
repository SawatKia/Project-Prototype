/* eslint-disable max-len */
// stockService.ts

import axios from "axios";
import {ApiStockResponse} from "../interfaces/ApiStockResponse";
/**
 * Service for fetching stock data from a third-party API.
 */
class StockService {
  /**
   * Fetches the stock price for a given symbol.
   *
   * @param {string} symbol - The stock symbol.
   * @return {Promise<ApiStockResponse>} - A Promise that resolves to the stock price or null if not found.
   */
  async getStockData(symbol: string): Promise<ApiStockResponse> {
    try {
      const response = await axios.get("https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules", {
        params: {
          ticker: symbol,
          module: "financial-data",
        },
        headers: {
          "X-RapidAPI-Key": "13dbce2c45msh3cfc600150d8fcdp177ec8jsn3c3c7b713381",
          "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error fetching stock price:", error);
      throw error;
    }
  }
}

export default new StockService();
