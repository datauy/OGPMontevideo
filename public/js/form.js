var validator = new FormValidator('form', [{
  name: 'name',
  rules: 'required'
},{
  name: 'organization',
  rules: 'required'
},{
  name: 'email',
  rules: 'required'
},{
  name: 'country',
  rules: 'required|callback_check_country'
},{
  name: 'sector',
  rules: 'required|callback_check_sector'
},{
  name: 'email_organization',
  rules: 'required'
},{
  name: 'register_image',
  rules: 'required'
}], function(errors, event) {
  if (errors.length > 0) {
    errors.forEach(function(error){
      if (error.id == 'register_image' || error.id == 'email_organization'){
        var label = document.querySelectorAll('label[for="' + error.id + '"]')[0];
        label.className += ' error';
      } else {
        var field = document.getElementById(error.id);
        field.className += ' error';
      }
    });
    var element = document.getElementById(errors[0].id);
    smoothScroll(element, 800);
  }
});

// Custom validators:
validator.registerCallback('check_country', function(value){
  if(value == 'País*' || value == '--------' || value == 'Country*'){
    return false;
  }
  return true;
}).setMessage('check_country', 'Por favor seleccione un país');

validator.registerCallback('check_sector', function(value){
  if(value == 'Sector*' || value == '--------'){
    return false;
  }
  return true;
}).setMessage('check_sector', 'Por favor seleccione un sector');

// Validate on change
document.getElementById('name').addEventListener('input', coso);
document.getElementById('email').addEventListener('input', coso);
document.getElementById('organization').addEventListener('input', coso);
document.getElementById('sector').addEventListener('change', coso_select);
document.getElementById('country').addEventListener('change', coso_select);
document.getElementById('register_image').addEventListener('click', coso_check);
document.getElementById('email_organization').addEventListener('click', coso_check);

function coso(){
  if(this.className.indexOf('error') > -1 && this.value.length > 0){
    this.className = this.className.replace('error', '');
  }
}

function coso_select(){
  if(
    this.className.indexOf('error') > -1 &&
      this.value != 'Sector*' &&
      this.value != 'País*' &&
      this.value != '--------'
  ){
    this.className = this.className.replace('error', '');
  }
}

function coso_check(){
  var label = document.querySelectorAll('label[for="' + this.id + '"]')[0];
  if(label.className.indexOf('error') > -1 && this.checked === true){
    label.className = label.className.replace('error', '');
  }
}

document.getElementById('arrow').addEventListener('click', function(){
  smoothScroll(document.getElementById('form'));
});
document.getElementById('register_btn').addEventListener('click', function(){
  smoothScroll(document.getElementById('form'));
});
