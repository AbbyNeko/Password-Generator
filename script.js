//event listener for Generate Password button
document.getElementById("pw-generator-btn").addEventListener("click", function(event){
    var prompt = "What is the length of your new password? It must be at least 8 characters and no more than 128 characters.";
    $('#question').text(prompt);
    $('#promptModal').modal();
    event.preventDefault();
  });

var pwLength = 0;
var characterChoices = '';

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

    var prompt = $('#question').text();

    switch(prompt) {
        case "What is the length of your new password? It must be at least 8 characters and no more than 128 characters.":
            handlePwLength();
            break;
        case "Which character types do you want to include in your new password? Please type in the following choices and separate each type with a comma: 'numeric', 'uppercase', 'lowercase' and 'special characters'.":
            handleCharType();
    }
 
}

//handles user errors for length prompt. Save answers and goes on to next prompt
function handlePwLength() {
               var prompt = '';
               var response = '';
               pwLength = $("#answer").val();
               //console.log('answer - '+pwLength);
   
               //Continues to check if input is less than 8, greater than 128 or empty/NaN. If so, show warning and ask prompt again
               //do{
                   
                   if(parseInt(pwLength) < 8 || parseInt(pwLength) > 128) {
                       response = "Length of Password was less than 8 or greater than 128. Please enter a different password length.";
                       prompt = "What is the length of your new password? It must be at least 8 characters and no more than 128 characters.";
                   }else if(pwLength == "" || Number.isNaN(parseInt(pwLength))) {
                       response = "Please enter a number!";
                       prompt = "What is the length of your new password? It must be at least 8 characters and no more than 128 characters.";
                   } else {
                        //Prompt asking for which Character types to include in password
                       prompt = "Which character types do you want to include in your new password? Please type in the following choices and separate each type with a comma: 'numeric', 'uppercase', 'lowercase' and 'special characters'.";
                   }
   
                   //console.log(response);
                   //console.log(prompt);
   
                   $("#response").text(response);
                   $("#question").text(prompt);
   
                   pwLength = parseInt(pwLength);

                   //clear answer
                   $('#answer').val('');
   
}

//generates valid character types according to answer for character type and generate new pw
function handleCharType() {

                var lowerCaseStr, upperCaseStr, specialCharStr, numericStr, characterTypeArr;
                var characterTypesStr = $('#answer').val();

                //console.log('characterTypesStr - '+characterTypesStr);

                var prompt = '';
                var response = '';

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
                if(characterChoices.length <= 0) {

                    response = "Please enter at least one valid Character Type.";
                    prompt = "Which character types do you want to include in your new password? Separate each type with a comma. Types include numeric, uppercase, lowercase and special characters.";

                    $("#response").text(response);
                    $("#question").text(prompt);

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

                } else {
                    //console.log('generating new pw');

                    var newPassword = generatePassword(characterChoices, pwLength);

                        //console.log('new pw - '+newPassword);

                        //Display new password in text area
                        document.getElementById('new-pw-text').innerHTML = newPassword;

                        //hide modal
                        $('#promptModal').modal('hide');

                        //resetting prompt
                        var prompt = "What is the length of your new password? It must be at least 8 characters and no more than 128 characters.";
                        $('#question').text(prompt);
                        $('#response').text('');
                        $('#answer').val('');

                        //resets global variables
                        characterChoices = '';
                        pwLength = 0;
                }

}


