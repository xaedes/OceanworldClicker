server: 
	sleep 1 && xdg-open "http://localhost:8082" &
	cd src/ && python -m SimpleHTTPServer 8082 

tab2space:
	find src/js/ -iname *.js -exec sed -i s/'\t'/'    '/g '{}' \;

