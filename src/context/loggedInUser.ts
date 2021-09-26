import { createContext, Context } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LoggedInUserContext: Context<any> = createContext(null);

export default LoggedInUserContext;
