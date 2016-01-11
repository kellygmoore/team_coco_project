#Coco Mobile Scheduling App
##Purpose

This web application was developed for COCO coworking spaces in order to display room occupancy status at thier sites well as to allow COCO members to schedule meetings at the room.

##Configuration

The configuration page can only be reached by manually typing in the URL route `<URL>/#/configview`. It is meant to be used once upon start-up. The machine's configuration should persist unless changed at a later time. The configuration view displays 
a series of drop downs which allow a COCO employee to choose the location, room name and the time out length for each of the three pages.
Locations and room names on the client side are retrieved from the Bamboo API and should update automatically.

Upon submission the view is routed to the Default Page.

##Default Page

The Default page always displays the room name as set on the configuration cage. Depending on the state of the room: 'Currently Occupied', 'Currently Vacant with Meetings Upcoming' or 'Currently Vacant Without Meeting Upcoming' the page will also display <the remaining time of the current meeting>, <the time until the next meeting>, or 'No Meeting Upcoming' respectively. 
When the Default page is in the 'Currently Vacant Without Meeting Upcoming' state the app will query the Bamboo API every 5 minutes in order to handle meetings whcih have been scheduled on the central meeting scheduling page.
Upon clicking on any part of the Default page the user will be routed to the Calendar page.

##Calendar Page

The calendar page displays the room meeting statuses for the day.
The calendar displays every meeting time for the day in fifteen minute intervals, each shaded either grey (for time passed) green (future time open for booking) or red (future time already booked). 
A user at this point may either log in with their credentials or may click on one of the green times which will route them to the Reserve booking page.

If the page is left dormant for the period of time selected for it on the configuration page the app will route to the default page.

##Reserve Booking Page

This page displays three user selectable drop-downs: 'meeting start time' (defaults to the time selected on the calendar page, limited to those times the room is available), 'meeting end time' (defaults to the next time block after the selected start time, limits to those times the room is available) and 'attendance' (defaults to '2' and limited to the room's maximum occupancy). Upon selection of the 'meeting end time' the controller calculates the duration of the meeting, the hours to be deducted from the members account, the cost of the meeting or both depending on the member's account type and the amount of hours the member has remaining. 

If the page is left dormant for the period of time selected for it on the configuration page the app will route to the default page.

##Success Modal

Upon a successful booking a modal window will display a success message including the times of the meeting.

##Technical Details

This app was built on HTML5, CSS3, ES5, Angular 1.4.8 and Angular-Material 0.11.4.

##Credits

Created December 2015 to January 2016 by Kelly Moore, Laryssa Husiak, Sam Moss and Zeeshan Dawood at Prime Digital Academy for COCO. The application is built to interface with the Bamboo API developed by Foundry.
