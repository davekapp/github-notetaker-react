# Github Notetaker

####Objectives
The purpose of this project is to familiarize yourself with the Flux architecture. In this project we'll be recreating [THIS](http://reactweek.com/projects/github-notetaker/#/) application. The user can type in any github username and then will be routed to a page where they can see that user's information, repositories, and have the ability to take notes on the specific developer. A use case for this (if you added auth which we won't be doing in this project) is for taking notes on candidates in technical interviews.

As few notes before we get started. Remember, Flux really shines when you have a large, data heavy application. Though we arguably have some data, this application definitely isn't large. Because of that, your first impression of Flux might be that you feel like you're doing a lot of typing without much benefit. Remember, this is just a small demo app. The real benefits of Flux will show themselves as your application gets larger. For more on this topic read [this blog post](https://medium.com/@dan_abramov/the-case-for-flux-379b7d1982c6).

Final Project Image: 
![Github Notetaker](http://s17.postimg.org/4hgyl4ykf/notetaker.png)

Final Project Component Visualization:
![Github Notetaker Visualized](http://s15.postimg.org/x0j2q0de3/notetaker_compnents.png)

####Step 1: Familiarize Yourself with Code Base
  * Fork this repo and clone your fork
  * run ```npm install```
  * Familiarize yourself with the given code and file structure

For reference the final folder structure will look something like this.

![File structure](http://s18.postimg.org/z8okmz1tl/Screen_Shot_2015_02_21_at_7_13_35_PM.png)

####Step 2: Stores

The nice thing about Flux is you really have to think about the organization and structure of your application before you start hacking away. When you finish building out your Stores, you'll know a few things about your application. You'll know your data schema, your action types, and your app constants. Once you know this information, the rest of your app will simply be build to support it. This makes starting off building your stores the easy choice when building a flux application. 

This app is going to have two Stores. A Github Store and a Notes Store. The Github Store will be responsible for keeping track of the specific user we're looking at as well as his or her bio and any repos they have. The Notes Store will be responsible for keeping track of the specific user we're looking at as well as any notes that have been written about him or her.

Let's start out by building our Github Store. 
  - Head over to your "stores" folder and create a new file called ```githubStore.js```.
* Require your AppDispatcher in the ```dispatcher/AppDispatcher``` folder
* Require your AppContants in the ```constants/AppConstants``` folder
* Require EventEmitter using ```require('events').EventEmitter```. *EventEmitter will allow us to emit changes from our Store and listen for those changes in our Components*
* Require objectAssign which can be found at ```react/lib/Object.assign```. *objectAssign allows us to extend an object with another object. We'll use it to give our GithubStore object the ability to emit events by extending it (or copying properties) with the EventEmitter*
* Create a variable called ```CHANGE_EVENT``` and set it equal to the string "change".

One of the main reasons for a Store in Flux is to keep track of some state. 

Make a variable called ```_state``` and set it equal to an object with the following properties/values.
 - user: ''
 - bio: undefined
 - repos: undefined

Those three properties are going to be what our Github Store will be responsible for keeping track of. Everything we build in our Github Store from here out will all be in relationship to those three values. This makes it easy to reason about our code because if something happened with one of those three values, the perpetrator will be refined to a small location.

After you create your ```_state``` object, let's create three setter methods for modifying each property in our ```_state``` object.

* create a ```newUser``` method which takes in a string and sets the ```user``` property on the ```_state``` object to that string which was passed in.
* create a ```setBio``` method which takes in an object and sets the ```bio``` property on the ```_state``` object to that object which was passed in.
* create a ```setRepos``` method which takes in an object and sets the ```repos``` property on the ```_state``` object to that object which was passed in.

Now we have our data object and our setter methods, we need to create our actual store. 

To do this, as mentioned earlier, we're going to use objectAssign. From the objectAssign docs, here's some more info about it. 

```
var newObject = objectAssign(target, source, [source, ...])

Assigns enumerable own properties of source objects to the target object and returns the target object. Additional source objects will overwrite previous ones.
```

the target is going to be an empty object, the source is going to be the ```EventEmitter.prototype``` object, the source is going to be an object with properties we want our store to have, and the newObject is going to be an object with all of those properties combined.

* Use objectAssign to create a new object called GithubStore which extends EventEmitter and has the following properties.
  - An ```emitChange``` method which uses the ```emit``` method which was originally on the EventEmitter.prototype to emit our change event (CHANGE_EVENT). *hint: use ```this.emit()```
  - An ```addChangeListener``` method which takes in a callback function as its only parameter and then invokes the ```on``` method which was originally on EventEmitter.prototype passing it the change event variable we defined earlier as well as the callback which was passed in.
  - A ```removeChangeListener``` method which takes in a callback function as its only parameter and then invokes the ```removeListener``` method which was originally on EventEmitter.prototype passing it the change event variable we defiend earlier as well as the callback which was passed in.
  - A ```getUser``` method which returns the ```user``` property on our ```_state``` object.
  - A ```getBio``` method which returns the ```bio``` property on our ```_state``` object
  - A ```getRepos``` method which returns the ```repos``` propetty on our ```_state``` object.
  
*If you're stuck with the code above, when I say "which was originally on the EventEmitter.prototype" what I'm meaning is that when we used objectAssign, those EventEmitter.prototype properties were copied over to our GithubStore object. Now, to reference those methods in this case you can use the keyword ```this```. So for example, above our addChangeListener method should look like this.
```javascript
addChangeListener: function(cb){
  this.on(CHANGE_EVENT, cb);
}
```

