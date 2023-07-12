"use strict"

// Global
const translateTo = document.getElementById('translateTo');
const translateFrom = document.getElementById('translateFrom');
const userInput = document.getElementById('userInput');
const container = document.getElementById('container');
const spinner = document.getElementById('spinner');

window.onload = () => {
  getLang();
}

async function getLang() {
  const url = 'https://text-translator2.p.rapidapi.com/getLanguages';

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': '31700c2f68msh2d971e52ba6973ep164234jsn7872c303cc57',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      }
    });
    const result = await response.json();
    const languages = result.data.languages
    languages.forEach(language => {
      const fromOption = document.createElement('option');
      translateFrom.appendChild(fromOption);
      fromOption.innerText = language.name; 
      fromOption.value = language.code; 

      const toOption = document.createElement('option');
      translateTo.appendChild(toOption);
      toOption.innerText = language.name; 
      toOption.value = language.code;


      console.log(language.name)
    });
  } catch (error) {
    console.error(error);
  }
}

async function translate() {
  const url = 'https://text-translator2.p.rapidapi.com/translate';

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '31700c2f68msh2d971e52ba6973ep164234jsn7872c303cc57',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      body: new URLSearchParams({
        source_language: translateFrom.value,
        target_language: translateTo.value,
        text: userInput.value,
      }),
    });
    const result = await response.json();
    const data = result.data.translatedText

    function translatedText(data) {
      return data.charAt(0).toUpperCase() + data.slice(1);
  }

    const answer = document.createElement('p');
    container.appendChild(answer);
    answer.innerText = translatedText(data);
    answer.classList.add('answer');
  } catch (error) {
    console.error(error);
  }
}

const showSpinner = () => spinner.style.display = 'flex';
const hideSpinner = () => spinner.style.display = 'none';

const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  container.innerText = '';
  if (translateFrom.value == '0') {
    alert('Please select the source language');
  } else if (translateTo.value == '0') {
    alert('Please select a target language');
  } else if (userInput.value == '') {
    alert('Please enter test to translate')
  }else {
    showSpinner();
    setTimeout(() => {
      hideSpinner()
      translate();
    }, 3000);
  }
  
})