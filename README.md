# Watch the Screens

## A Pilot Project of the Watch the Skies®  
### **Summary:**
**Watch the Screens** is a communication app for gamers to use while playing Watch the Sky, see  references below for more info on game play.

Generations Working to Facility ‘Watch The Screens’, A Pilot Project of the Watch the Skies®  Gameplay
#### Work in progress - [Github repo: Watch The Skies](https://github.com/EwRicklefs/Watch-the-screens)

## References
- ["Watch the Skies" video:](https://www.shutupandsitdown.com/tag/watch-the-skies/) Watch the Skies! is a 70-person MegaGame pitting teams of players against one another as the nations of Earth… or as an extraterrestrial menace! ... If you want to play with just one friend, Corporations and Media are for teams-of-two.

## The app will have several views:

- You may delete rows for tactic/activity/benchmark place-holders that are not used.  

- Also, feel free to insert rows for additional activities or benchmarks.  

- Please include at least one benchmark per goal.											

## Use cases
- Narrative description of how a Reporter actually adds news update. How does reporterPlayer roll effect the experience of adding and viewing

     - **UserPlayer:** Read only privalages
     - **Reporter:** Create/read articles of incoming news stories;
     - **Admin:** Create/read articles of news stories; updates though changes things adhoc; reset time; adding increments,
       -    ie. new val(); start new round;			


## Questions/todos
- Describe what the users sees
- user player story?
- do players take roles? Player,Reporter,Admin (*this needs to be fleshed out for any reader to understand app overview and use case application)
- What else?
- what is the schema of the data?
    - 04-11-19: [wts_game_db]("https://dbdiagram.io/d/5cafb8d4f7c5bb70c72f9a8f")

[Prototype table]
- is a post an article? also has new reporter assigned by admin?
- what attibutes does a post have?
- how is a post(s) seen by all the users?
- can i see what articles are being viewed by all users? (*we talked about adding a flag; please keep all informed)
- do users have to affiliate (*at this current time, there is no login)
- do user players have handles?
- players are hardcoded!
- what are the roles and rules for them?
- what buttons does the app have?
- can user go back in time and see stream?
- are all posts the same visual format?
- admin capability? does the admin have 'create().users' or 'create.articles()' only? create.anyBlank()?
- if yes, how? Button? intsert field?

## Software architecture overview
The user interface of this application shall be a single page application based on Bootstrap and handlebars.


## Definitions

- **Goal:** An easily accessible widely available offering live updates on news in realtime in order to keep earth safe and peaceful.  

- Goal statements are generally consistent with the strategies listed below.  Please do not alter the project goals, as these will be our touchstone and ‘used in the United Nations Progress Reporting System’ (*gameplay here). All refs will be presented adhoc.

- Sockets will create numbers of listeners
- client and server side; find the listeners first server side (ie built like routes, define listeners, route them: pkg of server side and one client side pkg of socket.ios.  

- Server side: one installed, Client side: one included

- We need rooms: composer registers one room: entire application; Each of individual player instances are one room allocated to one game, at present

- able to have all room	Server side lists available, active, rooms for user to be able to update in current state socket.io: the instance of the rooms/channels created in the game;						

- Set-up to outreach goals: have players all over the world (Tutorials available for socket.io: create rooms, channels, multi-player feature, etc. ensure we have the applicable io for our app.  						

- Another library/webpack is to be used similar to js.marquee.		

## CRU(D)
- **User:** Read only privilages
- **Reporter:** create() articles of news stories; read();
- **Admin:** create() articles of news stories; read(); updates though changes things adhoc; reset time; adding increments,
    -    ie. new val(); start new round;			

- **Tactic:** A more specific statement describing the method used to help achieve a goal or goals. Tactics are specific examples of “5P” strategies.						

- **Activity:** A specific statement briefly describing an action step related to the tactic.						

- **Benchmark:**  Synchronizing data and allow people to access
live data as it occurs.

- **Games state/News state aggregators:** the amount of time left in the rounds will dictate for the users to have the amount of time dictating the news reel, presented and auto refreshed to the rooms:
   - display this info to room full of games in real time.  This will enable the participants to know what is going on in real time.
    - This application is the composer/fancy jumbotron at a given live game functioning as it's scoreboard.  						

## Need Fulfillments & Strategies						
- Preparation: Tactics that provide the groundwork and enable partnerships to work toward interstellar political partnership building/maintenance, assessment, generating resources, strategic planning, community visioning.

- Promotion: Tactics intended to educate the public, media and policy-makers and increase the presence of active living messages and cues to action.												
- Programs: Organized efforts to encourage and provide greater opportunities for interpersonal dissemination of information between Players/Users/Admins aka Countries/Facilitators/Reporters
    - Examples include gaming parameters. ie. Article names, etc.  						

- Policy: Tactics intended to influence changes in public policies and standards as well as organizational practices. Examples include advocacy, relationship building with policy-makers, presentations to policy boards, influencing interstellar policies, working with intergalactic species to maintain intergalactic order.						
