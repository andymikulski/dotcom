Andy Mikulski

Features
- User Registration (Login using biscuits / biscuits)

Uses UserCake, an open-source PHP user system (http://usercake.com/). I've used this system before, and It's pretty simple to plug in and get running, so it was my first choice. Integrating with the RIT DCE accounts will be an adventure into customizing the system, though shouldn't be too hard.

- Uploads

Uses good ol' PHP for the file uploader. Ran into a blocker when I discovered that you can't upload files using jquery's $.ajax() call, so I had to use a weird iframe workaround. upload.html consists of both the upload form stuff, as well as a hidden iframe. I could use a built-in attribute in HTML to have the form target the iframe, thus allowing me to push a file upload without causing a page refresh. The only problem is that I'm having trouble signaling the parent application once the iframe has finished loading (read: when the upload is finished), so once it's uploaded you have to close the modal manually.

- Color palette generation
- Dynamic background generation

For the color palette generation, I used Color Thief (https://github.com/lokesh/color-thief), an open-source javascript tool for generating color palettes from images on the fly. I have the palettes being generated on upload and then stored in the database (I originally had it doing on the index page, but it lagged the page load), and then later just printed out from the database.

The background is generated through canvas, and is actually just a giant canvas element stretched across the background. I've never done anything like this in canvas before, so it was definitely interesting to work through. All of the code is in ColorView.js. Essentially, in the initiateWorkers function, I instantiate a bunch of worker objects that are each responsible for an individual circle in the background. They generate random colors if no active 'thing' is present, otherwise they pickup the image's data-color attribute (inspect the images to see the info!). Each image also features a data-cindex attribute, which is used to make sure the colors are displayed one after another (it just keeps track of which color the image is on in the color cycle).

There's a lot of optimization that could be done as far as the canvas layer goes, and at this point there's no backwards compatibility (doesn't even check if canvas works in the browser). I think at this point it's stable enough for most computers, though I hope to improve how the circles are drawn in the future.

- EXIF data is read/saved, displayed in google maps format

Uses PHP to read the exif data and store it in the database on upload, then later spit out in the image as an attribute (data-exif). The javascript layer then reads the attribute and uses it to plot out a Google maps embed (but it's kind of goofy-looking right now).

- Database schema set up to allow scalable features (don't need to edit code/table setup in order to add new features)

I decided to use a simple "posts" / "post_things" table setup after reading about Reddit's approach to their things (http://kev.inburke.com/kevin/reddits-database-has-two-tables/). Basically, 'posts' keep track of post id's and author id's associated to that post, and 'post_things' just holds key-value pairs. Having this sort of approach allows me to add features or information to items without having to re-write old code/queries to fit the new schema. Since creating database functions to make reading/writing easier, I haven't had to touch the database.

Known Issues
- 'Log out' button doesn't reload the page (logs out but doesn't refresh)
- Scroll select doesn't behave the way I'd like it to (see http://maker.github.com/ratchet/ Components section for reference)
- Scrolling outside the list of entries doesn't cause the list to scroll
- Google Maps is all wonky (seems to only work for first one, even then it's squished)

Future Features (stuff I'd like to add over break)
- Requiring RIT DCE to register
- Tags
- Categories/Classes (sorting/viewing)
- Better design
- Better mobile implementation
- Streamlined uploading (uploading from URLs, multiples, etc)
- Performance optimization (checking for browser features, speed up canvas code, etc)
