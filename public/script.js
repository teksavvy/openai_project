// Call the getBabyNames function with the input values from the user

document.querySelector('#btnload').addEventListener('click', () => {
    getBabyNames(document.getElementById('a').value,document.getElementById('b').value,document.getElementById('c').value)
})

// Function to validate the input only contains alphabets
function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }

// Define the getBabyNames function
async function getBabyNames(a,b,c) {

    // Check input against the isCharacterALetter function
    if(isCharacterALetter(a) === false || isCharacterALetter(b) === false || isCharacterALetter(c) === false)
    {
        console.log("why?")
        alert("Invalid input: Please enter words containing alphabets")
        return
    }
    else
    {
        // Load and display the spinner
        const spinner = document.getElementById("spinner");
        spinner.removeAttribute('hidden');
        let url = '/babynames/first/' + a + "/second/" + b + "/third/" + c
        console.log(url)
        const response = await fetch(url)
        .then(async(response) => {
            if (response.ok) {
                // Remove spinner once data is parsed
             const data = await response.json().then(spinner.setAttribute('hidden', ''))

        // Organize the response and add spacing
             let baby_names = data.choices[0].text.replace('\n\n', '').split('\n').join('<br>');
        
        // Publish result 
             document.querySelector('#babynames').innerHTML = "<div id='result'>Result:</div>" + baby_names
    
            }
            else {
                throw new Error(response.status + " Failed Fetch ");
            }
        }).catch(e => console.error('EXCEPTION: ', e))

        }
}