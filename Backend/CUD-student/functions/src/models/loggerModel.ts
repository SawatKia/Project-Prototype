/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
// ============================ configuration =====================================
import config from "../config/config";
import {Log} from "../interfaces/logger";
/**
 * Represents a model for managing Logging data.
 */
class LoggerModel {
  private db = config.db;
  /**
     * Asynchronously inserts a log into the logging collection.
     *
     * @param {Log} log - the log to be inserted
     * @return {Promise<void>} a promise that resolves when the log is successfully inserted
     */
  async insertLog(log: Log) {
    await this.db.collection("logging").doc(`${Date.now()}`).set(log, {merge: true});
    const loggingSnapshot = await this.db.collection("logging").get();
    if (loggingSnapshot.size > 200) {
      loggingSnapshot.docs.map((doc) => {
        doc.ref.delete();
      });
    }
  }
}

export default new LoggerModel();

