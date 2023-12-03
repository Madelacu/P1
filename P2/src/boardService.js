const posts = new Map();
let nextId = 0;

addPost({title: "Renacimiento",
    date1: "1400",
    date2: "1480",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Renacimiento fue un movimiento cultural y artístico que se produjo en Europa Occidental durante los siglos XV y XVI. Fue un período de transición entre la Edad Media y los inicios de la Edad Moderna, y se caracterizó por un cambio en la mentalidad europea, que pasó de ser teocéntrica a antropocéntrica",
    image: "https://i.pinimg.com/originals/e1/d0/47/e1d047f40153f5a4e65ea1ae8a7994d6.jpg"
});

// Barroco
addPost({
    title: "Barroco",
    date1: "1600",
    date2: "1750",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Barroco fue un período artístico y cultural que se desarrolló en Europa desde principios del siglo XVII hasta mediados del siglo XVIII. Se caracterizó por la exuberancia, la emotividad y la ornamentación excesiva en las artes visuales y escénicas.",
    image: "https://pymstatic.com/121621/conversions/pinturas-barroco-mas-importantes-social.jpg"
});

// Impresionismo
addPost({
    title: "Impresionismo",
    date1: "1865",
    date2: "1885",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Impresionismo fue un movimiento artístico que surgió en Francia a finales del siglo XIX. Se caracterizó por capturar la luz y la atmósfera de un momento a través de pinceladas rápidas y colores brillantes, rompiendo con las convenciones artísticas de la época.",
    image: "https://historia.nationalgeographic.com.es/medio/2021/11/11/impresion-amanecer-pintura-de-claude-monet-1872-museo-marmottan-paris_89bec264_800x620.jpg"
});

// Romanticismo
addPost({
    title: "Romanticismo",
    date1: "1800",
    date2: "1850",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Romanticismo fue un movimiento cultural que se manifestó en Europa durante finales del siglo XVIII y la primera mitad del siglo XIX. Se caracterizó por la expresión emocional, la naturaleza sublime y la exaltación de lo individual y lo irracional.",
    image: "https://concepto.de/wp-content/uploads/2020/03/clasicismo-contexto-revolucion-francesa-e1583778811533.jpg"
});

// Cubismo
addPost({
    title: "Cubismo",
    date1: "1905",
    date2: "1920",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Cubismo fue un movimiento artístico que se desarrolló a principios del siglo XX, destacando la representación de objetos desde múltiples puntos de vista. Fue un rechazo a las formas convencionales y una exploración de la geometría y la abstracción.",
    image: "https://static5.museoreinasofia.es/sites/default/files/obras/DE00050.jpg"
});

// Expresionismo
addPost({
    title: "Expresionismo",
    date1: "1910",
    date2: "1925",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Expresionismo fue un movimiento artístico que surgió en Alemania a principios del siglo XX. Se caracterizó por la representación emocional y subjetiva de la realidad, a menudo con colores vibrantes y formas distorsionadas para expresar sentimientos intensos.",
    image: "https://www.ifema.es/img/l/cuadro-expresionista/cuadro-expresionista.jpg"
});

// Surrealismo
addPost({
    title: "Surrealismo",
    date1: "1917",
    date2: "1950",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Surrealismo fue un movimiento artístico y literario que se desarrolló en la década de 1920. Se caracterizó por la representación de imágenes oníricas, irracionales y subconscientes. Los surrealistas buscaban liberar la creatividad del control racional.",
    image: "https://humanidades.com/wp-content/uploads/2017/03/vanguardismo-2-e1566238331889.jpg"
});

// Pop art
addPost({
    title: "Pop art",
    date1: "1960",
    date2: "2023",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Pop art fue un movimiento artístico que se desarrolló en la década de 1950 en el Reino Unido y alcanzó su apogeo en la década de 1960 en los Estados Unidos. Se caracterizó por el uso de imágenes populares y de la cultura de masas, desafiando las convenciones artísticas tradicionales.",
    image: "https://i.pinimg.com/originals/2f/21/6d/2f216d3fde1b8531d7f665bf3b0ee325.jpg"
});

// Realismo
addPost({
    title: "Realismo",
    date1: "1840",
    date2: "1880",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Realismo fue un movimiento artístico que surgió en Europa en la segunda mitad del siglo XIX. Se caracterizó por representar la realidad de manera objetiva, a menudo enfocándose en la vida cotidiana y social. Los realistas buscaban capturar la verdad sin idealizaciones.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg"
});

// Neoclasicismo
addPost({
    title: "Neoclasicismo",
    date1: "1760",
    date2: "1850",
    edad1: "d.C.",
    edad2: "d.C.",
    descripcion: "El Neoclasicismo fue un movimiento artístico y cultural que surgió en Europa a mediados del siglo XVIII. Se inspiró en la estética de la Antigua Grecia y Roma, enfatizando la racionalidad, la simplicidad y la búsqueda de la perfección clásica en el arte y la arquitectura.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/70/Jacques-Louis_David_-_Oath_of_the_Horatii_-_Google_Art_Project.jpg"
});

export function addPost(post) {
    let id = nextId++;
    post.id = id.toString();
    posts.set(post.id, post);
}

export function deletePost(id){
    posts.delete(id);
}

export function getPosts(){
    return [...posts.values()];
}

export function getPost(id){
    return posts.get(id);
}

export function updatePost(postId, postData) {
    let post = posts.get(postId) || {};
    post = { ...post, ...postData.post };
    post.subelemento = post.subelemento || [];
    if (postData.subelemento !== undefined) {
  
      // Añade el subelemento al final del array
      post.subelemento.push(postData.subelemento);
    }
    posts.set(postId, post);
    return true;
}