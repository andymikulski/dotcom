<!DOCTYPE html>
<html>
<?php
	$cachebust = include('cachebust.php');
	$dev = ($_SERVER['HTTP_HOST'] == 'localhost' ? true : false);
?>
	<head>
		<title>Andy Mikulski | Creative Developer</title>
		<link href='http://fonts.googleapis.com/css?family=Oswald:300|Open+Sans:300italic,300|Montserrat|Sorts+Mill+Goudy:400,400italic' rel='stylesheet' type='text/css' />

		<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
		<link rel="icon" href="favicon.ico" type="image/x-icon">

		<link rel="stylesheet" type="text/css" href="assets/styles/css/main.css?v=<?php echo $cachebust; ?>" async />
		<meta name="viewport" content="width=device-width" />


		<meta property="og:title" content="andymikulski.com"/>
		<meta property="og:type" content="website"/>
		<meta property="og:url" content="http://www.andymikulski.com/"/>
		<meta property="og:site_name" content="andymikulski.com"/>
		<meta property="og:description" content="A creative web developer who loves to combine fresh technology with intuitive design to deliver effective and engaging experiences."/>

		<meta name="description" content="A creative web developer who loves to combine fresh technology with intuitive design to deliver effective and engaging experiences.">
		<meta name="keyword" content="">
		<meta name="title" content="andymikulski.com">

		<script>
			document.documentElement.className = document.documentElement.className.replace(/no-js/,'js');

			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		</script>

	</head>
	<body <?php if($dev === true){ echo('data-debug="true"'); }else{ echo('data-prod="1"'); } ?> class="loading">
		<div id="loading">Loading...</div>

		<div id="wrapper">
			<div class="full-screen">
				<div class="row">
					<div class="col span_3">
						<div class="logotype" widget="splashTitle">
							<div class="svgLogo">
								<?php include('assets/images/logo-svg.svg'); ?>
							</div>
						</div>
					</div>
					<div class="col span_1"></div>
					<div class="col span_4">
						<div class="header-description" widget="splashTitle" wadget-text-speed="0">
							<span>A creative web developer who loves to combine fresh technology with intuitive&nbsp;design to deliver effective and engaging&nbsp;experiences.</span>
							<ul class="header-links">
								<li class="header-links__item"><span class="header-links__label"><a href="#work" data-analytics="header|link|Work|true">Work</a></span>
								</li>
								<li class="header-links__item"><span class="header-links__label"><a href="assets/AndyMikulski_Resume.pdf" target="_blank" data-analytics="header|link|Resume|true">Resume</a></span></li>
								<li class="header-links__item"><span class="header-links__label"><a href="#contact" data-analytics="header|link|Contact|true">Contact</a></span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="work-container">



				<div class="project is-first" widget="contentItem" widget-target="fb" id="work">
					<div class="contain">
						<div class="row">
							<div class="col span_4 left-side">
								<h3 class="project-title"><span>Firstborn.com</span></h3>
								<h4 class="project-short">Advertising Agency Website Reboot <span class="project-role">Lead Front-End Developer</span></h4>
								<p class="project-description">Revamped the digital agency's flash experience with a completely responsive HTML5 website.</p>

								<ul class="project-info tldr">
									<li class="project-info__item is-label is-header">TLDR</li>
									<li class="project-info__item is-text"><p>Responsive website designed to communicate company's overall culture and showcase&nbsp;work.<br /><br />I made the front&nbsp;end.</p></li>
									<li class="clearfix"></li>
								</ul>

								<ul class="project-tech">
									<li class="project-tech__item is-label">Tech</li>
									<li class="project-tech__item">TypeScript</li>
									<li class="project-tech__item">Laravel</li>
									<li class="project-tech__item">Sass</li>
									<li class="project-tech__item">RequireJS</li>
									<li class="clearfix"></li>
								</ul>
								<div class="more-info">
									<ul class="project-info">
										<li class="project-info__item is-label">Team</li>
										<li class="project-info__item">Two Developers</li>
										<li class="project-info__item">One Producer</li>
										<li class="project-info__item">Tons of Designers</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label">Timeline</li>
										<li class="project-info__item">December 2013 &ndash; April 2014</li>
										<li class="project-info__item">5ish Months</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info is-grouped">
										<li class="project-info__item is-label is-header">Responsibilites</li>
										<li class="project-info__item is-text">Front-end Development <br />(Desktop, Mobile)</li>
										<li class="project-info__item is-text">Quality Assurance <br />(IE8+, Mobile Browsers)</li>
										<li class="project-info__item is-text">Analytics Implementation <br />(Omniture SiteCatalyst, Google Analytics)</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">About the Project</li>
										<li class="project-info__item is-text">
											<p>After having the same flash-based website for about seven years, digital ad agency <a href="http://www.firstborn.com/" target="_blank">Firstborn</a> decided it was time to move on and enlisted their best developers to execute the designs.</p>
											<p>With myself on front end and <a href="https://www.linkedin.com/profile/view?id=224257185" target="_blank">Ziad Hilal</a> commanding the back end, we developed the site in about five months. This time included execution of designs, execution of re-designs, content creation, and QA.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info">
										<li class="project-info__item is-label is-header">About the Tech</li>
										<li class="project-info__item is-text">
											<p>Understanding the potential longevity of the site, I knew that creating a clean, maintainable codebase was integral. With that in mind, I chose to use <a href="http://www.typescriptlang.org/" target="_blank">TypeScript</a> on the front end. TypeScript affords features such as structure, strict-ish typing, and error checking. These aid in maintaining code quality, even if code is modified by multiple developers.</p>
											<p>Beyond its safe coding features, TS allowed easy creation and extension of multiple classes, breaking down functionality into sensible modules. By compartmentalizing several commonly used functions/features and refining them through iteration, ultimately a small framework covering everything from debug logging to DOM animation was created.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info is-grouped">
										<li class="project-info__item is-label is-header">Items of Note</li>
										<li class="project-info__item is-text is-copy"><p>AJAX is used to load/display pages across the site, with an elegant fallback to normal link behavior if history.pushState is not supported (IE9-).</p></li>
										<li class="project-info__item is-text is-copy"><p>Window events such as resize and scroll are bound to the window only once, and handled through a central module (the WindowController). The WindowController accepts bindings to these events, and then fires them when necessary later on (using requestAnimationFrame as the loop).</p></li>
										<li class="project-info__item is-text is-copy"><p>The Project Archive page uses a search/filter system based entirely in memory on the front end. Data is passed in from the back end, and search/filters are operated upon that data. The DOM is only affected once the list of result ID's is ready. This relieves pressure on the backend and allows faster search results on the front end.</p></li>
										<li class="project-info__item is-text is-copy"><p>Animation in the site is driven through "Walt," a small set of tools animate elements using CSS3 animations. Combined with <a href="http://daneden.github.io/animate.css/" target="_blank">Animate.css</a>, adding/modifying animations in the site becomes a breeze. This is a tool originally developed for an older project which has been refined quite a bit, and I continue to use it in most (if not all) of my projects.</p></li>
										<li class="clearfix"></li>
									</ul>
								</div>
							</div>
							<div class="col span_4">
								<div class="device-mockup project-preview" data-device="ipad" data-orientation="portrait" data-color="white">
								    <div class="device" widget-root="this" widget="splashTitle" widget-speed="-150">
								        <div class="screen" style="background-image:url('assets/work/fbdotcom/fb-cover.png')">
								        </div>
								        <div class="button">
								        </div>
								    </div>
								</div>

								<div class="project-screens" widget="projectScreens">
									<ul class="screens-wrapper">
										<li class="project-screens__item">
											<img src="assets/work/fbdotcom/thumbs/fb1.png" class="project-screen__image" />
											<span class="project-screen__desc">Homepage &ndash; features full-screen carousel</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/fbdotcom/thumbs/fb2.png" class="project-screen__image" />
											<span class="project-screen__desc">Awards &ndash; Prominent awards can be 'featured', along with search/filter&nbsp;functionality.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/fbdotcom/thumbs/fb3.png" class="project-screen__image" />
											<span class="project-screen__desc">What We Do &ndash; All content is editable via a customized CMS.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/fbdotcom/thumbs/fb4.png" class="project-screen__image" />
											<span class="project-screen__desc">Careers &ndash; CMS-controlled listing of open positions.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/fbdotcom/thumbs/fb6.png" class="project-screen__image" />
											<span class="project-screen__desc">Work &ndash; Example of a project page. Carousel images and animation behavior can be directed entirely through CMS&nbsp;controls.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/fbdotcom/thumbs/fb7.jpg" class="project-screen__image" />
											<span class="project-screen__desc">404 &ndash; The black hole spins!</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/fbdotcom/mobile/thumbs/fb1.png" class="project-screen__image" />
											<span class="project-screen__desc">Mobile Homepage</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/fbdotcom/mobile/thumbs/fb2.png" class="project-screen__image" />
											<span class="project-screen__desc">Mobile Awards</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/fbdotcom/mobile/thumbs/fb3.png" class="project-screen__image" />
											<span class="project-screen__desc">Mobile What We Do</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/fbdotcom/mobile/thumbs/fb4.png" class="project-screen__image" />
											<span class="project-screen__desc">Mobile Careers</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/fbdotcom/mobile/thumbs/fb6.png" class="project-screen__image" />
											<span class="project-screen__desc">Mobile Work</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="clearfix"></div>

						<div class="row">
							<ul class="project-links">
								<li class="project-links__item col span_1"><a href="http://www.firstborn.com/" target="_blank" data-analytics="code|site|Firstborn|true">Visit Site</a></li>
								<!-- <li class="project-links__item col span_1"><a href="#" widget="codeSample" widget-sample="firstborn" data-analytics="code|sample|Firstborn|true">Code Sample</a></li> -->
								<li class="project-links__item col span_1"><a href="#" widget="moreInfo" data-analytics="code|info|Firstborn|true">More Info</a></li>
							</ul>
						</div>
					</div>
				</div>


				<div class="project" widget="contentItem" widget-target="twig">
					<div class="contain">
						<div class="row">
							<div class="col span_4 left-side">
								<h3 class="project-title"><span>Twig</span></h3>
								<h4 class="project-short">Mobile Web Garden Monitor <span class="project-role">Lead Developer</span></h4>
								<p class="project-description">An Arduino-based plant-monitoring system that educates users how to grow their plants using data from their plants.</p>

								<ul class="project-info tldr">
									<li class="project-info__item is-label is-header">TLDR</li>
									<li class="project-info__item is-text"><p>Little gadget hooks up to a mobile site to display stats and recommendations in real time. I did a lot of the development.</p></li>
									<li class="clearfix"></li>
								</ul>

								<ul class="project-tech">
									<li class="project-tech__item is-label">Tech</li>
									<li class="project-tech__item">Arduino</li>
									<li class="project-tech__item">PHP</li>
									<li class="project-tech__item">SQL</li>
									<li class="project-tech__item">Backbone</li>
									<li class="project-tech__item">Sass</li>
									<li class="clearfix"></li>
								</ul>


								<div class="more-info">
									<ul class="project-info">
										<li class="project-info__item is-label">Team</li>
										<li class="project-info__item">Three Developers</li>
										<li class="project-info__item">Four Designers</li>
										<li class="project-info__item">One Industrial Designer</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label">Timeline</li>
										<li class="project-info__item">September 2012 &ndash; May 2013</li>
										<li class="project-info__item">9 Months (Two RIT Quarters)</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info is-grouped">
										<li class="project-info__item is-label is-header">Responsibilites</li>
										<li class="project-info__item is-text">Lead Development</li>
										<li class="project-info__item is-text">Organized code and maintained standards</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">About the Project</li>
										<li class="project-info__item is-text">
											<p>Twig is a system for learning how to keep your plants growing.</p>
											<p>Using the Arduino-based device to monitor the environment around the plant, Twig can determine whether or not the plant is getting the light, water, and warmth that it needs. If the plant requires action, the user is notified.</p>
											<p>Twig was created with a team of eight other designers and developers for our RIT Senior Team Project. We created the physical Arduino device, the HTML5 mobile web app, and the promotional website over the course of 15 weeks.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info">
										<li class="project-info__item is-label is-header">Backbone</li>
										<li class="project-info__item is-text">
											<p>Using Backbone as the framework helped with establishing necessary functionality (routing, event delegation, etc) as well as providing a MVVM structure.</p>
											<p>However, the framework was unfamiliar to most of the dev team, which ended up costing time and ultimately sacrificed code quality.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info">
										<li class="project-info__item is-label is-header">Mobile Web App</li>
										<li class="project-info__item is-text">
											<p>Opting to create a mobile web app using HTML5 versus building a native app was a matter of familiar territory; our dev team was most comfortable working in the web environment.</p>
											<p>Also, the option of responsive design allowed the opportunity to develop a desktop counterpart to the app.</p>
										</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">Arduino</li>
										<li class="project-info__item is-text">
											<p>Working with the physical aspect of the project was fairly easy; using a Wifi shield and some sensors, the Twig data was being reported to our servers in no time.</p>
											<p>The incredible ease of use of the Arduino soft/hardware will allow for extension of the Twig system (if we were to add more sensors,&nbsp;etc).</p>
										</li>
										<li class="clearfix"></li>
									</ul>
								</div>
							</div>
							<div class="col span_4">
								<div class="device-mockup project-preview" data-device="iphone5" data-orientation="portrait" data-color="white">
								    <div class="device" widget-root="this" widget="splashTitle" widget-speed="-150">
								        <div class="screen" style="background-image: url('assets/work/twig/cover.png');">
								        </div>
								        <div class="button">
								        </div>
								    </div>
								</div>


								<div class="project-screens" widget="projectScreens">
									<ul class="screens-wrapper">
										<li class="project-screens__item has-transparency">
											<img src="assets/work/twig/twig1.png" class="project-screen__image" />
											<span class="project-screen__desc">Twig allows users to track multiple plants. The at-a-glance notification system makes checking your garden easy.</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/twig/twig3.png" class="project-screen__image" />
											<span class="project-screen__desc">Sensor readings are easy to read, and a Canvas-based history graph lets users see how their plants have felt over time.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/twig/brief1.png" class="project-screen__image" />
											<span class="project-screen__desc">Page from project brief outlining general flow of information.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/twig/twig5.png" class="project-screen__image" />
											<span class="project-screen__desc">Promotional/Desktop Site</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/twig/twig6.png" class="project-screen__image" />
											<span class="project-screen__desc">Our Industrial Designer created a physical prototype for use in marketing materials.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/twig/twig7.png" class="project-screen__image" />
											<span class="project-screen__desc">Twig featured a complete user/profile system.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/twig/twig8.png" class="project-screen__image" />
											<span class="project-screen__desc">Add A Plant screen shown here.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/twig/twig9.png" class="project-screen__image" />
											<span class="project-screen__desc">Dashboard screen shown here.</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="clearfix"></div>

						<div class="row">
							<ul class="project-links">
								<li class="project-links__item col span_1"><a href="http://twig.cias.rit.edu/" target="_blank" data-analytics="code|site|Twig|true">Visit Site</a></li>
								<li class="project-links__item col span_1"><a href="#" widget="moreInfo" data-analytics="code|info|Twig|true">More Info</a></li>
							</ul>
						</div>
					</div>
				</div>




				<div class="project" widget="contentItem" widget-target="cms">
					<div class="contain">
						<div class="row">
							<div class="col span_4 left-side">
								<h3 class="project-title"><span>Inline Editor</span></h3>
								<h4 class="project-short">Rapid-revision Copy Editing Tool <span class="project-role">Designer + Developer</span></h4>
								<p class="project-description">An easy-to-use tool allowing on-the-fly copy editing and formatting within actual web pages.</p>

								<ul class="project-info tldr">
									<li class="project-info__item is-label is-header">TLDR</li>
									<li class="project-info__item is-text"><p>WYSIWYG copy editor. I created it as an extra tool for another project.</p></li>
									<li class="clearfix"></li>
								</ul>

								<ul class="project-tech">
									<li class="project-tech__item is-label">Tech</li>
									<li class="project-tech__item">TypeScript</li>
									<li class="project-tech__item">PHP</li>
									<li class="project-tech__item">Sass</li>
									<li class="project-tech__item">RequireJS</li>
									<li class="clearfix"></li>
								</ul>


								<div class="more-info">
									<ul class="project-info">
										<li class="project-info__item is-label">Timeline</li>
										<li class="project-info__item">2 &ndash; 3 weeks</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">About the Project</li>
										<li class="project-info__item is-text">
											<p>Tasked to create a simple internal website that would have a ton of copy changes, I decided to create a tool to help facilitate that. My solution was an inline editor that allowed users to double-click copy and edit it on the spot.</p>
											<p>Using a simple PHP backend with a "flatfile database", changes were saved to disk as they're entered. Before deploying the finalized website, all changes made by users are compiled into static files.</p>
										</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">TypeScript</li>
										<li class="project-info__item is-text">
											<p>This was the first project I used TypeScript on. It was neat.</p>
											<p>It runs off of contenteditable attributes and stuff.</p>
										</li>
										<li class="clearfix"></li>
									</ul>
								</div>
							</div>
							<div class="col span_4">
								<div class="device-mockup project-preview" data-device="macbook" data-orientation="portrait" data-color="white">
								    <div class="device" widget-root="this" widget="splashTitle" widget-speed="-150">
								        <div class="screen" style="background-image: url('assets/work/editor/cover.png');">
								        </div>
								        <div class="button">
								        </div>
								    </div>
								</div>


								<div class="project-screens" widget="projectScreens">
									<ul class="screens-wrapper">
										<li class="project-screens__item has-transparency">
											<img src="assets/work/editor/edit1.png" class="project-screen__image" />
											<span class="project-screen__desc">Editable fields can be shown/hidden via the toolbar. Here, grey lines indicate fields with original values, where red lines indicate values which have been modified.</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/editor/edit2.png" class="project-screen__image" />
											<span class="project-screen__desc">Text formatting and styling (underline, bold, color) can be applied on-the-fly as copy is edited.</span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/editor/edit3.png" class="project-screen__image" />
											<span class="project-screen__desc">Modifications can easily be reverted via the toolbar. Toolbar also includes features for overlaying comps to more precisely match designs in development.</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="clearfix"></div>

						<div class="row">
							<ul class="project-links">
								<li class="project-links__item col span_1"><a href="#" widget="moreInfo" data-analytics="code|sample|Editor|true">More Info</a></li>
							</ul>
						</div>
					</div>
				</div>



				<div class="project" widget="contentItem" widget-target="idl">
					<div class="contain">
						<div class="row">
							<div class="col span_4 left-side">
								<h3 class="project-title"><span>InDaLab</span></h3>
								<h4 class="project-short">Real-time Visual Seating Chart <span class="project-role">Designer + Developer</span></h4>
								<p class="project-description">A single-page web app for the RIT New Media Lab to let students hang out, even when they're not on campus.</p>

								<ul class="project-info tldr">
									<li class="project-info__item is-label is-header">TLDR</li>
									<li class="project-info__item is-text"><p>A single-page site for students to connect and see who's in the lab. I created it for fun in about six hours.</p></li>
									<li class="clearfix"></li>
								</ul>

								<ul class="project-tech">
									<li class="project-tech__item is-label">Tech</li>
									<li class="project-tech__item">JavaScript</li>
									<li class="project-tech__item">PHP</li>
									<li class="project-tech__item">tlk.io</li>
									<li class="clearfix"></li>
								</ul>

								<div class="more-info">
									<ul class="project-info">
										<li class="project-info__item is-label">Timeline</li>
										<li class="project-info__item">6 Hours</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label">Responsibilites</li>
										<li class="project-info__item">Design &amp; Development</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">About the Project</li>
										<li class="project-info__item is-text">
											<p>Just a simple website idea I had floating around for a while. Students outside the lab had no way to find out who was in the lab, thus InDaLab was made to remedy the issue. Students can sign in to computers in the lab, chat, and set custom status messages for themselves. A mobile counterpart also allows for students to check in while on the go.</p>
											<p>The project was more of an exercise in rapid development for myself; the website was finished within a total of about six hours.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info">
										<li class="project-info__item is-label is-header">Database</li>
										<li class="project-info__item is-text">
											<p>In order to avoid the hassle of setting up a SQL database and sorting all the queries and what not, I decided to go with a flat file database instead. This direction was mostly chosen with the intent to create an easily-deployable build.</p>
											<p>This approach was well-suited for the functions needed for IDL; the back-end simply serves the file to be parsed on the front-end. Simple session variables are stored in the files, mainting a low-bandwidth requirement.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info">
										<li class="project-info__item is-label is-header">tlk.io</li>
										<li class="project-info__item is-text">
											<p>In order to keep the development time low, I decided to use an external resource to handle the chat section. <a href="http://tlk.io/" target="_blank">Tlk.io</a> provides registration-less chatting, as well as a 'sign-in with Twitter' function.</p>
											<p>While getting the chat implemented was a breeze, the downside came with the lack of admin privileges; without the ability to censor inappropriate text, the chat can be sort of a loose cannon. For the target audience, this solution worked fine, but for an environment that needs to be more tightly controlled, not so much.</p>
										</li>
										<li class="clearfix"></li>
									</ul>
								</div>
							</div>
							<div class="col span_4">
								<div class="device-mockup project-preview" data-device="imac" data-orientation="portrait" data-color="white">
								    <div class="device" widget-root="this" widget="splashTitle" widget-speed="-150">
								        <div class="screen" style="background-image: url('assets/work/idl/idl1.png');">
								        </div>
								        <div class="button">
								        </div>
								    </div>
								</div>


								<div class="project-screens" widget="projectScreens">
									<ul class="screens-wrapper">
										<li class="project-screens__item has-transparency">
											<img src="assets/work/idl/idl1.png" class="project-screen__image" />
											<span class="project-screen__desc"></span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="clearfix"></div>

						<div class="row">
							<ul class="project-links">
								<li class="project-links__item col span_1"><a href="#" widget="moreInfo" data-analytics="code|sample|Info|true">More Info</a></li>
							</ul>
						</div>
					</div>
				</div>

				<div class="project" widget="contentItem" widget-target="hivemind">
					<div class="contain">
						<div class="row">
							<div class="col span_4 left-side">
								<h3 class="project-title"><span>HiveMind</span></h3>
								<h4 class="project-short">Multiplayer Real-Time Mind Mapping <span class="project-role">Designer + Developer</span></h4>
								<p class="project-description">A collaborative mind-mapping tool for the browser. Users create, share, and edit word webs in real-time with others.</p>

								<ul class="project-info tldr">
									<li class="project-info__item is-label is-header">TLDR</li>
									<li class="project-info__item is-text"><p>Create word-association maps in real-time with others using your browser. This was a project I did for fun while in college.</p></li>
									<li class="clearfix"></li>
								</ul>

								<ul class="project-tech">
									<li class="project-tech__item is-label">Tech</li>
									<li class="project-tech__item">JavaScript</li>
									<li class="project-tech__item">PHP</li>
									<li class="project-tech__item">SQL</li>
									<li class="project-tech__item">SVG</li>
									<li class="clearfix"></li>
								</ul>

								<div class="more-info">
									<ul class="project-info">
										<li class="project-info__item is-label">Timeline</li>
										<li class="project-info__item">Four Weeks</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label">Responsibilites</li>
										<li class="project-info__item">Design &amp; Development</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">About the Project</li>
										<li class="project-info__item is-text">
											<p>Small personal project I worked on in my own time. My fellow students and I had no way to brainstorm online, and after finding that there was no free software that could offer this, I decided to go ahead and just make my own.</p>
											<p>The chart graphics are powered through VivagraphJS, an open-source graphic libray, and the rest is controlled through JS (with PHP in the back end). This project was interesting for me because not only did I have to hack through the Vivagraph lib, but creating the cross-browser sync was a new feat for me, as well.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info">
										<li class="project-info__item is-label is-header">SVG</li>
										<li class="project-info__item is-text">
											<p>Using VivagraphJS essentially cornered the project into using SVG, as the entire system runs off of SVG elements. While this boosted performance, manipulating elements became much more difficult (finding siblings and attaching events, in particular). This was more a matter of lack of familiarity on my part than an issue with the lib/SVG.</p>
										</li>
										<li class="clearfix"></li>
									</ul>
								</div>
							</div>
							<div class="col span_4">
								<div class="device-mockup project-preview" data-device="macbook" data-orientation="portrait" data-color="white">
								    <div class="device" widget-root="this" widget="splashTitle" widget-speed="-150">
								        <div class="screen" style="background-image: url('assets/work/hivemind/hivemind1.jpg');">
								        </div>
								        <div class="button">
								        </div>
								    </div>
								</div>


								<div class="project-screens" widget="projectScreens">
									<ul class="screens-wrapper">
										<li class="project-screens__item">
											<img src="assets/work/hivemind/hivemind3.png" class="project-screen__image" />
											<span class="project-screen__desc">Splash Screen &ndash; Features an animated web containing all word connections in the database.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/hivemind/hivemind1.jpg" class="project-screen__image" />
											<span class="project-screen__desc">Maps are updated in real-time across each browser&nbsp;instance.</span>
										</li>
										<li class="project-screens__item">
											<img src="assets/work/hivemind/hivemind2.jpg" class="project-screen__image" />
											<span class="project-screen__desc">The use of SVG allows Hivemind to work on mobile platforms such as iOS&nbsp;6+.</span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="clearfix"></div>

						<div class="row">
							<ul class="project-links">
								<li class="project-links__item col span_1"><a href="#" widget="moreInfo" data-analytics="code|info|HiveMind|true">More Info</a></li>
							</ul>
						</div>
					</div>
				</div>

				<div class="project" widget="contentItem" widget-target="postsecret">
					<div class="contain">
						<div class="row">
							<div class="col span_4 left-side">
								<h3 class="project-title"><span>RIT Post Secret</span></h3>
								<h4 class="project-short">Submission-driven Event Site <span class="project-role">Designer + Developer</span></h4>
								<p class="project-description">Anonymously submitted text/images confess personal secrets, which are showcased for all visitors to see.</p>

								<ul class="project-info tldr">
									<li class="project-info__item is-label is-header">TLDR</li>
									<li class="project-info__item is-text"><p>A single-page site detailing event info, along with a user-driven 'post your own secret' section.</p></li>
									<li class="clearfix"></li>
								</ul>

								<ul class="project-tech">
									<li class="project-tech__item is-label">Tech</li>
									<li class="project-tech__item">JavaScript</li>
									<li class="project-tech__item">PHP</li>
									<li class="project-tech__item">SQL</li>
									<li class="clearfix"></li>
								</ul>

								<div class="more-info">
									<ul class="project-info">
										<li class="project-info__item is-label">Timeline</li>
										<li class="project-info__item">Two Weeks</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label">Responsibilites</li>
										<li class="project-info__item">Design &amp; Development</li>
										<li class="clearfix"></li>
									</ul>

									<ul class="project-info">
										<li class="project-info__item is-label is-header">About the Project</li>
										<li class="project-info__item is-text">
											<p>PostSecret is a community mail art project in which people mail their secrets anonymously on a homemade postcard, which are later printed in PostSecret books or posted on the <a href="http://postsecret.com/" target="_blank">PostSecret website</a>. Frank Warren, the creator of PostSecret, held a discussion event at RIT in the Fall of 2011.</p>
											<p>The website was created as a promotional tool to advertise the event. By recreating the Post Secret experience, we hoped to utilize word-of-mouth publicity in order to increase ticket pre-orders.</p>
										</li>
										<li class="clearfix"></li>
									</ul>


									<ul class="project-info">
										<li class="project-info__item is-label is-header">Post-Mortem</li>
										<li class="project-info__item is-text">
											<p>Dealing with anonymous nature of the site was a new adventure. After receiving a few unsettling secrets, the site had to be altered to (subtly) ask for credentials in the event someone needed to be identified.</p>
											<p>Asking for identification upset some users, though overall the site did not see a decline in submissions/views. Overall, the secret submission experience was a hit, despite some bumps in the road.</p>
										</li>
										<li class="clearfix"></li>
									</ul>
								</div>
							</div>
							<div class="col span_4">
								<div class="device-mockup project-preview" data-device="imac" data-orientation="portrait" data-color="white">
								    <div class="device" widget-root="this" widget="splashTitle" widget-speed="-150">
								        <div class="screen" style="background-image: url('assets/work/postsecret/postsecret1.jpg');">
								        </div>
								        <div class="button">
								        </div>
								    </div>
								</div>


								<div class="project-screens" widget="projectScreens">
									<ul class="screens-wrapper">
										<li class="project-screens__item has-transparency">
											<img src="assets/work/postsecret/postsecret1.jpg" class="project-screen__image" />
											<span class="project-screen__desc"></span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/postsecret/postsecret2.jpg" class="project-screen__image" />
											<span class="project-screen__desc"></span>
										</li>
										<li class="project-screens__item has-transparency">
											<img src="assets/work/postsecret/postsecret3.jpg" class="project-screen__image" />
											<span class="project-screen__desc"></span>
										</li>
									</ul>
								</div>
							</div>
						</div>

						<div class="clearfix"></div>

						<div class="row">
							<ul class="project-links">
								<li class="project-links__item col span_1"><a href="#" widget="moreInfo" data-analytics="code|info|Post Secret|true">More Info</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>


			<div class="footer footer-section" widget-target="about-me">
				<div class="full-screen">
					<div class="row">
						<div class="col span_8">
							<h2 class="footer-header">
								About Me<!--, Bender.-->
							</h2>
						</div>

						<div class="col span_2">
							<h3 class="footer-subheader" id="contact">Contact</h3>
							<ul>
								<li class="footer-list__item"><a href="mailto:andy.mikulski@gmail.com" data-analytics="link|footer|Email|true">E-Mail</a></li>
								<li class="footer-list__item"><a href="tel:+17165155643" data-analytics="link|footer|Telephone|true">Telephone</a></li>
								<li class="clearfix"></li>
							</ul>
							<h3 class="footer-subheader">Credentials</h3>
							<ul>
								<li class="footer-list__item"><a href="assets/AndyMikulski_Resume.pdf" target="_blank" data-analytics="link|footer|Resume|true">Resume</a></li>
								<li class="footer-list__item"><a href="http://www.linkedin.com/pub/andy-mikulski/17/a93/684" target="_blank" data-analytics="link|footer|Resume|true">LinkedIn</a></li>
								<li class="footer-list__item"><a href="http://github.com/andymikulski" target="_blank" data-analytics="link|footer|Github|true">Github</a></li>
								<li class="footer-list__item"><a href="https://soundcloud.com/andymikulski" target="_blank" data-analytics="link|footer|SoundCloud|true">SoundCloud</a></li>
								<li class="footer-list__item"><a href="http://open.spotify.com/user/andymikulski" target="_blank" data-analytics="link|footer|Spotify|true">Spotify</a></li>
								<li class="footer-list__item"><a href="http://instagram.com/andymikulski" target="_blank" data-analytics="link|footer|Instagram|true">Instagram</a></li>
								<li class="clearfix"></li>
							</ul>
						</div>

						<div class="col span_4">
							<h3 class="footer-subheader">TLDR</h3>
							<ul class="footer-list">
								<li class="footer-list__item">Graduated from <a href="http://www.rit.edu/" target="_blank" data-analytics="link|footer|RIT|true">RIT</a> with a BFA in New Media Design &amp; Imaging in 2013. Go&nbsp;Tigers!</li>
								<li class="footer-list__item">Worked at <a href="http://www.firstborn.com/" target="_blank" data-analytics="link|footer|Firstborn|true">Firstborn</a> for a year making websites.</li>
								<li class="footer-list__item">Currently freelancing and looking for exciting challenges to take my skills to the next level.</li>
								<li class="clearfix"></li>
							</ul>

							<h3 class="footer-subheader">TLDR: The Director's Cut</h3>
							<ul class="footer-list">
								<li class="footer-list__item is-text">I recently graduated from RIT in Rochester, NY in May of 2013 with a BFA in New&nbsp;Media Design&nbsp;&amp;&nbsp;Imaging. Growing up as a developer my whole life, I had never really pursued art in any way. I decided to get a design degree (while in college for Game Design) in hopes to help balance my skills between design and development. A few art history classes later and I was a developer with design skills!</li>
								<li class="footer-list__item is-text">My first job out of school was at New York-based digital ad agency Firstborn. As a developer there, I created websites using HTML5 (JavaScript, CSS, etc), and became more familiar with tech such as Grunt, Node/npm, and TypeScript.</li>
								<li class="footer-list__item is-text">Currently, I am freelancing in Buffalo, NY (as seen in the 2001 hit animated film <a href="https://www.youtube.com/watch?v=7diGY1CIrVQ" target="_blank">Osmosis Jones</a>). When I'm not working, I'm studying things like Clojure or Redis, and playing way too much StarCraft.</li>
								<li class="footer-list__item is-text">I'm actively searching for challenging opportunities that can really push me to my limits. Have a lead on something good? Get in touch with me via <a href="mailto:andy.mikulski@gmail.com">email</a>!</li>
								<li class="clearfix"></li>
							</ul>
						</div>

						<div class="col span_2">
							<h3 class="footer-subheader">Currently</h3>
							<ul>
								<li class="footer-list__item">Job Hunting</li>
								<li class="footer-list__item">Building a Side Project</li>
								<li class="footer-list__item">Learning Clojure</li>
								<li class="footer-list__item">Learning Redis</li>
								<li class="clearfix"></li>
							</ul>

							<h3 class="footer-subheader">Listening</h3>
							<ul>
								<li class="footer-list__item"><span class="footer-title">Else</span> Ariane <a class="song-link" href="https://soundcloud.com/lordrecollectif/else-ariane" target="_blank" data-analytics="link|footer|Ariane|true">(SoundCloud)</a></li>
								<li class="footer-list__item"><span class="footer-title">NOFX</span> Eat the Meek <a class="song-link" href="http://grooveshark.com/#!/s/Eat+The+Meek/2Dtwf8?src=5" target="_blank" data-analytics="link|footer|Eat the Meek|true">(Grooveshark)</a></li>
								<li class="footer-list__item"><span class="footer-title">The Geek x Vrv</span> Lazy Love <a class="song-link" href="https://soundcloud.com/thegeek/lazy-love" target="_blank" data-analytics="link|footer|Lazy Love|true">(SoundCloud)</a></li>
								<li class="clearfix"></li>
							</ul>

							<h3 class="footer-subheader">Playing</h3>
							<ul>
								<li class="footer-list__item">StarCraft II</li>
								<li class="footer-list__item">Team Fortress 2</li>
								<li class="footer-list__item"><s>Bioshock Infinite</s></li>
								<li class="clearfix"></li>
							</ul>
						</div>
						<div class="clearfix"></div>
					</div>

					<div class="clearfix"></div>
					<div class="row">
						<div class="logotype show">
							<div class="svgLogo">
								<?php include('assets/images/logo-svg.svg'); ?>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="menu" widget="sidebarMenu">
			<div class="menu-wrapper">
				<ul class="menu-list">
					<li class="menu-list__item header">Navigate</li>
					<li class="menu-list__item" sub-widget="SidebarItem" sub-widget-target="fb" data-analytics="menu|link|Firstborn|true">Firstborn.com</li>
					<li class="menu-list__item" sub-widget="SidebarItem" sub-widget-target="twig" data-analytics="menu|link|Twig|true">Twig</li>
					<li class="menu-list__item" sub-widget="SidebarItem" sub-widget-target="cms" data-analytics="menu|link|Editor|true">Inline Editor</li>
					<li class="menu-list__item" sub-widget="SidebarItem" sub-widget-target="idl" data-analytics="menu|link|IDL|true">InDaLab</li>
					<li class="menu-list__item" sub-widget="SidebarItem" sub-widget-target="hivemind" data-analytics="menu|link|Hivemind|true">Hivemind</li>
					<li class="menu-list__item" sub-widget="SidebarItem" sub-widget-target="postsecret" data-analytics="menu|link|Post Secret|true">RIT Post Secret</li>
					<li class="menu-list__item" sub-widget="SidebarItem" sub-widget-target="about-me" data-analytics="menu|link|About Me|true">About Me</li>
				</ul>

				<ul class="menu-list">
					<li class="menu-list__item header">Credentials</li>
					<li class="menu-list__item"><a href="assets/AndyMikulski_Resume.pdf" target="_blank" data-analytics="menu|link|Resume|true">Resume</a></li>
					<li class="menu-list__item"><a href="http://www.linkedin.com/pub/andy-mikulski/17/a93/684" target="_blank" data-analytics="menu|link|LinkedIn|true">LinkedIn</a></li>
					<li class="menu-list__item"><a href="http://github.com/andymikulski" target="_blank" data-analytics="menu|link|Github|true">Github</a></li>
				</ul>

				<ul class="menu-list">
					<li class="menu-list__item header">Contact</li>
					<li class="menu-list__item"><a href="mailto:andy.mikulski@gmail.com" data-analytics="menu|link|Email|true">E-Mail</a></li>
					<li class="menu-list__item"><a href="tel:+17165155643" data-analytics="menu|link|Telephone|true">Telephone</a></li>
				</ul>
			</div>
		</div>


		<script type="x/template" widget-template="codeEditor">
			<div>
				<div class="titleBar">
					<ul class="buttons">
						<li class="red close"></li>
						<li class="yellow minimize"></li>
						<li class="green maximize"></li>
					</ul>
					<span class="title">untitled</span>
				</div>

				<div class="folders" sub-widget="sidebar">
					<h2 class="projectTitle">Folders</h2>
					<ul></ul>
				</div>
				<ul class="tabs">
				</ul>

				<div class="clear"></div>
				<div class="footer">
					<span class="lineCol"></span>
					<span class="fileType"></span>
				</div>
			<div>
		</script>

		<script type="x/template" widget-template="screensModal">
			<div class="screens-modal">
				<div class="screens-modal__content">
					<div class="screens-modal__image"></div>
					<div class="screens-modal__text"></div>
				</div>
				<ul class="screens-modal__thumbs">
				</ul>
				<div class="screens-modal__nav">
					<a href="#" class="screens-modal__nav-close"><span>Close</span></a>
					<a href="#" class="screens-modal__nav-prev">Prev</a>
					<a href="#" class="screens-modal__nav-next">Next</a>
				</div>
			</div>
		</script>


		<?php if($dev === true){ ?>
			<script src="assets/scripts/src/lib/jquery.js?v=<?php echo($cachebust); ?>" defer></script>
			<script src="assets/scripts/src/lib/highlight.pack.js?v=<?php echo($cachebust); ?>" defer></script>
			<script src="assets/scripts/src/lib/devtools-detect.js?v=<?php echo($cachebust); ?>" defer></script>
			<script src="assets/scripts/src/lib/async.js?v=<?php echo($cachebust); ?>" defer></script>
			<script src="http://www.youtube.com/player_api" defer></script>
		    <script data-main="assets/scripts/build/main.js?v=<?php echo($cachebust); ?>" src="assets/scripts/src/lib/require.js?v=<?php echo($cachebust); ?>" defer></script>
		<?php }else{ ?>
			<script src="assets/scripts/min/plugins.js?v=<?php echo($cachebust); ?>" defer></script>
			<script src="http://www.youtube.com/player_api" defer></script>
		    <script data-main="assets/scripts/min/main.js" src="assets/scripts/min/require.js?v=<?php echo($cachebust); ?>" defer></script>
		<?php } ?>
	</body>

	<!--
	            __
	           / _)
	    .-^^^-/ /
	 __/       /
	<__.|_|-|_|

	 -->
</html>