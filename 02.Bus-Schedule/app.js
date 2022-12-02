function solve() {
    let textElement = document.querySelector('.info');
    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');

    let currentName = 'Depot';
    let currentUrl = 'depot';
    let nextStop = '';




    function depart() {

        fetch(`${baseUrl}${currentUrl}`)
            .then(res => res.json())
            .then(stop => {
               
                textElement.textContent = `Next stop ${currentName} `;
                departButton.disabled = true;
                arriveButton.disabled = false;
                nextStop = stop.next;


            })
            .catch(err => {
                textElement.textContent = `Error`;
                departButton.disabled = true;
                arriveButton.disabled = true;

            });


    }

    function arrive() {
        textElement.textContent = `Arriving at ${currentName} `;
        departButton.disabled = false;
        arriveButton.disabled = true;
        currentName = nextStop;
        currentUrl = currentName;


    }

    return {
        depart,
        arrive
    };
}

let result = solve();