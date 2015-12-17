# s-eng

environment:
- node.js ~0.10
- php ~5.4
- mysql ~5.6
- npm ~1.4
- grunt-cli ~0.1
- bower ~1.6 

instalation:
- install php, mysql, node.js and npm
- `npm install -g grunt-cli`
- `npm install`
- `bower install`
- `grunt default` compile production version
- `grunt api` run api backend
- `grunt serv` run http server

Supported commands:
- `$ grunt build` build development version

- `$ grunt compile` compile development version

- `$ grunt default` build development version and compile it to production version

- `$ grunt watch` rebuild development version after change sources

- `$ grunt serv` run http serv with development version

- `$ grunt serv_bin` run http serv with production version
