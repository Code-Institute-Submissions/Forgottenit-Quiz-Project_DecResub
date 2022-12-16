# Welcome to [Online Quiz](https://forgottenit.github.io/Quiz-Project/index.html)

<img src = "DOCS/amIresponsive.png">

# Goal
The goal of this site is to have a quiz from which the user may pick their categories from a wide variety of options and play a multiple-choice quiz. 

# UX
## User Goals
-	Play a quiz that has a large variety of options
-	Be easy to use
-	Display when the answer is correct
-   Give the option to reveal the answers
- 	Keep a track of your score
-   Display Correct Answers if the User gives an incorrect answer
-   Have Easy to Read instructions and Rules

## User Stories
-	I want the site to have "replayability"
-   I want the site to display my score
-   I want to have options of which categories I want to be asked about in the quiz
-   I want variety
-   I want to receive feedback once my answer has been submitted
-   I want to have a timer to make the game more challenging


## Site owners Goals
-	Offer a variety of questions
-	Have a dynamically updated option of questions so players may replay it
-   Display questions and answers in an appealing manner
-	Have backup questions if the database that questions are taken from is down
-   Make the Game clear and Easy to play

## Requirements
-	Easy to navigate on different devices
-	Display categories and questions in an easy-to-understand manner
-	Track user entry and respond accordingly
-	Follow a clear layout
-	Keep score
-   Time Each Question and respond if Timer Runs out
-   Give the User the option to Reveal Answers
-   Ensure all links work, if not that the failsafe link works
## Expectations
-	All answers and options to display correctly
-	Multiple options for the user
-	Visually appealing on all devices
-	All images and forms expected to load and run at a high-performance level


# Design Choices

## WireFrames

- Home Page 

<br>

<img src = "DOCS/homeWireFrame.png">

<br>

- Categories 

<br>

<img src = "DOCS/categoriesWireFrame.png">

<br>

- Quiz 

<br>

<img src = "DOCS/quizWireFrame.png">

<br>

- Final Score

<br>

<img src = "DOCS/finalscoreWireFrame.png">

<br>

## Fonts
font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
font-style: oblique;

I found these fonts to be neat and legible on different screens and are widely available
## Colours
background: linear-gradient(75deg, rgba(250, 26, 48, 0.1), rgba(32, 159, 58, 0.1));

<img src = "DOCS/Home.png">

The colour scheme chosen was a gradient of Red and Green, with Greens and Reds picked for correct and incorrect answers as these would be standards, expected by the user (Green for Correct, Red for Incorrect). The background for answers is cream with black text to display text as it stands out. The Rules and Instructions are Blueish to Stand out from the Green and Red Options. 

Warnings have Red Headers to signify they are important to the user.

### Other Design Choices

- The timer is displayed as two digits (10s, 09s etc.) as the jump from 10 to 9 was a bit distracting
- Different Font-Weights for Correct Answers, different Colours for Correct/ Incorrect/ Revealed Answers
- Buttons were given Box Shading to give "3D" aspect to make them appealing to click
- Simple pastel Colours were used for the background to Draw Focus to Questions and Answers



# Features
## Existing Features

<br>

### Landing Page

<br>

* Once the user lands on the page they are shown an option to enter "Username", play and rules. These Buttons are designed to have a 3D effect with box shadowing to make them stand out and also to draw attention from the User.

* The Username requires an input of letters only, a minimum of 3 letters and a maximum of 10. If the user enters an invalid username a warning is displayed.

<br>

<img src = "DOCS/usernameError.png">

<br>

* The User can also click on the "Rules" Button to get a summary of what to do.

<br>

<img src= "DOCS/rules.png">

<br>

* Once the User has Entered a Valid Username and they hit "Play", they are taken to the Category page.

<br>

### Categories

<br>

* The Site displays a greeting message, using the Username stored in local storage, and offers Users the chance to choose up to five different categories from a possible 15 options. This allows them to select a total of 50 questions (This number was due to a maximum request of 50 questions per Fetch from Opentdb.com on their user guidelines). 

<br>

<img src = "DOCS/categories.png">

<br>

* The User can Select the "Instructions" Button to give clarity on what to do

<br>

<img src = "DOCS/instructions.png">

<br>

* The User also has the option to press the "Home" Button to return to the Home Screen. This clears the Local Storage also.

<br>

* The site also offers a Backup set of 20 General Knowledge questions that load if the Fetch attempt fails. The user is shown a warning message beforehand. 

<br>

<img src = "DOCS/fetchError.png">

<br>

* If the User picks no categories or more than 5 categories, a warning is shown.

<br>

<img src = "DOCS/categoryWarning.png">

<br>

* Once the User is happy with their Category Choices, they can press "Start".

<br>

### Quiz Section

<br>

* The display for the Questions is then shown, with a menu on the top showing a progress bar, the number of Questions, the Users Score and a Timer. The Timer is set for 15 seconds per question. The progress bar fills as the player goes through each question, as does the question count. The timer counts down to Zero, then the answer is displayed. (Once the timer goes below 10s, it is displayed as 09, 08 etc. by adding a Zero to the front of it)

<br>

<img src = "DOCS/questionDisplay.png">

<br>

* The User selects one of Four possible answers, if it is correct their Selection turns Green for a few seconds before the next question is displayed.

<br>

<img src = "DOCS/correct.png">

<br>

* If the User gets a Question incorrect, they are shown the correct Answer

<br>

<img src = "DOCS/incorrect.png">

<br>

* If the User clicks Reveal Answer, or the Timer runs out, they are shown the Correct Answer with a different display

<br>

<img src = "DOCS/revealAnswerTimeUp.png">

<br>

* For Each Scenario (Correct, Incorrect, TimeOut/Reveal) the background Colour and Font-Weight changes to Show the User the correct Answer. Also, if the user Clicks Reveal Answer or the Timer runs out, the Answer becomes "Unclickable" so they can't choose the option after being shown the correct answer.

<br>

### Score Page

<br>

* This displays the "Users" final score and gives a different message depending on how well they did. The Message at the top gives a Rounded Percentage Score while the Message varies depending on how well they did. The Background Colour and the Font Colours change also, depending on how successful the player was.

<br>

<img src = "DOCS/finalScore.png">

<br>

* The Player then has the option to go back to the Home Page, Clearing their information, or go to Categories to Play Again.

<br>

## Future Features 

<br>

-	Scores to be stored so a leadership board could be implemented.
-	Multiple player options (i.e. Have a Two Player Game, or Multiplayer).
-   Have Different Options, such as true or false, or different difficulty levels.
-   Have a hint option.

<br>

# Technologies used
## Languages
- HTML for structuring the website
- CSS for styling the website
- Java Script for the functions

## Tools
- GitPod and GitHub for Coding and Hosting the Website
- CodeInstitute for Mentors and Tutors
- LightHouse
- https://validator.w3.org/ for validating the site for HTML and CSS
- https://jshint.com/ for validating JS
- Balsamiq for WireFrames
 
# Testing
-	HTML:
No errors were returned when passing through the official W3C validator

<img src = "DOCS/validatorHTML.png">

- CSS:
No errors were found when passing through the official (Jigsaw) validator

<img src = "DOCS/validatorCSS.png">

- JavaScript:
No errors when passed through JS hint


## Lighthouse

- LightHouse Scores:

<br>

<img src = "DOCS/lighthouse.png">

<br>

# General Testing

- After the site was put through w3 validators, the site was tested for functionality.
- Functionality testing involved ensuring all links were active, that all user submissions worked and displays worked correctly
- Testing also involved general layout testing of alternate design choices before the ones used were settled upon
- The Site was Manually tested to ensure all Warning signs, Rules, Instructions etc. displayed correctly (see Images Above for Displays)
- The Site was tested to ensure User Input had the desired effect in Usernames (Correct Warning), Answers Correct and Incorrect were displayed correctly and Reveal Answers/Time out displayed the Answers (See Images above for Displays)
- The Site was tested using numbers, symbols, spaces, less than 3 letters and more than 10 letters in the Username input field to ensure the correct warning was given
- The site was tested by selecting Zero Categories and more than Five Categories to ensure the correct warning was displayed.
- The site was tested to ensure that the Categories gave the correct corresponding questions of that category
- The site was tested to ensure the score was measured correctly and that once an answer was revealed the answer was no longer "Clickable"
- The Site was tested by putting in a false Fetch URL to ensure that the warning and the fallback questions were loaded
#### The Site was tested both through GitHub and on the deployed site [Online Quiz](https://forgottenit.github.io/Quiz-Project/index.html) with different screen sizes to ensure Media Queries and Animations worked correctly

# Deployment
Following writing the code, then committing and pushing to GitHub, this project was deployed using GitHub by the following steps.
-	Navigate to the repository on GitHub and click 'Settings'.
-	Then select 'Pages' on the side navigation.
-	Select the 'None' dropdown, and then click 'master'.
-	Click on the 'Save' button.
#### Now the website is now live on  [Online Quiz](https://forgottenit.github.io/Quiz-Project/index.html)
-	If any changes are required, they can be done, committed and pushed to GitHub and the changes will be updated.
#### The GitHub Link is [GitHub Quiz](https://github.com/Forgottenit/Quiz-Project)


 
# Credits
## For coding help and advice
-	Simen Daehlin
-	Rohit Sharma
-	CodeInstitiute
-   Stack Overflow
-   https://bost.ocks.org/mike/shuffle/ for fisher-yates shuffle 
 
## For content and style 
-   https://ui.dev/amiresponsive? for README image 
-	CodeInstitute
-	W3Schools.com
-   https://stackoverflow.com/
-   https://bost.ocks.org/mike/shuffle/ for fisher-yates shuffle

