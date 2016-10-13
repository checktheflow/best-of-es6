
class Vehicle {
    constructor(color) {
        this.color = color
        this.km = 0
    }
    drive(km) {
        this.km += km
    }
}

class Car extends Vehicle {
    constructor(color) {
        super(color)
    }
    honk() {
        console.log(`honk honk! I'm ${this.color} and have driven ${this.km}km`)
    }
}

const myCar = new Car('orange')
myCar.drive(500)
myCar.honk()








// Vehicle is the supertype
function Vehicle(color) {
    this.color = color
    this.km = 0
}
Vehicle.prototype.drive = function (km) {
    this.km += km
}

// Car is the subtype
function Car(color) {
    // inheritance part 1: "Constructor stealing"
    Vehicle.call(this, color)
}
// inheritance part 2: "prototype chaining"
Car.prototype = Object.create(Vehicle.prototype)
// adding a method to the subtype
Car.prototype.honk = function () {
    console.log(`honk honk! I'm ${this.color} and have driven ${this.km}km`)
}

const myCar = new Car('green')
myCar.drive(800)
myCar.honk()
