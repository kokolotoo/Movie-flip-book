document.getElementById("prevNextButtons").style.display = "none";
const container = document.getElementById('flipbook');
let searchingMovie = '';
let foundMatches = 0;
let pageCounter = 0;


document.getElementById("searchButton").onclick = () => {
    container.innerHTML = ''
    document.getElementById("prevNextButtons").style.display = "none";

    const apiKey = 'bec5e9564b72945ecf740d7dfb21d37d'; // apiKey from - https://www.themoviedb.org/
    const searchQuery = document.getElementById("movie")
    const searchMovie = searchQuery.value.trim();
    searchingMovie = searchMovie;
    if (searchMovie == '') { alert("Please input some movie name!"); return; }

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchMovie}`)
        .then(response => response.json())
        .then(data => {
            if (data.results.length == 0) {
                document.getElementById('no-result').innerHTML = `No result for : <b>${searchMovie}</b> !`
                setTimeout(() => {
                    document.getElementById('no-result').innerHTML = ''
                }, 2000)
            } else {
                controlVariable = data.results
                foundMatches = data.results.length;
                createPage(data.results);
                document.getElementById("prevNextButtons").style.display = "block"
            }

        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('no-result').innerHTML = `Error :<br> <b>${error}</b> !`
        });
    searchQuery.value = ''

}

function createFirstPage(input) {

    const leaf = document.createElement("div");    //контейнер
    leaf.className = "leaf"

    const frontPage = document.createElement("div")    //корица от пред
    frontPage.className = 'page front title external';
    frontPage.style.backgroundColor = '#e76f51'

    const backPage = document.createElement("div");    //корица от зад
    backPage.className = "page back";
    backPage.style.backgroundColor = "#2a9d8f";

    const h = document.createElement("h1");
    h.className = "movieName";
    h.textContent = searchingMovie.toUpperCase();

    const p = document.createElement('p');
    p.className = 'result-found';
    p.innerHTML = `We found <b>${foundMatches}</b> matches!`;

    const em = document.createElement("em");
    em.className = "creator"
    em.innerHTML = `Created by <b>Kokoloto&reg;</b>`

    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const posterUrl = `${baseUrl}${input[0].poster_path}`;
    const img1 = document.createElement("img");
    img1.id = "firstPic";
    img1.style.width = 70 + "%";
    img1.style.height = 40 + "%"
    img1.src = posterUrl;
    const pageNumber = document.createElement('em');
    pageNumber.className = `left`;
    pageNumber.innerHTML = `${pageCounter}`

    for (let i = 0; i < Math.floor(input.length / 2); i++) {
        const names = document.createElement('small')
        names.innerHTML = `${i + 1}: ${input[i].title}</br><hr>`
        backPage.appendChild(names);
    }

    backPage.style.textAlign = "start"
    frontPage.append(h, p, img1, em);
    backPage.append(pageNumber);

    leaf.append(frontPage, backPage);

    document.getElementById('flipbook').appendChild(leaf);
}

function frontPage(input) {

    pageCounter++;
    const frontPage = document.createElement("div")    //корица от пред
    frontPage.className = 'page front';
    frontPage.style.backgroundColor = "#2a9d8f";

    if (input === undefined) {
        const pageNumber = document.createElement('em');
        if (pageCounter % 2 === 0) {
            pageNumber.classList.add('right');
        } else {
            pageNumber.classList.add('left');
        }
        pageNumber.innerHTML = `${pageCounter}`
        let movieName = []
        for (let i = controlVariable.length - 1; i >= Math.ceil(controlVariable.length / 2); i--) {
            movieName.push(`${i+1}: ${controlVariable[i].title}</br><hr>`)
        }
        movieName.reverse();
        for (const row of movieName) {
            const names = document.createElement('small')
            names.innerHTML = row
            frontPage.appendChild(names);
        }
        frontPage.style.textAlign = "start"
        frontPage.append(pageNumber)
        return frontPage
    }

    const h = document.createElement("h4");
    h.className = "movieName";
    h.innerHTML = `${input.title} <hr>`

    const p = document.createElement('span');
    p.className = 'span';
    let text = input.overview.slice(0, input.overview.indexOf("."));
    if (text.length > 300) {
        text = text.slice(0, text.indexOf(","));
    }
    p.innerHTML = text

    const em = document.createElement("em");
    em.className = "creator"
    em.innerHTML = `Average rating: ${input.vote_average}`

    const pageNumber = document.createElement('em');
    if (pageCounter % 2 === 0) {
        pageNumber.classList.add('right');
    } else {
        pageNumber.classList.add('left');
    }
    pageNumber.innerHTML = `${pageCounter}`

    frontPage.append(h, p, em, pageNumber)

    return frontPage;
}

function backPage(input) {
    const backPage = document.createElement("div");    //корица от зад
    backPage.className = "page back";
    backPage.style.backgroundColor = "#2a9d8f";

    pageCounter++;
    const baseUrl = 'https://image.tmdb.org/t/p/w500';

    const posterUrl = `${baseUrl}${input.poster_path}`;
    const img1 = document.createElement("img");
    img1.id = "firstPic";
    img1.style.width = 100 + "%";
    img1.style.height = 50 + "%"
    img1.src = posterUrl;

    const p2 = document.createElement("h4");
    p2.innerHTML = `Release date: ${input.release_date} <hr>`;//!!!!!!!

    const pageNumber1 = document.createElement('em');
    if (pageCounter % 2 === 0) {
        pageNumber1.classList.add('right');
    } else {
        pageNumber1.classList.add('left');
    }
    pageNumber1.innerHTML = `${pageCounter}`

    const p = document.createElement('p')
    p.innerHTML = `Original language: <b>${input.original_language.toUpperCase()}</b>`

    backPage.append(img1, p2, p, pageNumber1);

    return backPage;
}

function createLastPage() {
    pageCounter++;
    const leaf = document.createElement("div");    //контейнер
    leaf.className = "leaf"

    const frontPage = document.createElement("div")    //корица от пред
    frontPage.className = 'page front title external';
    frontPage.style.backgroundColor = "#2a9d8f"

    const backPage = document.createElement("div");    //корица от зад
    backPage.className = "page back";
    backPage.style.backgroundColor = '#e76f51';

    const h = document.createElement("h4");
    h.className = "movieName";
    h.innerHTML = `${controlVariable[controlVariable.length - 1].title} <hr>`

    const p = document.createElement('span');
    p.className = 'span';
    let text = controlVariable[controlVariable.length - 1].overview.slice(0, controlVariable[controlVariable.length - 1].overview.indexOf("."));
    if (text.length > 300) {
        text = text.slice(0, text.indexOf(","));
    }
    p.innerHTML = text

    const em = document.createElement("em");
    em.className = "creator"
    em.innerHTML = `Average rating: ${controlVariable[controlVariable.length - 1].vote_average}`

    const pageNumber = document.createElement('em');
    if (pageCounter % 2 === 0) {
        pageNumber.classList.add('right');
    } else {
        pageNumber.classList.add('left');
    }
    pageNumber.innerHTML = `${pageCounter}`

    const h1 = document.createElement('h1');
    h1.innerHTML = `Thanks for using my book <hr>`;
    const p1 = document.createElement("p");
    p1.innerHTML = `Contact me at:<br> <b>kaica_niko@abv.bg</b></br>`

    const em1 = document.createElement("em");
    em1.className = "creator"
    em1.innerHTML = `Created by <b>Kokoloto&reg;</b>`

    const myPic = document.createElement('img');
    myPic.className = "myPic"
    myPic.src = "mypic.jpeg"
    myPic.style.width = 35 + '%'
    myPic.style.borderRadius = 50 + '%'

    frontPage.append(h, p, em, pageNumber);
    backPage.append(h1, p1, myPic, em1);

    leaf.append(frontPage, backPage);
    document.getElementById('flipbook').appendChild(leaf);

    
}

function createPage(input) {

    container.innerHTML = ''
    pageCounter = 1;
    console.log(input);

    for (let i = 0; i < input.length; i++) {

        const leaf = document.createElement("div");    //контейнер
        leaf.className = "leaf"

        if (pageCounter === 1) {
            createFirstPage(input);
        }

        leaf.append(frontPage(input[i - 1]), backPage(input[i]))

        document.getElementById('flipbook').appendChild(leaf);

    }

    createLastPage();
    flip();
}

function flip() {

    class FlipBook {
        constructor(bookElem) {
            this.elems = {
                book: bookElem,
                leaves: bookElem.querySelectorAll(".leaf"),
                buttons: {
                    next: document.getElementById("nextPage"),
                    prev: document.getElementById("prevPage")
                }
            };
            this.setupEvents();
            this.currentPagePosition = 0;
            this.turnPage(0);
        }

        setPagePosition(page, position, index) {
            var transform = "";

            transform = "translate3d(0,0," + ((position < 0 ? 1 : -1) * Math.abs(index)) + "px)"

            if (position < 0) {
                transform += "rotate3d(0,1,0,-180deg)";
                page.classList.add("turned")
            } else {
                page.classList.remove("turned")
            }
            if (page.style.transform != transform) {
                page.style.transform = transform;
            }
        }
        turnPage(delta) {
            this.currentPagePosition += delta;
            if (this.currentPagePosition < 0) {
                this.currentPagePosition = 0;
                return;
            }
            if (this.currentPagePosition > this.elems.leaves.length) {
                this.currentPagePosition = this.elems.leaves.length;
                return;
            }
            this.elems.leaves.forEach((page, index) => {
                var pageNumber = index;
                this.setPagePosition(page, pageNumber - this.currentPagePosition, index);
            });

            if (this.currentPagePosition == 0) {
                this.elems.buttons.prev.setAttribute("disabled", "disabled");
            } else
                if (this.currentPagePosition == this.elems.leaves.length) {
                    this.elems.buttons.next.setAttribute("disabled", "disabled");
                } else {
                    this.elems.buttons.next.removeAttribute("disabled");
                    this.elems.buttons.prev.removeAttribute("disabled");
                }
        }
        setupEvents() {
            document.getElementById("nextPage").addEventListener("click", () => {
                this.turnPage(1);
            });
            document.getElementById("prevPage").addEventListener("click", () => {
                this.turnPage(-1);
            });

        }
    }

    var flipBook = new FlipBook(document.getElementById("flipbook"));

}