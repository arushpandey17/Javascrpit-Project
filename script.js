document.addEventListener("DOMContentLoaded",function(){

    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const harderProgressCircle = document.querySelector("hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const cardStatsContainer = document.querySelector(".Stats-cards");
    
    // return true or false based on a regex
    function validateUsername(username){
        if(username.trim() ===""){
            alert("Username Should not be empty");
            return false;
        }
        const regex =/^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
            alert("Username should be alphanumeric and between 1-15 characters");
        }
        return isMatching;
    }

    async function fetchUsername(username) {
        const url ='https://leetcode.com{username}}'
        try{

            searchButton.textContent = "searching...";
            searchButton.disabled = true;

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/' 
            const targetUrl = 'https://leetcode.com/graphql/';
            
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
                variables: { "username": `${username}` }
            })
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);
            if(!response.ok) {
                throw new Error("Unable to fetcha the User details");
            }
            const data = await response.json();
            console.log("Logging data:",data)
        }
        catch(error){
            statsContainer.innerHTML ='<p>No data found<p/>'
        }
        finally {
            searchButton.textContent = "Search"
            searchButton.disabled = false
        }
    }

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        console.log("logggin username:" , username);
        if(validateUsername(username)){
            fetchUsername(username);

        }
    })





})