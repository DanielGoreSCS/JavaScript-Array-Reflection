//Add error border and error message
function setError (i, errorMessage) {
    $($form[i]).css({"border": "solid 2px red", "margin-top": "0"});
    $($form[i]).prev().text(`${errorMessage}`);
}
//Remove error border and error message
function removeError (i) {
    $($form[i]).removeAttr("style");
    $($form[i]).prev().text("");
}

//Check if form field is valid
function validateForm(event) {
    $form = $(".form-control");
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errorCount = 0;
    for (let i = 0; i < $form.length; i++) {
        if ($form[i].required) {
            //If form field empty
            if ($form[i].value === "") {
                //Call setError
                errorCount += 1;
                setError(i, "Please enter your email address");
            }
            else if ($($form[i]).attr("id") === "email") {
                if (emailRegex.test($form[i].value) !== true) {
                    //Call setError
                    errorCount += 1;
                    if ($form[i].validationMessage !== "") {
                        setError(i, $form[i].validationMessage);
                    }
                    else {
                        setError(i, `Please enter a part following '${$form[i].value}'. E.G. '.com'.`)
                    }
                }
                else {
                    removeError(i);
                }
            }
            else {
                removeError(i);
            }
        }
    }
    if (errorCount === 0) {
        let formData = $form[0].value;
        $form[0].value = "";
        //Save email and image
        let randSeed = $(".image-random")[0].src;

        let newItem = {
            email: formData,
            image: randSeed
        };
        
        //Create array if it does not exist
        if (sessionStorage.getItem("linkedItems") == null) {
            sessionStorage.setItem("linkedItems", "[]");
        }
        
        //fetch old data and add new data
        let old_data = JSON.parse(sessionStorage.getItem("linkedItems"));
        old_data.push(newItem);
        
        //Change old_data into a JSON string and save it to session storage as linkedItems
        sessionStorage.setItem("linkedItems", JSON.stringify(old_data));
        generateImage();
    }
}

function generateImage() {
    let randSeed = Math.ceil(Math.random()*10000);
    if ($(".image-container").children().length > 0) {
        $(".image-container").children().remove();
    }
    $(".image-container").append(`
    <img class="image-random" src="https://picsum.photos/seed/${randSeed}/1280/720" alt="Random Image">
    `);
}

$(".btn--view").on("click", () => {
    let history = sessionStorage.getItem("linkedItems");
    console.log(history);
})

window.onload = () => {
    generateImage();
}