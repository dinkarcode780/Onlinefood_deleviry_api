import asyncHandler from "../utils/asyncHandler.js";
import cityModel from "../../models/cityModel.js";

import stateModel from "../../models/stateModel.js";

export const createCity = asyncHandler(async(req,res)=>{
    
    const { name, state, country, isActive } = req.body;

  if (!name || !state || !country) {
    res.status(400);
    throw new Error("Name, state, and country are required fields");
  }

  const city = await cityModel.create({
    name,
    state,
    country,
    isActive: isActive !== undefined ? isActive : true, // optional field
  });

  
  res.status(201).json({
    message: "City created successfully",
    city: city,
  });

});


export const getCity = asyncHandler(async(req,res)=>{

    const getCityList = await cityModel.find();

    res.status(200).json({
        message: "City list fetched successfully",
        cityList: getCityList,
    });
});

export const getCityById = asyncHandler(async(req,res)=>{

    const{cityId} = req.query;

    const city = await cityModel.findById(cityId);

    res.status(200).json({
        message: "City fetched successfully",
        city: city,
    });
});



export const getAllStatesWithCities = asyncHandler(async (req, res) => {
    try {
      
      const stateCount = await stateModel.countDocuments({ isActive: true });
      const cityCount = await cityModel.countDocuments({ isActive: true });
      console.log(`Active states: ${stateCount}, Active cities: ${cityCount}`);
  
     
      const states = await stateModel.find({ isActive: true })
        .sort({ name: 1 })
        .select('name -_id');
  
      
      console.log('Found states:', states.map(s => s.name));
  
    
      const cities = await cityModel.find({ isActive: true })
        .sort({ name: 1 })
        .select('name state -_id');
  
      
      const cityStates = [...new Set(cities.map(c => c.state))];
      console.log('States referenced in cities:', cityStates);
  
      
    
    const stateCityMap = cities.reduce((map, city) => {
        const matchedState = states.find(s => 
          s.name.trim().toLowerCase() === city.state.trim().toLowerCase()
        );
      
        if (matchedState) {
          const stateName = matchedState.name;
          if (!map[stateName]) map[stateName] = [];
          map[stateName].push(city.name);
        } else {
          console.warn(`No match found for city.state: "${city.state}"`);
        }
      
        return map;
      }, {});
  
      
      console.log('State-City Mapping:', stateCityMap);
  
     
      const result = states.map(state => ({
        stateName: state.name,
        cities: stateCityMap[state.name] || []
      }));
  
      const filteredResult = result.filter(state => state.cities.length > 0);
     
      console.log('Filtered Result:', filteredResult);
      if (filteredResult.length === 0) {
        console.warn('No matching state-city relationships found');
      }
  
      res.status(200).json({
        success: true,
        message: "States with cities fetched successfully",
        data: filteredResult,
      });
  
    } catch (error) {
      console.error("Error in getAllStatesWithCities:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch states with cities",
        error: error.message
      });
    }
  });