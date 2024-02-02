/* eslint-disable max-len */
// ============== Dependencies Setup ==============
import {Request, Response, Router} from "express";

// =================== configuration ===================
import stockservice from "../services/stockservice";
import {ApiStockResponse} from "../interfaces/ApiStockResponse";

// eslint-disable-next-line new-cap
const stockController = Router();

stockController.get("/get/currentprice/:symbol/:market", async (req: Request, res: Response) => {
  const {symbol, market} = req.params;
  let symbolWithMarket = symbol;
  if (market === "Thai") {
    symbolWithMarket += ".bk";
  }
  try {
    const currentStockPrice: ApiStockResponse = await stockservice.getStockData(symbolWithMarket);
    res.status(200).json({
      status: "Success",
      message: `stock ${symbol} in ${market} market gets successfully`,
      data: currentStockPrice.body.currentPrice.raw,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "An external API error occurred",
    });
  }
});
export default stockController;
