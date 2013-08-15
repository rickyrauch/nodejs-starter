run: node_modules components
	@NODE_PATH=lib node index.js

node_modules:
	@npm install

components:
	@component install

clean:
	@rm -rf components node_modules

.PHONY: run clean

