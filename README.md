# API REST RENT A CAR MAULE

esta es una aplicacion hecha con node js y express , destinada para ser consumida por una aplicacion cliente Rent a Car.



### Pre-requisitos 📋

- se necesita tener instalado node.js en el ordenador

### Instalación 🔧

- Instale las dependencia con npm

```
npm install
```

- luego se debe crear un archivo .env en la carpeta y colocar los siguientes valores:

#puerto server
PORT=3001

#variables database
DB_NAME=" "
DB_USER=" "
DB_PASSWORD=""
DB_HOST="localhost"
DIALECT=" "
DB_MAP=TRUE
DEFAULT_VALUE=TRUE

#variables host de correo
EMAIL_HOST=" "
EMAIL_PORT=
EMAIL_USER=" "
EMAIL_PASS=" "


#variables de encriptacion de claves usuarios
SECRET_PHRASE=""
NUM_BCRYPT=4

#token de autentificacion para otras apis
TOKEN_API_REST=" "

#usuario creado por defecto
USER_NAME=" "
USER_GMAIL=" "
USER_PASSWORD=" "
USER_SUCURSAL=1
USER_STATE=1
USER_ROL=1


LIST_CORS=["","","https://localhost"]

#rutas de todas las carpetas de uploads
PATH_FOTO_VEHICULO=" "
PATH_REQUISITO_ARRIENDO=" "
PATH_FACTURACIONES =" "
PATH_DANIO_VEHICULO=" "
PATH_ACTA_ENTREGA=" "
PATH_CONTRATO=" "
PATH_RECEPCIONES=" "

## Comenzando 🚀

para iniciar en modo desarollo 

```
npm run dev
```


para iniciar en modo produccion 

```
npm start
```


## Ejecutando las pruebas ⚙️

aun no disponible.


## Despliegue 📦

para el depliegue es necesario contar con un certificado SSL valido dentro del servidor.

## Construido con 🛠️

* [node.js](https://nodejs.org/es/) - Node.js
* [express](https://expressjs.com/) - express
* [Sequealize](https://sequelize.org/) - Sequealize




## Autores ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Diego Antonio Rios Rojas** - *Desarrollador* - [nomekop007](https://github.com/nomekop007)
* **Diego Antonio Rios Rojas** - *Documentación* - [nomekop007](#nomekop007)



## Licencia 📄

no disponible

