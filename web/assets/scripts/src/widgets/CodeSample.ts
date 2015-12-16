import Base = require('core/base');
import CodeEditor = require('widgets/CodeEditor');

export = CodeSample;
class CodeSample extends Base.Widget {
	private CODE_LISTING:Object = {
		// fb.com
		'firstborn': {
			'_DIR': 'assets/code/firstborn',
			'files': {
				'readme.md': {
					'name': 'readme.md',
					'type': 'markdown',
					'default': true
				},
				'scripts': {
					'type': 'directory',
					'core': {
						'type': 'directory',
						'base.ts': {
							'name': 'base.ts',
							'type': 'typescript'
						},
						'factory.ts': {
							'name': 'factory.ts',
							'type': 'typescript'
						},
						// 'kiu.ts': {
							// 'name': 'kiu.ts',
							// 'type': 'typescript'
						// },
						'pushState.ts': {
							'name': 'pushState.ts',
							'type': 'typescript'
						},
						'walt.ts': {
							'name': 'walt.ts',
							'type': 'typescript'
						},
						'windowController.ts': {
							'name': 'windowController.ts',
							'type': 'typescript'
						}
					},
					'page': {
						'type': 'directory',
						'work': {
							'type': 'directory',
							'filter.ts': {
								'name': 'filter.ts',
								'type': 'typescript'
							}
						}
					}
				}
			}
		},
		// </fb.com>

		// indalab
		'indalab': {
			'_DIR': 'assets/code/indalab',
			'files': {
				'readme.md': {
					'name': 'readme.md',
					'type': 'markdown',
					'default': true
				},
				'app': {
					'type': 'directory',
					'site.js': {
						'name': 'site.js',
						'type': 'javascript'
					},
					'index.php': {
						'name': 'index.php',
						'type': 'html'
					},
					'query.php': {
						'name': 'query.php',
						'type': 'php'
					},
					'stylesheets': {
						'type': 'directory',
						'app.css': {
							'name': 'app.css',
							'type': 'css'
						}
					},
					'db': {
						'type': 'directory'
					}
				}
			}
		},
		// </indalab>

		// twig
		'twig': {
			'_DIR': 'assets/code/twig',
			'files': {
				'readme.md': {
					'name': 'readme.md',
					'type': 'markdown',
					'default': true
				},
				'app': {
					'type': 'directory',
					'index.php': {
						'name': 'index.php',
						'type': 'html'
					},
					'query.php': {
						'name': 'query.php',
						'type': 'php'
					},

					'lego': {
						'type': 'directory',
						'bin.php': {
							'name': 'bin.php',
							'type': 'php'
						},
						'DashboardLego.php': {
							'name': 'DashboardLego.php',
							'type': 'php'
						},
						'DatabaseLego.php': {
							'name': 'DatabaseLego.php',
							'type': 'php'
						},
						'NotificationLego.php': {
							'name': 'NotificationLego.php',
							'type': 'php'
						},
						'PlantLego.php': {
							'name': 'PlantLego.php',
							'type': 'php'
						}
					},

					'javascripts': {
						'type': 'directory',
						'lib': {
							'type': 'directory'
						},
						'plugins': {
							'type': 'directory'
						},
						'app': {
							'type': 'directory',
							'model': {
								'type': 'directory'
							},
							'router': {
								'type': 'directory',
								'AppRouter.js': {
									'name': 'AppRouter.js',
									'type': 'javascript'
								}
							},
							'view': {
								'type': 'directory',
								'SplashView.js': {
									'name': 'SplashView.js',
									'type': 'javascript'
								},
								'DashboardView.js': {
									'name': 'DashboardView.js',
									'type': 'javascript'
								},
								'HeaderView.js': {
									'name': 'HeaderView.js',
									'type': 'javascript'
								},
								'ProfileView.js': {
									'name': 'ProfileView.js',
									'type': 'javascript'
								},
								'DatabaseEntryView.js': {
									'name': 'DatabaseEntryView.js',
									'type': 'javascript'
								},
								'SearchView.js': {
									'name': 'SearchView.js',
									'type': 'javascript'
								}
							},
							'app.global.js': {
								'name': 'app.global.js',
								'type': 'javascript'
							},
							'app.user.js': {
								'name': 'app.user.js',
								'type': 'javascript'
							},
							'app.animation.js': {
								'name': 'app.animation.js',
								'type': 'javascript'
							},
							'app.graph.js': {
								'name': 'app.graph.js',
								'type': 'javascript'
							},
							'app.utilities.js': {
								'name': 'app.utilities.js',
								'type': 'javascript'
							}
						}
					},

					'templates': {
						'type': 'directory',
						'dashboard.php': {
							'name': 'dashboard.php',
							'type': 'html'
						},
						'search_plant.php': {
							'name': 'search_plant.php',
							'type': 'html'
						},
						'profile.php': {
							'name': 'profile.php',
							'type': 'html'
						},
						'db_entry.php': {
							'name': 'plantProfile.php',
							'type': 'html'
						}
					}
				}
			}
		},
		//</twig>

		// cms
		'editor': {
			'_DIR': 'assets/code/aoy',
			'files': {
				'readme.md': {
					'name': 'readme.md',
					'type': 'markdown',
					'default': true
				},
				'app': {
					'type': 'directory',
					'process': {
						'type': 'directory',
						'build.php': {
							'name': 'build.php',
							'type': 'php'
						},
						'flush.php': {
							'name': 'flush.php',
							'type': 'php'
						},
						'clean.php': {
							'name': 'clean.php',
							'type': 'php'
						},
						'prep.php': {
							'name': 'prep.php',
							'type': 'php'
						}
					},
					'scripts': {
						'type': 'directory',
						'src': {
							'type': 'directory',
							'app.ts': {
								'name': 'app.ts',
								'type': 'typescript'
							},
							'main.ts': {
								'name': 'main.ts',
								'type': 'typescript'
							},
							'editor.ts': {
								'name': 'editor.ts',
								'type': 'typescript'
							},
							'saver.ts': {
								'name': 'saver.ts',
								'type': 'typescript'
							}
						}
					},
					'styles': {
						'type': 'directory',
						'sass': {
							'type': 'directory',
							'_editor.scss': {
								'name': '_editor.scss',
								'type': 'css'
							}
						}
					},
					'query.php': {
						'name': 'query.php',
						'type': 'php'
					}
				}
			}
		}
		// </cms>
	};

	private codeEditor:CodeEditor;

	constructor(_el:JQuery){
		super(_el);

		this.bindClick();
	}

	private makeEditorWindow():void {
		var $codeEditorWindow = $($('[widget-template="codeEditor"]').html());
		$codeEditorWindow.attr('widget', 'codeEditor');
		this.$body.append($codeEditorWindow);

		this.codeEditor = new CodeEditor($codeEditorWindow);
	}

	private bindClick():void {
		this.$root.on('click', <any>( (e)=>this.onClickEvent(e) ));
	}

	private onClickEvent(e:MouseEvent):void {
		e && e.preventDefault && e.preventDefault();

		if(typeof this.codeEditor === 'undefined'){
			this.makeEditorWindow();
			this.gatherFileList( $(e.currentTarget).attr('widget-sample') );
			this.bindEditorEvents();
		}

		this.codeEditor.show();
	}

	private bindEditorEvents():void {
		var self:CodeSample = this,
			$project:JQuery = self.$root.closest('.project');

		// this.codeEditor.on('show', function(){
		// 	$project.addClass('is-active');
		// });

		// this.codeEditor.on('hide', function(){
		// 	setTimeout(function(){
		// 		$project.removeClass('is-active');
		// 	}, 100);
		// });
	}

	private gatherFileList(project:string):void {
		this.log('CodeSample : gatherFileList', project, this.CODE_LISTING, this.CODE_LISTING[project]);
		if(this.CODE_LISTING.hasOwnProperty(project)){
			var selectedProject = this.CODE_LISTING[project];

			var compiled = this.recurse(selectedProject.files, selectedProject._DIR);

			this.codeEditor.updateFileListing(compiled, project);
		}
	}

	private recurse(data:any, lastDir:string = ''):string {
		var compiledString = '<ul>';
		for(var prop in data){
			if(data.hasOwnProperty(prop)){
				var tempEntry:any = data[prop];
				if(tempEntry.type === 'directory'){
					compiledString += '<li class="dir"><span>' + prop + '</span><ul>';
					compiledString += this.recurse(tempEntry, lastDir + '/' + prop);
					compiledString += '</ul></li>';
				}else if(prop !== 'type'){
					compiledString += '<li class="file" data-location="' + lastDir + '/' + (tempEntry.name || tempEntry) + '" data-format="' + tempEntry.type + '" data-tab="' + (tempEntry.name || tempEntry) + '">' + (tempEntry.name || tempEntry) + '</li>';
				}
			}
		}
		compiledString += '</ul>';
		return compiledString;
	}
}
