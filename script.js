function getGender(){
  const maleRadio = document.getElementById("male");
  const femaleRadio = document.getElementById("female");

  if (maleRadio.checked) {
    return true;
  } else if (femaleRadio.checked) {
    return false;
  } else {
    return '';
  }
}

function getHeight(){
  const heightField = document.getElementById('height').value;

  return heightField / 100;
}

function handleGetFormData(){
  let userGenderisMale = getGender();
  let userWeight = document.getElementById('weight').value;
  let userHeight = getHeight();

  return {
    userGenderisMale,
    userWeight,
    userHeight
  }
}

function calculateBMI(weight, height, isMale){
  const bmi = weight / (height * height);
  let bmiWithAgeAndGenderFactors = bmi;

  // Faktor Jenis Kelamin
  if (!isMale) {
    bmiWithAgeAndGenderFactors *= 0.85;
  }

  return bmiWithAgeAndGenderFactors.toFixed(2);
}

function getConclusion(bmiResult){
  if(bmiResult < 18.5) {
    return 'Underweight';
  } else if(bmiResult > 18.5 && bmiResult < 24.9) {
    return  'Normal';
  } else if(bmiResult > 25 && bmiResult < 29.9) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
}

function setConclusionColor(bmiResult){
  if(bmiResult == 'Normal'){
    return '#3bc8bc';
  } else if(bmiResult == 'Overweight') {
    return '#f4b600';
  } else {
    return '#F9415B';
  }
}

const bmiForm = document.getElementById('bmi__form');
const result = document.getElementById('bmi__result');
const conclusion = document.getElementById('conclusion');

function submit(){
  const {
    userWeight,
    userHeight,
    userGenderisMale
  } = handleGetFormData();

  const bmiResult = calculateBMI(userWeight, userHeight, userGenderisMale);

  result.textContent = bmiResult;
  conclusion.textContent = getConclusion(bmiResult);
  conclusion.style.color = setConclusionColor(getConclusion(bmiResult));
}

bmiForm.addEventListener('submit', event => {
  event.preventDefault();
  submit();
})
