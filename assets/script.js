
/* 
Author: Hemayatullah Sangin
website:  http://hemayat.io
GitHub:    https://github.com/imhemayatsangin
Instagram: @hemuu404  
*/

const input = document.getElementById('image-input');
const preview = document.getElementById('image-preview');
const label = document.getElementById('upload-label');
const imageUpload = document.getElementById('image-upload');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const uploadProgress = document.getElementById('upload-progress');

input.addEventListener('change', function() {
  const file = input.files[0];

  if (file) {
    uploadProgress.classList.remove('hidden');
    ProgressBarUpload(file);
  }


  const reader = new FileReader();
  reader.onload = function() {
    preview.style.backgroundImage = `url(${reader.result})`;
    imageUpload.classList.add('has-image');
  }

  reader.readAsDataURL(file);
});

[ 'dragenter', 'dragover' ].forEach(eventName => {
  imageUpload.addEventListener(eventName, preventDefaults, false);
});

imageUpload.addEventListener('dragleave', preventDefaults, false);

imageUpload.addEventListener('drop', drop, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function drop(e) {
  const file = e.dataTransfer.files[0];
  input.files = e.dataTransfer.files;
  const reader = new FileReader();
  reader.onload = function() {
    preview.style.backgroundImage = `url(${reader.result})`;
    imageUpload.classList.add('has-image');
    imageUpload.style.borderColor = '#4CAF50';
  }
  reader.readAsDataURL(file);
}

imageUpload.addEventListener('click', function() {
  input.click();
});

label.addEventListener('click', function() {
  input.click();
});

function toggleLabel() {
  label.classList.toggle('hidden');
}

imageUpload.addEventListener('drop', function(event) {
  event.preventDefault();
  event.stopPropagation();

  const file = event.dataTransfer.files[0];
  input.files = event.dataTransfer.files;

  const reader = new FileReader();
  reader.onload = function() {
    preview.style.backgroundImage = `url(${reader.result})`;
    imageUpload.classList.add('has-image');
    toggleLabel();
  }

  reader.readAsDataURL(file);

  // Prevent the default behavior of opening the file in a new tab
  event.dataTransfer.clearData();
});

//scan efect script
const scanButton = document.getElementById('scan-button');

const scanBeam = document.createElement('div');
scanBeam.id = 'scan-beam';

scanButton.addEventListener('click', function() {
  if (imageUpload.classList.contains('has-image')) {
    imageUpload.appendChild(scanBeam);
  }
});


// code for image upload progress
function ProgressBarUpload(file) {
  const reader = new FileReader();
  reader.onload = function() {
    preview.style.backgroundImage = `url(${reader.result})`;
    imageUpload.classList.add('has-image');
    setTimeout(() => {
      // uploadProgress.classList.add('hidden');
     
    }, 1000); 

    // Additional code to update the progress bar during the delay
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10; 
      if (progress <= 100) {
        progressBar.value = progress;
        progressText.textContent = `Uploading... ${progress}%`;
      } else {
        clearInterval(interval);
       
        progressText.textContent = `Image Uploaded 100% `;
      }
    }, 100); 
  };

  reader.readAsDataURL(file);
}