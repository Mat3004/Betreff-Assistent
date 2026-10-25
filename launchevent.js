Office.onReady();

function onNewMessageCompose(event) {
  Office.addin.showAsTaskpane()
    .then(function () { event.completed(); })
    .catch(function () { event.completed(); });
}

Office.actions.associate("onNewMessageCompose", onNewMessageCompose);
