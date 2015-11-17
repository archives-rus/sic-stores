#!/bin/sh

dir=`pwd`

java -DSTORAGES_DB=hawkw -DSTORAGES_DB_HOST=localhost -Dlogging.file=$dir/server.log -jar $dir/../target/sic-storages-0.0.1.jar
