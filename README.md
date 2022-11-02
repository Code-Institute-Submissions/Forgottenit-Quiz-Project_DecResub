# Welcome to Online Quiz



# Goal
The Goal of this site is to have a quiz from which the user may pick their own categories and play a multiple choice quiz. 

# UX
## User Goals
-	Play a quiz that has a large varietu of options
-	Be easy to use
-	Display when the answer is correct
-	Give an option to reveal the answers
- 	Keep a track of your score


## User Stories
-	I want the site to have "replayability"
-   I want the site to display my score
-   I want to have options of which categories I want to be asked about in the quiz
-   I want variety
-   I want to receive feedback once my answer has been submitted
-   Have a timer to make the game more competitive


## Site owners Goals
-	Offer a variety of questions
-	Have a dynamically updated option of questions so players may replay it
-   Display in an appealing manner
-	Have backup questions if database is down

## Requirements
-	Easy to navigate on different devices
-	Display categories and questions in an easy to understand manner
-	Track user entry and respond accordingly
-	Follow a clear layout
-	Keep score
## Expectations
-	All answers and options to display correctly
-	Multiple options for the user
-	Visually appealing on all devices
-	All images and forms to load and run at a high performance level


# Design Choices
## Fonts
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
font-style: oblique;

I found these fonts to be neat and legible on different screens and are widely available
## Colours
background: linear-gradient(75deg, rgba(250, 26, 48, 0.1), rgba(32, 159, 58, 0.1));

The colour chosen was a gradient of Red and Green, with Greens and Reds picked for correct and incorrect answers as these would be standards expecting from the user. The background for answers is cream with black text to display text as it stands out.



# Features
## Existing Features
### Landing page
The landing page displays the rules of the game and the game options, that the questions are multiple choice and that the user must ente a name (using letters) etc. There is then input for the user to enter a username and hit play
### Category Section
This displays 15 categories from which the user can pick up to 5, to selecy up to a maximium of 50 questions

### Quiz Section
This area contains the quiz, it displays the question number with a progress bar, the users current score and a 15second timer at the yop, followed underneath by the current question, with 4 possible answers, answers are displayed once selected as Green if the user is correct and Red if they are not. There is a reveal answer down the bottom and a quit button. If the timer runs out or the user chooses to reveal the correct answer the font changes color to green to signify correct and red for incorrect. The input buttons also display shadowing once selected.
### Score Page
This displays the users final score and gives a different message depending on how they did.

<


# Future Features 
-	Scores to be stored so a leadership board could be implemented
-	Multiple player options





 
# Technologies used
## Languages
- HTML for structuring website
- CSS for styling website
- Java Script for functions

## Tools
- GitPod and GitHub for Coding and Hosting the Website
- CodeInstitute for Mentors and Tutors
- LightHouse
- https://validator.w3.org/ for validating site for HTML and CSS
- https://jshint.com/ for validating JS
 
# Testing
-	HTML
No errors were returned when passing through the official W3C validator
- CSS
No errors were found when passing through the official (Jigsaw) validator
- JS 
No errors when passed through JS hint
- Manually tested to ensure all links worked, that scores displayed, timer worked, backup JSON file worked on "Fetch" failure, alerts worked if user tried to fetch too many categories, didn't enter a valid username.

## Lighthouse

 
# General Testing

- After site was ran through w3 validators, the site was tested for functionality.
- Functionality testing involved ensuring all links were active, that all user submission worked, displays worked correctly
- Testing also involved general lay-out testing of alternate design choices before the ones used were settled upon.
- Finally, testing also involved demonstration of the active site to mt CodeInstitute Mentor 
# Deployment
Following writing the code then commiting and pushing to GitHub, this project was deployed using GitHub by the following steps.
-	Navigate to the repository on github and click 'Settings'.
-	Then select 'Pages' on the side navigation.
-	Select the 'None' dropdown, and then click 'master'.
-	Click on the 'Save' button.
-	Now the website is now live on  https://forgottenit.github.io/Online-Grinds/
-	If any changes are required, they can be done, commited and pushed to GitHub and the changes will be updated.


 
# Credits
## For coding help and advice
-	Simen Daehlin
-	Rohit Sharma
-	CodeInstitiute
-   Stack OverFlow
-   https://bost.ocks.org/mike/shuffle/ for fisher-yates shuffle 
 
## For content and style 
t 
-	CodeInstitute
-	W3Schools.com

