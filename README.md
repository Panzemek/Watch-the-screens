---
title: 'Watch the Screens: README.md'
---


# Watch the Screens
## An App for Watch the Skies®
## Table of contents
* [General info](#general-info)
* [Demo](#demo)
* [Code](#code)
* [References](#references)
* [App Role Showcase](#app-role-showcase)
* [Use Cases](#use-cases)
* [Software Architecture Overview](#software-architecture-overview)
* [Technologies](#technologies)
* [Setup](#setup)


## General Info 
**Watch the Screens** is a communication app for gamers to use in real-time while playing Watch the Skies, see  references below for more info on game play.

Generations Working to Facilitate _Watch The Screens_, A Pilot Project of the Watch the Skies®  Gameplay

## Demo
[**Heroku:** Watch The Screens]( https://thawing-escarpment-16041.herokuapp.com/) Current: Live App 
(*this version dependent on Admin deployment of game*)

## Github Repository
[**Github:** Watch The Screens](https://github.com/EwRicklefs/Watch-the-screens) Future Dev Rollout: TBD

## References
["Watch the Skies" video:](https://www.shutupandsitdown.com/tag/watch-the-skies/)  Watch the Skies! is a 70-person MegaGame pitting teams of players against 
one another as the nations of Earth… or as an extraterrestrial menace! ... If you want to play with just one friend, Corporations and Media are for teams-of-two. 

## App Role Showcase
- **User:** Read only privilages; Reads the current WTS events.  
- **Reporter Player:** May create and read articles as needed; the reporter will have inteviewed a country and create an article of incoming news story(ies).       
- **Admin Player:** Create/read articles of news stories; updates though changes things adhoc; reset time; adding increments and more; May delete game informational events for tactic/activity/benchmark(s) currently in play (ie.add round time, update streaming-articles to show/suppress viewing, etc.) as needed.                                   

## Use Cases
- **Feature:** Play the game  

- **Scenario:** User joins a game 
*The first example has three steps*
_**Given**_ the Admin has started a game 
**When** the User joins the current (Admin's) game
**Then** the User is able to view all current articles, round time remaining, 

- **Scenario:** Maker starts a game --- Admin starts a game 
*The second example has five steps*
_**Given**_ the Admin has started a game
**When** the Admin waits for a Reporter to join
**Then** the admin assings role of Reporter
**When** a Reporter wants to create an article the form page populates
**Then** the Reporter posts the written article for game-wide display

## Software architecture overview
<pre>
The user interface of this application shall be a single page application
for each given role assigned to a player based on Bootstrap, Handlebars, 
Sockets and Sequilizer and others listed in the Technologies section.
</pre>

## Technologies
Project is created with:
<pre>
* Bootstrap version: 4.3.1
* Dotenv: 6.0.0
* Express: 4.6.4
* Express-handlebars": 3.0.0
* Moment: 2.24.0
* Moment-duration-format: 2.2.2
* Marquee: 1.5.0
* Mysql2: 1.6.5
* Sequelize: 5.5.0
* Socket.io: 2.2.0
* Socket.io-client: 2.2.0
</pre>

## Setup
To run this project, from your bash window, locally install using npm:

<pre>
$ cd ../your-cloned-repo-root
$ npm install
$ npm start
</pre>

## Enjoy!
