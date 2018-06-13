var index = 0;
var interesting = [];

function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function showPatent() {
  if(index > patents.length) {
    $("#patent_title").text("All done! 💁🏻‍");
    $("#abstract").text("");

    $("#to_review_count").text("0");
    $("#interesting_count").text(interesting.length);
  } else {
    $("#patent_title").text(patents[index].Title);
    $("#abstract").text(patents[index].Abstract);

    $("#to_review_count").text(patents.length - index);
    $("#interesting_count").text(interesting.length);
  }
}

function handleKeypress(keyCode) {
  switch(keyCode) {
    case 37: // left
    if(index > 0) {
      showPatent(--index);
    }
    break;

    case 38: // up
    interesting.push(patents[index]);
    patents.splice(index, 1);
    showPatent(index);
    break;

    case 39: // right
    showPatent(++index);
    break;

    case 40: // down
    window.open("https://patents.google.com/patent/" + patents[index]["Publication Number"] + "/en", '_blank');
    break;

    case 88:
    downloadObjectAsJson(interesting, "interesting.json");
    break;

    default: return; // exit this handler for other keys
  }
}

$().ready(function () {
    showPatent(index);

    $(document).keydown(function(e) {
      handleKeypress(e.which);
      e.preventDefault();
    });
})
