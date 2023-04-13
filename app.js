const encodedStr = "ERsBAiBfTF0VBjwIFRBTQFwKQRIbJw0WEEsdPEomIH8dcBEOATUDMUw=";
const seed = "yourSecretSeed123";
const encodedUrlParam = getQueryParam("data");

console.log(encodedUrlParam);

let BASE_URL = xorDecode(encodedUrlParam, seed);

console.log(BASE_URL);

function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

function xorDecode(encodedStr, seed) {
  const str = atob(encodedStr); // Decode the base64 encoded string
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) ^ seed.charCodeAt(i % seed.length));
  }
  return result;
}

async function fetchAndDisplayTextFile(filename, fileItem) {
  try {
    const response = await fetch(BASE_URL + filename);
    const text = await response.text();

    const textareaContainer = document.createElement("div");
    textareaContainer.classList.add("flex");
    textareaContainer.innerHTML = `
      <textarea class="w-full h-32 p-2 border mb-3" readonly>${text}</textarea>
      <div class="ml-2 flex items-start">
        <button class="bg-green-600 text-white px-3 py-1 rounded" data-clipboard-text="${text}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
          </svg>
        </button>
      </div>
    `;
    fileItem.appendChild(textareaContainer);
  } catch (error) {
    console.error("Error fetching text file:", error);
  }
}

async function fetchAndDisplayMarkdownFile(fileName, fileItem) {
  try {
    const response = await fetch(BASE_URL + fileName);
    const markdown = await response.text();
    const html = marked.parse(markdown);
    const instructionsContainer = document.createElement("div");
    instructionsContainer.classList.add("markdown", "mt-3");
    instructionsContainer.innerHTML = html;
    fileItem.appendChild(instructionsContainer);
  } catch (error) {
    console.error("Error fetching Markdown file:", error);
  }
}

async function displayFiles(files) {
  const fileList = document.getElementById("file-list");

  fileList.innerHTML = "";
  for (const file of files) {
    const fileItem = document.createElement("div");
    fileItem.classList.add("bg-white", "p-4", "rounded", "shadow", "border", "mb-6");
    fileList.appendChild(fileItem);

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("bg-neutral-200", "p-4", "rounded", "shadow", "border", "mb-6");
    fileItem.appendChild(contentContainer);

    const title = document.createElement("h3");
    title.classList.add("text-xl", "font-semibold", "mb-3");
    title.textContent = file.content.title;
    contentContainer.appendChild(title);

    const tags = document.createElement("ul");
    tags.classList.add("list-none", "flex", "flex-wrap", "mb-3");
    file.content.tags.forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.classList.add("text-xs", "bg-gradient-to-tl", "from-pink-500", "to-cyan-400", "text-white", "rounded-full", "px-2", "py-1", "mr-2", "mb-2");
      tagItem.textContent = tag;
      tags.appendChild(tagItem);
    });
    contentContainer.appendChild(tags);

    const description = document.createElement("p");
    description.classList.add("text-sm", "mb-3");
    description.textContent = file.content.description;
    contentContainer.appendChild(description);

    await fetchAndDisplayTextFile(file.fileName, contentContainer);
    if (file.content.images) {
      const galleryContainer = document.createElement("div");
      galleryContainer.classList.add("grid", "grid-cols-3", "gap-4", "mb-6");
      fileItem.appendChild(galleryContainer);

      for (const image of file.content.images) {
        const imgElement = document.createElement("img");
        imgElement.src = BASE_URL + image;
        imgElement.classList.add("w-full", "h-auto", "rounded");
        galleryContainer.appendChild(imgElement);
      }
    }

    if (file.fileName) {
      const instructionsFilename = file.fileName.replace(".txt", ".md");
      await fetchAndDisplayMarkdownFile(instructionsFilename, fileItem);
    }
  }

  new ClipboardJS("[data-clipboard-text]");
}

async function fetchAndDisplayJSON(url) {
  try {
    const response = await fetch(url);
    const files = await response.json();
    displayFiles(files);
  } catch (error) {
    console.error("Error fetching JSON:", error);
  }
}

document.getElementById("url-input").addEventListener("input", async (event) => {
  const url = xorDecode(event.target.value, seed);

  if (!url) {
    return;
  }

  await fetchAndDisplayJSON(url);
});

// Load the default template.json file from the provided URL
if (encodedUrlParam) {
  fetchAndDisplayJSON(BASE_URL + "prompt.json");
}


