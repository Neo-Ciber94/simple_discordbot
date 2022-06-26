import { createListener } from "../utils/createListener";

export default createListener({
  event: "ready",
  once: true,
  execute() {
    console.log("Ready!");
  },
});
