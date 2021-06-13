// this model is the initial database of contacts

const m = require("mithril");

const Contacts = {
  data: [
    {
      name: "Jimi Hendrix",
      band: "Jimi Hendrix Experience",
      role: "guitarist/singer",
      email: "jhendrix@experience.com",
    },
    {
      name: "Jimmy Page",
      band: "Led Zeppelin",
      role: "guitarist",
      email: "jpage@zeppelin.com",
    },
    {
      name: "Paul McCartney",
      band: "The Beatles",
      role: "singer/bassist",
      email: "pmccartney@beatles.com",
    },
  ],
};

module.exports = Contacts;
