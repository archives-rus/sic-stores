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
		// Настройки путей к файлам
		paths: {
			loginjs: {
				src: join(jsRoot, 'login', '**', '*.js'),
				min: join(jsRoot, 'login.min.js')
			},
			appjs: {
				src: join(jsRoot, 'app', '**', '*.js'),
				min: join(jsRoot, 'app.min.js')
			},
			vendorjs: {
				src: join(modulesDir, 'angular', 'angular.min.js'),
				dst: join(jsRoot, 'vendor', 'script.min.js')
			},
			logincss: {
				src: join(cssRoot, 'login', '**', '*.css'),
				dst: join(cssRoot, 'login.min.css')
			},
			appcss: {
				src: join(cssRoot, 'app', '**', '*.css'),
				dst: join(cssRoot, 'app.min.css')
			}
		},
		// Проверка правильности js кода
		jshint: {
			files: {
				src: ['Gruntfile.js', '<%= paths.loginjs.src %>',
					'<%= paths.appjs.src %>']
			}
		},
		// Запуск заданий автоматически при изменении файлов
		watch: {
			jshint: {
				files: '<%= jshint.files.src %>',
				tasks: 'newer:jshint' //обслуживать только измененные файлы
			},
			l_uglify: {
				files: '<%= uglify.login.src %>',
				tasks: 'uglify:login'
			},
			a_uglify: {
				files: '<%= uglify.app.src %>',
				tasks: 'uglify:app'
			},
			options: {
				atBegin: true
			}
		},
		// Кучкуем файлы js 
		concat: {
			vendorjs: {
				files: {
					'<%= paths.vendorjs.dst %>': '<%= paths.vendorjs.src %>'
				}
			}	
		},
		// Сжимаем js файлы
		uglify: {
			login: {
				src: '<%= paths.loginjs.src %>',
				dest: '<%= paths.loginjs.min %>'
			},
			app: {
				src: '<%= paths.appjs.src %>',
				dest: '<%= paths.appjs.min %>'
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
							else if ((filePath = /^\/(.+?\.(css|js))$/.exec(req.url)))
								readStaticFileToNetwork(filePath[1], res);
							else
								res.writeHead(301, {'Location': "http://localhost:8991" + req.url});
						}
					]
				}
			}
		}

	});
	grunt.registerTask('default', ['concat:vendorjs', 'watch']);
};
