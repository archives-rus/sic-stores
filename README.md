# sic-storages
New version of the storages

# Configuration properties
All properties can be customized through system environments.

* **STORAGES_PORT** - default 8991 (can be set by command line option, example, java -Dserver.port=1111 -jar server.jar)
* **STORAGES_DB_URL** - default jdbc:oracle:thin:@localhost:1521:hawkw
* **STORAGES_DB_USER** - default ***
* **STORAGES_DB_PASSWORD** - default ***
* **STORAGES_DB_DRIVER** - default oracle.jdbc.OracleDriver

# Install
```sh
$ git clone -b spring_boot https://github.com/stikkas/sic-storages.git
$ cd sic-storages/grunt
$ npm install
$ grunt compile
$ cd ..
$ mvn clean install
```

# Develop
```sh
$ git clone -b spring_boot https://github.com/stikkas/sic-storages.git
$ cd sic-storages/grunt
$ npm install
$ grunt
```
Open new terminal session and
```sh
$ cd sic-storages/
$ mvn clean spring-boot:run
```

# Content
* **boostrap** - source less for css theme
* **grunt** - angular, bootstrap dists and additional npm modules to compile css and js client files
* **karma** - tests for javascript frontend
* **src/main/resources/static** - document root for web
  * index.html - main web file
  * enter.html - authorization form
  * **fonts** - fonts for css theme
  * **img** - images, icons
  * **partials** - html parts
  * **scripts/login** - js files for authorization form
  * **scripts/app** - js files for main file
  * **scripts/vendor** - js libraries
  * **styles/login** - css files for authorization form
  * **styles/app** - css files for main file
  * **styles/vendor** - extra css files for js libraries
