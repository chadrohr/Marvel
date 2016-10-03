function MarvelService() {
    var key = '?apikey=e44062bbc76b37176b08325d5265a0f3';
    var baseUrl = 'http://gateway.marvel.com/v1/public/'

    var dataStore = this;
    var marvelCharacters = [];
    var myCharacters = [];


    dataStore.getMarvelCharacters = function () {
        //what should this function return
        return marvelCharacters;

    }

    dataStore.getMyCharacters = function () {
        //what should this function return
        return myCharacters;
    }



    dataStore.addToMyCharacters = function (id) {
        //in order to add a character to your list you will first need to find 
        //the character by its id in the marvelCharacters array

        for (var i = 0; i < marvelCharacters.length; i++) {
            var character = marvelCharacters[i];
            if (character.id == id) {
                myCharacters.push(character);
                marvelCharacters.splice(i,1);
            }
        }
    }

    dataStore.removeMyCharacter = function (id) {
        //you need to find the character that you want to remove by its id
        //and remove it.
        for (var i = 0; i < myCharacters.length; i++) {
            var character = myCharacters[i];
            if (character.id == id) {
                marvelCharacters.push(character);
                myCharacters.splice(i,1);
        
            }
        }
        return
    }

    dataStore.getCharacters = function (callWhenDone) {
        var data = localStorage.getItem('MarvelData')
        if (data) {
            marvelCharacters = JSON.parse(data);
            return callWhenDone(marvelCharacters)
        }
        $.get(baseUrl + 'characters' + key, function (response) {
            localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
            marvelCharacters = response.data.results;
            callWhenDone(marvelCharacters)
        })
    }


}