window.onload = () => {
    if (sessionStorage.getItem("linkedItems") == null) {
        $(".image-container").append(`
        <h2 class="error">No data found</h2>
        `);
    }
    else {
        //fetch data
        const data = JSON.parse(sessionStorage.getItem("linkedItems"));
        data.sort((a,b)=> (a.email > b.email ? 1 : -1));

        //add images to separate carousels
        let old_email;

        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                $(".image-container").append(`
                <div class="image-container--item">
                <h2 class="email">${data[i]["email"]}</h2>
                <div class="carousel">
                <div class="col-6 col-lg-4">
                <img class="image" src="${data[i]["image"]}" alt="Saved Image">
                </div>
                `);
                old_email = data[i]["email"];
            }
            else if (old_email == data[i]["email"]) {
                $(".image-container--item:last-child .carousel:last-child").append(`
                <div class="col-6 col-lg-4">
                <img class="image" src="${data[i]["image"]}" alt="Saved Image">
                </div>
                `);
            }
            else {
                $(".image-container").append(`
                </div>
                </div>
                <div class="image-container--item">
                <h2 class="email">${data[i]["email"]}</h2>
                <div class="carousel">
                <div class="col-6 col-lg-4">
                <img class="image" src="${data[i]["image"]}" alt="Saved Image">
                </div>
                `);
                old_email = data[i]["email"];
            }
        }
        $(".image-container").append(`</div></div>`);
    }
}