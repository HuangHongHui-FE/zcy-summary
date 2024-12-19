const emitter = require("./common");

emitter.addListener("stopSiteLiveStream", (option) => {
  console.log("🚀 ~ option:", option);
});

// useEffect(() => {
//   return () => {
//     emitter.removeAllListeners("destroyMeeting");
//   };
// });
