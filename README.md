# ACTIVITY AGGREGATION
#### Video Demo:  <URL HERE>
#### Description:
**USE**

To run this project, navigate to the correct folder using 'cd project' in terminal prompt.
Then type 'flask run' and click on the link provided.

To access the database in phpliteadmin, type 'sqlite3 database.db' to terminal prompt.

If running this outside of the CS50 Codespace, you may need to
pip install cs50
pip install Flask-Session
npm install sqlite3

**ABOUT ME**
I began CS50x to prepare for a Masters in Advanced Computation for Architecture and Design from the Institute of Advanced Architecture in Catalonia. The course was immensely useful as the masters involved several projects that required .html, .css., .javascript, .vue, three.js, python, and more. I finishing all of the CS50 classes in the month before the masters began and
just missed out on completing the final project during that time. So now that my thesis is submitted, here is my CS50 final project.

**PROJECT**
My project was built off the example used in Finance from PSET 9 in CS50x 2022. It similarly has a database, flask, .css and a number of .html pages. I initally wanted to get it working with either the Strava or Garmin API, but I believe both require company status to gain access to the data asking for annual revenue data and information like that. This project also needed javascript for a leaflet.js map.

The project as described in index.html
> Activity Aggregation is a platform designed to help you track your progress in long-term races that span over months or even years. Your race position is displayed on an interactive map, continuously updated after each recorded activity.

**CHALLENGES**
- Creating map markers placed at a point on the polyline expressed as a percentage of the total route completed.
- Getting use to the flask format.
- How data moves from database to pages.

I swim and run almost daily and thought it would be nice to have an annual goal illustrated on a map. This project works really well, other than activities have to be inputted manually. Access to either the Strava or Garmin API would greatly improve the project. I intend to get started on a virtual swim from Yale to Harvard now that I have it working. The other major improvement that could be made is being able to see other users within your community to compete over the summer or throughout the year on a major distance with friends.

Future additions were also recommended on index.html
> For future enhancements, other CS50 students could consider implementing features such as a more precise marker placement on the map, creating a global circumnavigation route that combines various activities like swimming, rowing, running, cycling, and hiking, engaging in friendly competitions with friends, family, or your community to visualize everyone's positions on the map, sending emails or some kind of updates as users arrive at major cities along their routes, or the ambitious yet valuable task of integrating with the Strava or Garmin APIs for automatic activity updates. This integration would allow users to effortlessly monitor their progress on the map without the need for manual data entry.