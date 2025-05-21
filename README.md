# BackEnd_PROYECTO_GRUPO_3_PQRS_Supermarket

Angel Stiven Pinzon Sánchez, Juan David Valero Venegas, Juan Diego Galan Espinosa, Nicolas Alfonso Forigua

pasos en la consola realizados para usar la app web:

//instalar node en el dispositivo que descargue el repo para poder usar el servidor web

//iniciar el proyecto de servidor con node creado el package.json
npm init -y 


//instalar paquetes para: 
//    encriptar contraseñas
    (npm i bycript --save)
//    usar un framework para estructurar el backend
    (npm i express --save)
//    conectarse a las BD MySQL.
    (npm i mysql, mysql2 --save)


//instalar paquete de desarrollo para actualizar el servidor web
npm install bcrypt express mysql mysql2 --save 

npm install nodemon --dev 


pasos por consola para navegar hasta la BD:

//ingresa sus comandos sql directos
cd \xampp\
cd mysql\bin
mysql -u root -p (-u=usuario root de mysql -p=pide password)
//hace el login

copiamos el query en el cliente del gestor respectivo (WorkBench o phpmyadmin)

y tras esto ejecutamos la app con:

node src\app.js


