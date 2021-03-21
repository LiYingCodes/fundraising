const countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', '$_[', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

const  featuredSuperheroTeams = ['Avengers', 'X-Men', 'Fantastic Four', 'Guardians of the Galaxy'];

// HELPER FUNCTIONS
function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function getSiblings(e) {  
  // for collecting siblings  
  let siblings = [];  
  // if no parent, return no sibling  
  if (!e.parentNode) {    return siblings;  }  
  // first child of the parent node  
  let sibling = e.parentNode.firstChild;
  // collecting siblings  
  while (sibling) {    
    if (sibling.nodeType === 1 && sibling !== e) {      
      siblings.push(sibling);    
    }    
      sibling = sibling.nextSibling;  
    }  
    return siblings;
  };

const removeOtherSelections = (package) => {
  const otherPackages = getSiblings(package);
  otherPackages.forEach((otherPkg => {
    //remove "package-selected" from other packages
    otherPkg.classList.remove('package-selected');
  }));
}

function handleSelectOptions(array, selectClassName) {
  const select = document.getElementById(selectClassName);
  array.map(el => {
    const elOption = document.createElement('option');
    elOption.value = el;
    elOption.innerHTML = el;
    select.append(elOption);
  })

  return select;
}

function markComplete(thisSection){
  const nextSection = thisSection.nextElementSibling;
  thisSection.classList.add('step-complete');
  nextSection.classList.add('step-active');
}

function handleForm() {
  const form = document.querySelector('.step3-review form')
  const submitBtn = document.querySelector('.step3-review input[type=submit]');
  console.log(submitBtn);
  submitBtn.addEventListener('click', function() {
    //check if button 
    form.classList.add('submit-clicked');
  })
  form.addEventListener('submit', function() {
    alert('Thanks for your help!')
  })
}

//CREATING SELECT OPTIONS 
async function populateListOfCountries() {
  handleSelectOptions(countries, 'countries');
}

async function populateListOfHeroes() {
  handleSelectOptions(featuredSuperheroTeams, 'featured-superhero-teams');
  await getSelectedTeam();
}

// API CALL
const PRIV_KEY = '442fd6fb50eb89717021a29e0c676e785f2687a5';
const PUBLIC_KEY = 'a7cf3b7902087aaf6031f05fab9fb738';
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();

let results;
async function getData(params, endpoint) {
  const url = new URL(`https://gateway.marvel.com/v1/public/${endpoint}`);
  url.search = new URLSearchParams(params).toString();

  await fetch(url)
  .then(response =>{ 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } 
    return response.json();
  })
  .then(data => {
    results = data.data.results;
  });
}

// FUNCTIONALITY
const buildHeroInfo = () => {
  const thisSection = document.querySelector('.step1-select-hero');
  const container = document.querySelector('.superhero-selected-container');
  const superheroPlaceholder = document.querySelectorAll('.superhero-placeholder');
  const packages = document.querySelectorAll('.step2-select-package ul');
  //empty the container from any previous selections
  container.innerHTML = '';

  //loop over results
  results.forEach(hero => {
    //replace placeholder with selected superhero
    superheroPlaceholder.forEach(placeholder => placeholder.innerText = hero.name);

    //add superhero selected to package classlist
    let heroName = hero.name;
    heroName = heroName.toLowerCase().trim().split(/\s+/).join('-');
    packages.forEach(package => package.classList.add(`${package.classList[0]}-${heroName}`));
    
    //create image container and populate with image of selected superhero
    const imgContainer = document.createElement('div');
    imgContainer.classList = 'img-container';
    const img = document.createElement('img');
    img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    imgContainer.append(img);

    //create img text
    const text = document.createElement('span');
    text.innerText = hero.name + ' & YOU!';
    text.classList = 'img-container-text';
    imgContainer.append(text);

    //create description container and populate with image of selected superhero
    const description = document.createElement('p');
    description.innerText = hero.description;
    //add img and description to the page
    container.append(imgContainer);
    container.append(description);
    //mark section complete
    markComplete(thisSection);
  })
}

// STEP 1 HERO SELECTION
const getSelectedTeam = () => {
  const selectHeroOptions = document.querySelector('#featured-superhero-teams');
  
  selectHeroOptions.addEventListener('change', function(e) {
    //get selected superhero option
    const teamSelected = e.target.value;

    //update params to include selected option
    const params = {name:teamSelected, ts: ts, apikey: PUBLIC_KEY, hash: hash };

    //get results and then build info
    const characterResults = getData(params, 'characters');
    characterResults.then(buildHeroInfo);
  })

}

// STEP 2 PACKAGE SELECTION
const pickPackage = () => {
  const thisSection = document.querySelector('.step2-select-package');
  //packages displayed
  const packages = document.querySelectorAll('.step2-select-package ul');
  //package selection in form"
  const packageSelectedInput = document.querySelector('input[name="package"]');

  packages.forEach(package => {
    package.addEventListener('click', function() {
      //remove selection of other packages
      removeOtherSelections(package);
      //add "package-selected" to package selected
      package.classList.add('package-selected');
      // change value of package selected on the form
      packageSelectedInput.value = package.classList[1];
      // mark step complete
      markComplete(thisSection);
    });
  })
}

function init() {
  pickPackage();
  populateListOfCountries();
  populateListOfHeroes();
  handleForm();
}

init();