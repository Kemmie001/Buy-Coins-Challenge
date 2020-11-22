const navBar = document.querySelector('.fa-bars')

loadEvent()
function loadEvent(){
    navBar.addEventListener('click', displayNav)
}

function  displayNav() {
    document.querySelector('.mobile-nav').classList.toggle('nav-show')
}


const postRepo = document.getElementById('card-container')

let el = function (element) {
        return document.getElementById(element);
}
const 
name = el('name'),
login = el('login'),
bio = el('bio'),
image = el('avatar')
twitterUsername = el('twitter')
email = el('email')

const getToken = "3ec9a969b1fb51174078fba4c1c2a3ce734cba37"

fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers:{
    Authorization: `bearer ${getToken}`
    },
    body: JSON.stringify({
        query:`
       query { 
            viewer { 
              login
              name
              location
              bio
              avatarUrl
              followers{
                totalCount
              }
              following{
                totalCount
              }
              location
              twitterUsername
              email
              repositories(first:20){
                nodes{
                  name
                  updatedAt
                  description
                  forkCount
                  primaryLanguage{
                      name
                      color
                  }
                }
              }
            }
          }
        `, 
    }),
 })
.then(res => res.json())
.then(data => {
    name.textContent = data.data.viewer.name;
    login.textContent = data.data.viewer.login;
    bio.textContent = data.data.viewer.bio
    image.src = data.data.viewer.avatarUrl
    email.textContent = data.data.viewer.email   
    
    data.data.viewer.repositories.nodes.forEach(node => {
       let dateStr = node.updatedAt.substr(0, 10)
       let color = node.primaryLanguage.color
       let language = node.primaryLanguage.name;
       function removeNone() {
         if (node.description == null){
          node.description = ""
         }
       }
       removeNone()
       
        postRepo.innerHTML +=`
        <div class="card">
                <div class="repo-details">
                    <h3><a href="" class="repo-name">${node.name}</a></h3>
                        <p>${node.description}</p>
                            <div class="lang">
                             <p><i class="fas fa-circle" style="color:${color}";></i> ${language}</p> 
                             <p><i class="fas fa-code-branch"> ${node.forkCount}</i></p>   
                             <p> Updated on ${dateStr}</p>
                            </div>
                </div>
                    <div class="star-button">
                        <button id="star-button-item" class="star-button-item">
                        <i class="far fa-star star-icon"></i> Star
                        </button>
                    </div>
    </div>`
      })   
    })


    const popup = document.querySelector('.popup1')
    const hide = document.querySelector('.fa-times')
    const hide1 = document.querySelector('.container-frame')
    const popupSecond = document.querySelector('.popup2')
    const hide2 = document.querySelector('.second')
    const hideSecond = document.querySelector('.second-times')

    myFunction();
    function myFunction(){
      popup.addEventListener('click', showPopUp)
      hide.addEventListener('click',removeFrame)
      hide1.addEventListener('click', removeFrame)
      popupSecond.addEventListener('click', showPopUpSecond)
      hideSecond.addEventListener('click', removeFrameSecond)
      hide2.addEventListener('click', removeFrameSecond)
    }

const description = document.querySelector('.container-frame');
function showPopUp(){
  description.style.width = '100%';

}
function removeFrame(){
  description.style.width = '0'
}
const descriptionSecond = document.querySelector('.second')
function showPopUpSecond(){
  descriptionSecond.style.width = '100%'
}
function removeFrameSecond(){
  descriptionSecond.style.width ="0";
}