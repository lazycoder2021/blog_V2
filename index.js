




const firebaseConfig = {
    apiKey: "AIzaSyB6wjKtRIf0Z9-uRyEstYHrFH2CqkNaVL8",
    authDomain: "blog2-e340b.firebaseapp.com",
    projectId: "blog2-e340b",
    storageBucket: "blog2-e340b.appspot.com",
    messagingSenderId: "34789296071",
    appId: "1:34789296071:web:5f0aabcedd404b14867be2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)



var db = firebase.firestore()




const signFormWrapper = document.querySelector('.signin-form-wrapper'); 
const loginFormWrapper = document.querySelector('.login-form-wrapper');
const registerButton = document.querySelector('.register-btn');
const loginButton = document.querySelector('.login-btn');
const closeButton = document.querySelector('.close');
const closeButton1 = document.querySelector('.close1'); 
const signinform = document.querySelector('.signin-form');
const loginform = document.querySelector('.login-form');
const logoutBtn = document.querySelector('.logout-btn');



/*closeButton.addEventListener('click', function () {
    closeButton.parentElement.parentElement.classList.add('hide');
})

closeButton1.addEventListener('click', function () {
    closeButton1.parentElement.parentElement.classList.add('hide');
})*/

registerButton.addEventListener('click', function () {
    signFormWrapper.classList.toggle('hide')
})

loginButton.addEventListener('click', function () {
    loginFormWrapper.classList.toggle('hide')
})

signinform.addEventListener('submit', async function (e) {
    e.preventDefault(); 
    //alert('sign in functionality')
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    console.log(email, password)

    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6wjKtRIf0Z9-uRyEstYHrFH2CqkNaVL8", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            email: email,
            password: password
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    alert('you account has been created')
    const data = await response.json()
    console.log(data)

    console.log(data.idToken)

    const id = data.idToken;

    localStorage.setItem('id', `${id}`);

})



loginFormWrapper.addEventListener('submit', async function (e) {
    e.preventDefault();
    //alert('sign in functionality')
   

    const email1 = document.querySelector('.email1').value;
    const password1 = document.querySelector('.password1').value;
    console.log(email1, password1)

    const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6wjKtRIf0Z9-uRyEstYHrFH2CqkNaVL8", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            email: email1,
            password: password1
        }),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    alert('you have successfully logged in')

    const data = await response.json()
    const userId = data.localId;
    const useremail = data.email;
    console.log(useremail)
    console.log(userId)


    //console.log(data.idToken)

    const userToken = data.idToken;

    localStorage.setItem('id', `${userToken}`);
    localStorage.setItem('userid', `${userId}`);
    localStorage.setItem('useremail', `${useremail}`);


})

logoutBtn.addEventListener('click', e => {
    e.preventDefault();

    alert('you have successfully logged out');
    localStorage.clear();
    document.body.innerHTML = '';
    //localStorage.removeItem('id'); 
    //localStorage.removeItem('userid'); 
})


window.addEventListener('DOMContentLoaded', function () {
   

    const users = db.collection("users").get()
        /*.then((u) => {
            console.log(u.docs)
        }).catch((e) => {
            console.log(e)
        })*/

        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            console.log(data)

            data.map((d) => {
                document.querySelector('.authors').innerHTML += `<div class="author">
            <div class="details" data-id=${d.id}>
                <div class="blogName"><h3>Blog Name: ${d.blogName}</h3></div>
                <div class="authorName"><p>Author Name: ${d.authorName}</p></div>
                <div class="authorBio"><p>Author Bio: ${d.authorBio}</p></div>
            </div>
            <div class="blogmama">
                <div class="blogsss"><a href="viewBlogsGeneral.html?id=${d.id}">View Blog</a></div>
            </div>
            </div>`; 

            })
        })
       
})

//db.collection("users").doc(`${userId}`).collection("blogs").get()