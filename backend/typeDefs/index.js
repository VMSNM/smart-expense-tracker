import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from "./userTypeDefs.js";
import transactionTypeDef from "./transactionTypeDefs.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;