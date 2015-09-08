# analog-counter-wheel

This is a proof of concept element, inspired by the UIKit [PickerView](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/UIKitUICatalog/UIPickerView.html)
It is mainly designed to be a display read-only kind of component, but it also could be used as input using the mouse-wheel. Direct manipulation by touch or mouse drag are not present at the moment.

[DEMO](http://liveweave.com/R6sali)


To create a analog-counter-wheel component you just need a div 

`var myComponent = new Counter(myDiv);`

This will instantiate a new component and initialize it.

## Public API

### Properties

- Counter.**pos**
  > [Integer] Current Index Position

- Counter.**values**
  > [Array] of the possible values  
  >  e.g.:`["A","B","C","D","E","F"];`


#### Options

- Counter.**options.mousewheel**
  >[boolean] enable mouse wheel manipulation  

- Counter.**options.digitHeight** 
  >[Integer] height in pixels of a single digit  

- Counter.**options.inverted** 
  >[boolean] invert direction  

### Methods

- Counter.prototype.**setValue(String value)**
  > Set the position to the position of the String value

- Counter.prototype.**getValue()**
  > returns the String value of the current position

- Counter.prototype.**setValue(String value)**
  > Set the position to the position of the value

- Counter.prototype.**getPos()**
  > returns the current index position

- Counter.prototype.**setPos (int index)**
  > Set the position to the specified index

- Counter.prototype.**moveBy(int x)**
  > Move by the specified amount (positive or negative)

- Counter.prototype.**moveTo(int pos)**
  > Move to the specified index position

- Counter.prototype.**next()**
  > Increase the position by one

- Counter.prototype.**previous(int pos)**
  > Reduce the position by 1
