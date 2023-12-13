//Note: To compile this file run the command tsc -w in the terminal in the root directory
class UnsplashGallery {
    private searchBtn: HTMLButtonElement;
    private searchInput: HTMLInputElement;
    private gridContainer: HTMLDivElement;
    private gridForm: HTMLFormElement;
    private searchDrop: HTMLSelectElement;
    private accessKey: string;
    private API: string;

    constructor() {
        this.searchBtn = document.querySelector(".search-form-btn") as HTMLButtonElement;
        this.searchInput = document.querySelector(".search-form-input") as HTMLInputElement;
        this.gridContainer = document.querySelector(".grid") as HTMLDivElement;
        this.gridForm = document.querySelector("form")as HTMLFormElement;
        this.searchDrop = document.querySelector("select")as HTMLSelectElement;
        this.accessKey = "oeOT3c2K573UxkP30xVQFCg7bo4D_7-hSleXEKyUYvY";
        this.API = "https://api.unsplash.com/search/photos";

        this.searchBtn.addEventListener("click", this.handleSearch.bind(this));
        this.gridForm.addEventListener("submit", this.handleSearch.bind(this));
        this.searchDrop.addEventListener("change", this.handleSearch.bind(this));
    }

    private handleSearch(event: Event): void {
        event.preventDefault();
        const searchTerm = this.searchInput.value || this.searchDrop.value;
        const url = `${this.API}?query=${searchTerm}&per_page=18&orientation=portrait`;

        this.fetchPhotos(url)
            .then((res) => {
                this.clearGridContainer();
                res.results.forEach(this.createGridCard.bind(this));
            })
            .catch(console.error);
    }

    private async fetchPhotos(url: string): Promise<any> {
        const res = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Client-ID ${this.accessKey}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Something went wrong");
        }
        return await res.json();
    }

    private createGridCard(result: any): void {
        const gridCard = document.createElement("div");
        const gridImage = document.createElement("div");
        const imgElement = document.createElement("img");
        const input1 = this.createInputElement("number", "Number 1");
        const input2 = this.createInputElement("number", "Number 2");
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
        pTag.innerText = result.description || "No Description Available for this image";
        aTag.href = `https://unsplash.com/photos/${result.slug}`;
        aTag.text = "See pic";
        gridContent.append(headerTag, pTag, aTag, input1, input2, inputBtn);
        gridCard.append(gridContent);
        this.gridContainer.append(gridCard);

        gridCard.addEventListener("mouseover", () => {
            gridContent.classList.add("grid-content-after");
        });

        gridCard.addEventListener("mouseout", () => {
            gridContent.classList.remove("grid-content-after");
        });

        inputBtn.addEventListener("click", () => this.handleDesc(input1, input2, pTag));
    }

    private createInputElement(type: string, placeholder: string): HTMLInputElement {
        const input = document.createElement("input");
        input.type = type;
        input.placeholder = placeholder;
        return input;
    }

    private clearGridContainer(): void {
        this.gridContainer.innerHTML = "";
    }

    private handleDesc(input1: HTMLInputElement, input2: HTMLInputElement, pTag: HTMLParagraphElement): void {
        const value1 = parseInt(input1.value);
        const value2 = parseInt(input2.value);
        const desc = pTag.innerText.split(" ");
        const ans = desc.slice(value1 - 1, value2);
        this.searchInput.value = ans.join(" ");
    }
}

const unsplashGallery = new UnsplashGallery();
