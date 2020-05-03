
document.getElementById("pw-generator-btn").addEventListener("click", function(event){
    askingForPasswordReq();
    event.preventDefault();
  });

//Generate PW based on requirements given by user

function generatePassword(characterChoices, pwLength) {

            var newPassword = '';

            //console.log(characterChoices);

            for(var n = 0; n < pwLength; n++) {

                var randomSelector = Math.floor(Math.random() * characterChoices.length);
                //console.log('random index - '+randomSelector);
                newPassword += characterChoices[randomSelector];

            }

            //console.log('new pw - '+newPassword);

            return newPassword;

    }

//Prompts User for requirements of Password
function askingForPasswordReq() {

            //prompt asking for Length of password
            var pwLength = prompt("What is the length of your new password? It must be at least 8 characters and no more than 128 characters.");

            //Continues to check if input is less than 8, greater than 128 or empty/NaN. If so, show warning and ask prompt again
            do{
                
                if(parseInt(pwLength) < 8 || parseInt(pwLength) > 128) {
                    alert("Length of Password was less than 8 or greater than 128. Please enter a different password length.");
                    pwLength = prompt("What is the length of your new password? It must be at least 8 characters and no more than 128 characters.");
                }

                if(pwLength == "" || Number.isNaN(parseInt(pwLength))) {
                    alert("Please enter a number!");
                    pwLength = prompt("What is the length of your new password? It must be at least 8 characters and no more than 128 characters.");
                }
    

            } while(parseInt(pwLength) < 8 || parseInt(pwLength) > 128 || pwLength == "" || Number.isNaN(parseInt(pwLength)))

            pwLength = parseInt(pwLength);

            //Prompt asking for which Character types to include in password
            var characterTypesStr = prompt("Which character types do you want to include in your new password? Separate each type with a comma. Types include numeric, uppercase, lowercase and special characters.");
             
             var lowerCaseStr, upperCaseStr, specialCharStr, numericStr, characterChoices, characterTypeArr;

                characterChoices = '';
                upperCaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                lowerCaseStr = "abcdefghijklmnopqrstuvwxyz";
                numericStr = "0123456789";
                specialCharStr = "!\"$#%&)(*+,-./:;<>=?@[]\^_{}|~'";

                characterTypesStr = characterTypesStr.toLowerCase();
                characterTypeArr = characterTypesStr.split(',');

                //console.log("character type arr - "+JSON.stringify(characterTypeArr));

                //loop through character type array and add onto character choices string

                for(var i = 0; i < characterTypeArr.length; i++) {
        
                        if(characterTypeArr[i].trim() == "uppercase"){
                            characterChoices += upperCaseStr;
                        }else if(characterTypeArr[i].trim()  == "lowercase") {
                            characterChoices += lowerCaseStr;
                        }else if(characterTypeArr[i].trim()  == "numeric") {
                            characterChoices += numericStr;
                        }else if(characterTypeArr[i].trim()  == "special characters") {
                            characterChoices += specialCharStr;
                        }

                }

                //console.log('choices - '+characterChoices);
                //console.log('choices length - '+characterChoices.length);

                //If no valid character types are detected, show alert that no valid type was entered and show prompt again
                while(characterChoices.length <= 0) {

                    alert("Please enter at least one valid Character Type.");
                    characterTypesStr = prompt("Which character types do you want to include in your new password? Separate each type with a comma. Types include numeric, uppercase, lowercase and special characters.");

                    characterTypesStr = characterTypesStr.toLowerCase();
                    characterTypeArr = characterTypesStr.split(',');

                    //loop through character type array and add onto character choices string
    
                    for(var i = 0; i < characterTypeArr.length; i++) {
            
                            if(characterTypeArr[i].trim() == "uppercase"){
                                characterChoices += upperCaseStr;
                            }else if(characterTypeArr[i].trim()  == "lowercase") {
                                characterChoices += lowerCaseStr;
                            }else if(characterTypeArr[i].trim()  == "numeric") {
                                characterChoices += numericStr;
                            }else if(characterTypeArr[i].trim()  == "special characters") {
                                characterChoices += specialCharStr;
                            }

                    }

                }  

            //Pass on parameters to generatePassword function
            var newPassword = '';

            newPassword = generatePassword(characterChoices, pwLength);
            
            //Display new password in text area
            document.getElementById('new-pw-text').innerHTML = newPassword;

}


