## Requierments

el usuario sube un audio a la app (mp3, mp4, wav)

permitir videos y enlaces de youtube

la app obtiene la trasncripcion del audio al acceder a una IA que recibe el audio y retorna la misma en un json(retorna, transcripcion en formato timestap, asi como una lista de las palabras del vocabulario, asi como la tematica del audio)

la app muestra un repdoductor done el uduario escucha su audio y una seccion donde esta toda la transcripcion en forma de texto que el usuario puede leer al mismo tiempo que escucha

Mientras se reproduce se remarca la palabra que se esta escuchando en la reproduccion asi el usuario puede ver por donde va el texto(no funciona bien posponer)

el reproductor tiene la opcion de avanzar o retroceder el audio

cuando el usuario hace click en una palabra del texto el audio se mueve hasta ese momento donde se menciona

el usuario tiene un boton para iniciar una grabacion y leer en voz alta, su audio se pone disponble para que lo escuche y se le da una puntuacion teniendo en cuenta la clarida y la pronuciacion asi como las veces que se detiene

cuando se toca una palabra ver como hacer para que la api de google translate te envie la pronunciacion de la misma asi como su significado, decidir entre esto y lo de rebobinar , no se cual es mejor

ademas hay una seccion donde se muetra la lista de palabras de vocabulario de ese audio en la que el usuario debe fijarse

existe un boton qe genera ejercicios de gramatica y escritura basandose en la tematica del audio( esto debe ser oro llamado a la IA con los datos tematica y vocabulario y el prom)
