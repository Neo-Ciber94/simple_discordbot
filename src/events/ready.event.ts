import logger from "../logger";
import { createListener } from "../utils/createListener";

export default createListener({
  event: "ready",
  once: true,
  execute() {
    logger.info("Ready!");
  },
});
