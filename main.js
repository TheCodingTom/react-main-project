

// Make a request for a user with a given ID
axios.get('https://thesimpsonsapi.vercel.app')
  .then(function (res) {
    let thesimpsons = res.data
    // Access all Homer's data
    console.log(thesimpsons.homer)
    // Get name
    console.log(thesimpsons.homer.name)
    // Get age
    console.log(thesimpsons.homer.age)
    // Get url image
    console.log(thesimpsons.homer.img)
    // Get description
    console.log(thesimpsons.homer.description)
    //You can try with other characters too!
    console.log(thesimpsons.marge) //Access Marge's object
    console.log(thesimpsons.bart) //Access Bart's object
    console.log(thesimpsons.lisa) //Access Lisa's object
    console.log(thesimpsons.maggie) //Access Maggie's object
  })