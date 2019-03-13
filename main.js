let pageIn = 1;
async function getNewsApi(pageIn) {
    // read our JSON
    let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=20&page=${pageIn}&from=2019-02-15&apiKey=abbbd6dabc4b49d5b75ab7d5b962b5e0`);
    let aiNews = await response.json();
    console.log(aiNews);
    return aiNews;
}

let updateStories = (aiNews) => {
    let numStory = 'Stoies: ' + aiNews.articles.length;
    const numStoryContainer = document.getElementById('numStory');
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

    let topStories = topStories_arr.reduce((accumulator, story) => {
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
    }, '');

    let stories = stories_arr.reduce((accumulator, story, index) => {
        let storyStrHTML = `${index == 0 ? '<div class="col-md-6">' : ''}
        <div class="blog-entry">
            <a href="${story.url}" class="blog-image">
                <img src="${story.urlToImage}" class="img-fluid" alt="">
            </a>
            <div class="text py-4">
                <div class="meta">
                  <div><a href="#">${story.publishedAt}</a></div>
                </div>
                <h3 class="heading"><a href="#">${story.title}</a></h3>
                <p>${story.description}</p>
            </div>
        </div>
        ${index == Math.floor(stories_arr.length / 2) ? '</div><div class="col-md-6">' : ''}${index == (stories_arr.length - 1) ? '</div>' : ''}`;
        return accumulator + storyStrHTML;
    }, '');

    document.querySelector('.home-slider').innerHTML = topStories;
    storyContainer = document.querySelector('.page-container > .container-story');
    storyContainer.innerHTML = stories;
    storyContainer.classList.add('animated', 'bounceInDown');
}
getNewsApi(1).then(updateStories);

let nextPage = (step) => {
    pageIn += step
    getNewsApi(pageIn).then(updateStories);
}
let pagesContainer = document.getElementById('showPages');
pagesContainer