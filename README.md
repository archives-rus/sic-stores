# sic-storages
New version of the storages

# Configuration properties
All properties can be customized through system environments.

* **STORAGES_PORT** - default _8991_ (can be set by command line option, example, java -Dserver.port=1111 -jar server.jar)
* **STORAGES_LOG** - default _java.io.tmpdir + ais-storeplaces.log_ (can be set by command line option, example, java -Dlogging.file=c:\stores\server.log -jar server.jar)
* **STORAGES_DB** - default _hawkw_
* **STORAGES_DB_HOST** - default _localhost_
* **STORAGES_DB_USER** - default ***
* **STORAGES_DB_PASSWORD** - default ***
* **STORAGES_DB_DRIVER** - default _oracle.jdbc.OracleDriver_

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
* **scripts** - scripts and programms for deploying
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

# Deploy
## Windows
Create folder, example, C:\stores, copy scripts\server.bat and jar-file in it, unzip scripts\nssm-2.24.zip in it.
Change server.bat and run
```sh
nssm.exe install MyNameService
```
After successful installation you can manage service via windows service tools.
## Linux
You can create init file and add it in startup services, or put in /etc/rc.local:
```sh
su - user_for_my_server -c "/path_to_my_folder/server.sh" &
```
