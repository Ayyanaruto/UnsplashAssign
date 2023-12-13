  const searchBtn = document.querySelector(".search-form-btn");
  const searchInput = document.querySelector(".search-form-input");
  const gridContainer = document.querySelector(".grid");
  const gridForm = document.querySelector("form");
  const searchDrop = document.querySelector("select");
  const accessKey = "oeOT3c2K573UxkP30xVQFCg7bo4D_7-hSleXEKyUYvY";
  const API = "https://api.unsplash.com/search/photos";

  searchBtn.addEventListener("click", handleSearch);
  gridForm.addEventListener("submit", handleSearch);
  searchDrop.addEventListener("change", handleSearch);

  function handleSearch(event) {
    event.preventDefault();
    const searchTerm = searchInput.value || searchDrop.value;
    const url = `${API}?query=${searchTerm}&per_page=18&orientation=portrait`;

    fetchPhotos(url)
      .then((res) => {
        clearGridContainer();
        res.results.forEach(createGridCard);
      })
      .catch(console.error);
  }

  async function fetchPhotos(url) {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${accessKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return await res.json();
  }

  function createGridCard(result) {
    const gridCard = document.createElement("div");
    const gridImage = document.createElement("div");
    const imgElement = document.createElement("img");
    const input1 = createInputElement("number", "Number 1");
    const input2 = createInputElement("number", "Number 2");
    const inputBtn = document.createElement("button");
    const gridContent = document.createElement("div");
    const headerTag = document.createElement("h1");
    const pTag = document.createElement("p");
    const aTag = document.createElement("a");

    gridImage.className = "grid-image";
    gridCard.className = "grid-card";
    inputBtn.className = "input-btn";
    gridContent.className = "grid-content";
    headerTag.className = "grid-header";
    pTag.className = "grid-description";
    aTag.className = "grid-link";

    imgElement.src = result.urls.small;

    inputBtn.innerText = "Get Num";

    gridImage.append(imgElement);
    gridCard.append(gridImage);

    headerTag.innerText = result.user.name;
    pTag.innerText =
      result.description || "No Description Available for this image";
    aTag.href = `https://unsplash.com/photos/${result.slug}`;
    aTag.text = "See pic";
    gridContent.append(headerTag, pTag, aTag, input1, input2, inputBtn);
    gridCard.append(gridContent);
    gridContainer.append(gridCard);

    gridCard.addEventListener("mouseover", () => {
      gridContent.classList.add("grid-content-after");
    });

    gridCard.addEventListener("mouseout", () => {
      gridContent.classList.remove("grid-content-after");
    });

    inputBtn.addEventListener("click", () => handleDesc(input1, input2, pTag));
  }

  function createInputElement(type, placeholder) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    return input;
  }

  function clearGridContainer() {
    gridContainer.innerHTML = "";
  }

  function handleDesc(input1, input2, pTag) {
    const value1 = parseInt(input1.value);
    const value2 = parseInt(input2.value);
    const desc = pTag.innerText.split(" ");
    const ans = desc.slice(value1 - 1, value2);
    searchInput.value = ans.join(" ");
  }


