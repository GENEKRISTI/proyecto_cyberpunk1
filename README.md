

Este documento detalla el procedimiento técnico estándar para empaquetar los archivos estáticos (index.html, style.css, script.js), 
inicializar el control de versiones local con Git, publicarlos en un repositorio remoto de GitHub y configurar su despliegue automatizado en la web 
mediante GitHub Pages.

Crear mi portafolio profesional como Desarrolladora Full-Stack e Ingeniera de Inteligencia Artificial, con el propósito de destacar mi perfil técnico,
mis habilidades en desarrollo web avanzado y la creación de soluciones basadas en IA. Busqué proyectar una identidad visual moderna y vanguardista 
inspirada en la estética cyberpunk y anime, utilizando una paleta de colores en tonos dorados, rosados neón y blanco sobre un fondo oscuro, 
garantizando una experiencia de usuario limpia, responsiva y de alto impacto visual.

<img width="736" height="414" alt="image" src="https://github.com/user-attachments/assets/d027a1fb-c0e1-4965-ac82-e49f67a23c52" />


Tecnología Utilizada
•	HTML5: Para la estructura semántica y el diseño modular de las distintas secciones de la página.
•	CSS3: Para la aplicación de estilos personalizados, variables globales, efectos de resplandor neón, tipografías futuristas y diseño adaptable en modo oscuro.
•	Bootstrap 5: Como framework CSS para optimizar la maquetación del sistema de rejilla responsiva y asegurar una correcta visualización en dispositivos móviles y de escritorio.
•	JavaScript (ES6+): Para implementar la interactividad del sitio, incluyendo el sistema de filtrado dinámico en la sección de proyectos y el control del botón flotante para volver al inicio.






Fase 1: Configuración del Repositorio Remoto en GitHub
1.	Creación del Repositorio:


o	Ingresa a tu cuenta oficial en GitHub.

o	Haz clic en el botón de creación (+) situado en la esquina superior derecha y selecciona New repository.

o	Asigna un nombre al repositorio (por ejemplo, genesis-architecture-portfolio).

o	Configura la visibilidad en modo Public (necesario para habilitar GitHub Pages de forma gratuita) y no selecciones la opción de agregar archivo README, LICENSE o .gitignore (ya que tu proyecto local se encargará de esto).

o	Haz clic en Create repository.

<img width="626" height="352" alt="image" src="https://github.com/user-attachments/assets/5dd99037-a08d-4ba3-b5e3-4a9713c2294a" />




Fase 2: Publicación y Despliegue en GitHub Pages

1.	Acceso a las Preferencias del Repositorio:
Dirígete a la interfaz web de tu repositorio en GitHub.
Haz clic en la pestaña de configuración (Settings), ubicada en la barra superior de opciones del repositorio.



2.	Configuración de Páginas:
 En el menú lateral izquierdo, busca la sección de automatización y despliegue, y haz clic en Pages.



4.	Definición de la Fuente de Despliegue (Build and deployment):
	En el apartado Source, asegúrate de que la opción seleccionada sea Deploy from a branch.
	Bajo la sección Branch, selecciona la rama main en el primer menú desplegable y deja la carpeta en la raíz (/ (root)) en el segundo menú.
   Haz clic en el botón Save.


4.	Verificación de URL Pública:
	Tras guardar la configuración, GitHub procesará los archivos estáticos de manera automatizada en un par de minutos.
  Recarga la página de Pages y verás en la parte superior la URL pública oficial generada (con estructura [https://tu-usuario.github.io/nombre-repositorio/](https://tu-usuario.github.io/nombre-repositorio/)), la cual estará activa y lista para compartir.






