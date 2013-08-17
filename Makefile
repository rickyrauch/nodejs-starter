run: node_modules components build
	@NODE_PATH=lib node index.js

node_modules:
	@npm install

components:
	@component install

build:
	@./bin/njs-build

clean:
	@rm -rf components node_modules public

.PHONY: run clean

