document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

const rides = document.querySelector(".rides")
const searchbutton = document.querySelector(".searchButton")
const lat = document.querySelector(".lat")
const long = document.querySelector(".long")
const search = document.querySelector(".search")
const dist = document.querySelector(".Dist")
const SaveBtn = document.querySelector(".svBtn")
const savedRides = document.querySelector("#savedRides")
const trailsDB = 'http://localhost:3000/trails'
const userDB = 'http://localhost:3000/users'
const showUsersDB = `http://localhost:3000/users/${localStorage.getItem('user')}`
//const geoButton = document.querySelector(".geobutton")


searchbutton.addEventListener('click',event =>{
  firstname = document.querySelector(".first")
  lastname = document.querySelector(".last")

    const latitude = lat.value
    const longitude = long.value
    const distance = dist.value
    const uLastname = lastname.value
    const uFirstname = firstname.value
    searchApi(latitude, longitude, distance)
    generateUserPost(uFirstname, uLastname)
})

savedRides.addEventListener('click',event =>{
  console.log("You Clicked My Saved Rides")
  getSavedRides()
  createSidecard()
})


  function getLocation() {
    console.log(navigator.geolocation.getCurrentPosition(window.location))
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        let lati = position.coords.latitude
        let longi = position.coords.longitude
        console.log(lati)
        console.log(longi)
        showPosition(lati, longi);
        });
    // navigator.geolocation.getCurrentPosition(showPosition(position));
    } else { 
      console.log(lat.innerHTML = "Geolocation is not supported by this browser.");
    }
  }
  
  function showPosition(lati, longi) {
    console.log(lati)
    console.log(longi)
    lat.innerText = lati
    search.appendChild(lat)
    long.innerText = longi
    search.appendChild(long)
  }

  function searchApi(latitude, longitude, distance){
      Api = `https://www.mtbproject.com/data/get-trails?lat=39.754185&lon=-105.2305&maxDistance=100&maxResults=150&key=200542632-6cf320d9c23f0a8db10aab395888ac94`
    //Api = https://www.mtbproject.com/data/get-trails?lat=${latitude}&lon=${longitude}&maxDistance=${distance}&maxResults=75&key=200542632-6cf320d9c23f0a8db10aab395888ac94`
      fetch(Api)
      .then(parseJSON)
      .then(iterateAPI)
}

function parseJSON(API){
    return API.json()
    }

    function iterateAPI(result){
    result.trails.forEach(trail => {
        createCard(trail)
     });
        }

        function createCard(trail){
          const ridecrd = document.createElement("div")
          const h2 = document.createElement("h2")
          const img = document.createElement("img")
          const trailStat = document.createElement("p")
          const length = document.createElement("p")
          const difficulty = document.createElement("p")
          const rting = document.createElement("p")
          const ascDesc = document.createElement("p")
          const svBttn = document.createElement("button")
          const link = document.createElement("a")

          h2.innerText = trail.name
          svBttn.innerText = "Save Me"
          trailStat.innerText = `Current Condition: ${trail.conditionStatus}`
          img.src = trail.imgSmall
          ascDesc.innerText = `Elevation change: +${trail.ascent}/${trail.descent}`
          rting.innerText = `Rating: ${trail.stars}`
          difficulty.innerText = `Difficulty: ${trail.difficulty}`
          length.innerText = `Length: ${trail.length} miles`

          img.setAttribute("class", "imgCls")
          h2.setAttribute("class", "trlttl")
          rting.setAttribute("class", "rtingT")
          trailStat.setAttribute("class", "trailStatus")
          difficulty.setAttribute("class", "diff")
          ascDesc.setAttribute("class", "AscDesc")
          length.setAttribute("class", "trailLength")
          svBttn.setAttribute("class", "svBtn")
          link.setAttribute("href",`${trail.url}`)
          link.innerHTML = "Info"
          link.setAttribute("class","trlUrl" )
          ridecrd.dataset.currentUserId = 


          rides.appendChild(ridecrd)
          ridecrd.appendChild(h2)
          ridecrd.appendChild(img)
          ridecrd.appendChild(difficulty)
          ridecrd.appendChild(length)
          ridecrd.appendChild(ascDesc)
          ridecrd.appendChild(rting)
          ridecrd.appendChild(trailStat)
          ridecrd.appendChild(link)
          ridecrd.appendChild(svBttn)
        }

        rides.addEventListener("click", event =>{const SaveBtn = document.querySelector(".svBtn")
          console.log("I Was Clicked")
          
          const postItem = event.target.parentNode
          generateTrailPost(postItem)
        })

          function generateTrailPost(postItem){
            console.log(postItem)
            title = postItem.querySelector(".trlttl")
            difficulty = postItem.querySelector(".diff")
            rating = postItem.querySelector(".rtingT")
            webAddress = postItem.querySelector(".trlUrl")
            image = postItem.querySelector(".imgCls")
            trailDist = postItem.querySelector(".trailLength")
            eChange = postItem.querySelector(".AscDesc")
            firstname = document.querySelector(".first")
            lastname = document.querySelector(".last")


            let newTrailObj = {
              name: title.innerText,
              difficulty: difficulty.innerText,
              rating: rating.innerText,
              url: webAddress.innerHTML, 
              img: image.innerText,
              length: trailDist.innerText,
              eChange: eChange.innerText,
              user_id: localStorage.getItem('user')
              }
              trailPostReq(newTrailObj)
            }

            function generateUserPost(uFirstname, uLastname){
              let newUserObj = {
                firstname: uFirstname,
                lastname: uLastname 
                }
                userPostReq(newUserObj)
              }

              function trailPostReq(newTrailObj){
                fetch(trailsDB, {
                  method:'POST',
                  headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newTrailObj)
                })
              }

                function userPostReq(newUserObj){
                  fetch(userDB, {
                    method:'POST',
                    headers:{
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUserObj)
                  })
                    .then(parseJSON)
                    .then(saveUser)
              }

              function saveUser(result){
                 localStorage.setItem('user',result.id)
                 localStorage.setItem('firstname',result.firstname)
                 localStorage.setItem('lastname', result.lastname)
              }
              function getSavedRides(){
                fetch(showUsersDB)
                .then(parseJSON)
                .then(createSidecard)
              }
              function createSidecard(result){
                console.log(result.trails)
              const userCard = document.createElement("div")
              const srTitle = document.createElement("h2")
              const simg = document.createElement("img")
              const strailStat = document.createElement("p")
              const slength = document.createElement("p")
              const sdifficulty = document.createElement("p")
              const srting = document.createElement("p")
              const sascDesc = document.createElement("p")
              const delBttn = document.createElement("button")
              const slink = document.createElement("a")
              
                    srTitle.innerText = trail.name
                    delBttn.innerText = "Delete"
                    strailStat.innerText = `Current Condition: ${trail.conditionStatus}`
                    simg.src = trail.imgSmall
                    sascDesc.innerText = `Elevation change: +${trail.ascent}/${trail.descent}`
                    srting.innerText = `Rating: ${trail.stars}`
                    sdifficulty.innerText = `Difficulty: ${trail.difficulty}`
                    slength.innerText = `Length: ${trail.length} miles`

                    slink.setAttribute("href",`${trail.url}`)
                    slink.innerHTML = "Info"
                    slink.setAttribute("class","trlUrl" )
                    

                  }

              })
              
