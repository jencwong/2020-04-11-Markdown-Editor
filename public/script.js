window.onload = function () {
  let converter = new showdwon.Converter();
  let pad = document.getElementById("pad");
  let markdownArea = document.getElementById("markdown");

  //   create tab

  pad.addEventListener("keydown", function (e) {
    if (e.keyCode === 9) {
      let start = this.selectionStart;
      let end = this.selectionEnd;

      let target = e.target;
      let value = target.value;

      // set textarea value to text before carriage + tab + text after carriage

      target.value = value.substring(0, start) + "\t" + value.substring(end);

      // move carriage to start position again (add one for the tab)
      this.selectionStart = this.selectionEnd = start + 1;

      e.preventDefault();
    }
  });

  let previousMarkdownValue;

  //convert text to markdown:
  let convertTextAreaMarkdown = function () {
    let markdownText = pad.value;
    html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  };

  let change = function () {
    if (previousMarkdownValue !== pad.value) {
      return true;
    }
    return false;
  };

  //   detect changes
  setInterval(function () {
    if (change()) {
      convertTextAreaMarkdown();
    }
  }, 1500);

  pad.addEventListener("input", convertTextAreaMarkdown);
  sharejs.open("home", "text", function (error, doc) {
    doc.attach_textarea(pad);
    convertTextAreaMarkdown();
  });

  //   //   ignore if on homepage
  //   if (this.document.location.pathname.length < 2) {
  //     // implement share hs
  //   }
};
