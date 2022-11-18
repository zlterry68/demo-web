# Aplicación Springboot subida al hosting Herokuapp

## Primero se descargan la bd demo.sql

```
demo.sql
```

## Luego en:
### aplication.properties configuran esto con sus datos de la base de datos mysql

```
spring.datasource.url=jdbc:mysql://"you_server"/"bd_name"?useSSL=false
spring.datasource.dbname="you_bd_name"
spring.datasource.username="you_user"
spring.datasource.password="you_password"
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```
### Luego lo despliegan en Intellj actualizando las dependiencias del 
```
pom.xml
```
### Eso sería todo.