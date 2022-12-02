function lockedProfile() {
    let main = document.getElementById('main');
    main.innerHTML = '';
    async function getProfiles() {

        const url = 'http://localhost:3030/jsonstore/advanced/profiles';

        const response = await fetch(url);
        const data = await response.json();



        createProfiles(data);
    }



    function createProfiles(data) {
        let index = 2;


        for (const key in data) {
            let currentUrl = `http://localhost:3030/jsonstore/advanced/profiles/${key}`;

            async function getUser() {
                let url = currentUrl;

                const response = await fetch(url);
                const userData = await response.json();

                createUser(userData);

            }



            function createUser(user) {
                let mainDiv = document.createElement('div');
                mainDiv.classList.add('profile');

                let img = document.createElement('img');
                img.src = "./iconProfile2.png";
                img.classList.add('userIcon')

                let labelLock = document.createElement('label');
                labelLock.textContent = 'Lock';

                let lockedInput = document.createElement('input');
                lockedInput.type = 'radio'
                lockedInput.name = `user${index}Locked`;
                lockedInput.value = 'lock';
                lockedInput.checked = true;

                let labelUnlock = document.createElement('label');
                labelUnlock.textContent = 'Unlock';

                let unlockedInput = document.createElement('input');
                unlockedInput.type = 'radio'
                unlockedInput.name = `user${index}Locked`;
                unlockedInput.value = 'unlock';

                let br = document.createElement('br');
                let hr = document.createElement('hr');

                let labelUserName = document.createElement('label');
                labelUserName.textContent = 'Username';

                let userNameInput = document.createElement('input');
                userNameInput.type = 'text';
                userNameInput.name = `user${index}Username`;
                userNameInput.value = user.username;
                userNameInput.disabled = true;
                userNameInput.readOnly = true;

                let divHidden = document.createElement('div');
                divHidden.id = `user${index}HiddenFields`;
                divHidden.style.display = 'none';

                // inside div
                let hrDiv = document.createElement('hr');
                let labelEmail = document.createElement('label');
                labelEmail.textContent = 'Email:';

                let userEmailInput = document.createElement('input');
                userEmailInput.type = 'email';
                userEmailInput.name = `user${index}Email`;
                userEmailInput.value = user.email;
                userEmailInput.disabled = true;
                userEmailInput.readOnly = true;

                let labelAge = document.createElement('label');
                labelAge.textContent = 'Age:';

                let userAgeInput = document.createElement('input');
                userAgeInput.type = 'email';
                userAgeInput.name = `user${index}Age`;
                userAgeInput.value = user.age;
                userAgeInput.disabled = true;
                userAgeInput.readOnly = true;

                // put into div

                divHidden.appendChild(hrDiv);
                divHidden.appendChild(labelEmail);
                divHidden.appendChild(userEmailInput);
                divHidden.appendChild(labelAge);
                divHidden.appendChild(userAgeInput);

                


let buttonShow = document.createElement('button');
buttonShow.textContent = 'Show more';

buttonShow.addEventListener('click', () => {
    if(buttonShow.textContent == 'Show more'){
        if(unlockedInput.checked == true){
            divHidden.style.display = 'block';
            buttonShow.textContent = 'Hide';     
        }

    }
    else{
        if(unlockedInput.checked == true){
            divHidden.style.display = 'none';
            buttonShow.textContent = 'Show more';     
        }

    }
    

});






                mainDiv.appendChild(img);
                mainDiv.appendChild(labelLock);
                mainDiv.appendChild(lockedInput);
                mainDiv.appendChild(labelUnlock);
                mainDiv.appendChild(unlockedInput);
                mainDiv.appendChild(br);
                mainDiv.appendChild(hr);
                mainDiv.appendChild(labelUserName);
                mainDiv.appendChild(userNameInput);
                mainDiv.appendChild(divHidden);
                mainDiv.appendChild(buttonShow);


                main.appendChild(mainDiv);
                index++;


            }

            getUser();


        }
    }






    getProfiles();


}