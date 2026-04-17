// ========== AUTH ==========
function isValidEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

function showRegister(){
  document.getElementById('loginPage').classList.add('hidden');
  document.getElementById('registerPage').classList.remove('hidden');
}
function showLogin(){
  document.getElementById('registerPage').classList.add('hidden');
  document.getElementById('loginPage').classList.remove('hidden');
}
function doRegister(){
  const name=document.getElementById('regName').value.trim();
  const email=document.getElementById('regEmail').value.trim();
  const age=parseInt(document.getElementById('regAge').value);
  const pass=document.getElementById('regPass').value;
  const pass2=document.getElementById('regPass2').value;
  const errEl=document.getElementById('regError');
  const emailInp=document.getElementById('regEmail');
  errEl.style.display='none'; emailInp.classList.remove('invalid');
  if(!name||!email||!age||!pass||!pass2){showErr(errEl,'Todos los campos son obligatorios.');return;}
  if(!isValidEmail(email)){emailInp.classList.add('invalid');showErr(errEl,'Correo inválido. Debe tener @ y un dominio (ej: tu@correo.com).');return;}
  if(age<1||age>100){showErr(errEl,'La edad debe ser entre 1 y 100 años.');return;}
  if(pass.length<6){showErr(errEl,'La contraseña debe tener al menos 6 caracteres.');return;}
  if(pass!==pass2){showErr(errEl,'Las contraseñas no coinciden.');return;}
  if(users.find(u=>u.email===email)){showErr(errEl,'Este correo ya está registrado.');return;}
  users.push({name,email,age,pass});
  localStorage.setItem('fm_users',JSON.stringify(users));
  showToast('✅ Cuenta creada. ¡Ya puedes iniciar sesión!','success');
  setTimeout(showLogin,1200);
}
function doLogin(){
  const email=document.getElementById('loginEmail').value.trim();
  const pass=document.getElementById('loginPass').value;
  const errEl=document.getElementById('loginError');
  const emailInp=document.getElementById('loginEmail');
  errEl.style.display='none'; emailInp.classList.remove('invalid');
  if(!isValidEmail(email)){emailInp.classList.add('invalid');showErr(errEl,'El formato del correo no es válido.');return;}
  const user=users.find(u=>u.email===email&&u.pass===pass);
  if(!user){showErr(errEl,'Correo o contraseña incorrectos.');return;}
  currentUser=user;
  myOrders=JSON.parse(localStorage.getItem('fm_orders_'+email)||'[]');
  loadMainPage();
}
function doLogout(){
  currentUser=null; cart=[];
  hideAllPages();
  document.getElementById('loginPage').classList.remove('hidden');
  document.getElementById('loginEmail').value='';
  document.getElementById('loginPass').value='';
}
function showErr(el,msg){el.textContent=msg;el.style.display='block';}