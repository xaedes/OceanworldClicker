include ./Config.mk
.PHONY: deploy server tab2space

do_nothing:

deploy:
	scp -r src/ $(DEPLOY_DEST)

server: 
	# sleep 1 && xdg-open "http://localhost:8082" &
	http-server src -p 8082 -c-1 # sudo npm install http-server -g
	# cd src/ && python -m SimpleHTTPServer 8082 # seems to be slower than http-server

tab2space:
	find src/js/ -iname *.js -exec sed -i s/'\t'/'    '/g '{}' \;
