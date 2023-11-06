const express     = require('express')
const bodyParser  = require('body-parser')
const path        = require('path') //to work with directories and file paths
const fs          = require('fs') //to work with the file system on your computer
const multer      = require('multer') //used for uploading files
const { route } = require('./reset')

const db = require.main.require('./models/db_master')

const router = express.Router()

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

//middleware
// router.get('*', (req, res, next) => {
//     if(req.cookies['username'] == null)
//     {
//         res.redirect('/login');
//     } else {
//         console.log('cookie '+ req.cookies.username);
//         next();
//     }
// })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, 'public/assets/images/uploaded');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb (null, file.originalname);
    }
})

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    db.getAllDoc((err,result) => {
        if(err) throw err;
        res.render('doctors.ejs',{list : result})
    });
})

// router.get('/add_doctor', (req, res) => {
// })

router.post('/add_doctor', upload.single("image"), (req, res) => {
    db.add_doctor(req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,req.file.filename,req.body.department,req.body.biography);
    if(db.add_doctor){
        console.log('1 doctor inserted');
    }
    res.redirect('add_doctor') 
})

//non va con param edit_doctor/:id => id = req.params.id
router.get('/edit_doctor', (req, res) => {
    const id = req.query.id;
    db.getDocbyId(id, (err,result) => {
        // res.render('edit_doctor.ejs' ,{list : result});
        res.send('inside edit_doctor ' + id)
    });
});
router.put('/edit_doctor', (req, res) => {
    const id = req.query.id;
    console.log('editing doctor ' + id);
    console.log(req.body);
    db.editDoc(id,req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,req.body.department,req.body.biography,
        (err,result) => {
            if(err) throw err;
            res.redirect('back');
        });
});

router.delete('/delete_doctor', (req, res) => {
    const id = req.query.id;
    console.log('deleting doctor ' + id);
    db.deleteDoc(id,(err,result) => {
        if(err) throw err;
        res.send('doctor deleted')
    })
})

router.get('/delete_doctor', (req, res) => {
    const docName = req.query.first_name;
    console.log('searching doctor ' + docName);
    db.searchDoc(docName,(err,result) => {
        if(err) throw err;
        res.send('doctor ' +docName+ ' found')
    })
})


module.exports = router;