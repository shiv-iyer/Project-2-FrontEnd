/* export every function for validation */

// take in the parameter you want to validate, then validate the inputs with individual cases
// return the error message
export const validateName = (name) => {
    if (!name)
        return "Please enter a name!"; 
    if (name.length > 10)
        return "name too long bitch";
}