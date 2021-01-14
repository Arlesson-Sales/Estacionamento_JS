
const parking = {
  
  interface: {
    carModelTextArea: document.getElementById("carModel"),
    carPlateTextArea: document.getElementById("carPlate"),
    addButton: document.getElementById("addButton"),
    table: document.getElementById("carTable"),
    tableBody: document.getElementById("tableBody"),
    
    clearTextArea: function() {
      this.carModelTextArea.value = "";
      this.carPlateTextArea.value = "";
    },
    
    validadeData: function() {
      if(this.carModelTextArea.value.length <= 0) {
        this.carModelTextArea.style.borderColor = "#f00";
        window.alert("Modelo inválido!");
        return false;
      }
      
      if(this.carPlateTextArea.value.length <= 0) {
        this.carPlateTextArea.style.borderColor = "#f00";
        window.alert("Placa inválida!");
        return false;
      }
      
      return true;
    },
    
    actualizeTable: function() {
      this.table.removeAttribute("hidden");
      this.tableBody.innerHTML = "";
      
      let cars = parking.returnCars();
      
      if(Array.isArray(cars)) {
        cars.forEach(car => {
          tableBody.innerHTML += `
            <tr>
              <td>${car.model}</td>
              <td>${car.plate}</td>
              <td>${car.entryTime}</td>
              <td>
                <button onclick="parking.removeCar()" id="${cars.indexOf(car)}" class="removeButton">Remover</button>
              </td>
            </tr>
          `;
        });
      }
    },
    
    loadEvents: function() {
      this.carModelTextArea.addEventListener("focus", () => event.target.style.borderColor = "#000");
      this.carPlateTextArea.addEventListener("focus", () => event.target.style.borderColor = "#000");
      this.addButton.addEventListener("click",parking.parkCar);
      
      if(localStorage.parking) parking.interface.actualizeTable();
    }
  },
  
  getEntryTime: function() {
    let date = new Date();
    let hour = (date.getHours() < 10)? `0${date.getHours()}` : `${date.getHours()}`;
    let minut = (date.getMinutes() < 10)? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    
    return `${hour}:${minut}`;
  },
  
  createCar: function() {
    if(this.interface.validadeData()) {
      return {
        model: parking.interface.carModelTextArea.value,
        plate: parking.interface.carPlateTextArea.value,
        entryTime: parking.getEntryTime(),
      };
    }
    return false;
  },
  
  saveCar: function(newCar) {
    if(localStorage.parking) {
      let cars = JSON.parse(localStorage.parking);
      cars.push(newCar);
      
      localStorage.parking = JSON.stringify(cars);
      
    } else {
      let cars = [newCar];
      localStorage.parking = JSON.stringify(cars);
    }
  },
  
  removeCar: function() {
    let carIndex = Number.parseInt(event.target.id);
    let cars = JSON.parse(localStorage.parking);
    cars.splice(carIndex,1);
    
    if(cars.length <= 0) {
      parking.interface.actualizeTable();
      parking.interface.table.setAttribute("hidden","true");
      localStorage.removeItem("parking");
      
    } else {
      localStorage.parking = JSON.stringify(cars);
      parking.interface.actualizeTable();
    }
  },
  
  returnCars: function() {
    if(localStorage.parking) {
      return JSON.parse(localStorage.parking);
    }
  },
  
  parkCar: function() {
    let newCar = parking.createCar();
    
    if(newCar) {
      parking.saveCar(newCar);
      parking.interface.clearTextArea();
      parking.interface.actualizeTable();
    }
  },
  
};