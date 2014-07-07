Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Template.home.greeting = function () {
    return "Welcome to meteorlist.";
  };

  Template.home.allPosts = function () {
    return Posts.find({}, {
      sort: {title: -1}
    });
  }

  Template.post.events({
    'submit form': function (e) {
      e.preventDefault();

      var item = {
        title: $(e.target).find('[name=title]').val(),
        price: $(e.target).find('[name=price]').val(),
        description: $(e.target).find('[name=description]').val()
      }
      console.log(item);
  
      if(item["title"].trim() != ""){
        Posts.insert(item);
        Router.go('home');
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Posts.find().count() === 0) {
      Posts.insert({
        title: "Yamaha FZ-09",
        price: "7900",
        description: "Deeter's new bike.",
        type: "motorcycle"
      });
      Posts.insert({
        title: "Ducati Monster 1200 S",
        price: "15995",
        description: "Italian sexy!",
        type: "motorcycle"
      });
      Posts.insert({
        title: "Triumph Speed Triple R",
        price: "14699",
        description: "Dream bike from Old Blightey.",
        type: "motorcycle"
      });
    }
  });
}
