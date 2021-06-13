// this file sets up the routing for my components and serves as the injection point for my css file

const m = require("mithril");

import "../styles.css";

const ContactList = require("./views/ContactList");
const Edit = require("./views/Edit");

m.route(document.body, "/list", {
  "/list": ContactList,
  "/edit/:id": Edit, // the id suffix routes to edit pages for a specific contact
});
