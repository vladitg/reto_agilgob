
# Configuración de Proyecto

El proyecto fue una prueba de "Agilgob" el cual consistía en realizar una aplicación con las tenologías de Laravel y React.

## Authors

- Vladimir Tagle Gonzalez


## Deployment

Para desplegar la aplicacion es necesario realizar los siguientes pasos:

1.- Configuración de Base de Datos

La base de datos fue realizada con PostgresSQL, por lo que la confiugración inicia dentro de esta misma:
```bash
  Host: 127.0.0.1
  Port: 5432
  Database: agilgob
  Username: postgres
  Password: 
```
Dicha configuración también puede encontrarse en el archivo .env de la aplicación de Laravel.

2.- Levantar Laravel

Después de haber creado la base de datos, lo que es necesario es generar la "DATA" de la BD por lo que dentro del proyecto de Laravel que es la carpeta de "Laravel", necesita abrir una terminal de comandos y ejecutar los siguientes comandos:

```bash
  composer install
  php artisan migrate
  php artisan db:seed
```

Esperando que todo se haya instalado de manera correcta con el "composer", se hayan creado las tablas con el "migrate" y se hayan generado los datos con el "seed", procedemos a ejecutar el siguiente comando para levantar el back:

```bash
  php artisan serve
```

3.- Levantar React

Ya culminado el proceso de levantar el Backend (Laravel), es necesario levantar el Frontend (React), por lo que entramos a la aplicación en la carpeta de "React" dentro del proyecto, y ejecutamos el siguiente comando:

```bash
  npm install --force
```

Con el cual instalamos todas las dependencias que se usaron dentro del proyecto, utilizamos el force debido a la versión de npm (React), ya que se hayan terminado de descargar todas las dependencias ejecutamos este comando:

```bash
  npm run start
```

Con lo cual ya tenemos el back(Laravel) y el front(React) levantados, podemos hacer uso de la aplicación.

