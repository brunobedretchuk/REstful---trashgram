const express = require('express');
const res = require('express/lib/response');
const app = express();
console.dir(app);
const path = require('path');
const { emitWarning } = require('process');
const {v4 : uuid} = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.set('views',path.join(__dirname, '/views'));
app.set('view engine' , 'ejs');

let posts = [
    {
        id : uuid(),
        username : 'Jason',
        postTitle : 'Such a beautiful place!',
        postURL : 'https://images.unsplash.com/photo-1647536001353-d99be7bc1784?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        likes : 100
    },
    {
        id : uuid(),
        username : 'Juliet',
        postTitle : 'Suggestive shape... XD',
        postURL : 'https://images.unsplash.com/photo-1647546838230-f06019371e06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        likes : 2200
    },
    {
        id : uuid(),
        username : 'Miles',
        postTitle : 'I love art!',
        postURL : 'https://images.unsplash.com/photo-1647292848989-5b4bdb24d625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        likes : 820
    }
]

app.get('/feed', (req , res) => {
    res.render('feed/index' , {posts});
})

app.get('/feed/new', (req , res) => {
    res.render('feed/new' , {posts});
})

app.get('/', (req , res) => {
    res.render('feed/index' , {posts});
})

app.post('/feed', (req , res) => {
    const {username , postTitle , postURL} = req.body;
    posts.push({username , postTitle , postURL , id: uuid()});
    res.redirect('/feed');
    
})

app.get('/feed/:id' , (req , res) => {
    const { id } = req.params;
    const post = posts.find(c => c.id === id);
    res.render('feed/showpost' , { post });
    console.log({post});
})

app.get('/feed/:id/edit' , (req , res) => {
    const { id } = req.params;
    const post = posts.find(c => c.id === id);
    res.render('feed/edit' , { post });
})

app.patch('/feed/:id' , (req , res) => {
    const { id } = req.params;
    const newPostTitle = req.body.postTitle;
    const postFound = posts.find(c => c.id === id);
    postFound.postTitle = newPostTitle;
    res.redirect('/feed');
})

app.delete('/feed/:id' , (req , res) => {
    const { id } = req.params;
    posts  = posts.filter(c => c.id !== id);
    res.redirect('/feed');
})


app.listen(3000 , () => {
    console.log('listening on port 3000!');
});