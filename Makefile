
BABEL = ./node_modules/.bin/babel
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%.js=lib/%.js)

lib: $(LIB)
lib/%.js: src/%.js .babelrc
	mkdir -p $(@D)
	$(BABEL) $< -o $@

publish: lib
	npm publish
