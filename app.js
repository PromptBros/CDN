function fetchAndDisplayTextFile(url, fileItem) {
  fetch(url)
      .then((response) => response.text())
      .then((text) => {
          fileItem.innerHTML = `
              <textarea class="w-full h-32 p-2 border mb-3" readonly>${text}</textarea>
              <button class="bg-green-500 text-white px-3 py-1 rounded" data-clipboard-text="${text}">Copy</button>
          `;
      })
      .catch((error) => {
          console.error("Error fetching text file:", error);
      });
}

function displayFiles(files) {
  const fileList = document.getElementById("file-list");

  fileList.innerHTML = "";
  files.forEach((file) => {
      const fileItem = document.createElement("div");
      fileItem.classList.add("bg-white", "p-4", "rounded", "shadow", "border");
      fileList.appendChild(fileItem);

      const title = document.createElement("h3");
      title.classList.add("text-xl", "font-semibold", "mb-3");
      title.textContent = file.content.title;
      fileItem.appendChild(title);

      fetchAndDisplayTextFile(file.file, fileItem);
  });

  new ClipboardJS("[data-clipboard-text]");
}

function fetchAndDisplayJSON(url) {
  fetch(url)
      .then((response) => response.json())
      .then((files) => displayFiles(files))
      .catch((error) => {
          console.error("Error fetching JSON:", error);
      });
}

document.getElementById("url-input").addEventListener("input", (event) => {
  const url = event.target.value;

  if (!url) {
      return;
  }

  fetchAndDisplayJSON(url);
});

// Load the default template.json file from the provided URL
fetchAndDisplayJSON("https://promptbros.github.io/CDN/ChatGPT/prompt.json");
