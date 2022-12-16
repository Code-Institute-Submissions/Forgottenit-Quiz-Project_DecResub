let gameChoices = [];
let fetchArray = [];

//Function to Clear local storage and return to Home Page
function homeClear() {
    localStorage.clear();
    window.location.href = "index.html";
}

//Function to Fetch game choice category list
function getCategories() {
    fetch("https://opentdb.com/api_category.php")
        .then(res => res.json())
        .then(categories => {
            gameChoices.push(...categories.trivia_categories);
            displayCategories();
        })
        .catch(err => fetchWarning());
}

//Function to display category lists and split title if it contains ":" then display titles to user 
function displayCategories() {
    document.querySelector("#quiz-choice").innerHTML = (`Hello ${localStorage.getItem("username")}, Please choose your categories (maximum of 5)`);
    for (i = 0; i < 15; i++) {
        let categoryChoice = document.querySelector(".selection");
        let categories = document.createElement("input");
        let categoriesLabel = document.createElement("label");
        categories.classList = "checkbox";
        categories.value = [i + 9];
        categories.type = "checkbox";
        categories.id = [i + 9];
        categories.checked = false;
        categoriesLabel.classList = "select flex";

        //If title contain a ":" it is split to remove first word/words before the ":"
        if (gameChoices[i].name.includes(":")) {
            splitCategory = gameChoices[i].name.split(":");
            newCategory = splitCategory[1]
        } else newCategory = gameChoices[i].name;

        categoriesLabel.innerHTML = (newCategory);
        categoriesLabel.appendChild(categories);
        categories.innerHTML = (`${gameChoices[i].id} ${gameChoices[i].name}`);
        categoryChoice.appendChild(categoriesLabel);
    }
    changeURL();
}

// Function to find out what checkboxes are checked
function changeURL() {
    let checkedBox = document.querySelectorAll('input[type="checkbox"]:checked');
    checkedBox.forEach(element => {
        fetchArray.push(["https://opentdb.com/api.php?amount=10&category=" + element.value + "&type=multiple"]);
    });
    for (i = 0; i < fetchArray.length; i++) {
        localStorage.setItem(`genUrl${[i]}`, fetchArray[i]);
        localStorage.setItem("fetchArrayLength", fetchArray.length);
    }
    /*N.B. limited to a maximum of 50 questions fetch by Opentdb (Fetch source)
        So a warning displayed if the user selects none or more than 5 categories
        or loads quiz if selection is ok
    */
    let submitCategories = document.querySelector("#submit-categories");
    submitCategories.addEventListener("click", e => {
        if (fetchArray.length > 5 || fetchArray.length == 0) {
            displayWarning();
        } else
            setTimeout(() => {
                window.location.href = "quiz.html";
            }, 1000);
    });
}

//Function that displays the warning modal and hides it if user clicks span or window
function displayWarning() {
    let warning = document.getElementById("warning");
    //display warning
    warning.style.display = "block";


    let warningSpan = document.getElementsByClassName("close-warning")[0];

    // reset page if span/ "x" is clicked
    warningSpan.onclick = function () {
        window.location.href = "quizchoice.html";
    }
    // reset page if window is clicked
    window.onclick = function (event) {
        if (event.target == warning) {
            window.location.href = "quizchoice.html";
        }
    }
}

//Function that displays the Fetch warning modal if Fetch fails and hides it if user clicks span or window
function fetchWarning() {
    let fetchwarning = document.getElementById("fetchwarning");

    //Display the Fetch Warning
    fetchwarning.style.display = "block";

    let fetchwarningSpan = document.getElementsByClassName("close-fetchwarning")[0];

    // Load the back up quiz if user clicks span/"x"
    fetchwarningSpan.onclick = function () {
        window.location.href = "quiz2.html";
    }
    // Load the back up quiz if user clicks outside window
    window.onclick = function (event) {
        if (event.target == fetchwarning) {
            window.location.href = "quiz2.html";
        }
    }
}

//Function that displays the Rules modal and hides it if user clicks span or window
function displayRules() {

    let rules = document.getElementById("rules");

    //Display the rules
    rules.style.display = "block";

    let rulesSpan = document.getElementsByClassName("close-rules")[0];

    //Hide Rules if user clicks span/"x"
    rulesSpan.onclick = function () {
        rules.style.display = "none";
    }
    //Hide Rules if user clicks window
    window.onclick = function (event) {
        if (event.target == rules) {
            rules.style.display = "none";
        }
    }
}