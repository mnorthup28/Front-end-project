const btn = document.getElementById("generate");
btn.addEventListener("click", nextQuestion);

function nextQuestion() {
  const quiz = document.getElementById("quiz");
  const h3 = document.createElement("H3");
  const p = document.createElement("p");

  $.get("https://opentdb.com/api.php?amount=1", (data) => {
    for (let el in data.results) {
      //console.log(data.results)
      let answers = [
        data.results[0].correct_answer,
        data.results[0].incorrect_answers,
      ];
      function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      shuffle(answers);
      //console.log(answers)
      let question = data.results[0].question;
      h3.innerHTML = question;
      p.innerHTML = answers;
      quiz.appendChild(h3);
      quiz.appendChild(p);

      // create a way to answer

      //create a way to submit answer
      let input = document.createElement("input");
      let submit = document.createElement("input");
      submit.setAttribute("type", "submit");
      submit.setAttribute("value", "submit");
      quiz.appendChild(input);
      quiz.appendChild(submit);

      // make an alert to say if it is correct or incorrect (end game if incorrect)
      submit.addEventListener("click", function () {
        if (
          input.value.toLowerCase() ===
          data.results[0].correct_answer.toLowerCase()
        ) {
          $("h1").addClass("bounce");
          $("img").addClass("bounce");
          console.log("True");
          setTimeout(function () {
            $("img").removeClass("bounce");
          }, 3000);
          setTimeout(function () {
            $("h1").removeClass("bounce");
          }, 3000);
          nextQuestion();
        } else {
          $("body").addClass("melt-away");
          alert("This answer is incorrect. Please try again later.");
          setTimeout(function () {
            $("body").addClass("fireball-explosion");
          }, 1000);
          setTimeout(function () {
            location.reload();
          }, 1700);
          // add a melt away feature or something
        }
      });
    }
  });
}
