bLocator
========

bLocator es un código experimental para la geolocalización a partir de unas coordenadas o a partir de una dirección dada.

Lee los datos a partir de un fichero **JSON** llamado blocator.json. El contenido del fichero será el siguiente:

- address: Dirección que mostrar.
- location: Coordenadas
        lat: Latitud.
        lng: Longitud.
- zoom: Zoom que aplicar.

Si no se tuviera alguno de esos valores, tendría que  indicar null.

Un ejemplo sería:

`
{
"address": "Paseo de Gracias, Barcelona",
"location": null,
"zoom": 13
}
`