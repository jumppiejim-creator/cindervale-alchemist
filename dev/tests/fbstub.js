// Minimal Firebase compat stub for headless testing (no network).
(function(){
  const store={};
  const docRef=(path)=>({
    collection:(c)=>colRef(path+'/'+c),
    set:async(v)=>{store[path]=v;},
    get:async()=>({exists:path in store,data:()=>store[path]}),
    delete:async()=>{delete store[path];},
  });
  const colRef=(path)=>({doc:(d)=>docRef(path+'/'+d),get:async()=>({docs:[],forEach(){}})});
  const auth={currentUser:null,onAuthStateChanged(cb){setTimeout(()=>cb(null),0);return()=>{};},signInWithPopup:async()=>{},signOut:async()=>{}};
  const fs={collection:(c)=>colRef(c),enablePersistence:()=>Promise.resolve()};
  const firebase={initializeApp:()=>({}),auth:()=>auth,firestore:()=>fs};
  firebase.auth.GoogleAuthProvider=function(){};
  firebase.firestore.FieldValue={serverTimestamp:()=>new Date().toISOString()};
  window.firebase=firebase;
})();
