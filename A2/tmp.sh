#!/bin/bash
for i in {1..50}
do 
	cp  files/${i}full $i/public/triggers.js
	#rm -r ${i}/public/img/
	#mkdir $i
	#cp -r base/* $i
done
