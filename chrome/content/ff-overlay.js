RelianceDataUsage.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ RelianceDataUsage.showFirefoxContextMenu(e); }, false);
};

RelianceDataUsage.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-RelianceDataUsage").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { RelianceDataUsage.onFirefoxLoad(); }, false);
