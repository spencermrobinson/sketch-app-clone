const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      massive = require('massive')
      ele_ctrl = require('./controllers/elements_controller'),
      user_ctrl = require('./controllers/user_controller'),
      sketchpads_ctrl = require('./controllers/sketchpads_controller.js')
      check = require('./middleware/checkForSession').check
require('dotenv').config();

let app = express();
app.use( express.static( `${__dirname}/../build` ) );
app.use(bodyParser.json())


let {
 SERVER_PORT,
 CONNECTION_STRING,
 SECRET_SESSION
} = process.env

app.use(session( {
      resave: true,
      saveUninitialized: false,
      secret: SECRET_SESSION,
      cookie: {
            maxAge: 100000 
      }
}))

app.use(check);

//user control
app.get('/user/get', user_ctrl.read)
app.get('/user/logout', user_ctrl.logout)
app.get('/user/auth', user_ctrl.auth)
app.post('/user/signup', user_ctrl.signup)
app.post('/user/login', user_ctrl.login)
app.post('/user/session', user_ctrl.session)

// sketchpad control
app.post('/sketchpads', sketchpads_ctrl.addPad)
app.get('/sketchpads/all', sketchpads_ctrl.sketchpadsByUser);
// app.get('/sketchpads/:id', sketchpads_ctrl.getPad)
app.put('/sketchpads/:id', sketchpads_ctrl.editPad)
app.delete('/sketchpads/:id', sketchpads_ctrl.deletePad)

// element control
app.post('/sketchpads/:id/elements/:type', ele_ctrl.addElement)
app.put('/sketchpads/:id/:name/:pad_id', ele_ctrl.renameElement )
// app.get('/sketchpads/:id/elements/:key', ele_ctrl.getElement)
app.get('/sketchpads/:id/elements', ele_ctrl.getAllElements)
app.post('/sketchpads/elements/:pad_id/:id', ele_ctrl.saveElement)
app.delete('/sketchpads/:id/:pad', ele_ctrl.deleteElement)
app.post('/sketchpads/elements/:pad_id/:id', ele_ctrl.deleteSave)



massive(CONNECTION_STRING).then(dbInstance => {
      app.set('db', dbInstance);
      app.listen(SERVER_PORT, ()=>console.log(`Listening on ${SERVER_PORT}`))
})
