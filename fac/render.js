const { writeFileSync, readFileSync } = require("fs");
function relink() {
    let articles = JSON.parse(readFileSync("config.json")).articles;
    for (let i in articles) {
        for(let e in articles[i].about){
            if (articles[e].about.indexOf(i) === -1) {
                articles[e].about.unshift(i);
                function renderAbout(title){
                    let page = readFileSync(articles[title].webpage, "utf-8");
                    page =
                    page.split("<h2>相关文章</h2>")[0] +
                    `
                    <h2>相关文章</h2>
                    <!-- about -->
                    </div>   
                    ` +
                    page.split("<h2>相关文章</h2>")[1].split("</div>")[1];
                    articles[title].about.forEach(about=>{
                        page = page.replace(
                            "<!-- about -->",
                            `<!-- about -->\n<a href="./${about}.html">${about}</a>\n`
                        );
                    })
                    writeFileSync(articles[title].webpage, page);
                }
                renderAbout(e)
                renderAbout(i)
            }
        };
    }
}

function updateMainPage() {
    let page = readFileSync("webpages/index.html", "utf-8");
    let config = JSON.parse(readFileSync("config.json"));
    page =
        page.split("<article>")[0] +
        `
    <article>
        <!-- article -->
    </article>   
    ` +
        page.split("<article>")[1].split("</article>")[1];
    for (let i = 0; i < config.mainPage.length && i < 15; i++) {
        console.log(config);
        page = page.replace(
            "<!-- article -->",
            `<!-- article -->
            <div class="article">
                <img src="${
                    config.articles[config.mainPage[i]].face
                }" alt="face" width="100%">
                <div>
                    <h2>${config.mainPage[i]}</h2>
                </div>
            </div>`
        );
    }
    writeFileSync("webpages/index.html", page);
}

function articleRender(
    template = "templates/mushroom-dark.html",
    head,
    icon,
    title,
    content,
    script
) {
    template = readFileSync(template, "utf-8");
    template = template.replace(
        "<!-- icon -->",
        `<link rel="shortcut icon" href="${icon}"><link rel="bookmark" href="${icon}">`
    );
    template = template.replace("<!-- render-head -->", head);
    template = template.replace("<!-- title -->", `<title>${title}</title>`);
    template = template.replace("<!-- content -->", content);
    template = template.replace("<!-- render-script -->", script);
    return template;
}

function updateTypePage() {}

module.exports = {
    relink,
    updateMainPage,
    updateTypePage,
    articleRender,
};
