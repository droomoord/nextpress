const createMap = () => {
  let map = L.map("map").setView([52.1003491, 5.0835228], 18);
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      maxZoom: 19,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiZHJvb21vb3JkIiwiYSI6ImNsMmtuYXowbjE4NTczY3A5MnljanJ0c2oifQ.l5pewtl1ExKV4ENU2E_gew",
    }
  ).addTo(map);
  function tekenBovenlaag() {
    var linksOnder = [52.09955, 5.082];
    var rechtsBoven = [52.1008, 5.0855];
    var imageUrl = "/assets/img/maplayer_master_transparant.gif";
    var imageBounds = [linksOnder, rechtsBoven];

    var bovenlaag = L.imageOverlay(imageUrl, imageBounds, {
      interactive: true,
    })
      .addTo(map)
      .setOpacity(1);

    var exboot_linksonder = L.latLng(52.100171, 5.082637);
    var exboot_rechtsboven = L.latLng(52.100248, 5.083034);
    var exbootLocation = L.latLngBounds(exboot_linksonder, exboot_rechtsboven);

    bovenlaag.on("click", function (clickOnTheMap) {
      if (exbootLocation.contains(clickOnTheMap.latlng)) {
        window.open("https://www.exboot.nl");
      }
    });
  }
  tekenBovenlaag();
};

export default createMap;
