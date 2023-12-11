import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

router.get('/', (req, res) => {

    res.render('index', { 
        posts: boardService.getPosts() 
    });
});

router.post('/post/new', (req, res) => {
    const { title, date1, date2, edad1, edad2, descripcion, image, subelemento } = req.body;

    // Validar los campos del formulario
    const requiredFields = {
        'title': 'Nombre de la corriente',
        'date1': 'Fecha de Inicio',
        'edad1': 'Era de la fecha de inicio',
        'date2': 'Fecha de Finalización',
        'edad2': 'Era de la fecha de finalización',
        'descripcion': 'Descripción',
        'image': 'URL'
    };

    const missingFields = Object.keys(requiredFields).filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        // Si hay campos vacíos, asignar valores a cada variable que falte
        const titleError = missingFields.includes('title') ? 'Nombre de la corriente' : '';
        const date1Error = missingFields.includes('date1') ? 'Fecha de inicio' : '';
        const date2Error = missingFields.includes('date2') ? 'Fecha de finalización' : '';
        const edad1Error = missingFields.includes('edad1') ? 'Era inicio' : '';
        const edad2Error = missingFields.includes('edad2') ? 'Era fin' : '';
        const descripcionError = missingFields.includes('descripcion') ? 'Descripción' : '';
        const imageError = missingFields.includes('image') ? 'URL' : '';

        // Renderizar la vista de error con los datos ingresados y los mensajes de error
        res.render('error', {
            title,
            date1,
            date2,
            edad1,
            edad2,
            descripcion,
            image,
            subelemento,
            titleError,
            date1Error,
            date2Error,
            edad1Error,
            edad2Error,
            descripcionError,
            imageError
        });
    } else {
        // Procesar los datos del formulario y agregarlos al servicio de tableros
        const postId = boardService.addPost({ title, date1, date2, edad1, edad2, descripcion, image, subelemento });

        // Redirigir a la página principal con un mensaje de éxito

        const postUrl = `/post/${postId}`;
        res.redirect(postUrl);


    }
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

    res.redirect('/');
});

router.get('/post/:id/edit', (req, res) => {
    let post = boardService.getPost(req.params.id)
    res.render('edit_post', { post });
});

router.post('/post/:id/edit/edits', (req, res) => {
    let { image, title, date1, date2, edad1, edad2, descripcion, subelemento } = req.body;
    let id = req.params.id;

    // Almacena la URL de la página anterior antes de realizar la redirección
    let referer = req.get('referer');
    console.log('Referer:', referer);

    // Elimina la parte "/edit" de la URL
    let updatedReferer = referer.replace('/edit', '');

    // Obtiene el post existente antes de la actualización
    let existingPost = boardService.getPost(id);

    // Actualiza los campos específicos
    existingPost.image = image;
    existingPost.title = title;
    existingPost.date1 = date1;
    existingPost.date2 = date2;
    existingPost.edad1 = edad1;
    existingPost.edad2 = edad2;
    existingPost.descripcion = descripcion;

    // No sobrescribir el campo subelemento

    // Actualiza el servicio
    boardService.edit_post(existingPost, id);

    // Redirige explícitamente a la URL de la página anterior sin "/edit"
    res.redirect(updatedReferer);
});
export default router;