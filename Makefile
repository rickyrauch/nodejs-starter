run: node_modules components build
	@NODE_PATH=lib node index.js

node_modules:
	@npm install

components:
	@node ./bin/njs-install

build:
	@node ./bin/njs-build

clean:
	@rm -rf components node_modules public

.PHONY: run build clean

