import {
    logger
} from "./application/logging";
import {
    web
} from "./application/web";

web.listen(3333, () => logger.info("Server running on port 3333"));