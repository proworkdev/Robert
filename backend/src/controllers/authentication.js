import token from '../services/token';
import User from '../models/user';
import _ from 'lodash';
const uuidv4 = require('uuid/v4');
var formidable = require('formidable');
var randomID = uuidv4();
require("babel-core/register");
require("babel-polyfill");
var localIpV4Address = require("local-ipv4-address");
const port = process.env.PORT || 8000

export default {

    signup: (req, res, next) => {

        const { email, password, firstname, lastname, designation, phone } = req.body;
        console.log('TESTING BODY : ', req.body.firstname)
        if (!email || !password) {
            return res
                .status(422)
                .send({ error: 'You must provide email and password.' });
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err) return res.status(422).send(err);
                if (existingUser) {
                    return res
                        .status(422)
                        .send({ error: 'Email is in use' });
                }
                const user = new User
                user.name.first = firstname;
                user.name.last = lastname;
                user.email = email;
                user.password = password;
                user.designation = designation;
                user.phone = phone;

                user.save(function (err, savedUser) {
                    if (err) {
                        return next(err)
                    }

                    res.json({
                        success: true,
                        token: token.generateToken(savedUser)
                    })
                })
            })
    },

    signin: (req, res, next) => {

        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res
                .status(422)
                .send({ error: 'You must provide email and password.' });
        }
        User
            .findOne({
                email: email
            }, function (err, existingUser) {
                if (err || !existingUser) {
                    return res.status(401).send(err || { error: "User Not Found" })
                }
                if (existingUser) {

                    // console.log('Existing USER : ', existingUser);
                    // console.log('SESSION INCLUDES : ', req.session );

                    // req.session.user.password = null;

                    existingUser.comparedPassword(password, function (err, good) {
                        if (err || !good) {
                            return res.status(401).send(err || 'User not found')
                        }

                            localIpV4Address().then(function(ipAddress){
           
                        res.json({
                            token: token.generateToken(existingUser),
                            firstname: existingUser.name.first,
                            lastname: existingUser.name.last,
                            email: existingUser.email,
                            phone: existingUser.phone,
                            designation: existingUser.designation,
                            profImage: ipAddress+`:${port}`+'/'+existingUser.profilePicture
                        })
                    });
                    })
                }
            })
    },

    updateProfile: (req, res, next) => {
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id;
            const newProfile = {
                name: {
                    first: req.body.firstName,
                    last: req.body.lastName,
                },
            };
            delete newProfile.email;
            delete newProfile.phone;
            delete newProfile.password;

            User.findByIdAndUpdate(userId, newProfile, { new: true })
                .then(newUser => {
                    res.sendStatus(200);
                })
                .catch(next)
        })
    },

    updateUserProfile: (req, res, next) => {
        req.user.comparedPassword(req.body.password, (err, good) => {
            if (err || !good) return res.status(401).send(err || 'Incorrect Password')
            const userId = req.user._id;
            const newProfile = {
                name: {
                    first: req.body.firstName,
                    last: req.body.lastName,
                },
            };
            delete newProfile.email;
            delete newProfile.phone;
            delete newProfile.password;

            User.findByIdAndUpdate(userId, newProfile, { new: true })
                .then(newUser => {
                    res.sendStatus(200);
                })
                .catch(next)
        })
    },

    upload: (req, res, next) => {
        var form = new formidable.IncomingForm();
        form.parse(req);

        form.on('fileBegin', function (name, file) {
            var newName = randomID + file.name
            file.path = "public/" + newName;
            console.log("file", newName);

            User.findByIdAndUpdate(req.user._id,
                { $set: { profilePicture: 'public/' + newName } }, function (err, savedUser) {
                    localIpV4Address().then(function(ipAddress){
                        return res.json({
                            "status": 'success',
                            "imageUrl": ipAddress + `:${port}` + "/public/" + newName
                        });
                    });
                }
            )
        });

        form.on('file', function (name, file) {
            console.log('Image uploaded');
        });
    },

    allUsers: async (req, res, next) => {
        var usersArray = [];
        var doneArray = [];
        const Users = await User.find({});

        var finalArray = usersArray.concat(Users.splice(2, 2))

        finalArray.map((people, index) => {
            doneArray.push({
                'firstname': people.name.first,
                'lastname': people.name.last,
                'email': people.email,
                'phone': people.phone,
                'profImage': people.profilePicture,
                'designation': people.designation
            });
        });
        res.json(doneArray);
    }
}
