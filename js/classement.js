document.addEventListener('DOMContentLoaded',function(){
 setTimeout(function(){
   classementDisplay();
 },1000)
})

document.addEventListener('click',function(){
  if(event.target.classList.contains('classementBtn')){
    setTimeout(function(){
      classementDisplay();
    },1000)
  }
})


// display list team
function classementDisplay(){
  const url = "https://api.football-data.org/v2/competitions/2021/standings";
  fetch(url, {
    method: "GET",
    withCredentials: true,
    headers: {
      "X-Auth-Token": "1c5ef4864f154ed7b95d4bfb73c79086",
    }
  })
    .then(resp => resp.json())
    .then(function(data) {
       endSeason(data);
       cardClassement(data.standings[0].table)
      // console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

    

// display end season
function endSeason(data){
    const endSeason=document.querySelector('.league p');
    endSeason.innerHTML=`Ends:${data.season.endDate}`;
}


//display team classement on card
function cardClassement(dataItems){
  const classementItems=document.querySelector('.classement-items');
    let card='';
    dataItems.forEach(data => {
        card+=`
        <div class="card horizontal  teamItems" data-id=${data.team.id}>
          <div class="card-image">
            <img src=${data.team.crestUrl} alt="icon of team">
          </div>
          <div class="card-stacked">
            <div class="card-content ">
              <p>${data.team.name}</p>
              <span class="won">won : ${data.won}</span>
              <span class="draw">draw : ${data.draw}</span>
              <span class="lost">lost : ${data.lost}</span>
            </div>
          </div>
        </div>`
    });
   
    classementItems.innerHTML=card;
}
