import dva from "dva";
import createLoading from "dva-loading";
import onError from "./utils/error";

const app = dva({
  // history:require("history").createBrowserHistory()
  history: require("history").createHashHistory(),
  onError,
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/maizuo").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
