// This is the main component that displays the contacts

const m = require("mithril");

const Contacts = require("../models/Contacts");

module.exports = {
  view: function () {
    let i = -1; // this variable keeps track of each contact rendered

    return m(
      ".cards",
      // loop through each contact and render
      Contacts.data.map((contact) => {
        i++; // each contact gets an id

        return m(
          ".card",
          m("h1", contact.name),
          m("h4", contact.band),
          m("p", contact.role),
          m("h6", contact.email),

          m(
            ".links",

            m(m.route.Link, { href: "/edit/" + i }, "Edit"), // route to a specific edit page for that contact

            m(
              "button.button[type=button]",
              {
                id: i, // each 'Delete' button is tied to a specific contact
                onclick: (e) => {
                  Contacts.data.splice(e.target.id, 1);
                },
              },
              "Delete"
            )
          )
        );
      }),

      // this last card routes the user to an edit page for adding a new contact
      m(
        ".card",
        m(
          "button.add[type=button]",
          {
            onclick: function (e) {
              m.route.set("/edit/" + (i + 1)); // i only counts existing contacts, so new contact is i + 1
            },
          },
          "Add Contact"
        )
      )
    );
  },
};
