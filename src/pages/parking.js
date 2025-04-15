import { useState, useEffect } from 'react';



export default function Parking() {
    const [vehicles, setVehicles] = useState([])
    const [parkedVehicles, setparkedVehicles] = useState([])
    const [parkingLots, setParkingLots] = useState([])
    const [parkingLotForm, setParkingLotForm] = useState({name: '', numberOfFloors: 1})
    const [vehicleCreationForm, setVehicleCreationForm] = useState({type: '0', name: ''})
    const [parkingForm, setParkingForm] = useState({parking: null, vehicle: null})
    const [parkedForm, setParkedForm] = useState({vehicle: null})

    const fetchItems = async () => {
        const vehiclesRes = await fetch('/api/vehicle');
        const parkedVehiclesRes = await fetch('api/unpark')
        const parkingLotsRes = await fetch('/api/parkinglot')
        const vehicleData = await vehiclesRes.json();
        const parkingLotsData = await parkingLotsRes.json();
        const parkedVehicles = await parkedVehiclesRes.json();
        console.log("Beginning of the logs")
        console.log(vehicleData)
        console.log(parkingLotsData)
        setVehicles(vehicleData.data)
        setParkingLots(parkingLotsData.data)
        setparkedVehicles(parkedVehicles.data)
      };

      useEffect(() => {
        fetchItems();
      }, []);

      useEffect(() => {
        const newParkingForm = {};
        if (parkingLots[0]) {
          newParkingForm.parking = parkingLots[0]._id;
        }
        if (vehicles[0]) {
          newParkingForm.vehicle = vehicles[0]._id;
        }
        setParkingForm(prev => ({ ...prev, ...newParkingForm }));

        if (parkedVehicles[0]) 
          setParkedForm({vehicle: parkedVehicles[0]._id})
      console.log("refreshed")
      }, [parkingLots, vehicles]);

      const handleCarParkChange = (e) => {
        console.log("change of car park form: ", e.target.name, e.target.value)
        setParkingForm({ ...parkingForm, [e.target.name]: e.target.value });
      };

      const handleCreateParkingLotChange = (e) => {
        setParkingLotForm({ ...parkingLotForm, [e.target.name]: e.target.value });
      }

      const handleCreateVehicleChange = (e) => {
        setVehicleCreationForm({ ...vehicleCreationForm, [e.target.name]: e.target.value });
      }

      const handleUnparkChange = (e) => {
        setParkedForm({ ...parkedForm, [e.target.name]: e.target.value });
      }

      const submitParking = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/parking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parkingForm),
          });
          const result = await res.json()
          if (!result.success) {
            return alert("This parking lot is full. Sorry for the inconvenience.")
          }
          fetchItems();
          setParkingForm({parking: null, vehicle: null});
          alert("Successfully parked your car!")
        } catch (error) {
          console.log(error);
        }
      };

      const submitCreateParkingLot = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/parkinglot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parkingLotForm),
          });
          const result = await res.json()
          if (!result.success) {
            return alert("Cannot create that parking lot. Sorry for the inconvenience.")
          }
          alert("Successfully created your parking lot!")
          fetchItems();
          setParkingLotForm({name: '', numberOfFloors: 1});
        } catch (error) {
          console.log(error);
        }
      };

      const submitCreateVehicle = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/vehicle', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vehicleCreationForm),
          });
          const result = await res.json()
          if (!result.success) {
            return alert("Cannot create that vehicle. Sorry for the inconvenience.")
          }
          alert("Successfully created your vehicle! Happy driving!")
          fetchItems();
          setParkingLotForm({type: '0', name: ''});
        } catch (error) {
          console.log(error);
        }
      };

      const submitUnPark = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch('/api/unpark', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parkedForm),
          });
          const result = await res.json()
          if (!result.success) {
            return alert("Cannot unpark that vehicle. Sorry for the inconvenience.")
          }
          alert("Successfully unpark your vehicle! Happy driving!")
          fetchItems();
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <div>
            <div>
                <h1>Find Car Park</h1>
                <form onSubmit={submitParking}>
                    <div>
                        <p>Select your vehicle</p>
                        <select id="vehicle" name='vehicle' value={parkingForm.vehicle} onChange={handleCarParkChange}>
                            {vehicles.map((vehicle) => (
                            <option value={vehicle._id}>
                                {vehicle.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>Select your parking lot</p>
                        <select name="parking" value={parkingForm.parking} onChange={handleCarParkChange}>
                            {parkingLots.map((parkingLot) => (
                            <option value={parkingLot._id}>
                                {parkingLot.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <button type='submit'>Park!</button>
                </form>
            </div>
            <div>
                <h1>Create a parking lot. </h1>
                {/* Create a parking lot */}
                
                <form onSubmit={submitCreateParkingLot}>
                    <p>Enter your parking lot name</p>
                    <input 
                        name='name' 
                        placeholder='your parking lot name' 
                        onChange={handleCreateParkingLotChange}
                        required
                    ></input>
                    <p>Enter the number of floors you want in your parking lot</p>
                    <input 
                        name="numberOfFloors" 
                        placeholder='number of floors' 
                        type='number' 
                        min="1" 
                        onChange={handleCreateParkingLotChange}
                        required
                    ></input>
                    <button type='submit'>Create</button>
                </form>
            </div>
            <div>
                <h1> Create a vehicle </h1>
                <form onSubmit={submitCreateVehicle}>
                <p>Enter your vehicle name.</p>
                    <input 
                        name='name' 
                        placeholder='your vehicle name' 
                        onChange={handleCreateVehicleChange}
                        required
                    ></input>
                    <p>Enter the type of your vehicle.</p>
                    <select name='type' value={vehicleCreationForm.type} onChange={handleCreateVehicleChange}>
                        <option value='0'>Motorcycle</option>
                        <option value='1'>Car</option>
                        <option value='2'>Bus</option>
                    </select>
                    <button type='submit'>Create</button>
                </form>
            </div>
            <div>
                <h1>Unpark your vehicle</h1>
                <form onSubmit={submitUnPark}>
                    <div>
                        <p>Select your vehicle</p>
                        <select id="parkedVehicle" name='vehicle' value={parkedForm.vehicle} onChange={handleUnparkChange}>
                            {parkedVehicles.map((vehicle) => (
                            <option value={vehicle._id}>
                                {vehicle.name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <button type='submit'>unpark</button>
                </form>
            </div>
        </div>
    )
}