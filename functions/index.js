// const functions = require('firebase-functions');
const { admin, db } = require('./utils/admin')
const app = require('express')();//initializaing the app
const functions = require('firebase-functions');
const firebase = require('firebase')
const firebaseConfig = require('./utils/config')
const connect = require('connect');
// const FirebaseStore = require('connect-session-firebase')(connect);
var session = require('express-session')
firebase.initializeApp(firebaseConfig);
// app.use(session({
//     store: new FirestoreStore({
//          database: firebase.firestore()
//     }),
//     name: '__session',
//     secret: 'My secret',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {maxAge : 60000,
//              secure: false,
//              httpOnly: false }
// }));
// const admin = require('firebase-admin');
// admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });






// Initializing Firebase
const { signIn,signUp,resetPassword } = require('./handlers/auth')
var PORT = process.env.port || 3000
// Creating Authentication routes:
app.post('/register',signUp),
app.post('/login',signIn);

app.get("/", function(req, res){
       
    // req.session.key = value
    req.session.name = 'GeeksforGeeks'
    return res.send("Session Set")
})
   
app.get("/session", function(req, res){
    var name = req.session.name
    // return res.send(name)
    console.log(name,'name')

    req.session.destroy(function(error){
        console.log("Session Destroyed")
    })

       
    /*  To destroy session you can use
        this function 
     req.session.destroy(function(error){
        console.log("Session Destroyed")
    })
    */
})


app.listen(PORT, function(error){
    if(error) throw error
    console.log("Server created Successfully on PORT :", PORT)
})


exports.api=functions.https.onRequest(app);//this will add api prefix to our url and gives api url like https://us-central1-parkit-27a48.cloudfunctions.net/api/