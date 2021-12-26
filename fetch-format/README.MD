# Como hacer peticiones al servidor

## Generalidades

- Las peticiones tienen que mandar un JSON que siga el formato que se muestra en cada archivo.

- Los nombres de los atributos del JSON en el formato presentado deben ser respetados.

    * Por ejemplo, si en el formato se muestra "idPaciente": "123", se debe de mandar en el JSON de la peticion "idPaciente" como atributo, con sus mayusculas igual y todo.

- En el servidor se hara de cuenta que todas las peticiones se haran como se muestra en el formato.

- Si crean un endpoint en la API que reciba JSONs' tiene que hacer un formato que lo acompañe.

