import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

// Definición de una ruta GET para la raíz ('/') utilizando Express Router
router.get('/', (req, res) => {
    // Se llama a la función 'render' para renderizar la vista llamada 'index'
    // La función 'render' toma dos parámetros: el nombre de la vista y un objeto de datos
    // En este caso, la vista es 'index' y los datos son un objeto con una propiedad 'posts'

    res.render('index', { 
        // La propiedad 'posts' se asocia con el resultado de llamar a 'getPosts' en 'boardService'
        posts: boardService.getPosts() 
    });
});

// Definición de una ruta POST para la creación de nuevos posts ('/post/new') utilizando Express Router
router.post('/post/new', (req, res) => {
    // Extracción de datos del cuerpo de la solicitud utilizando destructuring
    const { title, date1, date2, edad1, edad2, descripcion, image, subelemento } = req.body;

    // Validar los campos del formulario
    // Se crea un objeto con los campos requeridos y se filtran aquellos que no estén presentes
    const requiredFields = { title, date1, date2, edad1, edad2, descripcion, image };
    const missingFields = Object.keys(requiredFields).filter(field => !req.body[field]);

    if (missingFields.length > 0) {
        // Si hay campos vacíos, se generan mensajes de error para cada campo faltante
        // Luego se renderiza la vista de error con los datos ingresados y los mensajes de error
        const titleError = missingFields.includes('title') ? 'Nombre de la corriente' : '';
        const date1Error = missingFields.includes('date1') ? 'Fecha de inicio' : '';
        const date2Error = missingFields.includes('date2') ? 'Fecha de finalización' : '';
        const edad1Error = missingFields.includes('edad1') ? 'Era inicio' : '';
        const edad2Error = missingFields.includes('edad2') ? 'Era fin' : '';
        const descripcionError = missingFields.includes('descripcion') ? 'Descripción' : '';
        const imageError = missingFields.includes('image') ? 'URL' : '';

        // Renderizar la vista de error con los datos ingresados y los mensajes de error
        res.render('error', { title, date1, date2, edad1, edad2, descripcion, image, titleError, date1Error, date2Error, edad1Error, edad2Error, descripcionError, imageError });

    } else {
        // Si no hay campos vacíos, procesar los datos del formulario y agregarlos al servicio de tableros
        const postId = boardService.addPost({ title, date1, date2, edad1, edad2, descripcion, image, subelemento });

        // Redirigir a la página del nuevo post con un mensaje de éxito
        const postUrl = `/post/${postId}`;
        res.redirect(postUrl);
    }
});

// Definición de una ruta GET para mostrar un post específico utilizando Express Router
router.get('/post/:id', (req, res) => {
    // Obtener el post correspondiente al ID proporcionado en la URL utilizando el servicio de tableros
    let post = boardService.getPost(req.params.id);

    // Renderizar la vista 'show_post' y pasar el post obtenido como dato
    res.render('show_post', { post });
});

//Ruta para actualizar una publicación con los subelementos
router.post('/post/:id/update', (req, res) => {
    // Extrae los datos del cuerpo de la solicitud y los asigna a variables
    const { image, title, date1, date2, edad1, edad2, descripcion, subelemento } = req.body;
    // Obtiene el ID de la URL y lo asigna a postId
    const postId = req.params.id;

    // Asegura que subelemento sea un array; si no lo es, lo convierte en un array vacío
    const subelementoArray = subelemento ? [subelemento] : [];

    // Llama a la función updatePost del servicio de tableros para actualizar los datos del post en una sola línea
    boardService.updatePost(postId, { image, title, date1, date2, edad1, edad2, descripcion, subelemento: subelementoArray[0] });

    // Recupera el post actualizado con el ID
    let post = boardService.getPost(req.params.id);
    
    // Renderiza la vista 'show_post' y pasa el post actualizado como dato
    res.render('show_post', { post });
});

// Definición de una ruta GET para eliminar un post específico utilizando Express Router
router.get('/post/:id/delete', (req, res) => {
    // Llama a la función deletePost del servicio de tableros para eliminar el post con el ID proporcionado
    boardService.deletePost(req.params.id);

    // Redirige al usuario a la página principal después de eliminar el post
    res.redirect('/');
});

// Definición de una ruta GET para mostrar el formulario de edición de un post específico utilizando Express Router
router.get('/post/:id/edit', (req, res) => {
    // Obtener el post correspondiente al ID proporcionado en la URL utilizando el servicio de tableros
    let post = boardService.getPost(req.params.id);

    // Renderizar la vista 'edit_post' y pasar el post obtenido como dato
    res.render('edit_post', { post });
});

// Definición de una ruta POST para procesar la edición de un post específico utilizando Express Router
router.post('/post/:id/edit/edits', (req, res) => {
    // Extrae los datos del cuerpo de la solicitud y el ID de la URL
    let { image, title, date1, date2, edad1, edad2, descripcion, subelemento } = req.body;
    let id = req.params.id;

    // Almacena la URL de la página anterior antes de realizar la redirección
    let referer = req.get('referer');
    console.log('Referer:', referer);

    // Elimina la parte "/edit" de la URL
    let updatedReferer = referer.replace('/edit', '');

    // Obtiene el post existente antes de la actualización
    let existingPost = boardService.getPost(id);

    // Actualiza los campos específicos del post existente con los nuevos datos
    existingPost.image = image;
    existingPost.title = title;
    existingPost.date1 = date1;
    existingPost.date2 = date2;
    existingPost.edad1 = edad1;
    existingPost.edad2 = edad2;
    existingPost.descripcion = descripcion;

    // No sobrescribe el campo subelemento

    // Llama a la función edit_post del servicio de tableros para actualizar el post
    boardService.edit_post(existingPost, id);

    // Redirige explícitamente a la URL de la página anterior sin "/edit"
    res.redirect(updatedReferer);
});

export default router;