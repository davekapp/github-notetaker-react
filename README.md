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

####Step 2: Stores (Github Store)

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

After you create your ```_state``` object, let's create three setter functions for modifying each property in our ```_state``` object.

* create a ```newUser``` function which takes in a string and sets the ```user``` property on the ```_state``` object to that string which was passed in.
* create a ```setBio``` function which takes in an object and sets the ```bio``` property on the ```_state``` object to that object which was passed in.
* create a ```setRepos``` function which takes in an object and sets the ```repos``` property on the ```_state``` object to that object which was passed in.

Now we have our data object and our setter functions, we need to create our actual store. 

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

Now the last thing we need to do is register actions with our Store so our Store will be able to listen for certain signals dispatched by the dispatcher. Remember the process for Flux goes like this, **(1) A user initiates some event, (2) that event invokes an action (3) which then triggers the dispatcher. The dispatcher then (4) dispatches an event which (5) is then caught by the Stores who subscribe to those events. The Store then (6) calls some internal setter method which alters its internal state, then the Store (7) emits a change event which brings us full circle back to the (8) view which updates its own internal state.**. 

So our Store is repsponsible for numbers 5 - 7. We've created the ability to do number 6 and 7, but we still haven't had our Store subscribe to any events (5). Let's do that right now.

What you might have the thought of doing initially is to register the Dispatcher actions on the actual Store itself. In our example above, something like this ```GithubStore.register(function...)```, however, that's not how it works. You register your actions listeners on the Dispatcher itself. This makes sense if you think of it as the Dispatcher is the one dispatching the event, so it could also be the one who registers what functionality will be invoked when those dispatches are received. 

* Use ```AppDispatcher.register``` and pass in a function that receives "payload" as its only parameter. *This payload is going to have an ```action``` property which has an "actionType" property and a "data" property (which was specified when we dispatched the event)*.
* Inside our callback function, create a variable called ```action``` which gets assigned the value of ```payload.action```. 
* Create a switch statement which is checking the ```action.actionType``` value. 

Earlier I mentioned how in order to build out your stores, you'll need to know the action types that your app is going to use. In the case of our GithubStore, let's brainstorm some actions which will be happening. The user needs the ability to get the users github bio, get the users repos, and change the user. Let's now create three constants which will represent those three actions. 

* Head over to your constants folder and create a new file called ```AppConstants.js```.
* In that file create an object called ```AppConstants``` and then export that object.
* In that object, create the following keys value pairs
  - GITHUB_USER_BIO: "GITHUB_USER_BIO"
  - GITHUB_USER_REPOS: "GITHUB_USER_REPOS"
  - GITHUB_CHANGE_USER: "GITHUB_CHANGE_USER"

Now anytime we want to represent any of the Github actions we mentioned above, we can use these constants to be consistent throughout our application. 

Head back over to the ```GithubStore.js``` file and inside the switch statement create the following cases.
 - ```AppConstants.GITHUB_USER_BIO``` which will call the ```setBio``` setter function and pass it ```action.data``` then invoke ```GithubStore.emit``` and pass it the change event variable we created at the top of the file.
 - ```AppConstants.GITHUB_USER_REPOS``` which will call the ```setRepos``` setter function and pass it ```action.data``` then emit that a change occurred.
 - ```AppConstants.GITHUB_CHANGE_USER``` which will call the ```newUser``` setter function and pass it ```action.data``` then emit that a change occurred.
 - Have the default case just return true

*One thing to note is that when a change occurred, we're not emitting what that change was, we're only emitting that a change occurred. Our view doesn't care about what changed, it just cares that something did change. With the ~~power of the virtual DOM~~ we can just tell our view to rerender everytime there is a change without performance worries.* 

* Use module.exports to export the GithubStore.

Our GithubStore is now complete. It has and can manage its own state as well as emit "change" when its data changes.

####Step 3: Notes Store

The NotesStore is going to look very similar to the GithubStore we just created except it will obviously be related to the notes about the user and not their github information. Because of the similarity, this section will be purposelly vague. If you get stuck on the implementation detail, check out the GithubStore.js file for help.

* In your ```stores``` folder create a file called ```NotesStore.js```.
* Require
 - AppDispatcher
 - AppConstants
 - objectAssign
 - EventEmitter
* Create a change event constant
* Createa a state which has a ```notes``` whose value is set to an empty array and a ```user``` property whose value is an empty string.
* Create an addNote setter function which takes in a note parameter and adds that note to the state's note property
* creata a changeUser function which takes in a new user object as its parameter and then resets the state with the user property being the ```user``` property on the object which was passed in and the ```notes``` property being set to the ```notes``` property on the obejct which was passed in.
* Create your NotesStore object with the following methods (which are self explanatory and similar to what we did in GithubStore.js)
  - getState
  - emitChange
  - addChangeListener
  - removeChangeListener

Let's now consider the actions the user should be able to make in regards to the Notes functionality. The user should be able to 1) Add a new note (ADD_NOTE) and 2) change the user (CHANGE_USER).

* Head over to AppConstants.js and add the following constants into the object that's being exported.
* Now back in NotesStore.js, register both of those actions (ADD_NOTE and CHANGE_USER) and add the proper functionality when the AppDispatcher dispatches either of those events.

*Note that although that the implementation for Notes is needing to make an external request to fetch/set the data, we're not doing that in the NotesStore but we'll do it in our Actions file. This keeps the traditional data flow Flux pattern of VIEWS -> DISPATCHER -> STORES constant.*
