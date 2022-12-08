let gameChoices = [];
let fetchArray = [];

//Function to respond if Response from Fetch not Ok, otherwise return Ok
let fetchCatch = function (response) {
    if (!response.ok) {
        if (confirm("Sorry, there was a problem getting your questions, you can use our 20 stored questions if you want? If not, hit cancel and try again later")) {
            window.location.href = "/quiz2.html";
        } else {
            window.location.href = "index.html";
        }
        throw new Error('There was a problem with the Network response');
    }
    return response;
};
//Function to Fetch game choice category list
function getCategories() {
    fetch("https://opentdb.com/api_category.php")
        .then(fetchCatch)
        .then(res => res.json())
        .then(categories => {
            gameChoices.push(...categories.trivia_categories);
            displayCategories();
        })
        .catch(error => console.log(error));
}

//Function to display category lists
function displayCategories() {
    document.querySelector("#quiz-choice").innerHTML = (`Hello ${localStorage.getItem("username")}, please choose your categories (you can pick a maximum of 5)`);
    for (i = 0; i < 15; i++) {
        let categoryChoice = document.querySelector(".selection");
        let categories = document.createElement("input");
        let categoriesLabel = document.createElement("label");
        categories.classList = "checkbox";
        categories.value = [i + 9];
        categories.type = "checkbox";
        categories.id = [i + 9];
        categories.checked = false;
        categoriesLabel.htmlFor = `${i+9}`;
        categoriesLabel.classList = "select flex";
        categoriesLabel.innerHTML = (`${gameChoices[i].name}`);
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
    //N.B limited to a maximum of 50 questions fetch by Opentdb (Fetch source)
    let submitCategories = document.querySelector("#submit-categories");
    submitCategories.addEventListener("click", e => {
        if (fetchArray.length > 5 || fetchArray.length == 0) {
            if (confirm("Sorry, you have to pick between 1 and 5 categories!")) {
                window.location.href = "quizChoice.html";
            } else {
                window.location.href = "quizChoice.html";
            }
        } else
            setTimeout(() => {
                window.location.href = "quiz.html";
            }, 1000);
    });
}