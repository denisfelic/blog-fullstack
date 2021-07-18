### TODO
- criar o banco de dados
- criar o crud na api
- criar o frontend
- deployar o back e front heroku/netliflyer/etc

###  DB Schema example
 - id BIGINT AUTOINCREMENT 
 - title VARCHAR(255) NOT NULL
 - content TEXT NOT NULL
 - likes BIGINT NOT NULL
 - authorName varchar(42) NOT NULL



### SQL COMMANDS

Create database 
```
CREATE DATABASE IF NOT EXISTS blog_node;
```

Create table

```
CREATE TABLE IF NOT EXISTS `blog_node`.`post` ( `id` BIGINT NOT NULL AUTO_INCREMENT , `title` VARCHAR(255) NOT NULL , `content` TEXT NOT NULL , `likes` INT NULL DEFAULT '0' , `authorName` VARCHAR(42) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
```