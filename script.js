const searchBtn=document.querySelector(".search-form-btn")
const searchInput=document.querySelector(".search-form-input")
const gridContainer=document.querySelector(".grid")
const gridForm=document.querySelector("form")


const handleSearch=()=> {
    if (event.type=="submit"){
        event.preventDefault()
    }
    if (searchInput.value) {
        const searchTerm = searchInput.value
        const accessKey = "oeOT3c2K573UxkP30xVQFCg7bo4D_7-hSleXEKyUYvY"
        const API = `https://api.unsplash.com/search/photos?query=${searchTerm}&per_page=18&orientation=portrait`
        fetch(API, {
            method: "GET",
            headers: {
                "Authorization": `Client-ID ${accessKey}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then((res) => {
                if (res)

                    if (!res.ok) {
                        throw new Error("Something went Wrong")
                    }

                res.json()

                    .then(
                        (res) => {
                            document.querySelector(".grid").innerHTML = "";
                            res.results.map((result) => {
                                const gridCard = document.createElement("div")
                                const gridImage = document.createElement("div")
                                const imgElement = document.createElement("img")
                                gridImage.className = "grid-image"
                                gridCard.className = "grid-card"
                                imgElement.src = result.urls.small
                                gridImage.append(imgElement)
                                gridCard.append(gridImage)
                                //Grid content
                                const gridContent = document.createElement("div")
                                const headerTag = document.createElement("h1")
                                const pTag = document.createElement("p")
                                const aTag = document.createElement("a")
                                gridContent.className = "grid-content"
                                headerTag.className = "grid-header"
                                pTag.className = "grid-description"
                                aTag.className = "grid-link"
                                headerTag.innerText = result.user.name
                                pTag.innerText = result.description ? result.description : "No Description Available for this image"
                                aTag.href = `https://unsplash.com/photos/${result.slug}`
                                aTag.text = "See pic"
                                gridCard.addEventListener("mouseover",()=>{
                                    gridContent.classList.add("grid-content-after")
                                })
                                gridCard.addEventListener("mouseout",()=>{
                                    gridContent.classList.remove("grid-content-after")
                                })
                                gridContent.append(headerTag, pTag, aTag)
                                gridCard.append(gridContent)
                                gridContainer.append(gridCard)

                            })

                        }
                    )

            })
            .catch((error) => {
                console.error(error)
            })

    }
}




searchBtn.addEventListener("click",handleSearch)
gridForm.addEventListener("submit",(event)=>handleSearch())
