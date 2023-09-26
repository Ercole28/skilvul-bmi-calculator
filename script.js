function getGender(){
  const maleRadio = document.getElementById("male");
  const femaleRadio = document.getElementById("female");

  if (maleRadio.checked) {
    return true;
  } else if (femaleRadio.checked) {
    return false;
  } else {
    return ''; // If both radio !checked
  }
}

function getHeight(){
  const heightField = document.getElementById('height').value;

  return heightField / 100; // Convert cm into m
}

function handleGetFormData(){
  let userAge = document.getElementById('age').value;
  let userGenderisMale = getGender();
  let userWeight = document.getElementById('weight').value;
  let userHeight = getHeight();

  return {
    userAge,
    userGenderisMale,
    userWeight,
    userHeight
  }
}

function calculateBMI(weight, height, age, isMale){
  const bmi = weight / (height * height);
  let bmiWithAgeAndGenderFactors = bmi;
  
  // Age factor
  if(age < 20){
    bmiWithAgeAndGenderFactors *= 1.0;
  }
  // Gender factor
  if (!isMale) {
    bmiWithAgeAndGenderFactors *= 0.85;
  }

  return bmiWithAgeAndGenderFactors.toFixed(2);
}

function getConclusion(bmiResult){
  let conclusion;

  if(bmiResult < 18.5) {
    conclusion = 'Underweight';
  } else if(bmiResult > 18.5 && bmiResult < 24.9) {
    conclusion = 'Normal';
  } else if(bmiResult > 25 && bmiResult < 29.9) {
    conclusion = 'Overweight';
  } else {
    conclusion = 'Obesity';
  }

  return conclusion;
}

const bmiForm = document.getElementById('bmi__form');
const result = document.getElementById('bmi__result');
const conclusion = document.getElementById('conclusion');

function submit(){
  const {
    userAge,
    userGenderisMale,
    userWeight,
    userHeight
  } = handleGetFormData();

  const bmiResult = calculateBMI(userWeight, userHeight, userAge, userGenderisMale);

  // Manipulate Text Content
  result.textContent = bmiResult;
  conclusion.textContent = getConclusion(bmiResult);
}

bmiForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submit();
})
