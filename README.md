bLocator
=========

Version 1.0

##Sumario

bLocator es un código experimental para la geolocalización a partir de unas coordenadas o una dirección dada.
Lee los datos a partir de un fichero **JSON** llamado blocator.json, en un futuro espero que lo lea directamente de una **API**.

###Contenido JSON

```
{
"address": "Paseo de Gracias, Barcelona",
"location": null,
"zoom": 13
}
```

otro ejemplo sería

```
{
"address": "Gran Vía, Madrid",
"location": {
        "lat": 40.4204387,
        "lng": -3.7034753
    },
"zoom": 13
}
```

###Demo

[Página de demostración](http://blocator.herokuapp.com/)


##Changelog

#### Version 1.0

* Commit inicial

##Author

Email: <blasfs@icloud.com>

Twitter: [@burasu76](http://twitter.com/burasu76)

GitHub: <https://github.com/burasu>


###Code License

Applies to code inside: `style.css`, `blocator.js`, `blocator.json` and `index.html`.

Code licensed under [MIT License](http://opensource.org/licenses/mit-license.html)

###Documentation License

Applies to all bLocator project files.

Documentation licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)