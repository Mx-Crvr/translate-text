"use strict"

window.onload = () => {
  getLang()
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
      console.log(language.name)
    });
  } catch (error) {
    console.error(error);
  }
}