$(document).ready(() => {

//Badges Default Values
$('#pitch .badge').text($('#pitch input').val());
$('#rate .badge').text($('#rate input').val());


//Init APi
const synth = window.speechSynthesis;

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();

  // Loop through voices and create an option for each one
  voices.forEach(voice => {
  appendSelect(voice);
  });

};

//Hotfix for API call
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}


//Appending Options To Select
let appendSelect = (obj) => {
$('#voicesSelect').append(`<option value=" data-lang="${obj.lang}" data-name="${obj.name}">${obj.name + ` (${obj.lang})`}</option>`);
};


// Speak
const speak = () => {
  // Check if speaking
  if (synth.speaking) {
    console.error('Already speaking...');
    return;
  }

  if ($('textarea').val() !== '') {

   // Add background animation
   $('body').css('background-image', 'url(' + 'sound_wave.gif' + ')');

    // Get speak text
    const speakText = new SpeechSynthesisUtterance($('textarea').val());

    // Speak end
    speakText.onend = e => {
      console.log('Done speaking...');
      $('body').css('background-image', '');
    };

    // Speak error
    speakText.onerror = e => {
      console.error('Something went wrong');
    };

    // Selected voice
    const selectedVoice = $('#voicesSelect :selected').attr('data-name');

    // Loop through voices
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // Set pitch and rate
    speakText.rate = $('#rate input').val();
    speakText.pitch = $('#pitch input').val();
    // Speak
    synth.speak(speakText);
  }
};

// EVENT LISTENERS
//Form Submit Event
$('form').on('submit', e => {
e.preventDefault();
speak();
$('textarea').blur();
});

//Rate + Pitch Badges
$('#rate input, #pitch input').on('change', function() { $(this).parent().find('.badge').text($(this).val()) });




























































})
