#!/bin/sh

dir=`pwd`
java -jar $dir/../target/sic-storages-0.0.1.jar --spring.profiles.active=production --logging.file=$dir/server.log --spring.datasource.url=jdbc:oracle:thin:@calypso:1521:nyoko 
