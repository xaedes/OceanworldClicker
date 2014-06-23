server: 
	# sleep 1 && xdg-open "http://localhost:8082" &
	http-server src -p 8082 -c-1 # sudo npm install http-server -g
	# cd src/ && python -m SimpleHTTPServer 8082 # seems to be slower than http-server

tab2space:
	find src/js/ -iname *.js -exec sed -i s/'\t'/'    '/g '{}' \;

sprintf-1.0.0:
	# get from github
	cd src/js/libs && wget https://raw.githubusercontent.com/alexei/sprintf.js/1.0.0/src/sprintf.js
