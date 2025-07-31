// --- NAVEGACIÓN HORIZONTAL ENTRE SECCIONES ---
let currentSection = 0;
const sections = document.querySelectorAll('main section');
const totalSections = sections.length;
const mainContainer = document.getElementById('contenedor');
const navLinks = document.querySelectorAll('nav a');

function updateNavigation(index) {
  navLinks.forEach(link => link.classList.remove('active'));
  if (navLinks[index]) {
    navLinks[index].classList.add('active');
  }
}

function moveSlide(direction) {
  currentSection += direction;
  if (currentSection < 0) currentSection = 0;
  if (currentSection >= totalSections) currentSection = totalSections - 1;
  mainContainer.style.transform = `translateX(-${currentSection * 100}vw)`;
  updateNavigation(currentSection);
}

navLinks.forEach((link, index) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    currentSection = index;
    mainContainer.style.transform = `translateX(-${index * 100}vw)`;
    updateNavigation(index);
  });
});

// --- TEST EMPRENDEDOR: Mostrar preguntas una por una automáticamente ---
document.addEventListener('DOMContentLoaded', () => {
  const preguntas = document.querySelectorAll('#emprendeTest .pregunta');
  const botonFinal = document.getElementById('botonFinal');

  // Mostrar solo la primera pregunta
  preguntas.forEach((p, i) => {
    p.style.display = i === 0 ? 'block' : 'none';
  });
  botonFinal.style.display = 'none';

  // Avanzar automáticamente al responder
  preguntas.forEach((pregunta, i) => {
    const opciones = pregunta.querySelectorAll('input[type="radio"]');
    opciones.forEach(opcion => {
      opcion.addEventListener('change', () => {
        pregunta.style.display = 'none';
        if (i + 1 < preguntas.length) {
          preguntas[i + 1].style.display = 'block';
        } else {
          botonFinal.style.display = 'block';
        }
      });
    });
  });
});

// --- CÁLCULO DEL TEST DE EMPRENDIMIENTO ---
function calcular() {
  const form = document.getElementById('emprendeTest');
  let total = 0;

  for (let i = 1; i <= 10; i++) {
    const respuesta = form.querySelector(`input[name="q${i}"]:checked`);
    if (respuesta) {
      total += parseInt(respuesta.value, 10);
    } else {
      document.getElementById('resultado').textContent =
        'Para obtener tu resultado, asegúrate de responder todas las afirmaciones del test.';
      return;
    }
  }

  let msg = '';
  if (total >= 45) {
    msg = '¡Excelente actitud emprendedora! Tienes lo necesario para empezar o fortalecer un proyecto. Aprovecha tu impulso para liderar ideas que transformen tu entorno.';
  } else if (total >= 35) {
    msg = 'Tienes muy buenas bases para emprender. Con un poco más de experiencia, formación o apoyo, puedes convertir tus ideas en realidades sostenibles y de impacto.';
  } else if (total >= 25) {
    msg = 'Vas por buen camino. Tienes el interés y algunos rasgos clave. Este es un buen momento para seguir aprendiendo, rodearte de personas emprendedoras y atreverte a dar los primeros pasos.';
  } else {
    msg = 'Tu perfil emprendedor aún está en desarrollo. No pasa nada: todos empezamos en algún punto. Puedes formarte, conocer casos reales en Risaralda y fortalecer tus habilidades paso a paso.';
  }

console.log('Resultado calculado:', total);


  // Mostrar resultado en ventana emergente (modal)
  const resultadoTexto = `Puntaje total: ${total} / 50\n\n${msg}`;
  document.getElementById('contenidoModal').textContent = resultadoTexto;
  document.getElementById('miModal').style.display = 'flex';


  // También lo mostramos como texto debajo del botón, por accesibilidad
  //document.getElementById('resultado').textContent = `Puntaje total: ${total} / 50 → ${msg}`;
}

// --- CERRAR MODAL DEL TEST ---
function cerrarModal() {
  document.getElementById('miModal').style.display = 'none';
}







// --- CARRUSEL AUTOMÁTICO DE ORGANIZACIONES ---
let orgIndex = 0;
let orgAutoScroll;

function showSingleOrg(index) {
  const cards = document.querySelectorAll('.org-card');
  cards.forEach((card, i) => {
    card.style.display = i === index ? 'block' : 'none';
  });
}

function moveOrg(direction) {
  const cards = document.querySelectorAll('.org-card');
  const total = cards.length;

  orgIndex += direction;
  if (orgIndex < 0) orgIndex = total - 1;
  if (orgIndex >= total) orgIndex = 0;

  showSingleOrg(orgIndex);
}

function startAutoScroll() {
  orgAutoScroll = setInterval(() => {
    moveOrg(1);
  }, 4000);
}

function stopAutoScroll() {
  clearInterval(orgAutoScroll);
}

document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    showSingleOrg(orgIndex);
    startAutoScroll();
    sliderContainer.addEventListener('mouseenter', stopAutoScroll);
    sliderContainer.addEventListener('mouseleave', startAutoScroll);
  }
});

// --- GRÁFICOS SIMULADOS ---
const select = document.getElementById('graficoSelect');
  const contenedor = document.getElementById('contenidoGrafico');
  const titulo = document.getElementById('tituloGrafico');
  const descripcion = document.getElementById('descripcionGrafico');
  const imagen = document.getElementById('imagenGrafico');

  select.addEventListener('change', () => {
    const tipo = select.value;
    contenedor.style.display = tipo ? 'block' : 'none';

    if (tipo) {
      imagen.classList.remove('fade-in'); // Reinicia animación
      void imagen.offsetWidth;            // Fuerza reflow
      imagen.classList.add('fade-in');
    } else {
      imagen.classList.remove('fade-in');
      imagen.style.display = 'none';
    }

    

    switch (tipo) {
      case 'barras':
        titulo.textContent = 'Emprendimiento Femenino en Risaralda';
        descripcion.textContent = 'El liderazgo femenino es vital para el desarrollo inclusivo...';
        imagen.src = 'Grafica_registro_emprendimiento.png';
        break;
      case 'torta':
        titulo.textContent = 'Participación por tipo de Sector';
        descripcion.textContent = 'La diversidad económica se refleja en los distintos tipos...';
        imagen.src = 'Grafica_torta.png';
        break;
      case 'lineas':
        titulo.textContent = 'Evolución del Emprendimiento';
        descripcion.textContent = 'Este gráfico de líneas ilustra la evolución anual...';
        imagen.src = 'Grafica_linea.png';
        break;
      case 'area':
        titulo.textContent = 'Cantidad de Emprendedores por Género';
        descripcion.textContent = 'Comparar cómo crecen los distintos tipos...';
        imagen.src = 'Grafica_area.png';
        break;
      default:
        imagen.style.display = 'none';
        break;
    }
  });


// --- CARGA Y FILTRADO DE DATOS DE EMPRENDIMIENTO ---
let datos = [];

async function cargarDatos() {
  try {
    const response = await fetch('Emprendimientos_Filtrables_Modificado.json');
    datos = await response.json();
    poblarSelectores();
    mostrarTabla(datos);
    agregarEventosDeFiltro(); // importante
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
}

function poblarSelectores() {
  poblarFiltro('tipo-emprendimiento', obtenerUnicos(datos, 'tipo_Emprendimiento'));
}

function poblarFiltro(id, valores) {
  const select = document.getElementById(id);
  valores.forEach(valor => {
    const option = document.createElement('option');
    option.value = valor;
    option.textContent = valor;
    select.appendChild(option);
  });
}

function obtenerUnicos(data, campo) {
  return [...new Set(data.map(item => item[campo]).filter(Boolean))].sort();
}

function aplicarFiltros() {
  const trabajo = obtenerSeleccionados('tipo-trabajo');
  const emprendimiento = obtenerSeleccionados('tipo-emprendimiento');
  const sexo = obtenerSeleccionados('sexo');
  const mes = obtenerSeleccionados('mes');

  const filtrados = datos.filter(item => {
    return (trabajo.length === 0 || trabajo.includes(String(item['tipo_Trabajo']))) &&
           (emprendimiento.length === 0 || emprendimiento.includes(item['tipo_Emprendimiento'])) &&
           (sexo.length === 0 || sexo.includes(item['sexo'])) &&
           (mes.length === 0 || mes.includes(item['mes']));
  });

  mostrarTabla(filtrados);
}

function obtenerSeleccionados(id) {
  const opciones = document.getElementById(id).selectedOptions;
  return Array.from(opciones).map(opt => opt.value);
}

function mostrarTabla(data) {
  const tbody = document.getElementById('tabla-body');
  tbody.innerHTML = '';

  data.forEach(fila => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${fila['edad']}</td>
      <td>${fila['tipo_Trabajo']}</td>
      <td>${fila['tipo_Emprendimiento']}</td>
      <td>${fila['sexo']}</td>
      <td>${fila['mes']}</td>
    `;
    tbody.appendChild(tr);
  });
}

function agregarEventosDeFiltro() {
  ['tipo-trabajo', 'tipo-emprendimiento', 'sexo', 'mes'].forEach(id => {
    const selector = document.getElementById(id);
    selector.addEventListener('change', aplicarFiltros);
  });
}

window.addEventListener('DOMContentLoaded', cargarDatos);
