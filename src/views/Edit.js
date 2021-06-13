// this component allows editing and creation of contacts

const m = require("mithril");

const Contacts = require("../models/Contacts");

// these variabes get initialized outside of the view function to avoid being changed on each refresh which happens upon triggering events
let newName, newBand, newRole, newEmail;

// function to reset these variables after a submission or cancelation
const resetNewVars = () => {
  newName = null;
  newBand = null;
  newRole = null;
  newEmail = null;
};

// when editing an existing contact, only the changed variable will be saved and all others will remain as they were before
// when creating a new contact, if certain variables are not filled, they will default to N/A
const fillWithNA = (name, band, role, email) => {
  if (!newName && !name) {
    newName = "N/A";
  } else if (!newName) {
    newName = name;
  }

  if (!newBand && !band) {
    newBand = "N/A";
  } else if (!newBand) {
    newBand = band;
  }

  if (!newRole && !role) {
    newRole = "N/A";
  } else if (!newRole) {
    newRole = role;
  }

  if (!newEmail && !email) {
    newEmail = "N/A";
  } else if (!newEmail) {
    newEmail = email;
  }
};

module.exports = {
  view: function (vnode) {
    let name, band, role, email;

    // if this is a new contact, set variables to null, but if it is existing contact, fill placeholders with existing values
    if (Contacts.data[vnode.attrs.id]) {
      ({ name, band, role, email } = Contacts.data[vnode.attrs.id]);
    } else {
      name = null;
      band = null;
      role = null;
      email = null;
    }

    return m(
      "form",
      {
        onsubmit: function (e) {
          e.preventDefault();

          // if this is an existing contact
          if (Contacts.data[vnode.attrs.id]) {
            fillWithNA(name, band, role, email);

            // save changes to database
            Contacts.data[vnode.attrs.id].name = newName;
            Contacts.data[vnode.attrs.id].band = newBand;
            Contacts.data[vnode.attrs.id].role = newRole;
            Contacts.data[vnode.attrs.id].email = newEmail;

            // if this is a new contact
          } else {
            fillWithNA(name, band, role, email);

            // create new object and push to database
            const newContact = {
              name: newName,
              band: newBand,
              role: newRole,
              email: newEmail,
            };
            Contacts.data.push(newContact);
          }

          resetNewVars();
          m.route.set("/list"); // after submission, return to list
        },
      },
      [
        m("label.label", "Name"),
        m(`input.input[type=text][placeholder=${name}]`, {
          oninput: function (e) {
            newName = e.target.value;
          },
          value: newName,
        }),
        m("label.label", "Band"),
        m(`input.input[type=text][placeholder=${band}]`, {
          oninput: function (e) {
            newBand = e.target.value;
          },
          value: newBand,
        }),
        m("label.label", "Role"),
        m(`input.input[type=text][placeholder=${role}]`, {
          oninput: function (e) {
            newRole = e.target.value;
          },
          value: newRole,
        }),
        m("label.label", "Email"),
        m(`input.input[type=text][placeholder=${email}]`, {
          oninput: function (e) {
            newEmail = e.target.value;
          },
          value: newEmail,
        }),
        m("button.button[type=submit]", "Save"),
        m(
          "button.button[type=button]",
          {
            onclick: function (e) {
              resetNewVars();
              m.route.set("/list"); // canceling returns to list
            },
          },
          "Cancel"
        ),
      ]
    );
  },
};
