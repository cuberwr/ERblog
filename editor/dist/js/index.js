const vditor=new Vditor('a',{
    //minHeight:'1000',
    mode:'sv',
    toolbarConfig:{
        pin:true
    },
    height:'100%',
    typewriterMode:true,
    theme:'dark',
    preview:{
        theme:{
            current:'dark'
        },
        hljs:{
            style:'native',
            lineNumber:true
        }
    },
    after(){
        fetch('http://localhost:2333/api/content?title='+window.location.search.split('title=')[1].split('&')[0]).then(res=>res.text()).then(res=>vditor.setValue(res,true))
    }
})




