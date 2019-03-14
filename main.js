let pageIn = 1;
let source = []

async function getNewsApi(pageIn) {
    // read our JSON
    let response = await fetch(`https://newsapi.org/v2/top-headlines?q=game&country=us&category=technology&pageSize=20&page=${pageIn}&from=2019-02-15&apiKey=abbbd6dabc4b49d5b75ab7d5b962b5e0`);
    let aiNews = await response.json();
    console.log(aiNews);
    return aiNews;
}

let updateStories = (aiNews) => {
    let numStory = 'Stoies: ' + aiNews.articles.length;
    const numStoryContainer = document.getElementById('numStory');

    boxSource(aiNews.articles);
    numStoryContainer.innerHTML = numStory;
    let topStories_arr = aiNews.articles.filter((story, index) => {
        if (index <= 1)
            return true;
        return false;
    })
    let stories_arr = aiNews.articles.filter((story, index) => {
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
    getNewsApi(pageIn).then(updateStories);
}
let pagesContainer = document.getElementById('showPages');

let boxSource = (aiNews) => {
    let countSource_arr = aiNews
        .map(story => story.source.name)
        .map((sourceName, index, self) => {
            // let count = 1;
            // for (let i = 1; i < self.length; i++)
            //     if (sourceName == self[i]) {
            //         count += 1;
            //         self.splice(i, 1);
            //     };
            // return { 'sourceName': sourceName, 'number': count };
        }).map(objSrc => {
            console.log(objSrc);
            let box = document.createElement("input");
            box.setAttribute('type', 'checkbox');
            box.cre
            document.getElementById('boxSource').append
        });
}


let storiesFn = (accumulator, story, index, arr) => {
    let storyStrHTML = `${index == 0 ? '<div class="col-md-6">' : ''}
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
    ${index == Math.floor((arr.length - 1) / 2) ? '</div><div class="col-md-6">' : ''}${index == (arr.length - 1) ? '</div>' : ''}`;
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