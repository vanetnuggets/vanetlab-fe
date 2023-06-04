
function checkSimName(simName, addNotification) {
    var pattern = /^[A-Za-z0-9-_]+$/;
    if (simName == "") {
      addNotification({
            text: `You have to specify scenario name!`,
            position: "bottom-center",
            type: "error",
            removeAfter: 5000,
          });
      return -1
    } else if (!pattern.test(simName)) {
      addNotification({
            text: `Scenario name has to match this regex ${pattern}!`,
            position: "bottom-center",
            type: "error",
            removeAfter: 5000,
          });
      return -1
    }
    return 1
  }

export {checkSimName}