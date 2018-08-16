// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");
$(function () {
  var utellyUrl = "https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?";
  var tmdbUrlBasic = "https://api.themoviedb.org/3/search/";
  var tmdbUrlPoster = "http://image.tmdb.org/t/p/w185/";
  var tmdbPersonByName = "https://api.themoviedb.org/3/search/person";
  var tmdbPersonByID = "https://api.themoviedb.org/3/person/";
  var tmdbDiscover = "https://api.themoviedb.org/3/discover/";
  var omdbUrl = "http://www.omdbapi.com/";
  var utellyAPI = 'JFBfbDiSaimshBIIJ0KGCWkf3AyAp1jzmhCjsncKy5RpMzzONS';
  var tmdbAPI = 'a012a678bc4826e1cef39e62f3e9f471';
  var omdbAPI = '7e561c3d';

  var $options = $("#options");
  var $modalContent = $("#modal-content");

  // var getData = function (url) {
  //   return $.ajax({
  //     url: url,
  //     method: "GET"
  //   });
  // };

  // var getUtellyData = function (url) {
  //   return $.ajax({
  //     url: url,
  //     headers: { "X-Mashape-Key": utellyAPI },
  //     method: "GET"
  //   });
  // }

  // function plusIt(val) {
  //   return val.replace(/ /g, "+");
  // }
  M.AutoInit();
  $('.modal').modal();

  function plusIt(val) {
    return val.replace(/ /g, "+");
  }

  function getPersonByName(person) {
    var personNameUrl = tmdbPersonByName + "?api_key=" + tmdbAPI + "&query=" + person;

    $.ajax({
      url: personNameUrl,
      method: "GET"
    })
      //on response
      .then(function (res) {
        var length = res.results.length;

        if (length === 0) {
          return;
        }
        getPersonByID(person, res.results[0].id);
      });
  }

  function getPersonByID(person, id) {
    var personIDUrl = tmdbPersonByID + id + "?api_key=" + tmdbAPI;

    $.ajax({
      url: personIDUrl,
      method: "GET"
    })
      //on response
      .then(function (res) {
        var src = tmdbUrlPoster + res.profile_path;
        var bio = res.biography;
        bio = bio.replace(/"/g, "&#34;");
        bio = bio.replace(/'/g, "&#39;");

        $("span[data-person='" + person + "']").html("<a data-src='" + src + "' data-bio='" + bio + "' class='person modal-trigger' href='#modal1'>" + person + "</a>");
      });
  }

  function getGenreName(array, id) {
    var el;

    switch (id) {
      case 28:
        el = "Action";
        break;
      case 12:
        el = "Adventure";
        break;
      case 10759:
        el = "Action & Adventure";
        break;
      case 16:
        el = "Animtation";
        break;
      case 35:
        el = "Comedy";
        break;
      case 80:
        el = "Crime";
        break;
      case 99:
        el = "Documentary";
        break;
      case 18:
        el = "Drama";
        break;
      case 10751:
        el = "Family";
        break;
      case 14:
        el = "Fantasy";
        break;
      case 36:
        el = "History";
        break;
      case 27:
        el = "Horror";
        break;
      case 10762:
        el = "Kids";
        break;
      case 10402:
        el = "Music";
        break;
      case 9648:
        el = "Mystery";
        break;
      case 10763:
        el = "News";
        break;
      case 10764:
        el = "Reality";
        break;
      case 10749:
        el = "Romance";
        break;
      case 10765:
        el = "Sci-Fi & Fantasy";
        break;
      case 878:
        el = "Science Fiction";
        break;
      case 10766:
        el = "Soap";
        break;
      case 10767:
        el = "Talk";
        break;
      case 10770:
        el = "TV Movie";
        break;
      case 53:
        el = "Thriller";
        break;
      case 10752:
        el = "War";
        break;
      case 10768:
        el = "War & Politics";
        break;
      case 37:
        el = "Western";
        break;
    }

    array.push(el);
  }

  function getMembers(data, memberCat, $titleInfo) {
    var members = data[memberCat];

    if (members && members !== "N/A") {
      var membersArray = members.split(", ");

      var membersStr = "<p>" + memberCat + ": ";

      membersArray.forEach(function (el, index, array) {
        membersStr += "<span data-person='" + el + "'>" + el + "</span>";

        if (index !== array.length - 1) {
          membersStr += ", ";
        }

        getPersonByName(el);
      });

      membersStr += "</p>";
    }

    $titleInfo.append(membersStr);
  }


  // // The API object contains methods for each kind of request we'll make
  var API = {
    searchUtelly: function (url) {
      return $.ajax({
        url: url,
        headers: { "X-Mashape-Key": utellyAPI },
        method: "GET"
      });
    },
    searchMDB: function (url) {
      return $.ajax({
        url: url,
        method: "GET"
      });
    }
    // },
    // getExamples: function() {
    //   return $.ajax({
    //     url: "api/examples",
    //     type: "GET"
    //   });
    // },
    // deleteExample: function(id) {
    //   return $.ajax({
    //     url: "api/examples/" + id,
    //     type: "DELETE"
    //   });
    // }
  };

  // // refreshExamples gets new examples from the db and repopulates the list
  // var refreshExamples = function() {
  //   API.getExamples().then(function(data) {
  //     var $examples = data.map(function(example) {
  //       var $a = $("<a>")
  //         .text(example.text)
  //         .attr("href", "/example/" + example.id);

  //       var $li = $("<li>")
  //         .attr({
  //           class: "list-group-item",
  //           "data-id": example.id
  //         })
  //         .append($a);

  //       var $button = $("<button>")
  //         .addClass("btn btn-danger float-right delete")
  //         .text("ｘ");

  //       $li.append($button);

  //       return $li;
  //     });

  //     $exampleList.empty();
  //     $exampleList.append($examples);
  //   });
  // };

  // // handleFormSubmit is called whenever we submit a new example
  // // Save the new example to the db and refresh the list
  // var handleFormSubmit = function(event) {
  //   event.preventDefault();

  //   var example = {
  //     text: $exampleText.val().trim(),
  //     description: $exampleDescription.val().trim()
  //   };

  //   if (!(example.text && example.description)) {
  //     alert("You must enter an example text and description!");
  //     return;
  //   }

  //   API.saveExample(example).then(function() {
  //     refreshExamples();
  //   });

  //   $exampleText.val("");
  //   $exampleDescription.val("");
  // };

  // // handleDeleteBtnClick is called when an example's delete button is clicked
  // // Remove the example from the db and refresh the list
  // var handleDeleteBtnClick = function() {
  //   var idToDelete = $(this)
  //     .parent()
  //     .attr("data-id");

  //   API.deleteExample(idToDelete).then(function() {
  //     refreshExamples();
  //   });
  // };

  // // Add event listeners to the submit and delete buttons
  // $submitBtn.on("click", handleFormSubmit);
  // $exampleList.on("click", ".delete", handleDeleteBtnClick);


  var $basic = $("#basic");
  var $basicSearch = $("#basicSearch");
  var $advanced = $("#advanced");
  var $advancedSearch = $("#advancedSearch");
  var $options = $("#options");
  var $modalContent = $(".modal-content");

  $basic.on("submit", function (e) {
    e.preventDefault();

    $options.empty();

    var val = $basicSearch.val().trim();
    $basicSearch.val("");
    if (val === "") {
      return;
    }

    var movie = $("[id='movieRadioBasic']:checked").val();
    var tv = $("[id='tvRadioBasic']:checked").val();

    var type;

    if (movie === "on") {
      type = "movie";
    }
    else if (tv === "on") {
      type = "tv";
    }

    var plusedTitle = plusIt(val);
    var searchURL = utellyUrl + "country=us&term=" + plusedTitle;

    var titlesArray = [];

    API.searchUtelly(searchURL).then(function (res) {

      var length = res.results.length;

      if (length === 0) {
        $options.text("NO RESULTS FOUND FOR " + originalVal);
        return;
      }

      if (length > 3) {
        length = 3;
      }

      for (var i = 0; i < length; i++) {
        var resultStr = "<div class='row'><div class='col s12'><ul class='collapsible'><li><div class='collapsible-header'>";
        let title = res.results[i].name;
        resultStr += title + "</div><div class='collapsible-body white'><div class='row'><div class='col s4' data-titlePoster='" + title + "'></div><div class='col s8' data-titleInfo='" + title + "'><p>";

        res.results[i].locations.forEach(function (el) {
          var resultUrl = el.url;
          var resultName = el.display_name;

          if (resultName === "Netflix") {
            resultUrl = resultUrl.replace(/nflx/, "https");
          }
          resultStr += "<span><a href='" + resultUrl + "' target='_blank'>" + resultName + "</a> </span>";
        });
        resultStr += "</p></div></div></div></li></ul></div></div>";
        $options.append(resultStr);

        var oUrl = omdbUrl + "?apikey=" + omdbAPI + "&t=" + title;
        var tUrl = tmdbUrlBasic + type + "?api_key=" + tmdbAPI + "&query=" + title;

        Promise.all([API.searchMDB(oUrl), API.searchMDB(tUrl), title]).then(function (data) {
          var $titleInfo = $("div[data-titleInfo='" + title + "']");

          var tmdbLength = data[1].results.length;

          if (tmdbLength === 0) {
            $titleInfo.append("<p>No info returned from TMDB</p>");
          }
          else {

            var genreArray = data[1].results[0].genre_ids;

            if (genreArray.length !== 0) {
              var genreStr = "<p>Genre: ";

              var genreArrayNames = [];

              genreArray.forEach(function (el) {
                getGenreName(genreArrayNames, el);
              });


              genreStr += genreArrayNames.join(', ') + "</p>";

              $titleInfo.append(genreStr);
            }
            var voteAverage = data[1].results[0].vote_average;

            $titleInfo.append("<p>Voter average: " + voteAverage + "/10</p>");

            var posterPath = data[1].results[0].poster_path;

            if (posterPath !== null) {
              var imgSrc = tmdbUrlPoster + posterPath;
              $("div[data-titlePoster='" + title + "']").append("<img src='" + imgSrc + "'>");
            }
          }

          getMembers(data[0], "Director", $titleInfo);
          getMembers(data[0], "Writer", $titleInfo);
          getMembers(data[0], "Actors", $titleInfo);

          if (tmdbLength !== 0) {
            $titleInfo.append("<p>Plot: " + data[1].results[0].overview + "</p>");
          }
        });
      }

      $('.collapsible').collapsible();
    });
  });

  $(document).on("click", ".person", function () {
    var personSrc = $(this).attr("data-src");
    var personBio = $(this).attr("data-bio");


    $modalContent.html("<div class='row'><div class='col s4'><img src='" + personSrc + "'></div><div class='col s8'>" + personBio + "</div></div>");
  });
});
