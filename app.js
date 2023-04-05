const BASE_URL = "https://promptbros.github.io/CDN/ChatGPT/";

function fetchAndDisplayTextFile(filename, fileItem) {
  fetch(BASE_URL + filename)
    .then((response) => response.text())
    .then((text) => {
      const textareaContainer = document.createElement("div");
      textareaContainer.classList.add("flex");
      textareaContainer.innerHTML = `
        <textarea class="w-full h-32 p-2 border mb-3" readonly>${text}</textarea>
        <div class="ml-2 flex items-start">
          <button class="bg-cyan-600 text-white px-3 py-1 rounded" data-clipboard-text="${text}">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z" clip-rule="evenodd" />
              <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
              <path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
            </svg>
          </button>
        </div>
      `;
      fileItem.appendChild(textareaContainer);
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
    fileItem.classList.add("bg-slate-200", "p-4", "rounded", "shadow", "border", "mb-6");
    fileList.appendChild(fileItem);

    const title = document.createElement("h3");
    title.classList.add("text-xl", "font-semibold", "mb-3");
    title.textContent = file.content.title;
    fileItem.appendChild(title);

    const tags = document.createElement("ul");
    tags.classList.add("list-none", "flex", "flex-wrap", "mb-3");
    file.content.tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.classList.add("text-xs", "bg-slate-400", "rounded-full", "text-white", "px-1", "py-1", "mr-2", "mb-2");
      tagItem.textContent = tag;
      tags.appendChild(tagItem);
    });
    fileItem.appendChild(tags);

    const description = document.createElement("p");
    description.classList.add("text-sm", "mb-3");
    description.textContent = file.content.description;
    fileItem.appendChild(description);

    fetchAndDisplayTextFile(file.fileName, fileItem);
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
fetchAndDisplayJSON(BASE_URL + "prompt.json");
