const express = require('express');
const {readFileSync}=require('fs')
const {addArticle}=require('./fac/addArticle')
const {deleteArticle}=require('./fac/deleteArticle')


let app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.text())
app.use('/editor',express.static('editor'))
app.use('/webpages',express.static('webpages'))

app.get('/',(req,res)=>{
    res.send('ok')
})
app.get('/api/configs',(req,res)=>{
    const config=JSON.parse(readFileSync('config.json'))
    res.send({
        templates:Object.keys(config.templates),
        articles:Object.keys(config.articles)
    })
})
app.get('/api/content',(req,res)=>{
    const config=JSON.parse(readFileSync('config.json'))
    console.log(req.query)
    if(config.articles.hasOwnProperty(req.query.title)){
        res.send(readFileSync(config.articles[req.query.title].md,'utf-8'))
    }else{
        res.send('')
    }
})
app.post('/api/addArticle',(req,res)=>{
    let body=JSON.parse(req.body)
    let updateResult=addArticle(body)
    res.send(updateResult)
})
app.get('/api/deleteArticle',(req,res)=>{
    console.log(req.query)
    let updateResult=deleteArticle(req.query.title)
    res.send(updateResult)
})

app.listen(2333, function () {
    console.log('http://localhost:2333')
});