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

//Ruta para actualizar una publicación con los subelementos
router.post('/post/:id/update', (req, res) => {
    //Extrae los datos y los asigna a las variables.
    const { image, title, date1, date2, edad1, edad2, descripcion, subelemento } = req.body;
    //Obtiene el id y lo asigna a postID
    const postId = req.params.id;
    
    // Asegura que el subelemento sea un array, sino lo convierte en uno
    const subelementoArray = subelemento ? [subelemento] : [];

    //Llama a update post para actualizar los datos
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

    //Recupera el post actualizado con el id
    let post = boardService.getPost(req.params.id);
    //Renderiza la plantilla
    res.render('show_post', { post });    
});

router.get('/post/:id/delete', (req, res) => {

    boardService.deletePost(req.params.id);

    res.render('deleted_post');
});

router.get('/post/:id/edit', (req, res) => {
    let post = boardService.getPost(req.params.id)
    res.render('edit_post', { post });
});

export default router;