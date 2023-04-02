/* export every function for validation */

// take in the parameter you want to validate, then validate the inputs with individual cases
// return the error message
export const validateName = (name) => {
    if (!name)
        return "Please enter a name!"; 
    // if it's only whitespace; using regex (logic: replace all white space characters with an empty character, if resulting length
    // if 0, it means the only characters in the string were regex)
    if (!name.replace(/\s/g, '').length)
        return "Please don't leave the name blank!";
    if (name.length > 50)
        return "Your name is too long; please enter a shorter name!";
    if (name.length < 7)
        return "Your name is too short; please enter a longer name!";
}

export const validateOverview = (overview) => {
    if (!overview)
        return "Please enter an overview!"
    if (!overview.replace(/\s/g, '').length)
        return "Please don't leave the overview blank!";
    if (overview.length < 30)
        return "Your overview is too short; please enter a longer description of the deck!";
}

export const validateStrategy = (strategy) => {
    if (!strategy)
        return "Please enter a strategy!"
    if (!strategy.replace(/\s/g, '').length)
        return "Please don't leave the strategy blank!";
    if (strategy.length < 50)
        return "Your strategy is too short; please enter a longer tactical description of the deck and its playstyle!";
}

export const validateArchetype = (archetype) => {
    // if archetype is blank (first render), or if the user sets it back to the default option
    if (archetype === "" | archetype === "— Select an Archetype —")
        return "Please select a deck Archetype!";
}