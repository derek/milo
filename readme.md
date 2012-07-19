Milo
====

A command-line tool for YUI development

About
=====

If Dog is Man's best friend, Milo is your best friend as a YUI developer.  He's trained to be able to help you out in a variety of ways, including things like sharing files, firing up different types of servers, keeping your code clean, and more! Best of all, he's easily trainable to do whatever else you like him to.

How
===
milo *command* {required} [optional] --additional-flags


Commands
========

`milo build {module}`

Builds the specified module.  Just an alias for `ant all -q -Dlint.skip=true` being run in a module's directory.  Useful as you can rebuild a specific module without needing to `cd` into it.

---

`milo coverage {module}`

Fires up server to check your code coverage for {module}

---

`milo docs {module}`

Fires up a Selleck server to read documentation for {module}.

---

`milo fetch {gistID} [directory]`

Clones a gist into a dir called {gistID}.  If no directory is specified, it will create a directory called {gistID} in the current one.

---

`milo lint {file|path|module}`

Runs jslint on a file, entire directory, or `yui3/src/{module}/js/`

---

`milo module {module} [info]`

Shows information about a specific module.

Info:
- readme (default): Displays README.md
- files: Lists the JS & CSS src files
- history: Displays HISTORY.md
- meta: Displays meta information

---

`milo modules`

A list of the built modules in your yui path.  Useful for searching for that one module's name you can never seem to remember.

---

`milo news [source]`

The latest tweets & blog posts

Sources:
 * tweets - Tweets from @yuilibrary
 * relay - Tweets from @yuirelay
 * videos - The most recent videos posted to the yuilibrary YouTube channel
 * headlines - The latest headlines from yuiblog.com


---

`milo server`

Fires up a dynamic module server @ http://localhost:3000/. This is useful because it will dynamically wrap your /src/ files as a YUI module and serve it, so now you don't have to rebuild everytime!

To use it, add this to your YUI config


	{
		base: "http://localhost:3000/",
		combine: false,
		debug: false,
		filter:"raw"
	}

This utility needs a mapping of routes from the build path to the src file(s), which you can find in `milo/assets/serverRoutes.json`.  If you ever need to regenerate that file, run `milo server generate`.

Note: Currently doesn't work properly for the yui seed file (/yui/yui.js).  So just use a CDN seed file @ `http://yui.yahooapis.com/{version}/build/yui/yui-min.js`

---

`milo share {path}`

Creates a Gist with the given directory or file.  If a directory is specified, it will upload all files within that directory as part of the same gist.

---

`milo start {template} [dir]`

Generate a YUI starter app from {template} in {dir}.  Templates are actually gist IDs, which you can find in `config.public.json`.  Great to be used in conjunction with `fetch`, so once you post your files, give someone else that ID and they can run `milo fetch {gist ID}` to start using your app.

This is really just a shortcut for `milo fetch {gistID} {dir}`

---

`milo tickets`

Fetches your tickets from the YUILibrary.com ticket tracker.  Can also specifiy additional flags for filtering.
--milestone={version}
--sprint={sprint} (e.g. "3")
--component={component}


