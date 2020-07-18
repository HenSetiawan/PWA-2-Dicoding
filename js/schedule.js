const url='https://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED';


document.addEventListener('DOMContentLoaded',function(){
 getDataMatch(url);
 })

document.addEventListener('click',function(event){
  if(event.target.classList.contains('scheduleBtn')){
    setTimeout(function(){
      reqDataScheduled();
    },500)
  }
})


function getDataMatch(url){
  return fetch(url, {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-Auth-Token": "1c5ef4864f154ed7b95d4bfb73c79086",
      }
    })
      .then(resp => resp.json())
      .then(function(data) {
        return data;
      })
      .catch(function(error) {
        console.log(error);
      });
}



async function reqDataScheduled(){
    const data= await getDataMatch(url);
    cardSchedule(data.matches)


}


function cardSchedule(dataItems){
    let cards='';
    for(let i=0;i<=10;i++){
      cards+=`
      <div class="card horizontal">
        <div class="card-stacked">
          <div class="card-content">
            <p>${dataItems[i].awayTeam.name} VS ${dataItems[i].homeTeam.name}</p>
            <span>${dataItems[i].utcDate}</span>
          </div>
        </div>
      </div>`
    }

    const scheduleItems=document.querySelector('.schedule-items');
    scheduleItems.innerHTML=cards;
}
