#!/bin/bash
for i in {20..23}
do 
	cp  files/${i}full $i/public/triggers.js
	#rm -r ${i}/public/img/
done
