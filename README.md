blizzwebtest
============


*Open issues:*

App
--------
1. Login uses session storage instead of cookies. Is this okay?

Main Page
--------
1. Hide profile info if not present

Search Page
--------
1. Allow for filterable search results
    Tagged (route)
    Order: desc, asc
    Sort: activity, votes, creation, relevance
    Page
    Intitle?
2. Possible to get all questions instead of tags?
3. Show progress while waiting for content to load

Questions Page
--------
1.  Create route to pass question ID () to controller.
2. Display question title
3. Display question body
4. Display question comments with # of votes and duration
5. Display question answers
6. Display answer comments with # of votes and duration
7. Allow user to flag/unflag favorites.

Theming
--------
1. Investigate and build theme in Sass
2. Add semantic tags
3. Design for mobile using Bootstrap grid

Misc
--------
1. Test in different browsers
2. Write testing framework
3. Can we remove # from paths without breaking it?