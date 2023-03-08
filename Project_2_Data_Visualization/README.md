# CART 263 PROJECT 2 DATA VISUALIZATION 

## Topic: Space Missions from the 1957 to 2000 by Mollika Chakraborty 

## What's happening in the project 
* At first we see a map that has been generated through leaflet library and the style of the map is generated through mappa object that's part of the leaflet library 

* The map library is overlayed on the canvas where the ellipses are the locations of the space mission that happened over the period of time from 1957 to 2000. 

* At first we see the total visualizations that are irrespective of filtering through the years they have taken place it's just a general overview of how the project looks like 

* A slider has been provided at the top left corner of the canvas that filters the missions by their years and the user only sees the date based information. As you scroll the slider the dates change and so does the locations of the missions as per the json file that contains the data. 

* Random colors are assigned to the ellipses to avoid confusion as some of the mission took place in the same location around the same timeline which led to overlapping of the ellipses and therefore different range of colors are applied using the chroma.js library. 

* mouse interaction is used, as the user hovers through each ellipse or the cluster of ellipse sin the map they see all the relevant information about the mission, like the company that launched it, the time it was launched, date and the mission status whether it wa ssuccussful, failure or partial failure. 

## Perks encountered through the project 

* Exposure to usage of type of coding that I have not encountered or worked with before 
* Learning node.js to use api keys and extrat latitude and longitude data, that I am proud of as it was not provided within my data file. 
* I believe the coding for the project was challenging but I tried my best to incorporate the visuals as I wanted them to, it could have been better as there is always some room for improvizations. 
* It was a bigger data set but i managed to make something useful and informative out of it which gives me confidence that I am on the right trajectory and learning a lot. 

## Challenges faced 

* Challenges are always bigger than the perks but the if we don't encounter challenges learning becomes less interesting and this project taught me that.

* It was my drawback to not verify at first that the latitudes and longitudes are accurate or are in sync with my file, therefor ethe afterwork took longer almost 3 hours just to fix the data and work with different API keys, none of them were giving exact accurate answers. Although I found solution with google api generator for developers and it gave me the closest accurate results. The rest of the data that I found invalid withing the json file were filtered off and only the valid oned were kept. It was a lesson about not to just pick a data we like but to verify it in certain levels if it's giving the right results. 

* The troubleshooting took so long that there was not much time left to add other interactions in the code that i planned to. But I am satisfied as I did work very hard on this project and it somewhat came near my expectations and in some levels I also surpassed what I usually expect from myself in terms of coding. 

* It was extremely fun and opportnistic project but definitely involved huge brainstorming as well. 


## References 

* Data files from https://www.kaggle.com/datasets/agirlcoding/all-space-missions-from-1957
* Geocoding from https://developers.google.com/maps/documentation/geocoding/start
* Code help from https://p5js.org/reference/
* map objects from https://leafletjs.com/
* special tahnks to "The Coding Train"  https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw
