module.exports = function (grunt) {
	var path = require('path'),
			join = path.join,
			projectDir = path.dirname(__dirname),
			modulesDir = join(__dirname, 'node_modules'),
			wwwRoot = join(projectDir, 'src', 'main', 'resources', 'static'),
			jsRoot = join(wwwRoot, 'scripts'),
			cssRoot = join(wwwRoot, 'styles'),
			fs = require('fs');

	/**
	 * Отправляет данные файла, который находится в wwwRoot, пользователю по HTTP
	 * @param {String} filename - имя файла относительно wwwRoot
	 * @param {http.ServerResponse} res - объект HTTP ответа
	 */
	function readStaticFileToNetwork(filename, res) {
		var fullName = join(wwwRoot, filename);
		if (fs.existsSync(fullName))
			fs.createReadStream(fullName).pipe(res);
		else {
			res.statusCode = 404;
			res.end();
		}
	}

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		paths: {
			loginjs: {
				src: join(jsRoot, 'login', '**', '*.js'),
				dst: join(jsRoot, 'login.min.js')
			},
			appjs: {
				src: join(jsRoot, 'app', '**', '*.js'),
				dst: join(jsRoot, 'app.min.js')
			},
			vendorjs: {
				src: join(modulesDir),
				dst: join(jsRoot, 'vendor', 'script.js')
			}
		},
		jshint: {
			files: {
				src: ['Gruntfile.js', '<%= paths.loginjs.src %>',
					'<%= paths.appjs.src %>']
			}
		},
		// Здесь просто для примера, spring-boot:run обрабатывает динамически
		// изменения в папке static, так что эту задачу я не использую
		connect: {
			server: {
				options: {
					port: 8989,
					hostname: '127.0.0.1',
					base: wwwRoot,
					keepalive: true,
					debug: true,
					middleware: [
						function (req, res, next) {
							var filePath;
							if (req.url === '/enter.html')
								readStaticFileToNetwork('enter.html', res);
							else if (req.url == '/index.html' || req.url === '/')
								readStaticFileToNetwork('index.html', res);
							else if (filePath = /^\/(.+?\.(css|js))$/.exec(req.url))
								readStaticFileToNetwork(filePath[1], res);
							else
								res.writeHead(301, {'Location': "http://localhost:8991" + req.url});
						}
					]
				}
			}
		}

	});
	grunt.registerTask('default', ['jshint']);
};
