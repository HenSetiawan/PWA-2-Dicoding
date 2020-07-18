import {getDataIndexDbById} from './favorite.js';



 const mainContainer=document.querySelector('main');
document.addEventListener('click',async event=>{
    if(event.target.classList.contains('teamItems')){
        // loader
        mainContainer.innerHTML=` <img src="/img/loader.gif" alt="loading" srcset="" class="loader">;`

        const id=event.target.dataset.id;
        const url = `https://api.football-data.org/v2/teams/${id}`;
        await getData(url)

}
})

function getData(url){
    return fetch(url, {
        method: "GET",
        withCredentials: true,
        headers: {
          "X-Auth-Token": "1c5ef4864f154ed7b95d4bfb73c79086",
        }
      })
        .then(resp => resp.json())
        .then(function(data) {
          // render card detail 
          cardDetail(data)
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  


 async function cardDetail(data){

  // check data favorite
  let gradeIcon='';
  if(await getDataIndexDbById(data.id)===undefined){
    gradeIcon='favorite';
  }else{
    gradeIcon='my-favorite';
  }

      let card= ` <div class="col s12 m7 detailTeam" data-id="${data.id}">
                <h4 class="header team-name">${data.shortName} <span><img src="./img/grade.svg" class="${gradeIcon}"></span></h4>
                <div class="card horizontal">
                    <div class="card-image">
                    <img src="${data.crestUrl}">
                    </div>
                    <div class="card-stacked">
                    <div class="card-content detail-content">
                        <p>Address : ${data.address}</p>
                        <p>Founded : ${data.founded}</p>
                        <p>Venue : ${data.venue}</p>
                    </div>
                    <div class="card-action">
                    </div>
                    </div>
                </div>
                </div> 

                <!-===================TABLE START===========================-!>
                <table>
                <thead>
                  <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Nation</th>
                  </tr>
                </thead>
                `

                // squad team
                data.squad.forEach(item=>{
                  if(item.position===null){
                    card+=`
                    <tbody>
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.role}</td>
                        <td>${item.nationality}</td>
                      </tr>
                    </tbody>
                  `
                  }else{
                    card+=`
                    <tbody>
                      <tr>
                        <td>${item.name}</td>
                        <td>${item.position}</td>
                        <td>${item.nationality}</td>
                      </tr>
                    </tbody>
                  `
                  }
                 
                })

                // table end
                card+=`</table>`

         // add card to main container on index.html
    mainContainer.innerHTML=card;
  }


 