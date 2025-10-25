class Articulo {
  constructor(id, titulo, contenido, categoria) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.categoria = categoria;
  }

  obtenerHTML() {
    return `
      <div class="articulo-item">
        <span class="badge-categoria">${this.categoria}</span>
        <h3>${this.titulo}</h3>
        <p>${this.contenido}</p>
      </div>
    `;
  }
}

class TodoEnUnoApp {
  constructor() {
    this.tips = [];
    this.consejos = [];
    this.noticias = [];
    this.inicializar();
  }

  inicializar() {
    this.cargarDatos();
    this.renderizarPagina();
    this.configurarFormulario();
  }

  cargarDatos() {
    this.tips = [
      new Articulo(1, 'Organiza tu tiempo', 'Organiza tu tiempo, haz tareas extracurriculares, actividades que te gusten y te motiven para que no te agobies con el estrés del estudio.', 'Estudio'),
      new Articulo(2, 'Busca ayuda', 'Busca ayuda de tus compañeros o amigos para hacer tareas o estudiar para las evaluaciones, así se te hará más sencillo aprender.', 'Estudio'),
      new Articulo(3, 'Crea una lista', 'Haz una lista con los trabajos que tengas para un mejor orden al momento de empezar a realizarlas.', 'Estudio')
    ];

    this.consejos = [
      new Articulo(1, 'Hidratación y alimentación', 'Mantenerte bien hidratado y con una buena alimentación ayudarás a tu cuerpo a estar sano y fuerte contra virus.', 'Salud'),
      new Articulo(2, 'Mejora tu sueño', 'Para mejorar tu salud a través del sueño: Acuéstate y levántate a la misma hora todos los días. Haz que tu habitación sea oscura y tranquila. Evita trabajar o ver televisión en la cama.', 'Salud')
    ];

    this.noticias = [
      new Articulo(1, 'Vacuna contra el cáncer', 'Científicos desarrollan una nueva vacuna contra el cáncer de pulmón que ha mostrado resultados positivos en pruebas iniciales. Podría convertirse en un tratamiento revolucionario en los próximos años.', 'Noticia'),
      new Articulo(2, 'Descubrimiento de agua en exoplaneta', 'La NASA anunció que el telescopio James Webb detectó signos de agua en un exoplaneta a 120 años luz de la Tierra, lo que abre posibilidades para el estudio de vida fuera de nuestro planeta.', 'Noticia'),
      new Articulo(3, 'IA de traducción en tiempo real', 'Una empresa tecnológica lanzó una IA capaz de traducir en tiempo real más de 50 idiomas con expresiones naturales, lo que promete romper barreras de comunicación en todo el mundo.', 'Noticia')
    ];
  }

  renderizarPagina() {
    const contenedorTips = document.getElementById('contenedor-tips');
    const contenedorSalud = document.getElementById('contenedor-salud');
    const contenedorNoticias = document.getElementById('contenedor-noticias');

    if (contenedorTips) {
      contenedorTips.innerHTML = this.tips.map(tip => tip.obtenerHTML()).join('');
    }

    if (contenedorSalud) {
      contenedorSalud.innerHTML = this.consejos.map(consejo => consejo.obtenerHTML()).join('');
    }

    if (contenedorNoticias) {
      contenedorNoticias.innerHTML = this.noticias.map(noticia => noticia.obtenerHTML()).join('');
    }
  }

  agregarTipAleatorio() {
    const tipsNuevos = [
      { titulo: 'Técnica Pomodoro', contenido: 'Estudia por 25 minutos y descansa 5. Después de 4 ciclos, descansa 15-30 minutos.' },
      { titulo: 'Estudia en grupo', contenido: 'Formar grupos de estudio te ayuda a comprender mejor los temas al explicarlos a otros.' },
      { titulo: 'Elimina distracciones', contenido: 'Apaga el celular y las redes sociales mientras estudias para mantener el enfoque.' },
      { titulo: 'Mapas mentales', contenido: 'Usa mapas mentales para conectar ideas y visualizar mejor los conceptos.' }
    ];

    const nuevo = tipsNuevos[Math.floor(Math.random() * tipsNuevos.length)];
    this.tips.push(new Articulo(this.tips.length + 1, nuevo.titulo, nuevo.contenido, 'Estudio'));
    
    const contenedor = document.getElementById('contenedor-tips');
    if (contenedor) {
      contenedor.innerHTML = this.tips.map(tip => tip.obtenerHTML()).join('');
    }
  }

  configurarFormulario() {
    const formulario = document.getElementById('formulario-contacto');
    if (formulario) {
      formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        this.procesarFormulario();
      });
    }
  }

  procesarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && correo && mensaje) {
      this.mostrarNotificacion(`Gracias ${nombre}! Tu mensaje ha sido enviado.`);
      document.getElementById('formulario-contacto').reset();
    }
  }

  mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.style.backgroundColor = '#3cb8f1ff';
    notificacion.style.color = 'white';
    notificacion.innerHTML = `<strong>${mensaje}</strong>`;

    document.getElementById('contenedor-notificaciones').appendChild(notificacion);
    setTimeout(() => notificacion.remove(), 3000);
  }
}

let app;

document.addEventListener('DOMContentLoaded', function() {
  app = new TodoEnUnoApp();
});
