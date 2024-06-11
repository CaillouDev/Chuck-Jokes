const init = async () => {
  const randomJoke = await getJokes();
  document.getElementById("joke-location").innerText = randomJoke.value;
  sessionStorage.setItem(
    "joke-list",
    JSON.stringify([
      {
        id: 1,
        joke: randomJoke.value,
      },
    ])
  );
  const categoriesList = await getCategories()
  categoriesList.forEach(category=>{
    const option = document.createElement("option")
    option.innerText=category
    document.querySelector("select").appendChild(option)
  })
};

init();

const nextJoke = async () => {
  const newJoke = await getJokes();
  addAndUpdateJokeList(newJoke)
};

const previousJoke = () => {
  const jokeList = JSON.parse(sessionStorage.getItem("joke-list"));
  let currentJokeIndex;
  jokeList.find((joke, index) => {
    if (joke.joke === document.getElementById("joke-location").innerText) {
      currentJokeIndex = index;
    }
  });
  console.log(currentJokeIndex);
  if (currentJokeIndex===1){
    document.getElementById("previous-button").setAttribute("disabled", "disabled")
  }
  document.getElementById("joke-location").innerText =
    jokeList[currentJokeIndex - 1].joke;
  console.log(jokeList);
};

const addAndUpdateJokeList = (newJoke) => {
    document.getElementById("joke-location").innerText = newJoke.value;
  const jokeList = JSON.parse(sessionStorage.getItem("joke-list"));
  jokeList.push({
    id: jokeList.length + 1,
    joke: newJoke.value,
  });
  sessionStorage.setItem("joke-list", JSON.stringify(jokeList));
  document.getElementById("previous-button").removeAttribute("disabled")
}

const searchJoke = async () => {
    const selectedCategory=document.querySelector("select").value;
    const newJoke = await getJokeByCategory(selectedCategory)
    addAndUpdateJokeList(newJoke)
}

document.getElementById("next-button").addEventListener("click", async () => {
  await nextJoke();
});

document.getElementById("previous-button").addEventListener("click", () => {
  previousJoke();
});

document.querySelector("form").addEventListener("submit",async (e) => {
e.preventDefault()
    await searchJoke()
    document.querySelector("option").selected="selected"
})
