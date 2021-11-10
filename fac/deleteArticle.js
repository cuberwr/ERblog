const { writeFileSync, readFileSync,unlinkSync } = require("fs");
const {
    relink,
    updateMainPage,
    updateTypePage,
} = require("./render");

function deleteArticle(title) {
    let config = JSON.parse(readFileSync("config.json"));
    delete config.articles[title];
    config.mainPage.splice(config.mainPage.indexOf(title), 1);
    for (let i in config.articles) {
        let indexOfArticle = config.articles[i].about.indexOf(title);
        if (indexOfArticle !== -1) {
            config.mainPage.splice(indexOfArticle, 1);
        }
    }
    writeFileSync("config.json", JSON.stringify(config));
    unlinkSync('webpages/article-'+title+'.html')
    unlinkSync('markdowns/'+title+'.md')
    relink();
    updateMainPage();
    updateTypePage();
    return "ok";
}

module.exports={deleteArticle}