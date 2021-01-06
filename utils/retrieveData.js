let layoutData, audioData;

function retrieveData() {
  const xhttp = new XMLHttpRequest();

  xhttp.open("GET", "/getData", false);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(null);
  if (xhttp.status === 200) {
    let jsonData = JSON.parse(xhttp.responseText);
    layoutData = jsonData.layoutData;
    audioData = jsonData.audioData;
  }
}

retrieveData();
export { layoutData, audioData };
