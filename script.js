
document.getElementById("pw-generator-btn").addEventListener("click", function(event){
    askingForPasswordReq()
    event.preventDefault()
  });

    //Generate PW based on requirements given by user

    function generatePassword(characterTypeArr, pwLength) {

    
                var lowerCaseStr, upperCaseStr, specialCharStr, numericStr, characterChoices;
                var newPassword = '';

                characterChoices = '';
                upperCaseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                lowerCaseStr = "abcdefghijklmnopqrstuvwxyz";
                numericStr = "0123456789";
                specialCharStr = "!\"$#%&)(*+,-./:;<>=?@[]\^_{}|~'";
    
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
    
                console.log(characterChoices);
                console.log('length - '+characterChoices.length);
    
                for(var n = 0; n < pwLength; n++) {
    
                    var randomSelector = Math.floor(Math.random() * characterChoices.length);
                    console.log('random index - '+randomSelector);
                    newPassword += characterChoices[randomSelector];
    
                }

                console.log('new pw - '+newPassword);
    
                return newPassword;
    
    }

function askingForPasswordReq() {

            //prompt asking for Length of password
            var pwLength = prompt("What is the length of your new password? It must be at least 8 characters and no more than 128 characters.");

            if(pwLength != null) {
                pwLength = parseInt(pwLength);
            }

            //Prompt asking for which Character types to include in password
            var characterTypesStr = prompt("Which character types do you want to include in your new password? Separate each type with a comma.")

                characterTypesStr = characterTypesStr.toLowerCase();

                var characterTypeArr = characterTypesStr.split(',');

            //Pass on parameters to generatePassword function
            var newPassword;

            newPassword = generatePassword(characterTypeArr, pwLength);
            
            //Display new password in text area
            document.getElementById('new-pw-text').innerHTML = newPassword;


}


