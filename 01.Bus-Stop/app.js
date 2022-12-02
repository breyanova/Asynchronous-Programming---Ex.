function getInfo() {
    let inputElementId = document.getElementById('stopId');
    let baseUrl = ' http://localhost:3030/jsonstore/bus/businfo/';
    let stopNameElement = document.getElementById('stopName');
    let busList = document.getElementById('buses');


    
        let id = inputElementId.value;

        fetch(`${baseUrl}${id}`)
        .then(res => res.json())
        .catch(err => {
            stopNameElement.textContent = 'Error';
        }) 
        .then(bus => {
            stopNameElement.textContent = bus.name;
            let busesKeys = Object.keys(bus.buses);
            busesKeys.forEach(element => {
                let li = document.createElement('li');
                li.textContent = `Bus ${element} arrives in ${bus.buses[element]} minutes`;
                busList.appendChild(li);
            });
        });
        
        
        
    

}