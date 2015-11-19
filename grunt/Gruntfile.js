module.exports = function (grunt) {
	var path = require('path'),
			join = path.join,
			projectDir = path.dirname(__dirname),
			modulesDir = join(__dirname, 'node_modules'),
			wwwRoot = join(projectDir, 'src', 'main', 'resources', 'static'),
			jsRoot = join(wwwRoot, 'scripts'),
			cssRoot = join(wwwRoot, 'styles'),
			fontsRoot = join(wwwRoot, 'fonts'),
			annotateSuffix = '-annotated';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// Настройки путей к файлам
		paths: {
			loginjs: {
				src: join(jsRoot, 'login', '**', '*.js'),
				ann: join(jsRoot, 'login', '**', '*' + annotateSuffix),
				min: join(jsRoot, 'login.min.js')
			},
			appjs: {
				src: join(jsRoot, 'app', '**', '*.js'),
				ann: join(jsRoot, 'app', '**', '*' + annotateSuffix),
				min: join(jsRoot, 'app.min.js')
			},
			utilsjs: {
				src: join(jsRoot, 'utils', '**', '*.js'),
				ann: join(jsRoot, 'utils', '**', '*' + annotateSuffix),
				min: join(jsRoot, 'utils.min.js')
			},
			vendorjs: {
				src: [
					join(modulesDir, 'angular', 'angular.min.js'),
					join(modulesDir, 'angular-route', 'angular-route.min.js'),
					join(modulesDir, 'angular-animate', 'angular-animate.min.js'),
					join(modulesDir, 'angular-ui-bootstrap', 'ui-bootstrap.min.js'),
					join(modulesDir, 'angular-ui-bootstrap', 'ui-bootstrap-tpls.min.js')
				],
				dst: join(jsRoot, 'vendor', 'script.min.js')
			},
			logincss: {
				src: join(cssRoot, 'login', '**', '*.css'),
				dst: join(cssRoot, 'login.min.css')
			},
			appcss: {
				src: join(cssRoot, 'app', '**', '*.css'),
				dst: join(cssRoot, 'app.min.css')
			},
			utilscss: {
				src: join(cssRoot, 'utils', '**', '*.css'),
				dst: join(cssRoot, 'utils.min.css')
			},
			theme: {
				src: join(projectDir, 'bootstrap', 'app-theme.less'),
				dst: join(cssRoot, 'app-theme.css')
			},
			utilsth: {
				src: join(projectDir, 'bootstrap', 'utils-theme.less'),
				dst: join(cssRoot, 'utils-theme.css')
			},
			vendorcss: {
				src: [join(modulesDir, 'angular', 'angular-csp.css'),
					join(modulesDir, 'angular-ui-bootstrap', 'ui-bootstrap-csp.css')],
				dst: join(cssRoot, 'vendor', 'styles.min.css')
			},
			fonts: {
				bootstrap: join(modulesDir, 'bootstrap', 'dist', 'fonts')
			}
		},
		// Проверка правильности js кода
		jshint: {
			files: {
				src: ['Gruntfile.js', '<%= paths.loginjs.src %>',
					'<%= paths.appjs.src %>', '<%= paths.utilsjs.src %>']
			}
		},
		// Сжимаем стили
		cssmin: {
			vendor: {
				files: {
					'<%= paths.vendorcss.dst %>': '<%= paths.vendorcss.src %>'
				}
			},
			app: {
				files: {
					'<%= paths.appcss.dst %>': ['<%= paths.theme.dst %>', '<%= paths.appcss.src %>']
				}
			},
			login: {
				files: {
					'<%= paths.logincss.dst %>': ['<%= paths.theme.dst %>', '<%= paths.logincss.src %>']
				}
			},
			utils: {
				files: {
					'<%= paths.utilscss.dst %>': ['<%= paths.utilsth.dst %>', '<%= paths.utilscss.src %>']
				}
			}
		},
		// Тема
		less: {
			theme: {
				files: {
					'<%= paths.theme.dst %>': '<%= paths.theme.src %>'
				}
			},
			utilsth: {
				files: {
					'<%= paths.utilsth.dst %>': '<%= paths.utilsth.src %>'
				}
			}
		},
		// Запуск заданий автоматически при изменении файлов
		watch: {
			jshint: {
				files: '<%= jshint.files.src %>',
				tasks: 'newer:jshint' //обслуживать только измененные файлы
			},
			annotate: {
				files: ['<%= paths.appjs.src %>', '<%= paths.loginjs.src %>', '<%= paths.utilsjs.src %>'],
				tasks: 'newer:ngAnnotate'
			},
			l_uglify: {
				files: '<%= paths.loginjs.ann %>',
				tasks: 'uglify:login'
			},
			a_uglify: {
				files: '<%= paths.appjs.ann %>',
				tasks: 'uglify:app'
			},
			u_uglify: {
				files: '<%= paths.utilsjs.ann %>',
				tasks: 'uglify:utils'
			},
			less: {
				files: '<%= paths.theme.src %>',
				tasks: 'less:theme'
			},
			u_less: {
				files: '<%= paths.utilsth.src %>',
				tasks: 'less:utilsth'
			},
			l_cssmin: {
				files: ['<%= paths.logincss.src %>', '<%= paths.theme.dst %>'],
				tasks: 'cssmin:login'
			},
			a_cssmin: {
				files: ['<%= paths.appcss.src %>', '<%= paths.theme.dst %>'],
				tasks: 'cssmin:app'
			},
			u_cssmin: {
				files: ['<%= paths.utilscss.src %>', '<%= paths.utilsth.dst %>'],
				tasks: 'cssmin:utils'
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
		// Копируем шрифты
		copy: {
			fonts: {
				expand: true,
				files: [
					{
						expand: true,
						cwd: '<%= paths.fonts.bootstrap %>',
						src: '**',
						dest: fontsRoot
					}
				]
			}
		},
		// Приводит DI angular в соответсвующий вид, чтобы работало посли минимизации
		ngAnnotate: {
			app: {
				files: [
					{
						expand: true,
						src: '<%= paths.appjs.src %>',
						rename: function (d, s) {
							return s + annotateSuffix;
						}
					}
				]
			},
			login: {
				files: [
					{
						expand: true,
						src: '<%= paths.loginjs.src %>',
						rename: function (d, s) {
							return s + annotateSuffix;
						}
					}
				]
			},
			utils: {
				files: [
					{
						expand: true,
						src: '<%= paths.utilsjs.src %>',
						rename: function (d, s) {
							return s + annotateSuffix;
						}
					}
				]
			}
		},
		// Сжимаем js файлы
		uglify: {
			login: {
				src: '<%= paths.loginjs.ann %>',
				dest: '<%= paths.loginjs.min %>'
			},
			app: {
				src: '<%= paths.appjs.ann %>',
				dest: '<%= paths.appjs.min %>'
			},
			utils: {
				src: '<%= paths.utilsjs.ann %>',
				dest: '<%= paths.utilsjs.min %>'
			}
		}
	});
	grunt.registerTask('default', ['concat', 'cssmin:vendor', 'copy', 'watch']);
	grunt.registerTask('compile', ['jshint', 'concat', 'less', 'cssmin', 'copy', 'ngAnnotate', 'uglify']);
};
