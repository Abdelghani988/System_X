const express = require('express')
const Customer = require("../models/customerSchema");
const moment = require("moment"); // require Moment


const user_index_get=(req, res) => {
    Customer.find()
    .then((result) => {
        res.render("index", { arr: result, moment: moment });}) // Render the Home page after fetching the data
    .catch((error) => {
        console.log(error);
        res.render("error", { error: error });
    });
}
const user_add_post=(req, res) => {
    Customer.create(req.body)
        .then(() => {
        res.redirect("/");
        })
        .catch((error) => {
        console.log(error);
    });
}
const user_add_get=(req, res) => {
    res.render("user/add");
}
const user_edit_get=(req, res) => {
    Customer.findById(req.params.id)
    .then((result) => {
    res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((error) => {
    console.log(error);
    });
}
const user_edit_put=(req, res) => {
    Customer.updateOne({ _id: req.params.id }, req.body)
    .then((params) => {
    res.redirect("/");
    })
    .catch((error) => {
    console.log(error);
    });
}
const user_search_post=(req, res) => {
    console.log(req.body.searchText)
    Customer.find({$or: [{ FirstName :req.body.searchText},{ LastName :req.body.searchText}]})
    .then((result) => {
        console.log(result)
        res.render("user/search",{arr : result});
        })
        .catch((error) => {
        console.log(error)
        })
}
const user_view_get= (req, res) => {
    Customer.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment }); // Render the view page after fetching the data
    })
    .catch((error) => {
    console.log(error);
    });
}
const user_delete=(req, res) => {
    Customer.deleteOne({ _id: req.params.id })
    .then(() => {
        res.redirect("/");
    })
    .catch((error) => {
    console.log(error);
    });
}

module.exports = {
    user_add_get,
    user_add_post,
    user_edit_get,
    user_edit_put,
    user_search_post,
    user_index_get,
    user_view_get,
    user_delete
};
