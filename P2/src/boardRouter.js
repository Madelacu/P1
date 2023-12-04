import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', (req, res) => {

    res.render('index', { 
        posts: boardService.getPosts() 
    });
});

router.post('/post/new', (req, res) => {

    let { user, title, text } = req.body;

    boardService.addPost({ user, title, text });

    res.render('saved_post');
});

router.get('/post/:id', (req, res) => {

    let post = boardService.getPost(req.params.id);

    res.render('show_post', { post });
});

router.post('/post/:id/update', (req, res) => {
    const { image, title, date1, date2, edad1, edad2, descripcion, subelemento } = req.body;
    const postId = req.params.id;
    
    // Asegura que el subelemento sea un array
    const subelementoArray = subelemento ? [subelemento] : [];

    boardService.updatePost(postId, {
        image,
        title,
        date1,
        date2,
        edad1,
        edad2,
        descripcion,
        // Ajusta el acceso a subelemento
        subelemento: subelementoArray[0],
    });
    let post = boardService.getPost(req.params.id);
    res.render('show_post', { post });    
});

router.get('/post/:id/delete', (req, res) => {

    boardService.deletePost(req.params.id);

    res.render('deleted_post');
});

export default router;