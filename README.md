# sic-storages
New version of the storages

# Configuration properties
All properties can be customized through system environments.

* **STORAGES_PORT** - 8991
* **STORAGES_DB_URL** - jdbc:oracle:thin:@localhost:1521:hawkw
* **STORAGES_DB_USER** - qq
* **STORAGES_DB_PASSWORD** - qq
* **STORAGES_DB_DRIVER** - oracle.jdbc.OracleDriver

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
