import $ from 'jquery';

// This function stores our state.

export const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// stateControl();
//ABOVE: ^ to check the current state of an object (without anything new passed into the stateControl(); function)

// const newState = currentState

// function(currentState) { 
  //   return currentState; 
  // }
  
  // BELOW: (V)(V) When storeState is called, it will return its inner function, and store the return value in the const variable stateControl:
  
  // BELOW: RETURN VALUE of storeState(); || what is stored inside stateControl (V)
  
  // stateControl = (stateChangeFunction = state => state) => {
    //   const newState = stateChangeFunction(currentState);
    //   currentState = {...newState};
    //   return newState;
    // }

const stateControl = storeState();
  

stateControl();

//WITHOUT ARGUMENT:^ stateControl(); ------------------------------------------------------------------------------------------
// NOTE: stateControl accepts a function as an argument (ABOVE ^). If no function is passed in [EX: stateControl();], it will use 'state => state' as the function. This will be an anonymous function that looks like this:


// function(state) { 
//   return state; 
// }

// This function (ABOVE ^) will be used on the line 'const newState = stateChangeFunction(currentState);' in place of 'stateChangeFunction'. 
// effectively, this will look like:

// const newState = function(currentState) 

// All this (ABOVE ^) function does is return whatever was passed in, so effectively it's doing this:
// const newState = currentState 

// ABOVE: ^ currentState will be returned, and stored in 'const newState', then the function will proceed as normal.

stateControl(blueFood);

//WITH ARGUMENT:^ stateControl(blueFood); --------------------------------------------------------------------------------------
// NOTE: If there is a function passed in [EX:|| 'stateControl(blueFood)' (where blueFood is the function being passed in)], that function will be used on the line 'const newState = stateChangeFunction(currentState);' in place of 'stateChangeFunction'. [EX: const newState = blueFood(currentState)].

// BELOW: The passed in function will be executed with currentState passed in as an argument [EX: blueFood(currentState)]. The return value of that function will be stored in const newState, because of the line:
// const newState = stateChangeFunction(currentState);


// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. We could easily create many more.

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function() {

// This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.

  $('#feed').click(function() {
    const newState = stateControl(blueFood);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

// This function doesn't actually do anything useful in this application — it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
  });
});