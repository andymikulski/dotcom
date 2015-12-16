var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'core/base', 'widgets/CodeEditor'], function(require, exports, Base, CodeEditor) {
    
    var CodeSample = (function (_super) {
        __extends(CodeSample, _super);
        function CodeSample(_el) {
            _super.call(this, _el);
            this.CODE_LISTING = {
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
            };

            this.bindClick();
        }
        CodeSample.prototype.makeEditorWindow = function () {
            var $codeEditorWindow = $($('[widget-template="codeEditor"]').html());
            $codeEditorWindow.attr('widget', 'codeEditor');
            this.$body.append($codeEditorWindow);

            this.codeEditor = new CodeEditor($codeEditorWindow);
        };

        CodeSample.prototype.bindClick = function () {
            var _this = this;
            this.$root.on('click', (function (e) {
                return _this.onClickEvent(e);
            }));
        };

        CodeSample.prototype.onClickEvent = function (e) {
            e && e.preventDefault && e.preventDefault();

            if (typeof this.codeEditor === 'undefined') {
                this.makeEditorWindow();
                this.gatherFileList($(e.currentTarget).attr('widget-sample'));
                this.bindEditorEvents();
            }

            this.codeEditor.show();
        };

        CodeSample.prototype.bindEditorEvents = function () {
            var self = this, $project = self.$root.closest('.project');
            // this.codeEditor.on('show', function(){
            // 	$project.addClass('is-active');
            // });
            // this.codeEditor.on('hide', function(){
            // 	setTimeout(function(){
            // 		$project.removeClass('is-active');
            // 	}, 100);
            // });
        };

        CodeSample.prototype.gatherFileList = function (project) {
            this.log('CodeSample : gatherFileList', project, this.CODE_LISTING, this.CODE_LISTING[project]);
            if (this.CODE_LISTING.hasOwnProperty(project)) {
                var selectedProject = this.CODE_LISTING[project];

                var compiled = this.recurse(selectedProject.files, selectedProject._DIR);

                this.codeEditor.updateFileListing(compiled, project);
            }
        };

        CodeSample.prototype.recurse = function (data, lastDir) {
            if (typeof lastDir === "undefined") { lastDir = ''; }
            var compiledString = '<ul>';
            for (var prop in data) {
                if (data.hasOwnProperty(prop)) {
                    var tempEntry = data[prop];
                    if (tempEntry.type === 'directory') {
                        compiledString += '<li class="dir"><span>' + prop + '</span><ul>';
                        compiledString += this.recurse(tempEntry, lastDir + '/' + prop);
                        compiledString += '</ul></li>';
                    } else if (prop !== 'type') {
                        compiledString += '<li class="file" data-location="' + lastDir + '/' + (tempEntry.name || tempEntry) + '" data-format="' + tempEntry.type + '" data-tab="' + (tempEntry.name || tempEntry) + '">' + (tempEntry.name || tempEntry) + '</li>';
                    }
                }
            }
            compiledString += '</ul>';
            return compiledString;
        };
        return CodeSample;
    })(Base.Widget);
    return CodeSample;
});
