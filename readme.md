Milo
====

Social scripting

About
=====

If Dog is Man's best friend, Milo is your best friend as a command-line cowboy.  He's trained to be able to help you out in a variety of ways. Best of all, he's easily trainable to do whatever else you like him to.

Milo starts out life as a dumb little puppy, but once you train him (milo install), he'll begin picking up new skills.  Milo's skills are split up into various libraries, and the only library he starts with is his own that teaches him how to install, fetch, share, and update.  You can give him new skills to learn by subscribing him to other developers' libraries in config.json.  Then, every time you run `milo update` he'll fetch anything new that others have pushed into their own libraries.

Config files
============

Milo is controlled by [config.json]

Anything in `global` will be avilable across any library in `this.config.{{property}}`.  Any properties scoped inside of `libraries.{{library}}` will only be available inside that specific library.

There are a few properties used by milo's core that are inside a library config
 * source - The gist ID of the library
 * push - If `true`, Milo will configure that repository with a push URL instead of only being limited to pulls.  You can always edit the `libraries/{{library}}/.git/config` yourself to update this after the fact.

How
===
milo *command* {required} [optional] --additional-flags


Library: milo
=============

`milo help`

Dumps a command routing map so you can see what commands you are able to run

---

`milo fetch {gistID} [directory]`

Clones a gist into a dir called {gistID}.  If no directory is specified, it will create a directory called {gistID} in the current one.

---

`milo share {path}`

Creates a Gist with the given directory or file.  If a directory is specified, it will upload all files within that directory as part of the same gist.

---


`milo update`

Updates your utilities by either cloning new libraries that haven't been yet, or pulling existing libraries to get updates.

---

Library: yui
========

Milo intially started out as a collection of scripts to aid in YUI development, so we're going to include those as a reference.


`milo app {template} [dir]`

Generate a YUI starter app from {template} in {dir}.  Templates are actually gist IDs, which you can find in `config.json`.  Great to be used in conjunction with `fetch`, so once you post your files, give someone else that ID and they can run `milo fetch {gist ID}` to start using your app.

This is really just a shortcut for `milo fetch {gistID} {dir}`

---

`milo build {module}`

Builds the specified module.  Just an alias for `ant all -q -Dlint.skip=true` being run in a module's directory.  Useful as you can rebuild a specific module without needing to `cd` into it.

---

`milo checker`

Just a general utility for digging through YUI's source and detecting any oddities

---

`milo coverage {module}`

Fires up a server to check the code coverage for {module}

---

`milo docs {module}`

Fires up a Selleck server to read documentation for {module}

---

`milo edit {module}`

Easily open up an editor for the specified module

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

`milo tickets`

Fetches your tickets from the YUILibrary.com ticket tracker.  Can also specifiy additional flags for filtering.
--milestone={version}
--sprint={sprint} (e.g. "3")
--component={component}

---


Library: allen
==============

He was the first guinea pig to install milo, so this was his contribution

`milo ruff`

Speak Milo, speak!

[config.json]: https://github.com/derek/milo/blob/master/config.json.sample