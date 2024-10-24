import dva from "dva";
import createLoading from 'dva-loading';

const app = dva({
  // history:require("history").createBrowserHistory()
  history: require("history").createHashHistory(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/maizuo").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");
