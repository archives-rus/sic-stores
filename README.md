# sic-storages
To insert, to change, to search information about organizations.

# Development flow
При разработке использую профиль _development_ maven и профиль _development_ spring-boot.
Собираю проект без указания профилей. По умолчанию используется профиль _production_, в котором прописано подключение к OracleDB. Для разработки необходимо поднять сервер БД H2.
При тестировании используется встроенный сервер БД H2 (для этого необходимо использовать профиль _development_ maven).

## Actions of the Netbeans:
- **Test project**: 
    * Execute Goals: test
    * Active Profiles: development
- **Test file**: 
    * Execute Goals: test-compile surefire:test
    * Active Profiles: development
    * Set Properties: test=${packageClassName}
- **Run**:
    * Execute Goals: spring-boot:run
    * Active Profiles: development
    * Set Properties: Env.spring_profiles_active=development
        run.jvmArguments=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005
- **Notest**:
    * Execute Goals: test-compile surefire:test
    * Set Properties: skipTests=true

For build production version use **Notest** action.

# Configuration properties
The project uses only standard spring boot application options.
All options can be customized through environment or command line arguments.
Default active profile is _development_. Other profiles are _production_ and _test_.

## Default options for all profiles
* __port:__ 8991
* __session timeout:__ none
* __maxFileSize:__ 50Mb
* __maxRequestSize:__ 50Mb

## Default options for __development__ profile
* __database:__ H2
* __database host:__ localhost
* __database port:__ 9092
* __database name:__ development
* __database username:__ sa
* __database password:__ sa
* __logging level:__ INFO

## Default options for __production__ profile
* __database:__ ORACLE
* __database host:__ localhost
* __database port:__ 1521
* __database name:__ hawkw
* __database username:__ store
* __database password:__ PstoreLace
* __logging level:__ WARN
* __logging file:__ /tmp/ais-storeplaces.log

# Install
```sh
$ git clone -b reorg https://stikkas@bitbucket.org/sicstores/sic-storage.git
$ cd sic-storage/src/main/resources/static/
$ npm install
$ grunt compile
$ cd ../../../../
$ mvn clean package
```

# Develop
```sh
$ git clone -b reorg https://stikkas@bitbucket.org/sicstores/sic-storage.git
$ cd sic-storage/src/main/resources/static/
$ npm install
$ grunt
```
Open new terminal session and
```sh
$ cd sic-storage/
$ mvn clean spring-boot:run
```

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
