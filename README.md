# Tripleten web_project_around

Este proyecto, Around US, fue desarrollado siguiendo los fundamentos de BEM en el HTML y utilizando JavaScript con el DOM para añadir interactividad y dinamismo a la página.

Gestión de perfil:
Edición del nombre y la descripción del usuario.
Validación en tiempo real de los campos del formulario.
Mensajes de error personalizados.

Gestión de tarjetas:
Agregar nuevas tarjetas con imagen y título.
Validación del formulario para nuevas tarjetas.
Botón “like” para marcar tarjetas favoritas.
Eliminar tarjetas del perfil.
Visualización de imágenes en un popup.

Interacción con popups:
Apertura y cierre de ventanas modales.
Cierre mediante clic en el overlay.
Cierre con la tecla Escape.
Botones que se activan o desactivan según la validación del formulario.

Ya teniendo como base lo anterior, lo que realizamos fue la implementación de POO, ajustando las clases para que fueran más dinámicas y simplificando el código para que pudiera refactorizarse utilizando métodos privados y públicos según se requiriera. Así que se reorganizó el código con las importaciones correspondientes y la funcionalidad completada.

Todo esto se implementó con arrays, eventos y funciones en JavaScript, aportando dinamismo y una experiencia más fluida para el usuario.

Se ha organizado el archivo para que su funcionalidad sea independiente mediante una refactorización con POO, creando clases correspondientes a cada funcionalidad. Asimismo, se utilizó un acoplamiento débil entre los componentes.

Se ha implementado el código para que funcione con el servidor y no con información proporcionada directamente, volviéndolo más dinámico y accesible para todos los desarrolladores que deseen manejar el proyecto. Con esto, se realizó un manejo de promesas usando return fetch en cada método y se obtiene la respuesta del servidor a través de la API proporcionada.

Las funcionalidades como eliminar y me gusta se implementaron correctamente para manejar los datos del servidor según el ID. Asimismo, se realizaron mejoras en la experiencia de usuario en los botones y en los pop-ups, con su respectivo despliegue.

Puedes ver el resultado en GitHub Pages:
https://tefa1229.github.io/web_project_around_es/
