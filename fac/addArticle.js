const { writeFileSync, readFileSync } = require("fs");
const {
    relink,
    updateMainPage,
    updateTypePage,
    articleRender,
} = require("./render");

function addArticle(body) {
    let config = JSON.parse(readFileSync("config.json"));
    let article = (config.articles[body.title] = {
        md: "markdowns/" + body.title + ".md",
        webpage: "webpages/article-" + body.title + ".html",
        about: body.about,
        type: body.type,
        face: body.face,
        updateTime: Date.now(),
    });
    writeFileSync(article.md, body.md);
    writeFileSync(
        article.webpage,
        articleRender(
            config.templates[body.template],
            body.head,
            body.icon,
            body.title,
            body.content,
            body.script
        )
    );
    let indexOfArticle = config.mainPage.indexOf(body.title);
    if (indexOfArticle === -1) {
        config.mainPage.unshift(body.title);
    } else {
        config.mainPage.splice(indexOfArticle, 1);
        config.mainPage.unshift(body.title);
    }
    writeFileSync("config.json", JSON.stringify(config));
    relink();
    updateMainPage();
    updateTypePage();
    return "ok";
}

module.exports = { addArticle };
