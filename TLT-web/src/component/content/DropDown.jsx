
// import React, { useState, useEffect } from 'react';

// const states = [
//   { id: 1, name: 'Andaman and Nicobar Islands' },
//   { id: 2, name: 'Andhra Pradesh' },
//   { id: 3, name: 'Arunachal Pradesh' },
//   { id: 4, name: 'Assam' },
//   { id: 5, name: 'Bihar' },
//   { id: 6, name: 'Chandigarh' },
//   { id: 7, name: 'Chhattisgarh' },
//   { id: 8, name: 'Dadra and Nagar Haveli' },
//   { id: 9, name: 'Daman and Diu' },
//   { id: 10, name: 'Delhi' },
//   { id: 11, name: 'Goa' },
//   { id: 12, name: 'Gujarat' },
//   { id: 13, name: 'Haryana' },
//   { id: 14, name: 'Himachal Pradesh' },
//   { id: 15, name: 'Jammu and Kashmir' },
//   { id: 16, name: 'Jharkhand' },
//   { id: 17, name: 'Karnataka' },
//   { id: 18, name: 'Kerala' },
//   { id: 19, name: 'Lakshadweep' },
//   { id: 20, name: 'Madhya Pradesh' },
//   { id: 21, name: 'Maharashtra' },
//   { id: 22, name: 'Manipur' },
//   { id: 23, name: 'Meghalaya' },
//   { id: 24, name: 'Mizoram' },
//   { id: 25, name: 'Nagaland' },
//   { id: 26, name: 'Odisha' },
//   { id: 27, name: 'Puducherry' },
//   { id: 28, name: 'Punjab' },
//   { id: 29, name: 'Rajasthan' },
//   { id: 30, name: 'Sikkim' },
//   { id: 31, name: 'Tamil Nadu' },
//   { id: 32, name: 'Telangana' },
//   { id: 33, name: 'Tripura' },
//   { id: 34, name: 'Uttar Pradesh' },
//   { id: 35, name: 'Uttarakhand' },
//   { id: 36, name: 'West Bengal' },
//   // ... add other states
// ];

// const cities = {
//   1: ['Port Blair'],
//   2: ['Hyderabad', 'Vishakhapatnam'],
//   3: ['Itanagar'],
//   4: ['Guwahati', 'Dispur'],
//   5: ['Patna', 'Gaya'],
//   6: ['Chandigarh'],
//   7: ['Raipur', 'Bilaspur'],
//   8: ['Silvassa'],
//   9: ['Daman'],
//   10: ['New Delhi'],
//   11: ['Panaji', 'Margao'],
//   12: ['Ahmedabad', 'Surat'],
//   13: ['Chandigarh', 'Faridabad'],
//   14: ['Shimla', 'Manali'],
//   15: ['Srinagar', 'Jammu'],
//   16: ['Ranchi', 'Jamshedpur'],
//   17: ['Bengaluru', 'Mysuru'],
//   18: ['Thiruvananthapuram', 'Kochi'],
//   19: ['Kavaratti'],
//   20: ['Bhopal', 'Indore'],
//   21: ['Mumbai', 'Pune'],
//   22: ['Imphal'],
//   23: ['Shillong'],
//   24: ['Aizawl'],
//   25: ['Kohima'],
//   26: ['Bhubaneswar', 'Cuttack'],
//   27: ['Puducherry'],
//   28: ['Ludhiana', 'Amritsar'],
//   29: ['Jaipur', 'Udaipur'],
//   30: ['Gangtok'],
//   31: ['Chennai', 'Coimbatore'],
//   32: ['Hyderabad', 'Warangal'],
//   33: ['Agartala'],
//   34: ['Lucknow', 'Kanpur'],
//   35: ['Dehradun', 'Nainital'],
//   36: ['Kolkata', 'Darjeeling'],
//   // ... add other cities corresponding to state ids
// };

// const DropDown = () => {
//   const [selectedState, setSelectedState] = useState('');
//   const [availableCities, setAvailableCities] = useState([]);

//   useEffect(() => {
//     if (selectedState) {
//       setAvailableCities(cities[selectedState] || []);
//     }
//   }, [selectedState]);

//   return (
//     <>
//       <div>DropDown</div>
//       <div>
//         <select
//           className="form-control"
//           name="f_state"
//           id="fstate"
//           onChange={(e) => setSelectedState(e.target.value)}
//         >
//           <option selected hidden disabled>
//             Select State
//           </option>
//           {states.map((state) => (
//             <option key={state.id} value={state.id}>
//               {state.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <select className="form-control" name="f_city" id="fcity" disabled={!selectedState}>
//           <option selected hidden disabled>
//             Select City
//           </option>
//           {availableCities.map((city, index) => (
//             <option key={index} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// };

// export default DropDown;
import React from "react";
 function DropDown() 
{
  return(
    <div>neha</div>
  )
}
export default DropDown;