$(document).ready(function () {
    var carApiKey = "Ot4VrHOqlIfQOuSpvIX7bVnxMGTnuDAd"

    var location
    var locationResult
    var locationURL
    var latitude
    var longitude
    var carResults

    function createCars(carResults) {
        $("#appendCars").empty()
        for (i = 0; i < carResults.length; i++) {
            $("#appendCars").append(
                `<div class="card" style="width: 18rem;">
       <img src=${carResults[i].media.photo_links[0]} class="card-img-top">
       <div class="card-body">
           <h5 class="card-title"></h5>
           <p class="card-text">${nameT} <span id="name${i}">${carResults[i].heading}</span></p>
           <p class="card-text">${priceT} <span id="price${i}">$ ${carResults[i].price}</span></p>
           <p class="card-text">${mileageT}<span id="miles${i}">${carResults[i].miles}</span></p>
           <p class="card-text">${dealerNameT} <span id="dealerName${i}">${carResults[i].dealer.name}</span></p>
           <p class="card-text">${dealerZipT} <span id="dealerZip${i}">${carResults[i].dealer.zip}</span></p>
           <a href=${carResults[i].vdp_url} class="btn btn-primary" id="details">${detailsT}</a>
       </div>
   </div>`
            );
        }
    }
    //puts user inputs into variables, creates url to translate current location (free text) into geocoordinates
    function setSearchVars() {
        location = $("#location").val();
        year = $("#year").val();
        make = $("#make").val();
        model = $("#model").val();
        locationURL = `https://nominatim.openstreetmap.org/search?q=${location}&&format=json`;
    }
    //takes geocoords and returns object of cars in a 50 mile radius from those coords
    function returnCars(response) {
        latitude = response[0].lat;
        longitude = response[0].lon;
        // carURL = "https://csa-proxy.herokuapp.com/search"

        carURL = `https://csa-proxy.herokuapp.com/search?api_key=${carApiKey}&year=${year}&make=${make}&model=${model}&latitude=${latitude}&longitude=${longitude}&radius=50&car_type=used&start=0&rows=16`
        $.ajax({
            url: carURL,
            method: "GET"
        }).then(function (response) {
            carResults = response.listings
            createCars(carResults)
        })
    }
    //sets the search variables, gets location data returned from the maps api, punches that into the car search, executes car search
    $("#carSearch").on("click", function () {
        setSearchVars()
        $.ajax({
            url: locationURL,
            method: "GET"
        }).then(function (response) {
            returnCars(response);
        })
    });
    //re-searches the api based on saved searches 
    $(document).on("click", ".saved-search", function () {
        carURL = $(this).attr("value")
        $.ajax({
            url: carURL,
            method: "GET"
        }).then(function (response) {
            carResults = response.listings
            createCars(carResults)
        })
    });
})