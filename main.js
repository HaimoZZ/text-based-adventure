var story; 
function getStory(name) {
return {
            currentScene:"attack",
            attack: {
            title: "Chapter 1"
            , story: `Once upon a time there was a group of soldiers that were called the Puppirebellion, they elite of all soldiers. They had fought many battles and won. But this time they had to overcome the biggest army of all time...This man was one of them: ${name}, and this is his/her story.`
            , choices: [
            {
            choice: "Okay, i'll tell you my story!",
            destination: 'battle'
            },
        {
            choice: "Nah I got no time to tell you my story.",
            destination: 'tooBusy'
            }
        ]
    },
        battle: {
            title: 'The first battle for the Puppirebellion',
            story: `It's the kittin empire! Fight them immediately! Charge!!!!`,
            choices: [
            {
            choice: "Shoot your rifle.",
            destination: 'rifle'
            },
        {
            choice: "Charge with bayonet.",
            destination: 'bayonet',
            }
        ]
    }, 
        tooBusy: {
            title: "Gone back to play video games, Aaaah......",
            story: "Finally, back at home, time to play some video games!",
            image: "videogames.png",
            defaultDestination: 'attack',
            buttonText: "Let's try this again.",
            }
        }
    }
        document.addEventListener('DOMContentLoaded', function(){
    var button = document.querySelector('#start-button')
    var input = document.querySelector('#name-input')
    var content = document.querySelector('#content')
    button.addEventListener('click', function() {
        var name = document.querySelector('#name-input')
        story = getStory(name.value)
        renderScene()
    })    
})

function renderScene(){
    var text = "Next"
    var image = "";
    if (story[story.currentScene].image)
    image = "<img></img>"
    if (story[story.currentScene].buttonText){
        text = story[story.currentScene].buttonText
    }
    content.innerHTML = `
    <h1>${story[story.currentScene].title}<h1>
    <p>${story[story.currentScene].story}</p>
    ${image}
    ${getInputs()}
   <button id = "submit-button">${text}</button>
    ` 
    if (story[story.currentScene].image) {
        document.querySelector("img").src = `./img/${story[story.currentScene].image}`
    }
    var button = document.querySelector("#submit-button");
    button.addEventListener('click', function() {
     getInputValue()
    })
}
function getInputValue() {
    var inputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            story.currentScene = inputs[i].getAttribute('data-destination')
            renderScene();
            return;
        }
    }
    story.currentScene = story[story.currentScene].defaultDestination
    renderScene()
}

function getInputs() {
    var input = ""
    if (!story[story.currentScene].choices) {
        return ""
    }
    for(var i = 0; i < story.attack.choices.length; i++) {
        input += `
        <div>
        <input data-destination = ${story[story.currentScene].choices[i].destination} id = "radio${i}" type = "radio" name = "choices" />
        <label for "radio${i}">${story[story.currentScene].choices[i].choice}</label>
    </div>
    `
 }
    return input;
}