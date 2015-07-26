<!DOCTYPE html>
<html>
	<head>
		<title>Andy Mikulski | Creative Developer</title>
		<link href='http://fonts.googleapis.com/css?family=Vollkorn:400italic,700italic,400,700' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,900italic,900,700italic,700,500italic|Crimson+Text:400,400italic,600,600italic,700italic,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="assets/styles/css/main.css" async />
	</head>
	<body data-debug="true">

		<div widget="codeSample">
			<div class="titleBar">
				<ul class="buttons">
					<li class="red close"></li>
					<li class="yellow minimize"></li>
					<li class="green maximize"></li>
				</ul>
				<span class="title">untitled</span>
			</div>

			<div class="folders" sub-widget="sidebar">
				<h2>Folders</h2>
				<ul>
					<li class="dir"><span>folder</span>
						<ul>
							<li class="dir"><span>css</span>
								<ul>
									<li class="file" data-tab="app.css">app.css</li>
								</ul>
							</li>
							<li class="dir"><span>js</span>
								<ul>
									<li class="file"  data-tab="site.js">site.js</li>
								</ul>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<ul class="tabs">
				<li class="tab" data-tab="readme.md">readme.md</li>
				<li class="tab" data-tab="app.css">app.css</li>
				<li class="tab" data-tab="site.js">site.js</li>
			</ul>

			<pre data-tab="readme.md" data-format="md"><code contenteditableNOT>
				## Firstborn.com

				Welcome to the Firstborn.com tutorial, written by Andy Mikulski (andy.mikulski@firstborn.com).

				## Steps to Get Going

				1) Install node, npm, etc

				2) cd to directory, then npm install

				3) Install compass
				  - gem update --system
				  - gem install compass

				## Steps to Dev

				1) grunt dev

				2) Edit the src/\*.ts files, NOT the build/*.js files

				3) Typescript will build to JS on save (if grunt dev is watching)


				## Steps to Build

				1) grunt build (or grunt build-js or grunt build-css)
				JS file(s) are saved to scripts/min.


				## How the site is setup

				- RequireJS looks at Main.ts (build/main.js)

				- Main.ts creates a new instance of App.ts
			</code></pre>

			<pre class="is-active" data-tab="app.css" data-format="css"><code contenteditableNOT>
				/* http://meyerweb.com/eric/tools/css/reset/
				   v2.0 | 20110126
				   License: none (public domain)
				*/

				@media screen {

				html, body, div, span, applet, object, iframe,
				h1, h2, h3, h4, h5, h6, p, blockquote, pre,
				a, abbr, acronym, address, big, cite, code,
				del, dfn, em, img, ins, kbd, q, s, samp,
				small, strike, strong, sub, sup, tt, var,
				b, u, i, center,
				dl, dt, dd, ol, ul, li,
				fieldset, form, label, legend,
				table, caption, tbody, tfoot, thead, tr, th, td,
				article, aside, canvas, details, embed,
				figure, figcaption, footer, header, hgroup,
				menu, nav, output, ruby, section, summary,
				time, mark, audio, video {
					margin: 0;
					padding: 0;
					border: 0;
					font-size: 100%;
					font: inherit;
					vertical-align: baseline;
				}
				/* HTML5 display-role reset for older browsers */
				article, aside, details, figcaption, figure,
				footer, header, hgroup, menu, nav, section {
					display: block;
				}
				body {
					line-height: 1;
				}
				ol, ul {
					list-style: none;
				}
				blockquote, q {
					quotes: none;
				}
				blockquote:before, blockquote:after,
				q:before, q:after {
					content: '';
					content: none;
				}
				table {
					border-collapse: collapse;
					border-spacing: 0;
				}

				/*
				Copyright (c) 2010, Yahoo! Inc. All rights reserved.
				Code licensed under the BSD License:
				http://developer.yahoo.com/yui/license.html
				version: 2.8.1
				*/
				body{font:13px/1.231 arial,helvetica,clean,sans-serif;*font-size:small;*font:x-small;}select,input,button,textarea,button{font:99% arial,helvetica,clean,sans-serif;}table{font-size:inherit;font:100%;}pre,code,kbd,samp,tt{font-family:monospace;*font-size:108%;line-height:100%;}
				/*
				font sizes
				px  %
				10	77
				11	85
				12	93
				13	100
				14	108
				15	116
				16	123.1
				17	131
				18	138.5
				19	146.5
				20	153.9
				21	161.6
				22	167
				23	174
				24	182
				25	189
				26	197
				*/

				}

			</code></pre>



			<pre data-tab="site.js" data-format="javascript"><code contenteditableNOT>
			/**
			 * Maestro
			 */
			var Maestro = (function (window, document) {
				var self = {
					'init': function (options) {
						var maestro = self;
						maestro.isDragging = false; // Detects if user is dragging a slide or not (moz fix)
						window.inertiaInterval = null; // Timer used to detect a slide throw
						maestro.autoScrolling = false; // Bool to tell if the page scroll is being animated
						// Setup functions
						maestro.buildWorkData();
						maestro.bindSplash();
						// maestro.bindStickyBar();
						maestro.bindScroll();
						maestro.buildWorks();
						maestro.bindComps();
						maestro.bindFooter();
						// Detect if the user is somewhere else already
						if (location.hash != '#portfolio' && location.hash != '') {
							var navTo = maestro.data.filter(function (piece) {
								return piece.shortCode == location.hash
							});
							if (navTo.length > 0) {
								// This is cheating!
								$('.work[data-id=' + navTo[0].id + ']').find('.seeMore .button').click();
							}
						}
					},
					/*
					 * buildWorkData
					 * Creates the maestro.data variable, later used in templating the works out
					 */
					'buildWorkData': function () {
						var maestro = self;
						/*
							Get server response here,
							returns an array of objects that are used to build each work on the page.

							maestro.data = serverResponse;
						*/
					},
			</code></pre>

			<div class="clear"></div>
			<div class="footer">
				<span class="lineCol"><!-- Line 123, Column 56 --></span>
				<span class="fileType"><!-- JavaScript --></span>
			</div>

		</div>



		<div class="filler top">
			<div class="splash" widget="splashTitle">
				<div class="row">
					<div class="col-2">
						<h1>Andy Mikulski</h1>
						<h2>Creative Developer</h2>
						<p>I&#8217;m a creative developer who uses cutting-edge technology with inventive problem-solving to deliver unique and immersive experiences.</p>
					</div>
					<div class="col-1"></div>
				</div>
			</div>
		</div>
		<ul class="nav-menu" widget="stickyThing">
			<li class="nav-menu__item is-label">Menu</li>
			<li class="nav-menu__item">Top</li>
			<li class="nav-menu__item has-sub">Work
				<ul class="nav-menu__sub-menu">
					<li class="nav-menu__sub-item">Firstborn.com</li>
					<li class="nav-menu__sub-item">Twig</li>
					<li class="nav-menu__sub-item">InDaLab</li>
					<li class="nav-menu__sub-item">Hivemind</li>
					<li class="nav-menu__sub-item">Low-Hanging Fruit</li>
					<li class="nav-menu__sub-item">RIT Post Secret</li>
				</ul>
			</li>
			<li class="nav-menu__item">About Me</li>
			<li class="nav-menu__item">Contact</li>
		</ul>
		<ul class="content-list" widget="contentList">
			<li class="content-list__button" widget="stickyThing">Collapse</li>
			<li class="content-list__item" widget="contentItem">
				<div class="row">
					<div class="col-2">
						<h3 class="content-list__item-title">Firstborn.com</h3>
						<p class="content-list__item-description">Refreshed the old, shitty advertising website to remind everyone that they're still not cool</p>
						<ul class="content-list__info">
							<li class="content-list__info-item"><a href="#">View Website</a></li>
							<li class="content-list__info-item"><a href="#">Code Sample</a></li>
							<li class="content-list__info-item"><a href="#">Read More</a></li>
						</ul>
					</div>
					<div class="col-1">
						<div class="content-list__item-content">
							<img src="assets/images/firstborn.png" />
						</div>
					</div>
				</div>
				<!--  -->



				<!--  -->
			</li>
			<li class="content-list__item" widget="contentItem">
				<div class="row">
					<div class="col-2">
						<h3 class="content-list__item-title">Twig.com</h3>
						<p class="content-list__item-description">Refreshed the old, shitty advertising website to remind everyone that they're still not cool</p>
						<ul class="content-list__info">
							<li class="content-list__info-item"><a href="#">View Website</a></li>
							<li class="content-list__info-item"><a href="#">Code Sample</a></li>
							<li class="content-list__info-item"><a href="#">Read More</a></li>
						</ul>
					</div>
					<div class="col-1">
						<div class="content-list__item-content">
							<img src="assets/images/tweg.png" />
						</div>
					</div>
				</div>
			</li>
			<li class="content-list__item" widget="contentItem">
				<div class="row">
					<div class="col-2">
						<h3 class="content-list__item-title">Twig.com</h3>
						<p class="content-list__item-description">Refreshed the old, shitty advertising website to remind everyone that they're still not cool</p>
						<ul class="content-list__info">
							<li class="content-list__info-item"><a href="#">View Website</a></li>
							<li class="content-list__info-item"><a href="#">Code Sample</a></li>
							<li class="content-list__info-item"><a href="#">Read More</a></li>
						</ul>
					</div>
					<div class="col-1">
						<div class="content-list__item-content">
							<img src="assets/images/tweg.png" />
						</div>
					</div>
				</div>
			</li>
			<li class="content-list__item" widget="contentItem">
				<div class="row">
					<div class="col-2">
						<h3 class="content-list__item-title">Twig.com</h3>
						<p class="content-list__item-description">Refreshed the old, shitty advertising website to remind everyone that they're still not cool</p>
						<ul class="content-list__info">
							<li class="content-list__info-item"><a href="#">View Website</a></li>
							<li class="content-list__info-item"><a href="#">Code Sample</a></li>
							<li class="content-list__info-item"><a href="#">Read More</a></li>
						</ul>
					</div>
					<div class="col-1">
						<div class="content-list__item-content">
							<img src="assets/images/tweg.png" />
						</div>
					</div>
				</div>
			</li>
			<li class="content-list__item" widget="contentItem">
				<div class="row">
					<div class="col-2">
						<h3 class="content-list__item-title">Twig.com</h3>
						<p class="content-list__item-description">Refreshed the old, shitty advertising website to remind everyone that they're still not cool</p>
						<ul class="content-list__info">
							<li class="content-list__info-item"><a href="#">View Website</a></li>
							<li class="content-list__info-item"><a href="#">Code Sample</a></li>
							<li class="content-list__info-item"><a href="#">Read More</a></li>
						</ul>
					</div>
					<div class="col-1">
						<div class="content-list__item-content">
							<img src="assets/images/tweg.png" />
						</div>
					</div>
				</div>
			</li>
			<li class="content-list__item" widget="contentItem">
				<div class="row">
					<div class="col-2">
						<h3 class="content-list__item-title">Twig.com</h3>
						<p class="content-list__item-description">Refreshed the old, shitty advertising website to remind everyone that they're still not cool</p>
						<ul class="content-list__info">
							<li class="content-list__info-item"><a href="#">View Website</a></li>
							<li class="content-list__info-item"><a href="#">Code Sample</a></li>
							<li class="content-list__info-item"><a href="#">Read More</a></li>
						</ul>
					</div>
					<div class="col-1">
						<div class="content-list__item-content">
							<img src="assets/images/tweg.png" />
						</div>
					</div>
				</div>
			</li>

			<li class="content-list__item" widget="contentItem">
				<div class="row">
					<div class="col-2">
						<h3 class="content-list__item-title">Twig.com</h3>
						<p class="content-list__item-description">Refreshed the old, shitty advertising website to remind everyone that they're still not cool</p>
						<ul class="content-list__info">
							<li class="content-list__info-item"><a href="#">View Website</a></li>
							<li class="content-list__info-item"><a href="#">Code Sample</a></li>
							<li class="content-list__info-item"><a href="#">Read More</a></li>
						</ul>
					</div>
					<div class="col-1">
						<div class="content-list__item-content">
							<img src="assets/images/tweg.png" />
						</div>
					</div>
				</div>
			</li>
		</ul>

		<div class="filler bottom">
			<div class="footer">
			</div>
		</div>

		<script src="assets/scripts/src/lib/jquery.js" defer></script>
		<!-- <link rel="stylesheet" href="styles/default.css"> -->
		<script src="assets/scripts/src/lib/highlight.pack.js"></script>
		<!-- // <script></script> -->


	    <script data-main="assets/scripts/build/main" src="assets/scripts/src/lib/require.js" defer></script>


	</body>
</html>