#Coco Mobile Scheduling App
##Purpose

This application was created in order to facilitate in-situ scheduling of meeting rooms at COCO coworking spaces as well
as the ability to tell at a glance whether a room is occupied or vacant.

##Configuration

The configuration page can only be reached by manually typing in the URL route 'URL/#/configview. It is meant to be used once on
start-up, and the configuration should persist unless changed at a later time. The configuration view displays 
a series of drop downs which allow a COCO employee to choose the location, room name and the time out length for each of the three pages.
Locations and room names on the client side are retrieved from the Bamboo API and should update automatically.

Upon submission the view is routed to the Default Page.

##Default Page

The Default page always displays the room name. Depending on the state of the room ('Currently Occupied', Currently Vacant with Meetings
Upcoming' or 'Currently Vacant Without Meeting Upcoming') the page will also display either the remaining time of the current meeting
the time until the next meeting or 'No Meeting Upcoming'. 
When the Default page is in the 'Currently Vacant Without Meeting Upcoming' state the app will query the Bamboo API every 5 minutes
and update in order to handle meetings scheduled on the central meeting scheduling page.

##Reserve Booking Page

##Technical Details
The COCO app was built on Javascript and Angular 1.4.8, Angular-Material 0.11.4.

##Credits
Created December 2015 to January 2016 by Kelly Moore, Laryssa Husiak, Sam Moss and Zeeshan Dawood at Prime Digital Academy for COCO 
