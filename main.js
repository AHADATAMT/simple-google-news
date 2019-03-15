let source = [];
let pageIn = 1;
let apikey = `apiKey=abbbd6dabc4b49d5b75ab7d5b962b5e0`;
let category = '';
let aiNews = [];

async function getNewsApi() {
    // read our JSON
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us${category !== '' ? '&category=' + category : ''}&pageSize=20&page=${pageIn}&${apikey}`);
    aiNews = await response.json();
    console.log(aiNews);
    boxSource(aiNews.articles);
    return aiNews;
}

let updateStories = (aiNews) => {
    console.log(aiNews);
    aiNews = aiNews.articles ? aiNews.articles : aiNews;
    let numStory = 'Stoies: ' + aiNews.length;
    const numStoryContainer = document.getElementById('numStory');

    numStoryContainer.innerHTML = numStory;
    let topStories_arr = aiNews.filter((story, index) => {
        if (index <= 1)
            return true;
        return false;
    })
    let stories_arr = aiNews.filter((story, index) => {
        if (index > 1)
            return true;
        return false;
    })

    let topStories = topStories_arr.reduce(topStoriesFn, '');
    let stories = stories_arr.reduce(storiesFn, '');

    document.querySelector('.home-slider').innerHTML = topStories;
    document.querySelector('.page-container > .container-story').innerHTML = stories;
    document.querySelector('.page-container > .container-story').classList.add('animated', 'bounceInDown');
}
getNewsApi(1).then(updateStories);

let nextPage = (step) => {
    pageIn += step;
    getNewsApi(pageIn, '').then(updateStories);
}
let pagesContainer = document.getElementById('showPages');

let boxSource = (aiNews) => {
    let boxSourceObj = {};
    let boxSrc = ''
    aiNews.map(story => story.source.name)
        .forEach((source, index) => {
            if (boxSourceObj[source] === undefined)
                boxSourceObj[source] = 1;
            else
                boxSourceObj[source] += 1;
        });
    console.log(boxSourceObj);
    let srcCnt = 0;
    for (source in boxSourceObj) {
        boxSrc += `<label><input id="src-${srcCnt += 1}" type="checkbox" onclick="filerSource('src-${srcCnt}')" value="${source}">${source} (${boxSourceObj[source]})</label>`;
    }
    document.getElementById('checkboxes').innerHTML = boxSrc;
}

let storiesFn = (accumulator, story, index, arr) => {
    let storyStrHTML = `${index == 0 ? '<div class="col-md-5">' : ''}
    <div class="blog-entry">
        <a href="${story.url}" class="blog-image">
            <img src="${story.urlToImage}" class="img-fluid" alt="">
        </a>
        <div class="text py-4">
            <div class="meta">
              <div><a href="#">${moment(story.publishedAt).fromNow()}</a>  <small>${story.source.name}</small></div>
            </div>
            <h3 class="heading"><a href="#">${story.title}</a></h3>
            <p>${story.description}</p>
        </div>
    </div>
    ${index == Math.floor((arr.length - 1) / 2) ? '</div><div class="col-md-5">' : ''}${index == (arr.length - 1) ? '</div>' : ''}`;
    return accumulator + storyStrHTML;
}

let topStoriesFn = (accumulator, story) => {
    let storyStrHTML = `
    <div class="slider-item js-fullheight" style="background-image: url('${story.urlToImage}')">
        <div class="overlay"></div>
        <div class="container">
            <div class="row slider-text align-items-end" data-scrollax-parent="true">
                <div class="col-md-10 col-sm-12" data-scrollax=" properties: { translateY: '70%' }">
                    <p class="cat"><span>Movie</span></p>
                    <h1 class="mb-3" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">${story.title}</h1>
                </div>
            </div>
        </div>
    </div>`;
    return accumulator + storyStrHTML;
}

let changeCat = (cat) => {
    category = cat;
    getNewsApi().then(updateStories);
}

var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
let filerSourceArr = [];

let filerSource = (source) => {

    let $boxSourceI = document.getElementById(source);
    if ($boxSourceI.checked)
        filerSourceArr.push($boxSourceI.value);
    else
        filerSourceArr.splice(filerSourceArr.indexOf($boxSourceI.value), 1);

    updateStories(aiNews.articles.filter((story) => {
        return filerSourceArr.indexOf(story.source.name) > 0
    }));
    console.log(filerSourceArr);
}